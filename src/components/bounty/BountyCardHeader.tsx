interface BountyCardHeaderProps {
  title: string;
  issuerAddress: string;
}

export function BountyCardHeader({ title, issuerAddress }: BountyCardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Issuer Row */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500" />
        <span>{issuerAddress.slice(0, 6)}...{issuerAddress.slice(-4)}</span>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
    </div>
  );
}
