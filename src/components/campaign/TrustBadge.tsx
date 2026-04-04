import { Badge } from "@/components/ui/badge";

interface TrustBadgeProps {
  score: number;
  aiVerified: boolean;
}

export function TrustBadge({ score, aiVerified }: TrustBadgeProps) {
  let colorClass = "bg-red-500 hover:bg-red-600";
  let label = "Low Trust";

  if (score >= 80) {
    colorClass = "bg-green-500 hover:bg-green-600";
    label = "High Trust";
  } else if (score >= 50) {
    colorClass = "bg-yellow-500 hover:bg-yellow-600";
    label = "Medium Trust";
  }


  return (
    <div className="flex items-center gap-2">
      <Badge className={`${colorClass} text-white`}>
        {label} ({score}/100)
      </Badge>
      {aiVerified && (
        <Badge variant="outline" className="border-green-500 text-green-600">
          AI Verified
        </Badge>
      )}
    </div>
  );
}
