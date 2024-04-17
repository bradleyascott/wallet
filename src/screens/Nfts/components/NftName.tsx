import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Label, TypographyKey } from '@/components/Label';
import { RealmNft } from '@/realm/nfts';

type Props = {
  nft: RealmNft;
  type?: TypographyKey;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const NftName: React.FC<Props> = ({ nft, type = 'boldDisplay4', containerStyle, testID }) => {
  return (
    <View style={containerStyle} testID={testID}>
      <Label type={type} style={styles.flex}>
        {nft.metadata.name || nft.metadata.collectionName + ' #' + nft.metadata.tokenId}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
  },
});
