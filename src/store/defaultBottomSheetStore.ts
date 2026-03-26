import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';
import { ReactNode, RefObject } from 'react';
import { ViewProps } from 'react-native';
import { create } from 'zustand';

export type BottomSheetData = BottomSheetProps & {
  children: ReactNode;
  contentProps?: ViewProps;
};

type Store = {
  bottomSheet: BottomSheetData | null;
  ref: RefObject<BottomSheetModal | null> | null;

  openBottomSheet: (props: BottomSheetData) => void;
  closeBottomSheet: () => void;
  setRef: (ref: RefObject<BottomSheetModal | null>) => void;
};

export const useDefaultBottomSheet = create<Store>(set => ({
  bottomSheet: null,
  ref: null,

  openBottomSheet: props =>
    set({
      bottomSheet: props,
    }),

  closeBottomSheet: () =>
    set({
      bottomSheet: null,
    }),

  setRef: ref =>
    set({
      ref,
    }),
}));
