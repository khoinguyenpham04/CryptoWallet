'use client';

import {useEffect, useState} from 'react';
import {getCryptoTransactions} from '@/services/crypto';
import {CryptoTransaction} from '@/services/crypto';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Send, Receipt} from 'lucide-react';
import {ArrowDown, ArrowUp} from "lucide-react";
import {Badge} from "@/components/ui/badge";

interface TransactionHistoryProps {
  symbol: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({symbol}) => {
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const fetchedTransactions = await getCryptoTransactions(symbol);
      setTransactions(fetchedTransactions);
    };

    fetchTransactions();
  }, [symbol]);

  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex items-center space-x-3 p-4 pb-2">
        <CardTitle className="text-2xl font-extrabold tracking-tight flex items-center space-x-2">
          {symbol === 'BTC' ? (
            <>
              <ArrowDown className="h-5 w-5 text-yellow-500"/>
              <span>Transaction History (BTC)</span>
            </>
          ) : (
            <>
              <ArrowUp className="h-5 w-5 text-blue-500"/>
              <span>Transaction History (ETH)</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 p-4">
        <ScrollArea className="rounded-md border">
          <div className="p-2">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-2">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full p-2">
                    {transaction.type === 'send' ? (
                      <Send className="h-6 w-6 text-red-500"/>
                    ) : (
                      <Receipt className="h-6 w-6 text-green-500"/>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.type === 'send' ? 'Sent' : 'Received'} {transaction.amount} {symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default function TransactionsPage() {
  const symbols = ['BTC', 'ETH']; // Example symbols, replace with dynamic data if needed

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {symbols.map(symbol => (
          <TransactionHistory key={symbol} symbol={symbol}/>
        ))}
      </div>
    </div>
  );
}


