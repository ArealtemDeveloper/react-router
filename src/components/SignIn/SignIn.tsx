import { useCallback, useRef, useState } from 'react';
import { ILoginForm } from '../../types/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { INITIAL_ROUTES } from '../../constants';

import VInput from '../VInput/VInput';

import styles from './SignIn.module.css';

interface IErrors {
  [key: string]: string
};

const initialState = { email: '', name: '', password: ''};

function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const pathFrom = location.state?.from || INITIAL_ROUTES.main;

  const [inputs, setInputs] = useState<ILoginForm>(initialState);
  const [errors, setErrors] = useState<IErrors>(initialState);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;

    setInputs(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const onLogin = () => {
    auth?.signIn(inputs.name, () => {
        navigate(pathFrom, { replace: true });
    })
  }

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    if(!event?.target.value) {
      setErrors(prevState => ({
        ...prevState,
        [event?.target.name]: 'Обязательное поле',
      }))
    }
  },[])

  const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setErrors(prevState => ({
      ...prevState,
      [event?.target.name]: '',
    }))
  },[])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    onLogin();
    setInputs(initialState);

    formRef.current?.reset();
  }

  const handleReset = () => {
    setInputs(initialState);
  }

  return (
    <div className={styles.container}>
        <h1>SignIn</h1>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onReset={handleReset}
        >
          <VInput
            label='E-mail'
            name='email'
            type="email"
            placeholder='E-mail' 
            required={true}
            errors={errors}
            size='md'
            radius='sm'
            handleBlur={onBlur}
            handleFocus={onFocus}
          />

          <VInput
            label='Имя'
            name='name'
            type="text"
            placeholder='Введите имя'
            required={true}
            errors={errors}
            size='md'
            radius='sm'
            handleBlur={onBlur}
            handleFocus={onFocus}
          />

          <VInput
            label='Пароль'
            name='password'
            type="password" 
            placeholder='Пароль'
            size='md'
            radius='sm'
            required={true}
            errors={errors}
            handleBlur={onBlur}
            handleFocus={onFocus}
          />
          <button 
            className={styles.btn}
            type='submit'
            disabled={!inputs.email || !inputs.password}
          >
              Войти
          </button>
        </form>
    </div>
  )
}

export default SignIn