import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button
            onClick={props.onEditAvatar}
            className="profile__btn-edit-avatar"
          >
            <img
              src={currentUser.avatar}
              alt="Аватарка (фото) владельца профиля"
              className="profile__avatar"
            />
          </button>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              onClick={props.onEditProfile}
              className="profile__btn-edit"
              type="button"
              aria-label="Открыть окно редактирования профиля"
            ></button>

            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>

        <button
          onClick={props.onAddPlace}
          className="profile__btn-add"
          type="button"
          aria-label="Открыть окно добавления новой карточки"
        ></button>
      </section>

      <section className="gallery">
        <ul className="elements">
          {props.cards &&
            props.cards.map((item) => (
              <Card
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={item._id}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
