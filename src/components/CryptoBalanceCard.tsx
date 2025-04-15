"use client";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {balance.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        Amount: {balance.amount}
        {riskAssessment && (
          <>
            <p>Risk Score: {riskAssessment.riskScore}</p>
            <p>Risk Factors: {riskAssessment.riskFactors}</p>
          </>
        )}
        <Button>
          <QrCode/>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CryptoBalanceCard;

