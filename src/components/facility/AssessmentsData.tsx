import { ClipboardCheck } from "lucide-react";

interface Assessment {
  name?: string;
  provider?: string;
  providerUrl?: string;
  scope?: string;
  status?: string;
  assessmentDate?: string;
  assessmentPlatform?: string;
  verifierBody?: string;
  standardInfo?: string;
  validityDate?: string;
  submissionDate?: string;
  expirationDate?: string;
  completionDate?: string;
  reportingYear?: string;
  lastDate?: string;
  verificationStatus?: string;
  assessmentUrl?: string;
  link?: string;
  contributor?: string;
  contributorUrl?: string;
  contributedAt?: string;
  groupTitle?: string;
  groupSingleColumn?: boolean;
  groupContribution?: string;
}

interface AssessmentsDataProps {
  assessments: Assessment[];
  embedded?: boolean;
}

export function AssessmentsData({ assessments, embedded = false }: AssessmentsDataProps) {
  // Separate contribution metadata entries from actual assessments
  const contributionMetadata: { [key: string]: Assessment } = {};
  const actualAssessments = assessments.filter(a => {
    if (a.groupContribution) {
      contributionMetadata[a.groupContribution] = a;
      return false;
    }
    return true;
  });

  // Group assessments by groupTitle
  const groupedAssessments: { [key: string]: Assessment[] } = {};
  const ungroupedAssessments: Assessment[] = [];

  actualAssessments.forEach(assessment => {
    if (assessment.groupTitle) {
      if (!groupedAssessments[assessment.groupTitle]) {
        groupedAssessments[assessment.groupTitle] = [];
      }
      groupedAssessments[assessment.groupTitle].push(assessment);
    } else {
      ungroupedAssessments.push(assessment);
    }
  });

  const renderAssessmentItem = (assessment: Assessment, index: number, showContribution: boolean = true) => (
    <div key={index} className="space-y-2">
      {/* Assessment name - label title */}
      {assessment.name && (
        <p className="text-xs font-bold text-foreground uppercase tracking-wide">
          {assessment.name}
        </p>
      )}

      {/* Details line */}
      <div className="space-y-0.5">
        {assessment.verificationStatus && (
          <p className="font-medium">
            <span>Verification Status: </span>
            <span className="text-muted-foreground">{assessment.verificationStatus}</span>
          </p>
        )}
        {assessment.lastDate && (
          <p className="font-medium">
            <span>Last Date: </span>
            <span className="text-muted-foreground">{assessment.lastDate}</span>
          </p>
        )}
        {assessment.status && (
          <p className="font-medium">
            <span>Assessment Status: </span>
            <span className="text-muted-foreground">{assessment.status}</span>
          </p>
        )}
        {assessment.submissionDate && (
          <p className="font-medium">
            <span>Submission Date: </span>
            <span className="text-muted-foreground">{assessment.submissionDate}</span>
          </p>
        )}
        {assessment.expirationDate && (
          <p className="font-medium">
            <span>Expiration Date: </span>
            <span className="text-muted-foreground">{assessment.expirationDate}</span>
          </p>
        )}
        {assessment.completionDate && (
          <p className="font-medium">
            <span>Completion Date: </span>
            <span className="text-muted-foreground">{assessment.completionDate}</span>
          </p>
        )}
        {assessment.assessmentDate && (
          <p className="font-medium">
            <span>Assessment Date: </span>
            <span className="text-muted-foreground">{assessment.assessmentDate}</span>
          </p>
        )}
        {assessment.assessmentPlatform && (
          <p className="font-medium">
            <span>Assessment Platform: </span>
            <span className="text-muted-foreground">{assessment.assessmentPlatform}</span>
          </p>
        )}
        {assessment.verifierBody && (
          <p className="font-medium">
            <span>Verifier Body: </span>
            <span className="text-muted-foreground">{assessment.verifierBody}</span>
          </p>
        )}
        {assessment.validityDate && (
          <p className="font-medium">
            <span>Validity Date: </span>
            <span className="text-muted-foreground">{assessment.validityDate}</span>
          </p>
        )}
        {assessment.reportingYear && (
          <p className="font-medium">
            <span>Reporting Year: </span>
            <span className="text-muted-foreground">{assessment.reportingYear}</span>
          </p>
        )}
      </div>
      
      {/* Attribution line */}
      {assessment.standardInfo && (
        <p className="text-sm text-foreground">
          {assessment.standardInfo}
        </p>
      )}
      
      {/* Contribution line - only show if showContribution is true */}
      {showContribution && (assessment.contributedAt || assessment.contributor) && (
        <p className="text-sm text-muted-foreground">
          {assessment.contributedAt && <span>{assessment.contributedAt}</span>}
          {assessment.contributor && (
            <>
              {assessment.contributedAt && " by "}
              {assessment.contributorUrl ? (
                <a 
                  href={assessment.contributorUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {assessment.contributor}
                </a>
              ) : (
                <span>{assessment.contributor}</span>
              )}
            </>
          )}
        </p>
      )}
    </div>
  );

  const content = (
    <>
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Left column - Worldly and SLCP */}
        <div className="space-y-8">
          {["Worldly Assessment", "SLCP Assessment"].map(groupTitle => {
            const groupAssessments = groupedAssessments[groupTitle];
            const groupMeta = contributionMetadata[groupTitle];
            if (!groupAssessments) return null;
            
            return (
              <div key={groupTitle} className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">
                  {groupTitle}
                </h3>
                <div className="space-y-4">
                  {groupAssessments.map((assessment, index) => renderAssessmentItem(assessment, index, false))}
                </div>
                {groupMeta && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {groupMeta.contributedAt && <span>{groupMeta.contributedAt}</span>}
                    {groupMeta.contributor && (
                      <>
                        {groupMeta.contributedAt && " by "}
                        {groupMeta.contributorUrl ? (
                          <a 
                            href={groupMeta.contributorUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {groupMeta.contributor}
                          </a>
                        ) : (
                          <span>{groupMeta.contributor}</span>
                        )}
                      </>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column - amfori */}
        <div className="space-y-8">
          {["amfori Statuses"].map(groupTitle => {
            const groupAssessments = groupedAssessments[groupTitle];
            const groupMeta = contributionMetadata[groupTitle];
            if (!groupAssessments) return null;
            
            return (
              <div key={groupTitle} className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">
                  {groupTitle}
                </h3>
                <div className="space-y-4">
                  {groupAssessments.map((assessment, index) => renderAssessmentItem(assessment, index, false))}
                </div>
                {groupMeta && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {groupMeta.contributedAt && <span>{groupMeta.contributedAt}</span>}
                    {groupMeta.contributor && (
                      <>
                        {groupMeta.contributedAt && " by "}
                        {groupMeta.contributorUrl ? (
                          <a 
                            href={groupMeta.contributorUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {groupMeta.contributor}
                          </a>
                        ) : (
                          <span>{groupMeta.contributor}</span>
                        )}
                      </>
                    )}
                  </p>
                )}
              </div>
            );
          })}
          
          {/* Render any ungrouped assessments in right column */}
          {ungroupedAssessments.map((assessment, index) => renderAssessmentItem(assessment, index, true))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border bg-muted/50 -mx-4 px-4 py-3 rounded-md space-y-2">
        <p className="text-base text-muted-foreground">
          <span className="font-bold text-primary">Disclaimer:</span> Assessment data is provided by third parties and may not reflect current conditions. Always verify critical information independently.
        </p>
      </div>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <ClipboardCheck className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Assessments and Audits</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Social and environmental assessments from recognized platforms
          </p>
        </div>
      </div>

      {content}
    </div>
  );
}