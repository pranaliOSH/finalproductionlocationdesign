import { Plus, Copy, ShieldX, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsCardProps {
  isClaimed: boolean;
}

export function ActionsCard({ isClaimed }: ActionsCardProps) {
  return (
    <div className="rounded-lg border border-border p-3 space-y-2">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground">Contribute to this profile</h3>
        <p className="text-sm text-muted-foreground">Help improve supply chain transparency</p>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <Button size="sm" variant="ghost" className="gap-2 h-9 justify-start text-base">
          <Plus className="w-4 h-4" />
          Suggest Correction
        </Button>
        <Button size="sm" variant="ghost" className="gap-2 h-9 justify-start text-base">
          <Copy className="w-4 h-4" />
          Report Duplicate
        </Button>
        <Button size="sm" variant="ghost" className="gap-2 h-9 justify-start text-base">
          <ShieldX className="w-4 h-4" />
          Dispute Claim
        </Button>
        <Button size="sm" variant="ghost" className="gap-2 h-9 justify-start text-base">
          <XCircle className="w-4 h-4" />
          Report Closure
        </Button>
      </div>
    </div>
  );
}
