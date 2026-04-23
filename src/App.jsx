import { useEffect, useState } from 'react'
import { Box, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import CountdownCard from './components/CountdownCard'
import FactCard from './components/FactCard'

const TIME_ZONE = 'Europe/Oslo'
const TARGET_MONTH = 4
const TARGET_DAY = 17
const TARGET_HOUR = 8

const facts = [
  {
    title: 'Grunnlovsdag',
    text: '17. mai markerer dagen da Grunnloven ble vedtatt på Eidsvoll i 1814.',
  },
  {
    title: 'Barnetoget',
    text: 'Norge er kjent for barnetog, korpsmusikk, flagg og feiring i gatene.',
  },
  {
    title: 'Bunad og frokost',
    text: 'Mange starter dagen tidlig med 17. mai-frokost før tog og arrangementer begynner.',
  },
  {
    title: 'Klokken 08:00',
    text: 'Denne siden teller ned til den festlige morgenen starter klokken åtte i norsk tid.',
  },
]

function parseOffsetLabel(label) {
  if (label === 'GMT' || label === 'UTC') {
    return 0
  }

  const match = label.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/)
  if (!match) {
    return 0
  }

  const [, sign, hours, minutes] = match
  const totalMinutes = Number(hours) * 60 + Number(minutes || 0)
  return (sign === '+' ? 1 : -1) * totalMinutes * 60 * 1000
}

function getTimeZoneOffsetMs(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
    hour: '2-digit',
    minute: '2-digit',
  })

  const zonePart = formatter
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')

  return parseOffsetLabel(zonePart ? zonePart.value : 'GMT')
}

function getTargetDate(year) {
  const guess = new Date(Date.UTC(year, TARGET_MONTH, TARGET_DAY, TARGET_HOUR, 0, 0))
  const offsetMs = getTimeZoneOffsetMs(guess, TIME_ZONE)
  return new Date(guess.getTime() - offsetMs)
}

function getOsloYear(date) {
  return Number(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
    }).format(date),
  )
}

function getNextCelebration(now = new Date()) {
  const currentYear = getOsloYear(now)
  let target = getTargetDate(currentYear)

  if (now >= target) {
    target = getTargetDate(currentYear + 1)
  }

  return target
}

