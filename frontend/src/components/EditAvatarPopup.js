import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatarLink, setAvatarLink] = React.useState('');

  function handleChangeAvatar(e) {
    setAvatarLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  return (
    <>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        btnTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChangeAvatar}
          value={avatarLink}
          type="url"
          className="form__text-input"
          name="avatar"
          placeholder="Ссылка на аватарку"
          id="avatar"
          required
        />
        <span className="form__input-error" id="avatar-error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
