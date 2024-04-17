import { Transaction } from '@/api/types';
import { BTCTransaction } from '@/onChain/wallets/bitcoin';

import { formatAddress } from './formatAddress';

export const getHeaderNameFromParsedTransaction = (parsedTransaction: Transaction | BTCTransaction | undefined): string => {
  const target = parsedTransaction?.metadata?.target;

  return parsedTransaction?.protocolInfo?.projectId || (target && formatAddress(target)) || '';
};
