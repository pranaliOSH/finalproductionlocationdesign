 import { Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";

interface QuickStatsProps {
  verifiedPercent: number;
  sourceCount: number;
  lastUpdated: string;
  confidenceLevel?: number; // 1-5 scale
  isClaimed?: boolean;
  contributorCount?: number;
}

function ConfidenceDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`w-2 h-2 rounded-full ${
            dot <= level ? "bg-verified" : "bg-confidence-low"
          }`}
        />
      ))}
    </div>
  );
}

export function QuickStats({ 
  verifiedPercent,
  sourceCount,
  lastUpdated,
  confidenceLevel = 4,
  isClaimed = true,
  contributorCount = 12,
}: QuickStatsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getConfidenceLabel = (level: number) => {
    if (level >= 4) return "High Confidence";
    if (level >= 2) return "Medium Confidence";
    return "Low Confidence";
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 hover:bg-muted rounded-md px-2 py-1 transition-colors"
      >
        <div className="flex items-center gap-2 text-base">
          <span className="font-medium">Confidence Score:</span>
          <span className="font-medium text-verified">{getConfidenceLabel(confidenceLevel).replace("Confidence", "").trim()}</span>
        </div>
        <ConfidenceDots level={confidenceLevel} />
        <Info className="w-4 h-4 text-muted-foreground" />
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Data Confidence Score
              <ConfidenceDots level={confidenceLevel} />
            </SheetTitle>
            <SheetDescription>
              How we calculate the confidence level for this facility profile
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Current Score: {getConfidenceLabel(confidenceLevel)}</h4>
              <p className="text-sm text-muted-foreground">
                The confidence score reflects how reliable and complete the facility data is, based on multiple factors.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Score Factors</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${isClaimed ? "bg-verified" : "bg-confidence-low"}`} />
                  <div>
                    <p className="font-medium text-sm">Profile Claimed</p>
                    <p className="text-sm text-muted-foreground">
                      {isClaimed 
                        ? "This profile has been claimed and verified by the facility owner or manager." 
                        : "This profile has not been claimed by the facility."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${contributorCount >= 5 ? "bg-verified" : contributorCount >= 2 ? "bg-confidence-medium" : "bg-confidence-low"}`} />
                  <div>
                    <p className="font-medium text-sm">Data Contributors</p>
                    <p className="text-sm text-muted-foreground">
                      {contributorCount} contributor{contributorCount !== 1 ? "s" : ""} have provided data for this facility. More contributors increase confidence through cross-verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${sourceCount >= 3 ? "bg-verified" : sourceCount >= 1 ? "bg-confidence-medium" : "bg-confidence-low"}`} />
                  <div>
                    <p className="font-medium text-sm">Data Sources</p>
                    <p className="text-sm text-muted-foreground">
                      {sourceCount} data source{sourceCount !== 1 ? "s" : ""} contribute to this profile, including claimed data, crowdsourced contributions, and partner integrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-3 h-3 rounded-full mt-1 bg-verified" />
                  <div>
                    <p className="font-medium text-sm">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      Profile was last updated on {lastUpdated}. Recent updates indicate actively maintained data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Confidence scores help you assess data reliability. High confidence indicates well-verified, multi-source data. Lower scores may indicate newer or less-verified profiles.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
