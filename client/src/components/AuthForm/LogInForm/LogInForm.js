import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { isEmail } from 'validator';
import AuthHeader from 'components/AuthForm/AuthHeader/AuthHeader';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import AuthSwitch from 'components/AuthForm/AuthSwitch/AuthSwitch';
import { login } from 'actions/auth/authActions';
import { setFormAlert } from 'actions/alerts/alertActions';
import styles from './LogInForm.module.scss';

const LogInForm = () => {
  const [logInForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [hasAccount] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    auth: { isAuthenticated, loading },
    alert: { message, alertLocation }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const history = useHistory();

  const checkDisabled = () => Object.values(logInForm).some(
    value => !value || logInForm.password.length < 6
  );

  const handleChange = e => {
    setLoginForm({ ...logInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEmail(logInForm.email)) {
      dispatch(setFormAlert('Enter a valid email address.', 'Error', 'Forms'));
    } else if (logInForm.password.length < 6) {
      dispatch(setFormAlert('Enter a password at least 6 characters long.', 'Error', 'Forms'));
    } else {
      setIsLoading(true);
      dispatch(login(logInForm));
      dispatch(setFormAlert('', null, ''));
    }
  };

  if (isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }

  window.addEventListener('load', () => history.push('/accounts/welcomepage'));

  const inputType = showPass ? 'text' : 'password';
  const showPassBtn = showPass ? 'Hide' : 'Show';

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authDiv}>
        <AuthHeader hasAccount={hasAccount} />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <InputField
            placeHolderText="Email"
            name="email"
            onChange={handleChange}
            classInput={
              logInForm.email ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              logInForm.email ? styles.activeInputSpan : styles.defaultInputSpan
            }
          />
          <InputField
            placeHolderText="Password"
            type={inputType}
            name="password"
            onChange={handleChange}
            withButton
            onClick={() => {
              setShowPass(!showPass);
            }}
            btnText={showPassBtn}
            classInput={
              logInForm.password ? styles.activeInput : styles.defaultInput
            }
            classSpan={
              logInForm.password
                ? styles.activeInputSpan
                : styles.defaultInputSpan
            }
            logInForm
          />
          <Button
            type="submit"
            disabled={checkDisabled()}
            btnRole="primary btnBlock"
            isLoading={!loading ? false : isLoading}
          >
            Log In
          </Button>
          {message && alertLocation === 'Forms' && <Alert alert={message} />}
        </form>
      </div>
      <AuthSwitch
        hasAccountText={"Don't have an account?"}
        linkText="Sign up"
      />
    </div>
  );
};

export default LogInForm;
