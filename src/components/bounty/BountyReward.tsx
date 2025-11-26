interface BountyRewardProps {
  amount: number;
  token: string;
  usdValue: number;
}

export function BountyReward({ amount, token, usdValue }: BountyRewardProps) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
      <div className="flex flex-col">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Reward</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-900">{amount}</span>
          <span className="text-sm font-bold text-slate-500">{token}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="block text-xs text-slate-400 font-medium">~${usdValue}</span>
      </div>
    </div>
  );
}
