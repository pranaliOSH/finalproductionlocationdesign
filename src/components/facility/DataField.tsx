import { HelpCircle, Clock, User, Users, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { DataContributorsDrawer } from "@/components/facility/DataContributorsDrawer";

// Generate contributors dynamically based on count
const contributorTypes = ["Brand", "Auditor", "Civil Society Organization", "Supplier", "Multi-Stakeholder Initiative", "Union", "Other"];
const contributorNames = [
  "Marks & Spencer", "Sainsbury's", "JD Williams", "SLCP", "International Accord Foundation",
  "OS Hub Research Team", "Worldly", "amfori", "H&M Group", "Inditex", "Target Corporation",
  "Walmart", "Gap Inc.", "Primark", "C&A", "Bestseller", "PVH Corp", "VF Corporation",
  "Levi Strauss & Co.", "Adidas", "Nike", "Puma", "ALDI", "Lidl", "Tchibo", "Otto Group",
  "Zalando", "ASOS", "Next plc", "Tesco", "Kmart Australia", "Woolworths Group",
  "Cotton On", "Big W", "Myer", "David Jones", "Country Road", "Seed Heritage",
  "Kathmandu", "Macpac", "Rip Curl", "Billabong", "Quiksilver", "Patagonia",
  "The North Face", "Columbia Sportswear", "Under Armour", "New Balance", "ASICS",
  "Decathlon", "Intersport", "Sports Direct", "JD Sports", "Foot Locker",
  "Bureau Veritas", "SGS", "Intertek", "TÜV Rheinland", "WRAP", "BSCI",
  "Fair Trade USA", "Rainforest Alliance", "GOTS", "OEKO-TEX", "Better Cotton",
  "Textile Exchange", "Clean Clothes Campaign", "Worker Rights Consortium",
  "Fair Labor Association", "Social Accountability International", "Sedex",
  "EcoVadis", "CDP", "Science Based Targets", "RE100", "Climate Action 100+",
  "Fashion Revolution", "Remake", "Good On You", "Baptist World Aid",
  "Ethical Trading Initiative", "Fair Wear Foundation", "Accord on Fire and Building Safety",
  "Alliance for Bangladesh Worker Safety", "ILO Better Work", "ELEVATE",
  "Impactt", "Verité", "BSR", "Shift Project", "Business & Human Rights Resource Centre",
  "Know The Chain", "Corporate Human Rights Benchmark", "Fashion Transparency Index",
  "Open Apparel Registry", "Sourcemap", "TrusTrace", "TextileGenesis", "FibreTrace",
  "Aware", "Lenzing", "Birla Cellulose", "Eastman", "Infinited Fiber Company",
  "Renewcell", "Evrnu", "Worn Again Technologies", "Circ", "Ambercycle",
  "Carbios", "Protein Evolution", "Spiber", "Bolt Threads", "Modern Meadow"
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Mock value variations for different field types
const valueVariations: Record<string, string[]> = {
  "Address": [
    "Pagar, Tongi, Gazipur, Dhaka 1710, Bangladesh",
    "Pagar, Tongi, Gazipur Dhaka Gazipur 1710 Dhaka - Bangladesh",
    "Tongi Industrial Area, Gazipur, Dhaka, Bangladesh",
    "Plot 12, Pagar Road, Tongi, Gazipur-1710",
    "Pagar Union, Tongi Upazila, Gazipur District, Bangladesh",
  ],
  "Coordinates": [
    "23.896051, 90.418952",
    "23.8961, 90.4190",
    "23.896, 90.419",
    "23.89605, 90.41895",
  ],
  "Sector": [
    "General Merchandise",
    "Apparel",
    "Textiles",
    "Home Textiles",
    "Fabric Manufacturing",
  ],
  "Parent Company": [
    "Noman Group",
    "Noman Group Bangladesh",
    "The Noman Group",
  ],
  "Processing Type": [
    "Final Product Assembly",
    "Cut Make Trim (CMT)",
    "Full Package",
    "Manufacturing",
  ],
  "Number of Workers": [
    "8,281",
    "8,300",
    "8,250",
    "8,000+",
    "~8,300",
  ],
};

function generateContributors(count: number, fieldLabel: string, baseValue: string | null) {
  const contributors = [];
  const variations = valueVariations[fieldLabel] || [baseValue || "Data submitted"];
  
  for (let i = 0; i < count; i++) {
    const name = contributorNames[i % contributorNames.length];
    const type = contributorTypes[Math.floor(Math.random() * contributorTypes.length)];
    const monthIndex = Math.floor(Math.random() * 12);
    const month = months[monthIndex];
    const year = Math.random() > 0.3 ? "2025" : "2024";
    const sortValue = (year === "2025" ? 2025 : 2024) * 12 + monthIndex;
    const contributedValue = variations[i % variations.length];
    contributors.push({ name, type, contributedAt: `${month} ${year}`, sortValue, value: contributedValue });
  }
  contributors.sort((a, b) => b.sortValue - a.sortValue);
  return contributors;
}

interface DataFieldProps {
  label: string;
  value: string | React.ReactNode;
  explanation?: string;
  contributor?: string;
  contributedAt?: string;
  moreEntries?: number;
  confidenceLevel?: "high" | "medium" | "low";
  hideSourceBadge?: boolean;
  tableRow?: boolean;
  twoLineProvenance?: boolean;
  labelWidth?: string;
}

export function DataField({ 
  label, 
  value, 
  explanation, 
  contributor, 
  contributedAt, 
  moreEntries,
  confidenceLevel = "medium",
  hideSourceBadge = false,
  tableRow = false,
  twoLineProvenance = false,
  labelWidth
}: DataFieldProps) {
  const displayValue = typeof value === 'string' ? value : null;
  const additionalContributors = moreEntries ? generateContributors(moreEntries, label, displayValue) : [];
  const isClaimed = contributor === "Noman Group" || contributor === "Facility Owner" || contributor === "Zaber and Zubair Fabrics Ltd";

  const sourcesDrawer = moreEntries && moreEntries > 0 ? (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-primary hover:underline font-medium">
          +{moreEntries} data sources
        </button>
      </SheetTrigger>
      <DataContributorsDrawer
        label={label}
        totalCount={moreEntries + 1}
        promotedValue={displayValue}
        promotedContributor={contributor}
        promotedDate={contributedAt}
        contributors={additionalContributors}
      />
    </Sheet>
  ) : null;

  if (tableRow) {
    return (
     <div className={`grid gap-6 py-3 group ${labelWidth ? `grid-cols-[${labelWidth}_1fr]` : "grid-cols-[140px_1fr]"}`} style={labelWidth ? { gridTemplateColumns: `${labelWidth} 1fr` } : undefined}>
        {/* Label column */}
       <div className="text-base text-muted-foreground flex items-start gap-1 pt-1">
          <span>{label}</span>
          {explanation && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">{explanation}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Value column */}
        <div className="space-y-1">
         <div className="text-base font-medium text-foreground">{value}</div>
          
          {/* Provenance */}
          {twoLineProvenance ? (
            <div className="space-y-1">
              {contributor && (
                <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                  {!hideSourceBadge && (
                    <span 
                      className={`px-2 py-1 text-sm font-medium rounded ${
                        isClaimed
                           ? "bg-green-50/50 dark:bg-green-900/20 text-green-700"
                           : "bg-orange-50/50 dark:bg-orange-900/20 text-orange-700"
                      }`}
                    >
                      {isClaimed ? "Claimed" : "Crowdsourced"}
                    </span>
                  )}
                  <User className="w-3 h-3" />
                  <span>{contributor}</span>
                </div>
              )}
              
              {(contributedAt || sourcesDrawer) && (
                <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                  {contributedAt && (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>{contributedAt}</span>
                    </>
                  )}
                  {sourcesDrawer && (
                    <>
                      {contributedAt && <span className="text-muted-foreground/50">·</span>}
                      {sourcesDrawer}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-base text-muted-foreground flex-wrap">
              {contributor && !hideSourceBadge && (
                <span 
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    isClaimed
                       ? "bg-green-50/50 dark:bg-green-900/20 text-green-700"
                       : "bg-orange-50/50 dark:bg-orange-900/20 text-orange-700"
                  }`}
                >
                  {isClaimed ? "Claimed" : "Crowdsourced"}
                </span>
              )}
              {contributor && (
                <>
                  <User className="w-3 h-3" />
                  <span>{contributor}</span>
                </>
              )}
              {contributedAt && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  <Clock className="w-3 h-3" />
                  <span>{contributedAt}</span>
                </>
              )}
              {sourcesDrawer && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  {sourcesDrawer}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="data-field group">
      <div className="data-field-label">
        <span>{label}</span>
        {explanation && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">{explanation}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="data-field-value">{value}</div>

      <div className="data-field-provenance">
        {contributor && !hideSourceBadge && (
          <span 
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
              isClaimed
                ? "bg-source-claimed/20 text-source-claimed"
                : "bg-source-contributed/20 text-source-contributed"
            }`}
          >
            {isClaimed ? "Claimed" : "Crowdsourced"}
          </span>
        )}
        {contributor && (
          <>
            <User className="w-3 h-3" />
            <span>{contributor}</span>
          </>
        )}
        {contributedAt && (
          <>
            <span className="text-muted-foreground/50">•</span>
            <Clock className="w-3 h-3" />
            <span>{contributedAt}</span>
          </>
        )}
        {sourcesDrawer && (
          <span className="ml-1">{sourcesDrawer}</span>
        )}
      </div>
    </div>
  );
}
