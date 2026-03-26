import { Text } from 'react-native';

import { useDisableDelay } from '@/hooks/common';

import ButtonActivityIndicator from '../../Button/ButtonActivityIndicator';
import Pressable from '../../Pressable';

type Props = {
  text: string;
  onPress: () => Promise<void> | void;
  type?: 'confirm' | 'cancel';
  color?: string;
};

const DefaultModalButton = ({ text, onPress, type, color }: Props) => {
  const { executeWithDelay, isLoading } = useDisableDelay();

  const handlePress = async () => {
    await executeWithDelay(onPress);
  };

  const backgroundColor = type === 'confirm' ? color : 'transparent';
  const textColor = type === 'cancel' ? color : '#FFFFFF';

  return (
    <Pressable
      className="h-10 flex-1 items-center justify-center rounded-lg border py-2"
      style={{
        borderColor: color,
        backgroundColor,
      }}
      onPress={handlePress}
    >
      <Text
        className="font-poppins_bold text-base"
        style={{ color: textColor }}
      >
        {text}
      </Text>

      {isLoading && <ButtonActivityIndicator />}
    </Pressable>
  );
};

export default DefaultModalButton;
