import axios from 'axios';
import {
  loginFail,
  loginStart,
  loginSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from '../redux/authSlice';

export const userLogin = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:4000/api/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export const userRegister = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post('http://localhost:4000/api/auth/register', user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (error) {
    dispatch(registerFail(error));
  }
};
