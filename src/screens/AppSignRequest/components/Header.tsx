import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconWithCoinIcon } from '@/components/IconWithCoinIcon';
import { Label } from '@/components/Label';
import { WalletType } from '@/onChain/wallets/registry';

import loc from '/loc';
import { removeWWWSubdomain } from '/modules/text-utils';

type Props = {
  coinType?: WalletType;
  heading: string | string[];
  subheading?: string | string[];
  icon: string;
  name: string;
  url: string;
};

export function getMessageHeading(typedMessage?: string) {
  return typedMessage ? loc.formatString(loc.appSignRequest.typedMessageSigningRequest, { type: typedMessage }) : loc.appSignRequest.messageSigningRequest;
}

export const Header = ({ url, coinType, icon, name, heading, subheading }: Props) => {
  return (
    <View style={styles.header}>
      <IconWithCoinIcon coinSize={20} coinType={coinType} iconUri={icon} maskPositionXYNudge={24} maskShape="rounded-square" size={64} />
      <Label style={styles.headerName} type="boldTitle1" numberOfLines={1}>
        {name}
      </Label>
      <Label type="regularCaption1" color="light75" style={styles.url} numberOfLines={1}>
        {removeWWWSubdomain(url)}
      </Label>
      <Label type="boldDisplay4" numberOfLines={1}>
        {heading}
      </Label>
      {subheading && (
        <Label type="regularBody" color="light75" style={styles.subheading}>
          {subheading}
        </Label>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 8,
    textAlign: 'center',
  },
  headerName: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
  },
  url: {
    marginBottom: 12,
  },
  subheading: {
    paddingHorizontal: 40,
    textAlign: 'center',
  },
});
