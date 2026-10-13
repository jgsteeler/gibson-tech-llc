/**
 * Poor Man's Centralized App Config & Feature Flag Provider
 * Architecture pattern designed to federate directly into Azure App Configuration / Key Vault later.
 * 
 * In local/vanilla mode: Reads deterministic defaults and environment overrides.
 * In production mode: Can bind to Netlify environment variables or a remote config JSON.
 */

export interface FeatureFlags {
  // Brand & Page Display
  showDetailedHeroCta: boolean;        // Flip on direct "Book Consultation / Hire Me" CTAs
  showDirectEmailCapture: boolean;     // Flip on direct contact/inquiry forms
  
  // Specific Commercial Streams (vanilla summary vs. deep pricing/booking)
  showPenTestSprintPricing: boolean;   // Flip on $3.5k-$5k fixed sprint pricing cards
  showFractionalRetainer: boolean;     // Flip on $125-$150/hr fractional advisory cards
  showAiWorkshopOffering: boolean;     // Flip on $3,500 team AI engineering workshop
  showCloudMigrationPackages: boolean; // Flip on detailed gateway/ARO modernization scopes
  
  // Products & Portfolio
  showDivergentFlowLinks: boolean;     // Link directly to live getdivergentflow.com
  showShopAppShowcase: boolean;        // Showcase the upcoming equipment shop Kanban app
  showInteractiveCalculator: boolean;  // Show interactive budget/hours estimator widget
}

export interface AppConfig {
  companyName: string;
  dba: string;
  linkedInUrl: string;
  contactEmail: string;
  flags: FeatureFlags;
}

// Default Configuration: Clean, vanilla, high-stature business landing page
// All aggressive immediate "book me right now" CTAs and deep pricing cards are kept OFF by default.
// Flip any flag to true whenever you are ready!
export const config: AppConfig = {
  companyName: "Gibson Tech, LLC",
  dba: "GTech",
  linkedInUrl: "https://www.linkedin.com/company/gibson-tech-llc/",
  contactEmail: "jgsteeler@gmail.com",
  flags: {
    showDetailedHeroCta: false,        // Vanilla mode: soft discovery buttons only
    showDirectEmailCapture: false,     // Vanilla mode: mailto / LinkedIn link instead of active RFP form
    showPenTestSprintPricing: false,   // Vanilla mode: overview of capabilities without pricing cards
    showFractionalRetainer: false,     // Vanilla mode: overview of capabilities without pricing cards
    showAiWorkshopOffering: false,     // Vanilla mode: overview of leadership without pricing cards
    showCloudMigrationPackages: false, // Vanilla mode: overview of architecture without pricing cards
    showDivergentFlowLinks: true,      // Active production SaaS showcase
    showShopAppShowcase: true,         // Active domain testbed showcase
    showInteractiveCalculator: false,  // Hidden in vanilla mode
  }
};
