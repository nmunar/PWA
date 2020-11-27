  
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 150,
    color: "#fff",
  },
  message: {
    fontSize: 60,
    color: "#fff",
  },
});

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (navigator.onLine) {
      const URL =
      "https://gateway.marvel.com:443/v1/public/characters?ts=hola&apikey=a42c8297666b16bae364e805689e5b32&hash=66b5651a112baf70ba37bc5ff0d30204";
    fetch(URL)
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((res) => {
        setCharacters(res.data.results);
        localStorage.setItem("characters", res.data.results);
      });

    } else {
        if (localStorage.getItem("characters") === null) {
          setMessage("Error conectanto con API");
        } else {
          setCharacters(localStorage.getItem("characters"));
        }
    }
  }, []);

  return (
    <Container fixed>
      <Typography
        align="center"
        variant="h1"
        component="h1"
        className={classes.title}
      >
        Marvel's Characters
      </Typography>
      <Typography
        align="center"
        variant="h3"
        component="h3"
        className={classes.message}
      >
        {message}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        {characters.map((c) => (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Marvel Character"
                  height="140"
                  image={c.thumbnail.path + "." + c.thumbnail.extension}
                  title="Marvel Character"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {c.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {c.description === "" ? "No description" : c.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Characters;