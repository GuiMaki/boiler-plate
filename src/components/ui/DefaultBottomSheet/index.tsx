/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';

import { colors } from '@/global/colors';
import { useDefaultBottomSheet } from '@/store/defaultBottomSheetStore';

const DefaultBottomSheet = () => {
  const { bottomSheet, closeBottomSheet, setRef } = useDefaultBottomSheet();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setRef(bottomSheetRef);
  }, [setRef]);

  useEffect(() => {
    if (bottomSheet) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [bottomSheet]);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidHide', () => {
      bottomSheetRef.current?.expand();
    });

    return () => subscription.remove();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={closeBottomSheet}
      />
    ),
    [closeBottomSheet],
  );

  const { children, contentProps, snapPoints, ...modalProps } =
    bottomSheet || {};

  const hasCustomPadding =
    contentProps?.style &&
    ('padding' in (contentProps.style as any) ||
      'paddingTop' in (contentProps.style as any) ||
      'paddingBottom' in (contentProps.style as any));

  const hasSnapPoints = !!snapPoints;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      enableDynamicSizing={!hasSnapPoints}
      handleIndicatorStyle={{
        backgroundColor: colors.neutral[20],
        width: 100,
      }}
      snapPoints={snapPoints}
      onDismiss={closeBottomSheet}
      {...modalProps}
    >
      {hasSnapPoints ? (
        children
      ) : (
        <BottomSheetView
          {...contentProps}
          style={[
            !hasCustomPadding && {
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 32,
            },
            contentProps?.style,
          ]}
        >
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

export default DefaultBottomSheet;
