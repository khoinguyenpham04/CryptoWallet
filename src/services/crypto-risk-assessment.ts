import {cryptoRiskAssessment, CryptoRiskAssessmentOutput} from '@/ai/flows/crypto-risk-assessment';

/**
 * Asynchronously retrieves the risk assessment for a given cryptocurrency.
 *
 * @param symbol The symbol of the cryptocurrency (e.g., BTC, ETH).
 * @returns A promise that resolves to a CryptoRiskAssessmentOutput object.
 */
export async function getCryptoRiskAssessment(symbol: string): Promise<CryptoRiskAssessmentOutput> {
  // TODO: Implement this by calling an API.
  // return {
  //   riskScore: 50,
  //   riskFactors: 'Market volatility, regulatory uncertainty',
  // };

  return await cryptoRiskAssessment({symbol: symbol});
}
