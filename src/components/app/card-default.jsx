import PropTypes from 'prop-types';
import { Card, CardContent, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';

export const CardDefault = (props) => {
  const { title, subtitle, style, gridLeft, gridRight, children } = props;
  return (
    <Stack
      spacing={4}
      {...props}
      style={style}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={3}
              {...gridLeft}
            >
              <Typography variant="h6">{title}</Typography>
              <br />
              <Typography
                sx={{ whiteSpace: 'pre-wrap' }}
                variant="bodytext2"
              >
                {subtitle}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={9}
              {...gridRight}
            >
              <Stack spacing={3}>{children}</Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

CardDefault.propTypes = {
  children: PropTypes.any,
  gridLeft: PropTypes.any,
  gridRight: PropTypes.any,
  style: PropTypes.any,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
