import { Paper, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function CountdownCard({ value, label, delay = 0 }) {
  return (
    <Paper
      sx={(theme) => ({
        px: { xs: 2, sm: 2.5 },
        py: { xs: 2, sm: 2.25 },
        borderRadius: 3,
        textAlign: 'center',
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.08)}`,
        background: `linear-gradient(180deg, ${alpha('#ffffff', 0.95)}, ${alpha(
          '#edf2fb',
          0.7,
        )})`,
        boxShadow: '0 16px 40px rgba(13, 42, 99, 0.08)',
        animation: 'rise 900ms ease-out both',
        animationDelay: `${delay}ms`,
      })}
    >
      <Typography sx={{ display: 'block', fontSize: { xs: '2.4rem', md: '4rem' }, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        {label}
      </Typography>
    </Paper>
  )
}
