import { Box, Paper, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function FactCard({ index, title, text }) {
  return (
    <Paper
      sx={(theme) => ({
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 1.5,
        alignItems: 'start',
        p: 2,
        borderRadius: 2.5,
        backgroundColor: alpha('#ffffff', 0.72),
        border: `1px solid ${alpha(theme.palette.common.white, 0.7)}`,
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'grid',
          placeItems: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          fontWeight: 800,
          flexShrink: 0,
        })}
      >
        {index}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 800, mb: 0.25 }}>{title}</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {text}
        </Typography>
      </Box>
    </Paper>
  )
}
