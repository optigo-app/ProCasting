import React from 'react';
import { Grid, Skeleton, Card } from '@mui/material';
import './BatchListing.css'

const CardSkeleton = () => {
  const cardCount = 6;

  return (
    <Grid container spacing={3}>
      {Array?.from({ length: cardCount })?.map((_, index) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
          <Card className='skeltonCard'>
            <Skeleton animation='wave' variant="rectangular" width="100%" height={250} className='muiskelton' />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardSkeleton;
