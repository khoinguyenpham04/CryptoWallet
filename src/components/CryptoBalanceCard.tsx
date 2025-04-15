'use client';

import {getCryptoRiskAssessment} from '@/services/crypto-risk-assessment';
import {CryptoBalance} from '@/services/crypto';
import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {QrCode} from 'lucide-react';

interface CryptoBalanceCardProps {
  balance: CryptoBalance;
}

const CryptoBalanceCard: React.FC<CryptoBalanceCardProps> = ({balance}) => {
  const [riskAssessment, setRiskAssessment] = useState<{riskScore: number; riskFactors: string} | null>(null);

  useEffect(() => {
    const fetchRiskAssessment = async () => {
      const assessment = await getCryptoRiskAssessment(balance.symbol);
      setRiskAssessment(assessment);
    };

    fetchRiskAssessment();
  }, [balance.symbol]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{balance.symbol}</CardTitle>
        <CardDescription>
          Amount: {balance.amount}
          {riskAssessment && (
            <>
              <br />
              Risk Score: {riskAssessment.riskScore}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Button variant="outline">
          <QrCode className="mr-2 h-4 w-4"/>
          Receive
        </Button>
      </CardContent>
    </Card>
  );
};

export default CryptoBalanceCard;
