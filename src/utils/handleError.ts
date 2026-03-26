import type { AxiosError } from 'axios';
import axios from 'axios';

import { useDefaultModal } from '@/store/defaultModalStore';

const handleCustomErrors = (error: AxiosError<ApiErrorResponse>): string => {
  const errorMessage =
    error.response?.data?.error?.message || error.response?.data?.message;

  if (!errorMessage || typeof errorMessage !== 'string') {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (errorMessage.includes('Too many requests, please try again later.')) {
    return 'Muitas requisições, tente mais tarde.';
  }

  if (errorMessage.includes('Your new password must be different')) {
    return 'Sua nova senha deve ser diferente da senha atual.';
  }

  if (
    errorMessage.includes('Passwords do not match') ||
    errorMessage.includes('The provided current password')
  ) {
    return 'Senha atual inválida';
  }

  if (errorMessage.includes('Invalid identifier or password')) {
    return 'Dados inválidos';
  }

  return errorMessage;
};

const showErrorModal = (message: string): void => {
  useDefaultModal.getState().openModal({
    type: 'error',
    title: 'Erro',
    message,
    confirmText: 'Fechar',
  });
};

export const handleError = (
  err: AxiosError | string | Error | unknown,
): void => {
  if (axios.isAxiosError(err)) {
    return showErrorModal(handleCustomErrors(err));
  }

  if (err instanceof Error) {
    return showErrorModal(err.message);
  }

  if (typeof err === 'string') {
    return showErrorModal(err);
  }

  return showErrorModal('Houve um imprevisto, tente novamente mais tarde');
};

export const handleSuccess = (message: string): void => {
  useDefaultModal.getState().openModal({
    type: 'success',
    title: 'Sucesso!',
    message,
    confirmText: 'Fechar',
  });
};

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};
