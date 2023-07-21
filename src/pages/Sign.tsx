import React, { useCallback, useMemo, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { AuthRoutesEnum } from '@/types/routes.enum';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormTypes } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth.service';
import secureStorage from '@/utils/secureStorage';
import { SecureStorageEnum } from '@/types/secureStorage.enum';
import { useAppDispatch } from '@/hooks/redux.hook';
import { updateAuthState } from '@/store/slices/authSlice';
import { ApiError } from '@/types/axios';
import { Toast } from 'primereact/toast';

interface SignProps {
  type: 'login' | 'resgister';
}

const Sign = ({ type }: SignProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormTypes>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      check: false
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      toast.current?.show({
        severity: 'success',
        summary: 'Success'
      });
      secureStorage.setItem(SecureStorageEnum.accessToken, data.accessToken);
      secureStorage.setItem(SecureStorageEnum.refreshToken, data.refreshToken);
      dispatch(updateAuthState({ status: true, loading: false }));
    },
    onError: (err: ApiError) => {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: err.response?.data?.message
      });
    }
  });

  const onSubmit = useCallback(
    (data: LoginFormTypes) => {
      mutate({
        username: data.username,
        password: data.password
      });
    },
    [mutate]
  );

  const containerClass = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'
  );

  const subTitle = useMemo(() => {
    if (type === 'resgister')
      return (
        <a
          className='font-medium no-underline cursor-pointer'
          style={{ color: 'var(--primary-color)' }}
          onClick={() => navigate(AuthRoutesEnum.login)}
        >
          Sign in
        </a>
      );
    return (
      <span className='text-600 font-medium line-height-3'>
        {"Don't have an account?"}
        <a
          className='font-medium no-underline ml-2  cursor-pointer'
          style={{ color: 'var(--primary-color)' }}
          onClick={() => navigate(AuthRoutesEnum.resgister)}
        >
          Resgister now!
        </a>
      </span>
    );
  }, [navigate, type]);

  const getFormErrorMessage = useCallback(
    (name: keyof LoginFormTypes) => {
      return errors[name] ? (
        <p className='m-0 mb-5'>
          <small className='p-error'>{errors[name]?.message}</small>
        </p>
      ) : (
        <p className='m-0 mb-5'>
          <small className='p-error'>&nbsp;</small>
        </p>
      );
    },
    [errors]
  );

  return (
    <div className={containerClass}>
      <Toast ref={toast} />
      <div className='flex flex-column align-items-center justify-content-center'>
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div
            className='w-full surface-card py-8 px-5 sm:px-8'
            style={{ borderRadius: '53px' }}
          >
            <div className='text-center mb-5'>
              <div className='text-900 text-3xl font-medium mb-3'>Welcome</div>
              {subTitle}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='username'
                control={control}
                rules={{ required: 'Username is required.' }}
                render={({ field: { onChange, value, name } }) => {
                  return (
                    <>
                      <label
                        htmlFor={name}
                        className='block text-900 text-xl font-medium mb-2'
                      >
                        User Name
                      </label>
                      <InputText
                        id={name}
                        type='text'
                        value={value}
                        onChange={onChange}
                        placeholder='User name'
                        style={{ padding: '1rem' }}
                        className={classNames('w-full md:w-30rem ', {
                          'p-invalid': errors[name]
                        })}
                      />
                      {getFormErrorMessage(name)}
                    </>
                  );
                }}
              />

              <Controller
                name='password'
                control={control}
                rules={{ required: 'Password is required.' }}
                render={({ field: { onChange, value, name } }) => {
                  return (
                    <>
                      <label
                        htmlFor={name}
                        className='block text-900 font-medium text-xl mb-2'
                      >
                        Password
                      </label>
                      <Password
                        inputId={name}
                        value={value}
                        onChange={onChange}
                        placeholder='Password'
                        toggleMask
                        inputClassName='w-full p-3 md:w-30rem'
                        className={classNames('w-full md:w-30rem ', {
                          'p-invalid': errors[name]
                        })}
                      />
                      {getFormErrorMessage(name)}
                    </>
                  );
                }}
              />

              {type === 'resgister' ? (
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field: { onChange, value, name } }) => {
                    return (
                      <>
                        <label
                          htmlFor={name}
                          className='block text-900 font-medium text-xl mb-2'
                        >
                          Confirm password
                        </label>
                        <Password
                          inputId='confirm-password'
                          value={value}
                          onChange={onChange}
                          placeholder='Confirm password'
                          toggleMask
                          className={classNames('w-full md:w-30rem ', {
                            'p-invalid': errors[name]
                          })}
                          inputClassName='w-full p-3 md:w-30rem'
                        />
                        {getFormErrorMessage(name)}
                      </>
                    );
                  }}
                />
              ) : null}

              <div className='flex align-items-center justify-content-between mb-5 gap-5'>
                {type === 'login' ? (
                  <Controller
                    name='check'
                    control={control}
                    defaultValue={false}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name } }) => {
                      return (
                        <>
                          <div className='flex align-items-center'>
                            <Checkbox
                              inputId='rememberme1'
                              checked={value || false}
                              onChange={onChange}
                              className={classNames('mr-2 ', {
                                'p-invalid': errors[name]
                              })}
                            />
                            <label htmlFor='rememberme1'>Remember me</label>
                          </div>
                          <a
                            className='font-medium no-underline ml-2 text-right cursor-pointer'
                            style={{ color: 'var(--primary-color)' }}
                          >
                            Forgot password?
                          </a>
                        </>
                      );
                    }}
                  />
                ) : null}
              </div>
              <Button
                type='submit'
                label={type === 'login' ? 'Sign In' : 'Resgister'}
                className='w-full p-3 text-xl'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