function getTimeLeft(target) {
  const now = new Date()
  const total = Math.max(0, target.getTime() - now.getTime())

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

function formatTarget(date) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: TIME_ZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function App() {
  const [targetDate, setTargetDate] = useState(() => getNextCelebration())
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextTimeLeft = getTimeLeft(targetDate)

      if (nextTimeLeft.total === 0) {
        const upcomingTarget = getNextCelebration(new Date(targetDate.getTime() + 1000))
        setTargetDate(upcomingTarget)
        setTimeLeft(getTimeLeft(upcomingTarget))
        return
      }

      setTimeLeft(nextTimeLeft)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  const isCelebrationTime = timeLeft.total === 0
  const targetLabel = formatTarget(targetDate)

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box component="section" sx={{ position: 'relative', pt: { xs: 2, md: 4 }, pb: 2 }}>
          <Paper
            className="hero-surface"
            sx={(theme) => ({
              position: 'relative',
              overflow: 'hidden',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 2.5, sm: 3.5, md: 4 },
              borderRadius: 4,
              border: `1px solid ${alpha(theme.palette.common.white, 0.7)}`,
              background: `linear-gradient(155deg, ${alpha('#ffffff', 0.92)}, ${alpha(
                '#fff8f1',
                0.78,
              )})`,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 24px 80px rgba(13, 42, 99, 0.18)',
              animation: 'rise 800ms ease-out both',
            })}
          >
            <Box className="sparkles" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </Box>

            <Chip
              label="Norsk feststemning"
              sx={(theme) => ({
                pl: 0.5,
                pr: 1,
                py: 2.4,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.common.white, 0.9),
                '&::before, &::after': {
                  content: '""',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  display: 'inline-block',
                },
                '&::before': {
                  mr: 1,
                  backgroundColor: theme.palette.primary.main,
                },
                '&::after': {
                  ml: 1,
                  backgroundColor: theme.palette.secondary.main,
                },
                '& .MuiChip-label': {
                  px: 0,
                },
              })}
            />

            <Typography variant="h1" sx={{ mt: 2, mb: 1, maxWidth: '12ch', fontSize: { xs: '3rem', sm: '4.2rem', md: '5.8rem' } }}>
              Nedtelling til 17. mai
            </Typography>

            <Typography color="text.secondary" sx={{ maxWidth: 620, fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.7 }}>
              Hvor lenge er det igjen til flagg, frokost, korps og en skikkelig fin start på
              nasjonaldagen? Denne telleren går helt frem til klokken 08:00 i Norge.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ mt: 3 }}>
              <Chip
                label={`Neste mål: ${targetLabel}`}
                sx={{
                  px: 0.5,
                  py: 2.4,
                  bgcolor: 'rgba(255, 255, 255, 0.82)',
                  boxShadow: '0 10px 30px rgba(13, 42, 99, 0.08)',
                }}
              />
              <Chip
                label="Tidssone: Europe/Oslo"
                sx={{
                  px: 0.5,
                  py: 2.4,
                  bgcolor: 'rgba(255, 255, 255, 0.82)',
                  boxShadow: '0 10px 30px rgba(13, 42, 99, 0.08)',
                }}
              />
            </Stack>

            <Grid container spacing={2} sx={{ mt: 2 }} aria-label="Nedtelling til 17. mai klokken 08:00">
              <Grid item xs={12} sm={6} md={3}>
                <CountdownCard value={timeLeft.days} label="Dager" delay={0} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CountdownCard value={timeLeft.hours} label="Timer" delay={80} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CountdownCard value={timeLeft.minutes} label="Minutter" delay={160} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CountdownCard value={timeLeft.seconds} label="Sekunder" delay={240} />
              </Grid>
            </Grid>

            <Paper
              sx={(theme) => ({
                mt: 3,
                px: 2,
                py: 1.75,
                borderRadius: 2.5,
                color: theme.palette.primary.contrastText,
                background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: '0 18px 36px rgba(13, 42, 99, 0.18)',
              })}
            >
              <Typography sx={{ fontWeight: 700 }}>
                {isCelebrationTime
                  ? 'Gratulerer med dagen! Klokken er 08:00 - nå er 17. mai-feiringen i gang.'
                  : 'Telleren oppdateres hvert sekund frem til 17. mai klokken 08:00.'}
              </Typography>
            </Paper>
          </Paper>
        </Box>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={7}>
            <Paper
              sx={(theme) => ({
                p: { xs: 2.5, md: 3 },
                borderRadius: 3.5,
                backgroundColor: alpha('#fffcf9', 0.82),
                border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
                boxShadow: '0 20px 48px rgba(13, 42, 99, 0.1)',
                animation: 'rise 1s ease-out both',
              })}
            >
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, mb: 1.25 }}>
                En side med ett klart fokus
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Siden er laget for å vise nedtellingen tydelig, men med et uttrykk som fortsatt
                kjennes høytidelig, lyst og litt festlig. Fargepaletten henter inspirasjon fra det
                norske flagget, mens layouten holder alt ryddig og lett å lese på mobil og desktop.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2, fontSize: '0.95rem' }}>
                Tips: La siden stå åpen på skjermen om morgenen 17. mai for å se nedtellingen gå
                helt i null.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              sx={(theme) => ({
                p: { xs: 2.5, md: 3 },
                borderRadius: 3.5,
                backgroundColor: alpha('#fffcf9', 0.82),
                border: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
                boxShadow: '0 20px 48px rgba(13, 42, 99, 0.1)',
                animation: 'rise 1s ease-out both',
              })}
            >
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, mb: 2 }}>
                17. mai-fakta
              </Typography>
              <Stack spacing={1.25}>
                {facts.map((fact, index) => (
                  <FactCard key={fact.title} index={index + 1} title={fact.title} text={fact.text} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
