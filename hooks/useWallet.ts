import { useState, useCallback } from 'react';
import type { WalletInfo } from '../types/navbar';

export const useWallet = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      // Here we'll add actual Solana wallet connection logic
      const mockWalletInfo: WalletInfo = {
        address: '7xKX...9aB2',
        balance: { sol: 1.234, usdc: 100.5 },
        network: 'devnet',
        isConnected: true,
      };

      setWalletInfo(mockWalletInfo);
      return true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return false;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletInfo(null);
  }, []);

  return {
    walletInfo,
    connectWallet,
    disconnectWallet,
    isConnected: !!walletInfo?.isConnected,
  };
};
