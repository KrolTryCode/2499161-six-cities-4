import ScrollTop from './../utils/scroll-top';
import {Link, NavLink} from 'react-router-dom';
import {memo, useState} from 'react';
import {AuthorizationStatus, Place} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateFavorite} from '../../api/api-action.ts';
import { FavoritesStatus } from '../../const/const.tsx';
import {updateFavoritesCounter} from '../../store/action.ts';
import { rareCard } from '../../const/const.tsx';

function Card(place: Place): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.user.authorizationStatus);
  const favoritesCounter = useAppSelector((state) => state.favorites.favoritesCounter);
  const [, setActiveOfferId] = useState('');
  const [isFavourite, setIsFavourite] = useState(place.isFavorite);
  const dispatch = useAppDispatch();
  function handleMouseOver() {
    if (place.onListItemHover) {
      place.onListItemHover(place.id);
    }
    setActiveOfferId(place.id);
  }
  function handleIsFavorite() {
    if (isFavourite) {
      dispatch(updateFavorite({
        id: place.id,
        status: FavoritesStatus.DELETE
      }));
      setIsFavourite(false);
      dispatch(updateFavoritesCounter(favoritesCounter - 1));
    } else {
      dispatch(updateFavorite({
        id: place.id,
        status: FavoritesStatus.ADD
      }));
      setIsFavourite(true);
      dispatch(updateFavoritesCounter(favoritesCounter + 1));
    }
  }
  const authorized = (isAuthorized === AuthorizationStatus.Auth) && (
    <button
      className={isFavourite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
      type="button" onClick={handleIsFavorite}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavourite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );

  return (
    <article className="cities__card place-card" onMouseOver={handleMouseOver}>
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${place.id}`}>
          <img
            className="place-card__image"
            src={place.image}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {authorized}
        </div>
        {rareCard(place.rating)}
        <h2 className="place-card__name">
          <ScrollTop />
          <NavLink to={`/offer/${place.id}`} data-testid="place--title__test">{place.roomName}</NavLink>
        </h2>
        <p className="place-card__type">{place.roomType}</p>
      </div>
    </article>
  );
}

export const CardMemo = memo(Card, (prev, next) => prev.id === next.id);
