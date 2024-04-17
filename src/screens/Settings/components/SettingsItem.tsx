import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { GradientItemBackground } from '@/components/GradientItemBackground';
import { Label } from '@/components/Label';
import { IconName, SvgIcon } from '@/components/SvgIcon';
import { Touchable } from '@/components/Touchable';

import { SettingsIcon } from '../components';

interface SettingsItemProps {
  title: string;
  label?: string;
  icon?: IconName;
  onPress: () => void;
  testID?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isHighlighted?: boolean;
  children?: React.ReactNode;
  isWarningAction?: boolean;
}

export const SettingsItem = ({ icon, title, label, onPress, testID, isLast, isFirst, isHighlighted, children, isWarningAction }: SettingsItemProps) => {
  const borderTopRadius = isFirst ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 } : {};
  const borderBottomRadius = isLast ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 } : {};

  const borderRadiusStyle: StyleProp<ViewStyle> = [borderTopRadius, borderBottomRadius];

  return (
    <Touchable style={[styles.container, borderRadiusStyle]} onPress={onPress} testID={testID}>
      {isHighlighted && <GradientItemBackground />}
      {icon ? <SettingsIcon name={icon} isWarningIcon={isWarningAction} /> : <View style={styles.spaceElement} />}
      <View style={styles.values}>
        <Label type="boldTitle2" color={isWarningAction ? 'red400' : undefined}>
          {title}
        </Label>
        {!!label && (
          <Label style={styles.label} type="regularCaption1" color="light75">
            {label}
          </Label>
        )}
      </View>
      <View style={styles.rightElement}>
        {children}
        <SvgIcon name="chevron-right" style={styles.chevron} color={!isWarningAction ? 'light75' : 'red400'} />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    padding: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  values: {
    justifyContent: 'center',
    flexGrow: 1,
    flex: 1,
  },
  label: {
    marginTop: 2,
  },
  spaceElement: {
    marginRight: 12,
  },
  rightElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 'auto',
    position: 'relative',
    alignItems: 'center',
  },
});
