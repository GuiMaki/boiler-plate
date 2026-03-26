import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useDefaultModal } from '@/store/defaultModalStore';

type UseConfirmBackProps = {
  isDirty?: boolean;
  title?: string;
  message?: string;
  onBack?: () => void;
};

export const useConfirmBack = ({
  isDirty = false,
  title = 'Descartar?',
  message = 'Tem certeza que deseja voltar e descartar as alterações feitas?',
  onBack,
}: UseConfirmBackProps = {}) => {
  const router = useRouter();
  const { openModal, closeModal } = useDefaultModal();

  const handleBack = useCallback(() => {
    if (!isDirty) {
      router.back();
      return;
    }

    openModal({
      type: 'error',
      title,
      message,
      confirmText: 'Voltar',
      cancelText: 'Fechar',
      onConfirm: () => {
        if (onBack) {
          return onBack();
        }

        router.back();
      },
      onCancel: () => {
        closeModal();
      },
    });
  }, [isDirty, openModal, closeModal, title, message, router]);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack();
      return true;
    });

    return () => listener.remove();
  }, [handleBack]);

  return { handleBack };
};
