import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Typography from "@material-ui/core/Typography";

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

const PokeCard = ({ index, pokemon, deletePokeCallback }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <img style={{ width: 300, height: 300 }} src={pokemon.pokeImg} alt={pokemon.pokeName} />
        <Typography variant="h5" component="h2">
          {pokemon.pokeName}
        </Typography>
        <Typography style={{ height: 200 }} variant="body2" component="p">
          {pokemon.pokeDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            deletePokeCallback(index);
          }}
          color="primary"
          aria-label="delete card"
          component="span"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PokeCard;
