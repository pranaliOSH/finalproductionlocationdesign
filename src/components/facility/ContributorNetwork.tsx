import React, { useState, useMemo } from "react";
import { Users, Building2, ExternalLink, Factory, GraduationCap, ClipboardCheck, Handshake, HelpCircle, List, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type ContributorType = "academic" | "auditor" | "brand" | "cso" | "supplier" | "msi" | "union" | "other";

interface ListUpload {
  listTitle: string;
  dateContributed: string;
}

interface Contributor {
  name: string;
  type: ContributorType;
  dataPoints: number;
  lastContributed: string;
  relationship?: string;
  listUploads?: ListUpload[];
}

interface ContributorNetworkProps {
  contributors: Contributor[];
  totalContributors: number;
  totalDataPoints: number;
  typeCounts?: Partial<Record<ContributorType, number>>;
}

const typeLabels: Record<ContributorType, string> = {
  academic: "Academic",
  auditor: "Auditor",
  brand: "Brand",
  cso: "Civil Society Organization",
  supplier: "Supplier",
  msi: "Multi-Stakeholder Initiative",
  union: "Union",
  other: "Other",
};

const typeColors: Record<ContributorType, string> = {
  academic: "bg-purple-50 text-purple-600",
  auditor: "bg-amber-50 text-amber-600",
  brand: "bg-blue-50 text-blue-600",
  cso: "bg-emerald-50 text-emerald-600",
  supplier: "bg-orange-50 text-orange-600",
  msi: "bg-teal-50 text-teal-600",
  union: "bg-rose-50 text-rose-600",
  other: "bg-slate-50 text-slate-600",
};

const typeIcons: Record<ContributorType, React.ReactNode> = {
  academic: <GraduationCap className="w-4 h-4" />,
  auditor: <ClipboardCheck className="w-4 h-4" />,
  brand: <Building2 className="w-4 h-4" />,
  cso: <Users className="w-4 h-4" />,
  supplier: <Factory className="w-4 h-4" />,
  msi: <Handshake className="w-4 h-4" />,
  union: <Users className="w-4 h-4" />,
  other: <HelpCircle className="w-4 h-4" />,
};

// Helper to parse date strings for sorting
const parseDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]] || 0;
    const day = parseInt(parts[1].replace(',', '')) || 1;
    const year = parseInt(parts[2]) || 2020;
    return new Date(year, month, day);
  }
  return new Date(dateStr);
};

export function ContributorNetwork({ contributors, totalContributors, totalDataPoints, typeCounts }: ContributorNetworkProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Get sorted type counts for display
  const sortedTypeCounts = typeCounts 
    ? Object.entries(typeCounts)
        .filter(([_, count]) => count && count > 0)
        .sort(([, a], [, b]) => (b || 0) - (a || 0))
        .map(([type, count]) => ({ type: type as ContributorType, count: count || 0 }))
    : [];

  // Separate contributors into list uploads and individual contributions
  const { listContributors, individualContributors } = useMemo(() => {
    const listContribs = contributors.filter(c => c.listUploads && c.listUploads.length > 0);
    const individualContribs = contributors.filter(c => !c.listUploads || c.listUploads.length === 0);
    
    // Sort list contributors by most recent list upload
    listContribs.sort((a, b) => {
      const aDate = a.listUploads?.[0]?.dateContributed || '';
      const bDate = b.listUploads?.[0]?.dateContributed || '';
      return parseDate(bDate).getTime() - parseDate(aDate).getTime();
    });
    
    // Sort individual contributors by last contributed date
    individualContribs.sort((a, b) => {
      return parseDate(b.lastContributed).getTime() - parseDate(a.lastContributed).getTime();
    });
    
    return { listContributors: listContribs, individualContributors: individualContribs };
  }, [contributors]);

  return (
    <>
      <div className="data-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="section-header flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
            <h3 className="section-title">
                Network
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="info-trigger text-[10px]">?</button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-xs">Placeholder for tooltip text.</p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <p className="text-sm text-muted-foreground">
                Organizations connected to this production location
              </p>
            </div>
          </div>
          
          {/* Crowdsourced badge inline with header */}
          <div className="flex items-center gap-2 ml-auto">
            <Users className="w-5 h-5 text-source-contributed" />
            <span className="text-base font-medium text-source-contributed">Crowdsourced</span>
            <InfoTooltip
              description="Network data is crowdsourced from multiple contributors including brands, auditors, and NGOs who share their supplier information."
              learnMoreHref="https://info.opensupplyhub.org/resources/an-open-data-model"
            />
          </div>
        </div>

        {/* Organization type summary */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {sortedTypeCounts.map(({ type, count }) => (
              <div 
                key={type} 
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeColors[type]}`}>
                  {React.cloneElement(typeIcons[type] as React.ReactElement, { className: "w-4 h-4" })}
                </div>
                <span className="text-lg font-semibold text-foreground">{count}</span>
                <span className="text-sm text-muted-foreground">{typeLabels[type]}{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsSheetOpen(true)}
            className="w-full py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium"
          >
            View all {totalContributors} Contributors who have uploaded data to this location
          </button>
        </div>
      </div>

      {/* Contributors Side Panel */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              All Contributors
            </SheetTitle>
            <SheetDescription>
              {totalContributors} organizations have contributed data to this production location
            </SheetDescription>
          </SheetHeader>

          {/* Type summary badges */}
          <div className="flex flex-wrap gap-2 py-4 border-b border-border">
            {sortedTypeCounts.map(({ type, count }) => (
              <div 
                key={type} 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary/30"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${typeColors[type]}`}>
                  {React.cloneElement(typeIcons[type] as React.ReactElement, { className: "w-3 h-3" })}
                </div>
                <span className="text-sm font-medium text-foreground">{count}</span>
                <span className="text-xs text-muted-foreground">{typeLabels[type]}{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>

          <div className="py-4 space-y-6">
            {/* Uploaded via Lists Section */}
            {listContributors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Uploaded via Lists ({listContributors.length})
                </h4>
                <div className="space-y-3">
                  {listContributors.map((contributor) => (
                    <div 
                      key={contributor.name} 
                      className="rounded-lg bg-secondary/50 hover:bg-secondary transition-colors overflow-hidden"
                    >
                      {/* Contributor header */}
                      <div className="flex items-center gap-3 p-4 pb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[contributor.type]}`}>
                          {typeIcons[contributor.type]}
                        </div>
                        <a 
                          href="#" 
                          className="font-medium text-primary hover:underline flex items-center gap-1"
                          onClick={(e) => e.preventDefault()}
                        >
                          {contributor.name}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      
                      {/* List uploads */}
                      {contributor.listUploads?.map((listUpload, idx) => (
                        <div key={idx} className="mx-4 mb-3 p-3 bg-background rounded-md border border-border/50">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <List className="w-3.5 h-3.5" />
                            <span>Uploaded via list</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {listUpload.listTitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Contributions Section */}
            {individualContributors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Individual Contributions ({individualContributors.length})
                </h4>
                <div className="space-y-3">
                  {individualContributors.map((contributor) => (
                    <div 
                      key={contributor.name} 
                      className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[contributor.type]}`}>
                          {typeIcons[contributor.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <a 
                            href="#" 
                            className="font-medium text-primary hover:underline flex items-center gap-1"
                            onClick={(e) => e.preventDefault()}
                          >
                            {contributor.name}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Last contributed: {contributor.lastContributed}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}