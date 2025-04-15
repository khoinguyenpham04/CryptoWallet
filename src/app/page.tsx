'use client';

import {useEffect, useState} from 'react';
import {getCryptoBalances} from '@/services/crypto';
import {getCryptoRiskAssessment} from '@/services/crypto-risk-assessment';
import {CryptoBalance} from '@/services/crypto';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {QrCode, MoreVertical, ArrowUp, ArrowDown, Plus} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Progress} from '@/components/ui/progress';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

const WalletCard: React.FC<{
  name: string;
  balance: string;
  ethValue: string;
  color: string;
  icon: string;
}> = ({name, balance, ethValue, color, icon}) => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden" style={{backgroundColor: color}}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4">
        <CardTitle className="text-sm font-medium text-white">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0 text-white hover:bg-transparent">
              <span className="sr-only">Open dropdown menu</span>
              <MoreVertical className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
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
    <div className="flex items-center justify-between py-3">
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

export default function Home() {
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
      name: 'Anna',
      balance: '$15,22',
      ethValue: '15.22 ETH',
      color: '#6366F1',
      icon: 'path-to-icon-1',
    },
    {
      name: 'Shopping',
      balance: '$4,32',
      ethValue: '4.32 ETH',
      color: '#10B981',
      icon: 'path-to-icon-2',
    },
    {
      name: 'Social Wallet',
      balance: '$0,42',
      ethValue: '0.42 ETH',
      color: '#3B82F6',
      icon: 'path-to-icon-3',
    },
    {
      name: 'Holidays',
      balance: '$3,34',
      ethValue: '3.34 ETH',
      color: '#F59E0B',
      icon: 'path-to-icon-4',
    },
    {
      name: 'NFT Collection',
      balance: '$2,32',
      ethValue: '2.32 ETH',
      color: '#EF4444',
      icon: 'path-to-icon-5',
    },
  ];

  const watchingItems = [
    {
      name: 'Wallet',
      symbol: 'ETH',
      amount: '1.39',
      value: '$1,39',
      change: '+3.34%',
      changeType: 'up',
      icon: 'https://picsum.photos/64/64',
    },
    {
      name: 'Social Wallet',
      symbol: 'ETH',
      amount: '0.39',
      value: '$0,39',
      change: '-0.04%',
      changeType: 'down',
      icon: 'https://picsum.photos/64/64',
    },
    {
      name: 'Savings',
      symbol: 'ETH',
      amount: '10.22',
      value: '$10,22',
      change: '+1.32%',
      changeType: 'up',
      icon: 'https://picsum.photos/64/64',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 py-6 flex items-center justify-between">
        <div className="font-bold text-2xl">Wallets</div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
            {/* Replace with appropriate icon */}
            {/* You can replace with a bell icon or message icon */}
            <MoreVertical className="h-5 w-5"/>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/id/225/64/64" alt="User Avatar"/>
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4">
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Wallets</h2>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Plus className="h-5 w-5"/>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {walletCards.map((card, index) => (
              <WalletCard key={index} {...card} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Watching</h2>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <MoreVertical className="h-5 w-5"/>
            </Button>
          </div>
          <ScrollArea className="rounded-md border">
            {watchingItems.map((item, index) => (
              <CryptoItem key={index} {...item} />
            ))}
          </ScrollArea>
        </section>
      </main>
      <footer className="sticky bottom-0 bg-secondary p-4 border-t">
        <div className="flex justify-around">
          <Button variant="ghost">
            {/* Replace with appropriate icon */}
            <QrCode className="h-6 w-6"/>
          </Button>
          <Button variant="ghost">
            {/* Replace with appropriate icon */}
            <QrCode className="h-6 w-6"/>
          </Button>
          <Button variant="ghost">
            {/* Replace with appropriate icon */}
            <QrCode className="h-6 w-6"/>
          </Button>
        </div>
      </footer>
    </div>
  );
}
