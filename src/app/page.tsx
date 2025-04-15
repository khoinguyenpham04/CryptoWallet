'use client';

import {useEffect, useState} from 'react';
import {getCryptoBalances} from '@/services/crypto';
import {getCryptoRiskAssessment} from '@/services/crypto-risk-assessment';
import {CryptoBalance} from '@/services/crypto';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
  ArrowUp,
  ArrowDown,
  Plus,
  PiggyBank,
  CreditCard,
  Activity,
  Shield,
  TrendingUp,
  Coins,
  QrCode,
} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {ScrollArea} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import CryptoBalanceCard from '@/components/CryptoBalanceCard';
import {Banknote, Home, LayoutDashboard, ListChecks, Settings, User, Wallet2} from "lucide-react";

const WalletCard: React.FC<{
  name: string;
  balance: string;
  ethValue: string;
  color: string;
  icon: React.FC;
}> = ({name, balance, ethValue, color, icon: Icon}) => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4" style={{backgroundColor: color}}>
        <CardTitle className="text-sm font-medium text-white">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0 text-white hover:bg-transparent">
              <span className="sr-only">Open dropdown menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12A.75.75 0 0 1 3.75 11.25h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12ZM3 17.25A.75.75 0 0 1 3.75 16.5h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 17.25Z" clipRule="evenodd" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4" style={{backgroundColor: color}}>
        <div className="text-2xl font-bold text-white">{balance}</div>
        <div className="text-sm text-white">{ethValue}</div>
      </CardContent>
    </Card>
  );
};

const CryptoItem: React.FC<{
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
}> = ({name, symbol, amount, value, change, changeType, icon}) => {
  return (
    <div className="flex items-center justify-between py-3 px-3 rounded-md hover:bg-secondary">
      <div className="flex items-center space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={icon} alt={name}/>
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">
            {amount} {symbol}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{value}</div>
        <div className={`text-sm ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'up' && <ArrowUp className="inline-block h-4 w-4 mr-1"/>}
          {changeType === 'down' && <ArrowDown className="inline-block h-4 w-4 mr-1"/>}
          {change}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [balances, setBalances] = useState<CryptoBalance[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<{[key: string]: {riskScore: number; riskFactors: string}}>({});

  useEffect(() => {
    const fetchBalances = async () => {
      const fetchedBalances = await getCryptoBalances();
      setBalances(fetchedBalances);
    };

    fetchBalances();
  }, []);

  useEffect(() => {
    const fetchRiskAssessments = async () => {
      const assessments: {[key: string]: {riskScore: number; riskFactors: string}} = {};
      for (const balance of balances) {
        const assessment = await getCryptoRiskAssessment(balance.symbol);
        assessments[balance.symbol] = assessment;
      }
      setRiskAssessments(assessments);
    };

    if (balances.length > 0) {
      fetchRiskAssessments();
    }
  }, [balances]);

  const walletCards = [
    {
      name: 'Personal',
      balance: '$15,22',
      ethValue: '15.22 ETH',
      color: '#6366F1',
      icon: CreditCard,
    },
    {
      name: 'Savings',
      balance: '$4,32',
      ethValue: '4.32 ETH',
      color: '#10B981',
      icon: PiggyBank,
    },
    {
      name: 'Investment',
      balance: '$0,42',
      ethValue: '0.42 ETH',
      color: '#3B82F6',
      icon: TrendingUp,
    },
    {
      name: 'Trading',
      balance: '$3,34',
      ethValue: '3.34 ETH',
      color: '#F59E0B',
      icon: Activity,
    },
    {
      name: 'Security',
      balance: '$2,32',
      ethValue: '2.32 ETH',
      color: '#EF4444',
      icon: Shield,
    },
  ];

  const watchingItems = [
    {
      name: 'DeFi Wallet',
      symbol: 'ETH',
      amount: '1.39',
      value: '$1,39',
      change: '+3.34%',
      changeType: 'up',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      name: 'NFT Collection',
      symbol: 'ETH',
      amount: '0.39',
      value: '$0,39',
      change: '-0.04%',
      changeType: 'down',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      name: 'Savings Account',
      symbol: 'ETH',
      amount: '10.22',
      value: '$10,22',
      change: '+1.32%',
      changeType: 'up',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background px-8 md:px-16">
      <header className="py-10 flex items-center justify-between">
        <div className="font-extrabold text-6xl tracking-tighter">Wallets</div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1.5c-4.036 0-7.5 1.969-7.5 4.5V21h15v-1.5c0-2.531-3.464-4.5-7.5-4.5Z" />
            </svg>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/id/225/64/64" alt="User Avatar"/>
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold tracking-tighter">Your Wallets</h2>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Plus className="h-5 w-5"/>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {walletCards.map((card, index) => (
              <WalletCard key={index} {...card} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold tracking-tighter">Watching</h2>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1.5c-4.036 0-7.5 1.969-7.5 4.5V21h15v-1.5c0-2.531-3.464-4.5-7.5-4.5Z" />
              </svg>
            </Button>
          </div>
          <ScrollArea className="rounded-md border">
            <div className="p-4">
              {watchingItems.map((item, index) => (
                <CryptoItem key={index} {...item} />
              ))}
            </div>
          </ScrollArea>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold tracking-tighter mb-5">Balances</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {balances.map(balance => (
              <CryptoBalanceCard key={balance.symbol} balance={balance}/>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
