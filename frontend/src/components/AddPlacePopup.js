import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangeLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddCard({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Новое место"
        name="card"
        btnTitle="Создать"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChangeName}
          value={placeName}
          type="text"
          className="form__text-input"
          name="name"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          id="name"
          required
        />
        <span className="form__input-error" id="name-error"></span>

        <input
          onChange={handleChangeLink}
          value={placeLink}
          type="url"
          className="form__text-input"
          name="link"
          placeholder="Ссылка на картинку"
          id="link"
          required
        />
        <span className="form__input-error" id="link-error"></span>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
