export interface NavItem {
  href: string;
  title: string;
  isButton?: boolean;
}

export interface WalletInfo {
  address: string;
  balance: {
    sol: number;
    usdc: number;
  };
  network: 'devnet' | 'mainnet';
  isConnected: boolean;
}