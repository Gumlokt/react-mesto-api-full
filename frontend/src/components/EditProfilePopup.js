import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        btnTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          className="form__text-input"
          name="name"
          placeholder="Имя деятеля"
          minLength="2"
          maxLength="40"
          id="name"
          required
        />
        <span className="form__input-error" id="name-error"></span>

        <input
          onChange={handleChangeDescription}
          value={description}
          type="text"
          className="form__text-input"
          name="about"
          placeholder="Деятельность"
          minLength="2"
          maxLength="200"
          id="about"
          required
        />
        <span className="form__input-error" id="about-error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
