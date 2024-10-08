import React, { useEffect, useRef } from 'react';
import { PropsWithChildren } from 'react';
import { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { GestureResponderEvent } from 'react-native';

import { Touchable } from '@/components/Touchable';

import { PopupMenuProps } from './MenuOverlay';
import { useMenu } from './MenuProvider';

type OwnProps = {
  menuYOffset?: number;
  menuXOffset?: number;
  menuWidth?: number;
  onShow?: () => void;
  disabled?: boolean;
  refreshKey?: unknown; 
  testID?: string;
};

export function Menu<T>({
  children,
  menuYOffset = 8,
  menuXOffset = 0,
  menuWidth,
  onShow,
  disabled,
  refreshKey,
  testID,
  ...props
}: PropsWithChildren & PopupMenuProps<T> & OwnProps) {
  const menu = useMenu();
  const layout = useRef<LayoutRectangle>();

  const showMenu = ({ nativeEvent }: GestureResponderEvent) => {
    if (!layout.current) {
      return;
    }
    onShow?.();
    menu.show({
      ...props,
      origin: {
        
        y: nativeEvent.pageY + layout.current.height - nativeEvent.locationY + menuYOffset,
        x: nativeEvent.pageX,
        offsetX: menuXOffset,
        
        elementHeight: layout.current.height + menuYOffset * 2,
      },
      menuWidth,
    });
  };

  useEffect(() => {
    if (!menu.isShown) {
      return;
    }
    menu.update(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const onLayout = (e: LayoutChangeEvent) => {
    layout.current = e.nativeEvent.layout;
  };

  return (
    <Touchable onLayout={onLayout} onPress={showMenu} disabled={disabled} testID={testID}>
      <View pointerEvents="box-only">{children}</View>
    </Touchable>
  );
}
