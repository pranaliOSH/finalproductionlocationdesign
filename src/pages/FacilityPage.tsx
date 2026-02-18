import { useState } from "react";
import { ArrowLeft, Globe, User, ChevronDown, Building2, ShieldCheck } from "lucide-react";
import openSupplyHubLogo from "@/assets/open-supply-hub-logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";

import { FacilityHeader } from "@/components/facility/FacilityHeader";

import { FacilityMap } from "@/components/facility/FacilityMap";
import { DataSection } from "@/components/facility/DataSection";
import { DataField } from "@/components/facility/DataField";
import { EnrichedDataPartnerships } from "@/components/facility/EnrichedDataPartnerships";
import { PageNavigation } from "@/components/facility/PageNavigation";
import { ActionsCard } from "@/components/facility/ActionsCard";
import { SidebarNetwork } from "@/components/facility/SidebarNetwork";

import { ClaimedDataAccordion } from "@/components/facility/ClaimedDataAccordion";

// Mock data for the facility
const facilityData = {
  name: "Zaber & Zubair Fabrics Ltd",
  osId: "BD2021113R7R87P",
  isClaimed: true,
  claimedBy: "Zaber and Zubair Fabrics Ltd",
  claimedDate: "November 15, 2022",
  address: "Pagar, Tongi, Gazipur Tongi, Gazipur Dhaka Gazipur 1710 Dhaka - Bangladesh",
  country: "Bangladesh",
  latitude: 23.896051,
  longitude: 90.418952,
  workerCount: 8281,
  nativeName: "জাবের অ্যান্ড জুবায়ের ফেব্রিক্স লিমিটেড",
  lastUpdated: "Nov 2025",
  sector: "General Merchandise",
  parentCompany: "Noman Group",
  officeName: "Noman Group Head Office",
  officeAddress: "House 42, Road 11, Banani, Dhaka 1213",
  officeCountry: "Bangladesh",
  processingType: "Final Product Assembly",
  locationType: ["Manufacturing Facility", "Warehouse"],
  facilityType: ["Raw Material Processing", "Textile Production", "Printing & Dyeing"],
  productType: ["Leisure", "Tech"],
  description: "Rainforest Alliance",
  percentageFemaleWorkers: 65,
  minimumOrderQuantity: "5,000 units",
  averageLeadTime: "45 days",
  affiliations: ["Bangladesh Garment Manufacturers and Exporters Association (BGMEA)", "Bangladesh Knitwear Manufacturers and Exporters Association (BKMEA)"],
  estimatedAnnualThroughput: "2,500,000 kg/year",
  actualAnnualEnergyConsumption: "8,450,000 kWh/year",
  companyPhone: "+880 2 8431 5678",
  companyWebsite: "https://www.nomangroup.com",
  productionLocationDescription: "Vertically integrated textile manufacturing facility specializing in woven and knit fabrics for home textiles and apparel. Features in-house dyeing, printing, and finishing capabilities.",
};

const contributors = [
  { name: "Sainsbury's", type: "brand" as const, dataPoints: 22, lastContributed: "Nov 2025", listUploads: [
    { listTitle: "Sainsbury's Global Suppliers 2025", dateContributed: "Nov 12, 2025" },
    { listTitle: "Sainsbury's Global Suppliers 2024", dateContributed: "Nov 8, 2024" },
    { listTitle: "Sainsbury's Global Suppliers 2023", dateContributed: "Nov 15, 2023" },
  ]},
  { name: "JD Williams and Company Ltd", type: "brand" as const, dataPoints: 18, lastContributed: "Nov 2025", listUploads: [{ listTitle: "JD Williams Factory List", dateContributed: "Nov 4, 2025" }] },
  { name: "International Accord Foundation", type: "cso" as const, dataPoints: 18, lastContributed: "Oct 2025", listUploads: [{ listTitle: "Accord Signatory Factory List", dateContributed: "Oct 8, 2025" }] },
  { name: "Marks & Spencer", type: "brand" as const, dataPoints: 28, lastContributed: "Nov 2025", listUploads: [
    { listTitle: "M&S Supplier Network 2025", dateContributed: "Nov 5, 2025" },
    { listTitle: "M&S Supplier Network 2024", dateContributed: "Nov 10, 2024" },
    { listTitle: "M&S Supplier Network 2023", dateContributed: "Nov 3, 2023" },
  ]},
  { name: "H&M Group", type: "brand" as const, dataPoints: 35, lastContributed: "Aug 2025", listUploads: [{ listTitle: "H&M Supplier Disclosure 2025", dateContributed: "Aug 20, 2025" }] },
  { name: "SLCP", type: "auditor" as const, dataPoints: 45, lastContributed: "Apr 2025", listUploads: [{ listTitle: "SLCP Verified Facilities Q1 2025", dateContributed: "Apr 15, 2025" }] },
  { name: "Worldly", type: "msi" as const, dataPoints: 30, lastContributed: "Mar 2025", listUploads: [{ listTitle: "Higg FEM Verified Facilities", dateContributed: "Mar 15, 2025" }] },
  { name: "OS Hub", type: "other" as const, dataPoints: 12, lastContributed: "Aug 2025" },
  { name: "Zaber and Zubair Fabrics Ltd", type: "supplier" as const, dataPoints: 35, lastContributed: "Nov 2022" },
];

