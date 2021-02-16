function Login(props) {
  return (
    <main className="content">
      <section className="credentials">
        <form onSubmit={props.loginUser} className="form" name="login">
          <h2 className="form__title form__title_theme_dark">Вход</h2>

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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
