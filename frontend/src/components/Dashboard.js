import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import { api } from '../utils/api';

function Dashboard(props) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then((values) => {
        //попадаем сюда когда массив промисов будут выполнены
        const [userData, initialCards] = values;

        props.handleUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        //попадаем сюда если хотя бы один из промисов завершится ошибкой
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setAvatar(newAvatar)
      .then((updatedAvatar) => {
        props.handleUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(newUserData) {
    api
      .setUserInfo(newUserData)
      .then((updatedUserData) => {
        props.handleUser(updatedUserData);
        closeAllPopups();
        // Все закрытия попапов и так изначально находились внутри конструкци: .then((data)=> { ... closeAllPopups(); })
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData)
      .then((addedCard) => {
        setCards([addedCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === props.currentUser._id);
    // console.log(card.likes);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then((newCard) => {
        if (newCard) {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.filter((c) => c._id !== card._id);
          // Обновляем стейт
          setCards(newCards);
        } else {
          props.openInformerPopup('Карточка не удалена');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        userEmail={props.userEmail}
        onLogout={props.onLogout}
      />

      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        btnTitle="Да"
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        message={props.message}
        successIcon={props.successIcon}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
    </>
  );
}

export default Dashboard;
