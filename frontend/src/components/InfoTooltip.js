import iconSuccess from '../images/icons/icon-success.svg';
import iconFail from '../images/icons/icon-fail.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__btn-close"
          type="button"
          aria-label="Закрыть окно"
        ></button>

        <img
          src={props.successIcon ? iconSuccess : iconFail}
          alt="Success icon"
          className="popup__icon"
        />

        <p className="popup__message">{props.message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
