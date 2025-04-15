/**
 * Represents a cryptocurrency balance.
 */
export interface CryptoBalance {
  /**
   * The symbol of the cryptocurrency (e.g., BTC, ETH).
   */
  symbol: string;
  /**
   * The amount of the cryptocurrency held in the wallet.
   */
  amount: number;
}

/**
 * Represents a cryptocurrency transaction.
 */
export interface CryptoTransaction {
  /**
   * The transaction ID.
   */
  id: string;
  /**
   * The symbol of the cryptocurrency (e.g., BTC, ETH).
   */
  symbol: string;
  /**
   * The transaction amount.
   */
  amount: number;
  /**
   * The transaction date.
   */
  date: string;
  /**
   * The transaction type (e.g., 'send', 'receive').
   */
  type: string;
}

/**
 * Asynchronously retrieves the balances for all supported cryptocurrencies.
 *
 * @returns A promise that resolves to an array of CryptoBalance objects.
 */
export async function getCryptoBalances(): Promise<CryptoBalance[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      symbol: 'BTC',
      amount: 1.5,
    },
    {
      symbol: 'ETH',
      amount: 10,
    },
  ];
}

/**
 * Asynchronously retrieves the transaction history for a given cryptocurrency.
 *
 * @param symbol The symbol of the cryptocurrency (e.g., BTC, ETH).
 * @returns A promise that resolves to an array of CryptoTransaction objects.
 */
export async function getCryptoTransactions(symbol: string): Promise<CryptoTransaction[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      symbol: symbol,
      amount: 0.5,
      date: '2024-01-01',
      type: 'send',
    },
    {
      id: '2',
      symbol: symbol,
      amount: 1.0,
      date: '2024-01-05',
      type: 'receive',
    },
  ];
}
