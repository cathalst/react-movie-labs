import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";



const CreditsList = ({ movieId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["credits", { id: movieId }],
    queryFn: getMovieCredits,
    enabled: !!movieId,
  });

  if (isLoading) return <Typography>Loading credits...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Top Cast
      </Typography>
      <Grid container spacing={2}>
        {data.cast.slice(0, 6).map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {person.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  as {person.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Key Crew
        </Typography>
        <Grid container spacing={2}>
          {data.crew.slice(0, 4).map((person) => (
            <Grid item xs={12} sm={6} md={4} key={person.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {person.job}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CreditsList;