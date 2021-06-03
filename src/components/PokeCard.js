import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDescription } from "../controllers/SearchPokemon";
import "./PokeCard.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 335,
    height: 630,
    border: "15px solid #f6c332;",
    backgroundColor: "#fde36a;",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PokeCard = ({ index, pokemon, deletePokecb, shiftPokemonLeftcb, shiftPokemonRightcb }) => {
  const classes = useStyles();
  const { isLoading, data } = useDescription(pokemon.pokeDescriptionURL);
  const description = data;

  return (
    <Card className={classes.root}>
      <CardContent style={{ paddingBottom: 0 }}>
        <PokemonName pokeName={pokemon.pokeName} />
        <PokemonImage pokeImg={pokemon.pokeImg} pokeName={pokemon.pokeName} />
        <PokemonDescription description={description} isLoading={isLoading} />
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <ButtonGroup
          index={index}
          deletePokecb={deletePokecb}
          shiftPokemonLeftcb={shiftPokemonLeftcb}
          shiftPokemonRightcb={shiftPokemonRightcb}
        />
      </CardActions>
    </Card>
  );
};

const PokemonName = ({ pokeName }) => {
  return (
    <Typography variant="h5" component="h2">
      {pokeName}
    </Typography>
  );
};

const PokemonImage = ({ pokeImg, pokeName }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ textAlign: "center", paddingTop: 10 }}>
      {!loaded ? <Skeleton animation="wave" variant="rect" width={300} height={300} /> : null}
      <img
        className={loaded ? "PokeCardImg" : "DisplayNone"}
        src={pokeImg}
        alt={pokeName}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const PokemonDescription = ({ description, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="60%" />
        </div>
      ) : (
        <Typography style={{ height: 200 }} variant="body2" component="p">
          {description}
        </Typography>
      )}
    </>
  );
};

const ButtonGroup = ({ index, deletePokecb, shiftPokemonLeftcb, shiftPokemonRightcb }) => {
  return (
    <>
      <IconButton
        onClick={() => {
          shiftPokemonLeftcb(index);
        }}
        color="primary"
        aria-label="left move card"
        component="span"
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          deletePokecb(index);
        }}
        color="primary"
        aria-label="delete card"
        component="span"
      >
        <DeleteOutlineIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          shiftPokemonRightcb(index);
        }}
        color="primary"
        aria-label="right move card"
        component="span"
      >
        <ArrowForwardIcon />
      </IconButton>
    </>
  );
};

export default PokeCard;
