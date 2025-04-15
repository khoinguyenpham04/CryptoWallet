'use server';
/**
 * @fileOverview A crypto risk assessment AI agent.
 *
 * - cryptoRiskAssessment - A function that handles the risk assessment process.
 * - CryptoRiskAssessmentInput - The input type for the cryptoRiskAssessment function.
 * - CryptoRiskAssessmentOutput - The return type for the cryptoRiskAssessment function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CryptoRiskAssessmentInputSchema = z.object({
  symbol: z.string().describe('The symbol of the cryptocurrency (e.g., BTC, ETH).'),
});
export type CryptoRiskAssessmentInput = z.infer<typeof CryptoRiskAssessmentInputSchema>;

const CryptoRiskAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('The risk score of the cryptocurrency, from 0 to 100.'),
  riskFactors: z.string().describe('The factors contributing to the risk score.'),
});
export type CryptoRiskAssessmentOutput = z.infer<typeof CryptoRiskAssessmentOutputSchema>;

export async function cryptoRiskAssessment(input: CryptoRiskAssessmentInput): Promise<CryptoRiskAssessmentOutput> {
  return cryptoRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cryptoRiskAssessmentPrompt',
  input: {
    schema: z.object({
      symbol: z.string().describe('The symbol of the cryptocurrency (e.g., BTC, ETH).'),
    }),
  },
  output: {
    schema: z.object({
      riskScore: z.number().describe('The risk score of the cryptocurrency, from 0 to 100.'),
      riskFactors: z.string().describe('The factors contributing to the risk score.'),
    }),
  },
  prompt: `You are an expert in cryptocurrency risk assessment.

You will assess the risk of the given cryptocurrency, and provide a risk score from 0 to 100, where 0 is the lowest risk and 100 is the highest risk.

You will also provide a list of factors that contribute to the risk score.

Cryptocurrency: {{{symbol}}}`,
});

const cryptoRiskAssessmentFlow = ai.defineFlow<
  typeof CryptoRiskAssessmentInputSchema,
  typeof CryptoRiskAssessmentOutputSchema
>(
  {
    name: 'cryptoRiskAssessmentFlow',
    inputSchema: CryptoRiskAssessmentInputSchema,
    outputSchema: CryptoRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
