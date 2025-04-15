import {getCryptoBalances} from '@/services/crypto';
import CryptoBalanceCard from '@/components/CryptoBalanceCard';

export default async function Home() {
  const balances = await getCryptoBalances();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mt-6">
          Welcome to <span className="text-primary">CryptoKeep</span>
        </h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {balances.map((balance) => (
            <CryptoBalanceCard key={balance.symbol} balance={balance} />
          ))}
        </div>
      </main>
    </div>
  );
}
