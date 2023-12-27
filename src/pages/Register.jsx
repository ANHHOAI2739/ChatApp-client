import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { userLogin, userRegister } from '../utils/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginFail, registerStart } from '../redux/authSlice';

const { Text } = Typography;

const Register = () => {
  const error = useSelector((state) => state.auth.register.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    try {
      dispatch(registerStart());
      await userRegister(newUser, dispatch, navigate);
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };

  return (
    <section className='bg-gray-50 min-h-screen flex items-center justify-center'>
      {/* login container */}
      <div className='bg-gray-100 flex flex-row-reverse rounded-2xl shadow-2xl max-w-3xl p-2 items-center'>
        {/* form */}
        <div className='md:w-1/2 px-8 md:px-16'>
          <h2 className='font-bold text-2xl text-[#002D74]'>Register</h2>
          <p className='text-xs mt-4 text-[#002D74] '>
            If you are already a member, easily log in
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='relative mt-4'>
              <input
                {...register('username', {
                  required: 'Username is required',
                })}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.email ? 'border-red-500' : ''
                }`}
                type='text'
                id='floating_outlined_email'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined_email'
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
              >
                Username
              </label>
            </div>

            {errors.username && (
              <span className='text-sm text-red-500 '>
                {errors.username.message}
              </span>
            )}

            <div className='relative'>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.email ? 'border-red-500' : ''
                }`}
                type='text'
                id='floating_outlined_email'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined_email'
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
              >
                Email
              </label>
            </div>

            {errors.email && (
              <span className='text-sm text-red-500 '>
                {errors.email.message}
              </span>
            )}

            <div className='relative'>
              <input
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.password ? 'border-red-500' : ''
                }`}
                type='password'
                id='floating_outlined_password'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined_password'
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
              >
                Password
              </label>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                fill='gray'
                className='bi bi-eye absolute top-1/2 right-3 -translate-y-1/2'
                viewBox='0 0 16 16'
              >
                <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
              </svg>
            </div>

            {errors.password && (
              <span className='text-sm text-red-500 '>
                {errors.password.message}
              </span>
            )}

            {error && <p className='text-sm text-red-500'>{error}</p>}
            <button className='bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300'>
              Register
            </button>
          </form>

          <div className='mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]'></div>
          <div className='mt-3 text-xs flex justify-between items-center text-[#002D74]'>
            <p>Already have an account?</p>
            <Link to='/login'>
              <button className='py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300'>
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* image */}
        <div className='md:block hidden w-1/2'>
          <img
            className='rounded-2xl'
            src='https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
