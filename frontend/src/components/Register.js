import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <main className="content">
      <section className="credentials">
        <form
          onSubmit={props.registerUser}
          className="form"
          name="registration"
        >
          <h2 className="form__title form__title_theme_dark">Регистрация</h2>

          <input
            onChange={props.onCredentialsChange}
            value={props.credentials.email}
            type="email"
            className="form__text-input form__text-input_theme_dark"
            name="email"
            placeholder="Email"
            id="email"
            required
          />
          <span className="form__input-error" id="email-error"></span>

          <input
            onChange={props.onCredentialsChange}
            value={props.credentials.password}
            type="password"
            className="form__text-input form__text-input_theme_dark"
            name="password"
            placeholder="Пароль"
            id="password"
            required
          />
          <span className="form__input-error" id="password-error"></span>

          <button
            className="form__btn-save form__btn-save_theme_light"
            name="saveButton"
          >
            Зарегистрироваться
          </button>

          <p className="form__suggestion">
            Уже зарегистрированы?{' '}
            <Link to="/sign-in" className="form__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
