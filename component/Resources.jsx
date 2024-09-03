import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";

const Resources = () => {
  return (
    <Container sx={{ my: 6, mb: 30 }} id="Resources" display="flex">
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600, textAlign: "center", mb: 5 }}
        gutterBottom
      >
        Explore Resources
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rate Professors
              </Typography>
              <Typography variant="body1">
                Share your experiences and rate professors based on teaching
                style, difficulty, and helpfulness.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="#rate-professors" passHref>
                <Button size="small" variant="contained" color="primary">
                  Rate Now
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Find Reviews
              </Typography>
              <Typography variant="body1">
                Search for reviews of professors from your school or others, and
                make informed decisions about your classes.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="#find-reviews" passHref>
                <Button size="small" variant="contained" color="secondary">
                  Search Reviews
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Resources
              </Typography>
              <Typography variant="body1">
                Access tools, articles, and advice to help you navigate your
                academic journey more effectively.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="#student-resources" passHref>
                <Button size="small" variant="contained" color="success">
                  Explore Resources
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Resources;
