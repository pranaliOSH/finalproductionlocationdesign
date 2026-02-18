import { useState } from "react";
import { Copy, CheckCircle2, Handshake, Users, Fingerprint, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Switch } from "@/components/ui/switch";

interface FacilityHeaderProps {
  osId: string;
  isClaimed: boolean;
  claimedBy?: string;
  claimedDate?: string;
  address: string;
  country: string;
  sourceCount?: number;
  lastUpdated?: string;
  confidenceLevel?: number;
}
function ConfidenceDots({
  level
}: {
  level: number;
}) {
  return <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(dot => <div key={dot} className={`w-2 h-2 rounded-full ${dot <= level ? "bg-verified" : "bg-confidence-low"}`} />)}
    </div>;
}
export function FacilityHeader({
  osId,
  isClaimed,
  claimedBy,
  claimedDate,
  address,
  country,
  sourceCount = 0,
  lastUpdated = "",
  confidenceLevel = 4
}: FacilityHeaderProps) {
  const [isDataSourcesOpen, setIsDataSourcesOpen] = useState(false);

  const copyOsId = () => {
    navigator.clipboard.writeText(osId);
    toast.success("OS ID copied to clipboard");
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };
  const getConfidenceLabel = (level: number) => {
    if (level >= 4) return "High Confidence";
    if (level >= 2) return "Medium Confidence";
    return "Low Confidence";
  };
  return <div className="space-y-4">
      {/* OS ID Card with Quick Stats */}
      
      {/* OS ID Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Fingerprint className="w-7 h-7 text-primary flex-shrink-0" />
             <span className="text-xl font-bold text-foreground">OS ID:</span>
             <span className="font-mono text-2xl font-bold text-foreground">{osId}</span>
            <InfoTooltip
              description="The OS ID is a free, unique identifier automatically assigned to each production location in OS Hub. Use it to track this location across systems, share it with partners, or reference it in compliance documentation."
              learnMoreHref="https://info.opensupplyhub.org/resources/os-id"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={copyOsId} className="gap-2 text-xs">
              <Copy className="w-3.5 h-3.5" />
              Copy OS ID
            </Button>
            <Button variant="outline" size="sm" onClick={copyLink} className="gap-2 text-xs">
              <Link2 className="w-3.5 h-3.5" />
              Copy Link
            </Button>
          </div>
        </div>
      </div>


      {/* Understanding Data Sources */}
      <div className="bg-card rounded-lg border border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg text-foreground">Understanding Data Sources</h3>
            <InfoTooltip
              description="Open Supply Hub is collaboratively mapping global supply chains. This model means that data comes into the platform in a few ways."
              learnMoreHref="https://info.opensupplyhub.org/resources/an-open-data-model"
            />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDataSourcesOpen(!isDataSourcesOpen)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {isDataSourcesOpen ? "Close" : "Open"}
            </button>
            <Switch 
              checked={isDataSourcesOpen} 
              onCheckedChange={setIsDataSourcesOpen}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-source-claimed flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-source-claimed">Claimed</p>
              <p className={`text-sm text-muted-foreground overflow-hidden transition-all duration-200 ${isDataSourcesOpen ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                Data confirmed by production location owner or manager
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-source-contributed flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-source-contributed">Crowdsourced</p>
              <p className={`text-sm text-muted-foreground overflow-hidden transition-all duration-200 ${isDataSourcesOpen ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                Data from community contributors and OS Hub research team
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Handshake className="w-5 h-5 text-source-partner flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-source-partner">Partner Data</p>
              <p className={`text-sm text-muted-foreground overflow-hidden transition-all duration-200 ${isDataSourcesOpen ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                Data from integration partners and third-party platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}