function PopupWithForm(props) {
  return (
    <div className={`popup${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__btn-close"
          type="button"
          aria-label="Закрыть окно"
        ></button>

        <form onSubmit={props.onSubmit} className="form" name={props.name}>
          <h2 className="form__title">{props.title}</h2>

          {props.children}

          <button className="form__btn-save" name="saveButton">
            {props.btnTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
