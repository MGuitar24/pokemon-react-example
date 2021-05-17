import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";
import { useDescription } from "../controller/SearchPokemon";

const useStyles = makeStyles({
  root: {
    minWidth: 335,
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
  const { data } = useDescription(pokemon.pokeDescriptionURL);
  const description = data;

  return (
    <Card className={classes.root}>
      <CardContent>
        <img style={{ width: 300, height: 300 }} src={pokemon.pokeImg} alt={pokemon.pokeName} />
        <Typography variant="h5" component="h2">
          {pokemon.pokeName}
        </Typography>
        <Typography style={{ height: 200 }} variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
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
      </CardActions>
    </Card>
  );
};

export default PokeCard;