const totalContributors = 44;

const contributorTypeCounts = {
  brand: 18,
  auditor: 8,
  cso: 6,
  supplier: 9,
  msi: 2,
  other: 1,
};

const certifications = [
  { 
    name: "CERT/01-00-1234", 
    issuer: "Placeholder Certification Body",
    issuerOrg: "Placeholder Certification Body",
    issuerOrgUrl: "https://example.com/",
    issuerUrl: "https://example.com/certification",
    validUntil: "Dec 2025",
    scope: "Certification",
    contributor: "Placeholder Provider",
    contributorUrl: "https://example.com/",
    contributedAt: "January 8, 2026",
  },
];

const environmentalMetrics = [
  {
    name: "Estimated Annual Emissions",
    value: "32833",
    unit: "t CO₂e-100",
    source: "2025 Emissions Model",
    sourceUrl: "https://climatetrace.org/emissions-model",
    provider: "Climate TRACE",
    providerUrl: "https://climatetrace.org",
    contributor: "Climate TRACE",
    contributorUrl: "https://climatetrace.org",
    contributedAt: "November 10, 2025",
  },
  {
    name: "Estimated Annual Activity",
    value: "450000",
    unit: "MWh",
    source: "2025 Emissions Model",
    sourceUrl: "https://climatetrace.org/emissions-model",
    provider: "Climate TRACE",
    providerUrl: "https://climatetrace.org",
    contributor: "Climate TRACE",
    contributorUrl: "https://climatetrace.org",
    contributedAt: "November 10, 2025",
  },
];

const workforceMetrics = [
  {
    name: "Grievance Mechanism",
    value: "Active",
    description: "Workers have access to anonymous grievance reporting",
    status: "good" as const,
    source: "Ulula",
    updatedAt: "Nov 2025"
  },
];

const assessments = [
  // Left column - Worldly
  {
    name: "FEM Assessment",
    provider: "Worldly",
    providerUrl: "https://worldly.io/",
    scope: "Environmental",
    verificationStatus: "Verified",
    lastDate: "January 15, 2025",
    reportingYear: "2024",
    assessmentUrl: "https://worldly.io/fem",
    link: "#",
    groupTitle: "Worldly Assessment",
  },
  {
    groupContribution: "Worldly Assessment",
    contributor: "Worldly",
    contributorUrl: "https://worldly.io/",
    contributedAt: "March 20, 2025",
  },
  // Left column - SLCP
  {
    name: "CAF Assessment",
    provider: "SLCP",
    providerUrl: "https://slconvergence.org/",
    scope: "Social & Labor",
    status: "Verified",
    assessmentDate: "April 2025",
    assessmentPlatform: "SLCP Gateway",
    verifierBody: "Bureau Veritas",
    link: "#",
    groupTitle: "SLCP Assessment",
  },
  {
    groupContribution: "SLCP Assessment",
    contributor: "SLCP",
    contributorUrl: "https://slconvergence.org/",
    contributedAt: "April 15, 2025",
  },
  // Right column - amfori
  {
    name: "amfori BEPI Audit",
    provider: "amfori",
    providerUrl: "https://www.amfori.org/",
    scope: "Environmental",
    submissionDate: "October 28, 2023",
    expirationDate: "October 28, 2025",
    link: "#",
    groupTitle: "amfori Statuses",
  },
  {
    name: "amfori BSCI Audit",
    provider: "amfori",
    providerUrl: "https://www.amfori.org/",
    scope: "Social & Labor",
    submissionDate: "October 28, 2023",
    expirationDate: "October 28, 2025",
    link: "#",
    groupTitle: "amfori Statuses",
  },
  {
    name: "amfori Environmental Risk Assessment",
    provider: "amfori",
    providerUrl: "https://www.amfori.org/",
    scope: "Environmental",
    expirationDate: "October 28, 2027",
    completionDate: "October 28, 2025",
    link: "#",
    groupTitle: "amfori Statuses",
  },
  {
    groupContribution: "amfori Statuses",
    contributor: "amfori",
    contributorUrl: "https://www.amfori.org/",
    contributedAt: "October 28, 2023",
  },
];

