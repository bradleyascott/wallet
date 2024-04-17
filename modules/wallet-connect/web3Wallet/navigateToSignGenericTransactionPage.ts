import { CommonActions } from '@react-navigation/native';

import { FeeOption } from '@/api/types';
import { PreparedTransaction, RealmishWallet } from '@/onChain/wallets/base';
import { WalletConnectSignRequest_GenericTransactionParams } from '@/screens/AppSignRequest/WalletConnectSignRequest_GenericTransactionScreen';
import { Warning } from '@/types';
import { hapticFeedback } from '@/utils/hapticFeedback';

import { DefinitionList } from '../types';

export function navigateToSignGenericTransactionPage(
  dispatch: (action: ReturnType<typeof CommonActions.navigate>) => void,
  wallet: RealmishWallet,
  metadata: {
    imageUrl: string;
    name: string;
    url: string;
  },
  content: DefinitionList,
  detailsContent: DefinitionList,
  preparedTransaction: PreparedTransaction,
  hideFeeSelector = false,
  warning?: Warning,
): Promise<{ approveSignRequest: boolean; fee: FeeOption | null }> {
  return new Promise(resolve => {
    const params: WalletConnectSignRequest_GenericTransactionParams = {
      walletId: wallet.id,
      metadata,
      preparedTransaction,
      hideFeeSelector,
      content,
      detailsContent,
      onApprove: (fee: FeeOption | null) => resolve({ approveSignRequest: true, fee }),
      onReject: () => resolve({ approveSignRequest: false, fee: null }),
      warning,
    };
    hapticFeedback.impactHeavy();
    dispatch(
      CommonActions.navigate({
        name: 'WalletConnectSignRequest_GenericTransaction',
        params,
      }),
    );
  });
}
