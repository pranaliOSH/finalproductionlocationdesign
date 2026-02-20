import { Award } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Certification {
  name: string;
  issuer: string;
  issuerOrg?: string;
  issuerOrgUrl?: string;
  issuerUrl?: string;
  validUntil?: string;
  verificationUrl?: string;
  scope?: string;
  contributor?: string;
  contributorUrl?: string;
  contributedAt?: string;
}

interface CertificationCardProps {
  certifications: Certification[];
  embedded?: boolean;
}

export function CertificationCard({
  certifications,
  embedded = false
}: CertificationCardProps) {
  const emptyContent = (
    <div className="text-center py-8 text-muted-foreground">
      <Award className="w-10 h-10 mx-auto mb-2 opacity-30" />
      <p className="text-sm">No certifications linked yet</p>
      <button className="text-primary text-sm mt-1 hover:underline">
        Link a certification
      </button>
    </div>
  );

  const listContent = (
    <>
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={`${cert.name}-${index}`} className="space-y-2">
            {/* Label title */}
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              {cert.scope || "Forest Certification"}
            </p>
            
            {/* Data shown - certification name as link */}
            <div>
              {cert.verificationUrl ? (
                <a 
                  href={cert.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline font-medium"
                >
                  {cert.name}
                </a>
              ) : (
                <span className="font-medium">{cert.name}</span>
              )}
            </div>
            
            {/* Attribution line */}
            <p className="text-sm text-foreground">
              {cert.issuerUrl ? (
                <a href={cert.issuerUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {cert.issuer}
                </a>
              ) : (
                cert.issuer
              )}
            </p>
            
            {/* Contribution line - simplified without sources count */}
            {(cert.contributedAt || cert.contributor) && (
              <p className="text-sm text-muted-foreground">
                {cert.contributedAt && <span>{cert.contributedAt}</span>}
                {cert.contributor && (
                  <>
                    {cert.contributedAt && " by "}
                    {cert.contributorUrl ? (
                      <a 
                        href={cert.contributorUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {cert.contributor}
                      </a>
                    ) : (
                      <span>{cert.contributor}</span>
                    )}
                  </>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border bg-muted/50 -mx-4 px-4 py-3 rounded-md space-y-2">
        <p className="text-base text-muted-foreground">
          <span className="font-bold text-primary">Disclaimer:</span> Datasets displayed include only organizations that have opted to share additional data about this location on Open Supply Hub at this time. It is not an exhaustive directory, nor does it imply an endorsement of any specific organization. OS Hub is actively expanding these offerings to showcase the diverse range of tools and platforms available for each data point.
        </p>
      </div>
    </>
  );

  if (embedded) {
    return certifications.length === 0 ? emptyContent : listContent;
  }

  if (certifications.length === 0) {
    return (
      <div className="data-card animate-fade-in">
        <div className="section-header border-0 pb-0 mb-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-compliance/10">
              <Award className="w-5 h-5 text-category-compliance" />
            </div>
            <div>
              <h3 className="section-title">
                Certifications
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="info-trigger text-[10px]">?</button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-xs font-medium mb-1">What are certifications?</p>
                    <p className="text-xs text-muted-foreground">
                      Third-party certifications that verify a production location meets certain social and environmental standards.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <span className="category-badge compliance">Compliance</span>
            </div>
          </div>
        </div>
        {emptyContent}
      </div>
    );
  }

  return (
    <div className="data-card animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-category-compliance/10">
            <Award className="w-5 h-5 text-category-compliance" />
          </div>
          <div>
            <h3 className="section-title">
              Certifications
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="info-trigger text-[10px]">?</button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs font-medium mb-1">What are certifications?</p>
                  <p className="text-xs text-muted-foreground">
                    Third-party certifications that verify a production location meets certain social and environmental standards.
                  </p>
                </TooltipContent>
              </Tooltip>
            </h3>
            <span className="category-badge compliance">Compliance</span>
          </div>
        </div>
      </div>

      {listContent}
    </div>
  );
}