import ForgotPassword from 'components/Modal/Containers/ForgotPassword';
import Login from 'components/Modal/Containers/Login';
import SignUp from 'components/Modal/Containers/SignUp';
import { FC } from 'react';
import { ModalType } from 'types/Modal';

export const MODALS: Record<ModalType, FC> = {
  login: Login,
  signup: SignUp,
  'forgot-password': ForgotPassword,
};

export const HASH_MODAL_TYPES = ['login', 'signup', 'forgot-password'];
