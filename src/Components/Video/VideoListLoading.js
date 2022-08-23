import React from 'react'
import { Grid } from '@mui/material'
import { Stack } from '@mui/material'
import { Skeleton } from '@mui/material'

export default function VideoListLoading() {
  return (
    <Grid mr={2}>
      <Stack spacing={1}>

      <Skeleton variant="rectangular" width={350} height={200}/>
    <Grid container>
      <Grid item xs={2}>
      <Skeleton variant="circular" width={20} height={20} />
      </Grid>
      <Grid item xs={10}>
        <Grid className="box">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Grid>
      </Stack>

  </Grid>
  )
}
