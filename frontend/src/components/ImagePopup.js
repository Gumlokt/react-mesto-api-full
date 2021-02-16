function ImagePopup(props) {
  return (
    <div className={`popup${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container popup__container_theme_dark">
        <button onClick={props.onClose} className="popup__btn-close" type="button" aria-label="Закрыть окно"></button>

        <figure className="popup__image-container">
          <img src={props.card.link} alt="Фото красивого места на весь экран" className="popup__image" />

          <figcaption className="popup__image-title">{props.card.name}</figcaption>
        </figure>

      </div>
    </div>
  );
}

export default ImagePopup;
