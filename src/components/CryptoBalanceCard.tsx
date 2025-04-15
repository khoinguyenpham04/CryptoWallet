"use client";

import {getCryptoRiskAssessment} from '@/services/crypto-risk-assessment';
import {CryptoBalance} from '@/services/crypto';
import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
  Bitcoin,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import {Badge} from "@/components/ui/badge";

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
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
        <div className="flex items-center space-x-2">
          <Bitcoin className="h-5 w-5 text-yellow-500"/>
          <CardTitle className="text-lg font-semibold tracking-tight">{balance.symbol}</CardTitle>
        </div>
        <Button variant="outline" size="icon">
          <QrCode className="h-4 w-4"/>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Amount</p>
          <p className="text-2xl font-bold">{balance.amount}</p>
        </div>
        {riskAssessment && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-semibold flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4 text-yellow-500"/>
              <span>Risk Assessment</span>
            </h4>
            <div className="rounded-md border p-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Risk Score:</p>
                <Badge variant="secondary">{riskAssessment.riskScore}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold">Risk Factors:</span> {riskAssessment.riskFactors}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoBalanceCard;
