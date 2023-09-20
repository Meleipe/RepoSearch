import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { FavouritesContext } from 'context/favouritesContext';
import styles from './RepositoryCard.module.scss';

type RepositoryCardPropTypes = {
  id: string;
  name: string;
  description?: string | null;
  elementIsFavourite: boolean;
};

const RepositoryCard = ({
  id,
  name,
  description,
  elementIsFavourite
}: RepositoryCardPropTypes) => {
  const { addToFavourites, removeFromFavourites } =
    React.useContext(FavouritesContext);

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader} title={name} />
      <CardContent className={styles.cardContent}>
        {description || '(no description)'}
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          fullWidth
          onClick={() => {
            !elementIsFavourite
              ? addToFavourites({
                  id: id,
                  name: name,
                  description: description
                })
              : removeFromFavourites(id);
          }}
        >
          {elementIsFavourite ? (
            <StarRoundedIcon sx={{ color: '#fcba03' }} />
          ) : (
            <StarRoundedIcon />
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RepositoryCard;
