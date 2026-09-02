import { Text, View } from 'react-native';

import { colors } from '@/global/colors';
import { useDefaultModal } from '@/store/defaultModalStore';

import Icon from '../Icon';
import ModalBackdrop from '../ModalBackdrop';

import DefaultModalButton from './DefaultModalButton';

export type DefaultModalProps = {
  title: string;
  message?: string;
  confirmText: string;
  succesConfirmText?: string;
  onConfirm?: () => Promise<void> | void;
  cancelText?: string;
  onCancel?: () => Promise<void> | void;
  successMessage?: string;
  successTitle?: string;
  type: 'warning' | 'error' | 'success';
};

const DefaultModal = () => {
  const { modal, closeModal, openModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      await modal.onConfirm();
    }

    closeModal();

    if (modal.successMessage) {
      setTimeout(() => {
        openModal({
          type: 'success',
          title: modal.successTitle ?? 'Sucesso!',
          message: modal.successMessage,
          confirmText: modal.succesConfirmText ?? 'Fechar',
        });
      }, 100);
    }
  };

  const handleCancel = async () => {
    if (modal.onCancel) {
      await modal.onCancel();
    }
    closeModal();
  };

  const colorMap = {
    error: colors.alert.error[1],
    warning: colors.alert.warning[1],
    success: colors.alert.success[1],
  };

  const iconColorMap = {
    error: colors.alert.error[2],
    warning: colors.alert.warning[2],
    success: colors.alert.success[2],
  };

  const iconMap = {
    error: 'ErrorIcon',
    warning: 'WarningIcon',
    success: 'SuccessIcon',
  } as const;

  const iconColor = iconColorMap[modal.type] ?? colors.alert.success[1];
  const modalColor = colorMap[modal.type] ?? colors.alert.success[1];
  const modalIcon = iconMap[modal.type];

  return (
    <ModalBackdrop>
      <View
        key={modal.message}
        className="w-full gap-4 overflow-hidden rounded-lg bg-white p-6"
      >
        <View
          className="self-center rounded-full p-2"
          style={{ backgroundColor: iconColor }}
        >
          <Icon color={modalColor} name={modalIcon} size={24} />
        </View>

        <Text className="text-center font-poppins_semibold text-xl text-neutral-100">
          {modal.title}
        </Text>

        {modal.message && (
          <Text className="text-center font-poppins text-base text-neutral-60">
            {modal.message}
          </Text>
        )}

        <View className="flex-row items-center justify-center gap-4">
          {modal.cancelText && (
            <DefaultModalButton
              color={modalColor}
              text={modal.cancelText}
              type="cancel"
              onPress={handleCancel}
            />
          )}

          <DefaultModalButton
            color={modalColor}
            text={modal.confirmText}
            type="confirm"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </ModalBackdrop>
  );
};

export default DefaultModal;