export default function FacilityPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation bar */}
      <header className="border-b border-border bg-card sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src={openSupplyHubLogo} 
                  alt="Open Supply Hub" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <nav className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="font-medium">
                Explore
              </Button>
              <Button variant="ghost" size="sm" className="font-medium">
                How It Works
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="font-medium">
                About Us
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="font-medium">
                Pricing
              </Button>
              <Button variant="ghost" size="sm" className="font-medium px-2">
                <Globe className="w-5 h-5" />
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="font-medium">
                <User className="w-5 h-5 mr-1" />
                My Account
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-16 space-y-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to search results
              </Link>
              <PageNavigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
              <ActionsCard isClaimed={facilityData.isClaimed} />
              <SidebarNetwork 
                contributors={contributors}
                totalContributors={totalContributors}
                typeCounts={contributorTypeCounts}
              />
            </div>
          </div>

          {/* Content area */}
          <div className="space-y-6 min-w-0">
            {/* Page title */}
            <div className="mb-2">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4 lg:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to search results
              </Link>
              <p className="text-base text-muted-foreground mb-1">Production Location</p>
                <h1 className="text-4xl lg:text-5xl font-semibold text-foreground">{facilityData.name}</h1>
              {facilityData.isClaimed && (
                <div className="flex items-center gap-2 mt-3">
                  <ShieldCheck className="w-6 h-6 text-verified flex-shrink-0" />
                  <p className="text-lg font-semibold text-verified">CLAIMED PROFILE</p>
                  <InfoTooltip
                    description="This profile has been claimed by the production location's owner, manager or by an authorized employee, which allows you to see a larger suite of information provided directly by the production location."
                    learnMoreHref="https://info.opensupplyhub.org/resources/claim-a-facility"
                  />
                </div>
              )}
              {facilityData.isClaimed && (
                <p className="text-base text-muted-foreground mt-1 lg:pl-9">
                  Claimed by <span className="font-medium text-foreground">{facilityData.claimedBy || "the owner"}</span>
                  {facilityData.claimedDate && (
                    <> on <span className="font-medium text-foreground">{facilityData.claimedDate}</span></>
                  )}
                </p>
              )}
            </div>

            {/* Header section */}
            {/* Header section */}
            <div id="section-overview">
              <FacilityHeader 
                osId={facilityData.osId}
                isClaimed={facilityData.isClaimed}
                claimedBy={facilityData.claimedBy}
                claimedDate="03/15/2022"
                address={facilityData.address}
                country={facilityData.country}
                sourceCount={totalContributors}
                lastUpdated={facilityData.lastUpdated}
                confidenceLevel={4}
              />
            </div>


            {/* Two column layout for identity and map */}
            <div id="section-location" className="grid lg:grid-cols-[1fr_500px] gap-6">
              <DataSection
                title="General Information"
                category="identity"
                icon={<Building2 className="w-5 h-5" />}
                explanation={<>Core identifying information about this production location. <a href="https://info.opensupplyhub.org/resources/understanding-production-location-data" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:opacity-80">Learn more about each data point</a>.</>}
                
                singleColumn={true}
              >
                  <DataField 
                    label="Name"
                    value={facilityData.name}
                    explanation="The complete name of this production location."
                    contributor="Zaber and Zubair Fabrics Ltd"
                    contributedAt="November 12, 2022"
                    moreEntries={8}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Parent Company"
                    value={facilityData.parentCompany}
                    explanation="The company or group that holds majority ownership for this production location."
                    contributor="Zaber and Zubair Fabrics Ltd"
                    contributedAt="November 12, 2022"
                    moreEntries={6}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Industry / Sectors"
                    value={facilityData.sector}
                    explanation="The sector(s) that this location operates in. For example: Apparel, Electronics, Renewable Energy."
                    contributor="Sainsbury's"
                    contributedAt="November 3, 2025"
                    moreEntries={51}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Product Type(s)"
                    value={facilityData.facilityType.join(", ")}
                    explanation="The types of production activities performed at this location."
                    contributor="OS Hub Research Team"
                    contributedAt="August 19, 2025"
                    moreEntries={5}
                    confidenceLevel="medium"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Location Type(s)"
                    value={facilityData.locationType.join(", ")}
                    explanation="The type of location (e.g., manufacturing facility, warehouse, office)."
                    contributor="Zaber and Zubair Fabrics Ltd"
                    contributedAt="November 12, 2022"
                    moreEntries={3}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Processing Type(s)"
                    value={facilityData.processingType}
                    explanation="The stage of production this facility handles (e.g., raw materials, assembly, packaging)."
                    contributor="JD Williams"
                    contributedAt="November 3, 2025"
                    moreEntries={44}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
                  <DataField 
                    label="Number of Workers"
                    value={facilityData.workerCount.toLocaleString()}
                    explanation="The total number of workers employed at this production location."
                    contributor="Marks & Spencer"
                    contributedAt="September 8, 2025"
                    moreEntries={12}
                    confidenceLevel="high"
                    tableRow={true}
                    twoLineProvenance={true}
                  />
              </DataSection>

              <div>
                <FacilityMap 
                  latitude={facilityData.latitude}
                  longitude={facilityData.longitude}
                  contributorCount={122}
                  lastVerified="April 7, 2025"
                  address={facilityData.address}
                />
              </div>
            </div>

            {/* Claimed / Facility-Provided Data section with accordion toggle */}
            <div id="section-claimed-data">
              <ClaimedDataAccordion>
                <DataField 
                  label="Name in Native Language"
                  value={facilityData.nativeName}
                  explanation="The facility name in its local language."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Company Website"
                  value={
                    <a href={facilityData.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {facilityData.companyWebsite}
                    </a>
                  }
                  explanation="The official website for this company."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Company Phone"
                  value={facilityData.companyPhone}
                  explanation="The primary contact phone number for this facility."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Office Name"
                  value={facilityData.officeName}
                  explanation="The name of the parent company's office location."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Office Address"
                  value={facilityData.officeAddress}
                  explanation="The address of the parent company's office."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Office Country"
                  value={facilityData.officeCountry}
                  explanation="The country where the parent company's office is located."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Description"
                  value={facilityData.productionLocationDescription}
                  explanation="A description of this production location's capabilities and focus."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Certifications / Standards / Regulations"
                  value={facilityData.description}
                  explanation="Certifications and standards the facility adheres to."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="January 15, 2025"
                  confidenceLevel="low"
                  tableRow={true}
                />
                <DataField 
                  label="Affiliations"
                  value={
                    <div className="flex flex-col gap-1">
                      {facilityData.affiliations.map(affiliation => (
                        <span key={affiliation}>
                          {affiliation}
                        </span>
                      ))}
                    </div>
                  }
                  explanation="Industry associations and organizations this production location is a member of."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Minimum Order Quantity"
                  value={facilityData.minimumOrderQuantity}
                  explanation="The minimum order size this production location accepts for production."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="medium"
                  tableRow={true}
                />
                <DataField 
                  label="Average Lead Time"
                  value={facilityData.averageLeadTime}
                  explanation="The typical time from order placement to delivery."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="medium"
                  tableRow={true}
                />
                <DataField 
                  label="Percentage of Female Workers"
                  value={`${facilityData.percentageFemaleWorkers}%`}
                  explanation="The percentage of the workforce that identifies as female."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
                <DataField 
                  label="Estimated Annual Throughput"
                  value={facilityData.estimatedAnnualThroughput}
                  explanation="The estimated annual production output of this production location."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="medium"
                  tableRow={true}
                />
                <DataField 
                  label="Actual Annual Energy Consumption"
                  value={facilityData.actualAnnualEnergyConsumption}
                  explanation="The actual annual energy consumption of this production location."
                  contributor="Zaber and Zubair Fabrics Ltd"
                  contributedAt="November 12, 2022"
                  confidenceLevel="high"
                  tableRow={true}
                />
              </ClaimedDataAccordion>
            </div>


            {/* Enriched Data Partnerships - Tabbed section */}
            <div id="section-assessments">
            <EnrichedDataPartnerships
              certifications={certifications}
              assessments={assessments}
              environmentalMetrics={environmentalMetrics}
            />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Open Supply Hub. Open data for transparent supply chains.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">API</a>
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
