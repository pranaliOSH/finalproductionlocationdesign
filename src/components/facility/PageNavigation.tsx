import { useState } from "react";
import { Building2, MapPin, ClipboardCheck, Award, Leaf, Wallet, ShieldAlert, ChevronDown } from "lucide-react";

interface PageNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "overview", label: "Overview", icon: <Building2 className="w-4 h-4" /> },
  { id: "location", label: "General Information", icon: <MapPin className="w-4 h-4" /> },
  { id: "claimed-data", label: "Operational Details", icon: <Building2 className="w-4 h-4" /> },
   
   { id: "assessments", label: "Assessments & Audits", icon: <ClipboardCheck className="w-4 h-4" /> },
   { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" /> },
   { id: "environment", label: "Emissions & Energy Use", icon: <Leaf className="w-4 h-4" /> },
   { id: "living-wage", label: "Living Wage", icon: <Wallet className="w-4 h-4" /> },
   { id: "grievance-mechanism", label: "Grievance Mechanisms", icon: <ShieldAlert className="w-4 h-4" /> },
];

export function PageNavigation({ activeSection, onSectionChange }: PageNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <>
      {/* Desktop navigation */}
      <nav className="hidden lg:block">
        <div className="rounded-lg border border-border p-2">
          <p className="text-sm text-muted-foreground px-2 py-1.5">Jump to</p>
          <div className="space-y-0.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  const element = document.getElementById(`section-${section.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded text-base transition-colors ${
                  activeSection === section.id
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="lg:hidden sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 px-4 py-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3 py-2 bg-card rounded-lg border border-border"
        >
          <div className="flex items-center gap-2">
            {sections.find(s => s.id === activeSection)?.icon}
            <span className="text-sm font-medium">
              {sections.find(s => s.id === activeSection)?.label || "Overview"}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        
        {isExpanded && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-card rounded-lg border border-border shadow-lg overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setIsExpanded(false);
                  const element = document.getElementById(`section-${section.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
