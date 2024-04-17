import { throttle } from 'lodash';
import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { SupportedFeedbackType, hapticFeedback } from '@/utils/hapticFeedback';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type AnimatedProps = Pick<Animated.AnimateProps<TouchableOpacityProps>, 'style' | 'layout' | 'entering' | 'exiting'>;

export type TouchableProps = TouchableOpacityProps &
  AnimatedProps & {
    hapticFeedbackOnPress?: SupportedFeedbackType | 'none';
    hapticFeedbackOnLongPress?: SupportedFeedbackType | 'none';
  };

export const Touchable = ({ hapticFeedbackOnPress = 'impactLight', hapticFeedbackOnLongPress = 'impactHeavy', ...props }: TouchableProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePressWithFeedback = useCallback(
    throttle(
      (e: GestureResponderEvent) => {
        if (hapticFeedbackOnPress !== 'none') {
          hapticFeedback[hapticFeedbackOnPress]();
        }
        props.onPress?.(e);
      },
      200,
      { trailing: false },
    ),
    [props.onPress, hapticFeedbackOnPress],
  );
  const handleLongPressWithFeedback = (e: GestureResponderEvent) => {
    if (hapticFeedbackOnLongPress !== 'none') {
      hapticFeedback[hapticFeedbackOnLongPress]();
    }
    props.onLongPress?.(e);
  };

  return <AnimatedTouchableOpacity activeOpacity={0.8} {...props} onPress={handlePressWithFeedback} onLongPress={handleLongPressWithFeedback} />;
};
