import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  Button,
  InputLabel,
  FormControl,
  Popover,
  Typography
} from '@mui/material';
import { FavouritesContext } from 'context/favouritesContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { POSSIBLE_RATE_VALUES } from 'constants/rating';
import styles from './RepositoryCard.module.scss';
import { usePopover } from 'hooks/usePopover';

type RepositoryCardPropTypes = {
  id: string;
  name: string;
  description: string;
  rate: number;
};

const RepositoryCard = ({
  id,
  name,
  description,
  rate
}: RepositoryCardPropTypes) => {
  const { rateFavourite, removeFromFavourites } =
    React.useContext(FavouritesContext);

  const {
    id: popoverId,
    anchorEl,
    open,
    handleClick,
    handleClose
  } = usePopover();

  return (
    <Card className={styles.card}>
      <CardHeader title={name} />
      <CardContent>{description}</CardContent>
      <CardActions>
        <FormControl>
          <InputLabel id="rate-label">Rate</InputLabel>
          <Select
            labelId="rate-label"
            value={rate}
            variant="outlined"
            label="Rate"
            onChange={(evt) => rateFavourite(id, evt.target.value)}
          >
            {POSSIBLE_RATE_VALUES.map((rate) => (
              <MenuItem key={`${id}${rate}`} value={rate}>
                {rate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          size="small"
          color="primary"
          aria-describedby={popoverId}
          onClick={handleClick}
        >
          <HighlightOffIcon sx={{ color: '#ef0c0c' }} />
        </Button>
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
        >
          <Button
            size="small"
            color="primary"
            aria-describedby={id}
            onClick={() => {
              removeFromFavourites(id);
            }}
          >
            <Typography m="10px">Remove from Favourites</Typography>
          </Button>
        </Popover>
      </CardActions>
    </Card>
  );
};

export default RepositoryCard;
