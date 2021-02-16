import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <div className="element__item">
        <img
          onClick={handleClick}
          src={props.card.link}
          alt="Фото красивого места"
          className="element__image"
        />

        {isOwn ? (
          <button
            onClick={handleDeleteClick}
            className="element__btn-remove"
            type="button"
            aria-label="Удалить карточку"
          ></button>
        ) : (
          ''
        )}
      </div>

      <div className="element__item">
        <div className="element__body">
          <h2 className="element__title">{props.card.name}</h2>

          <div className="element__like-zone">
            <button
              onClick={handleLikeClick}
              className={`element__btn-like${
                isLiked ? ' element__btn-like_clicked' : ''
              }`}
              type="button"
              aria-label="Поставить либо убрать лайк"
            ></button>
            <p className="element__likes">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
