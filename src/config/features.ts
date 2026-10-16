/**
 * Build-time application configuration for the static marketing site.
 * Feature flags are public build inputs, not secrets or runtime controls.
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
  showDivergentFlowShowcase: boolean;  // Show Divergent Flow portfolio links
  showWrenchQShowcase: boolean;        // Show WrenchQ portfolio links
  showSmallBusinessConsulting: boolean; // Publish the small-business consulting page
  showInteractiveCalculator: boolean;  // Show interactive budget/hours estimator widget
}

export interface AppConfig {
  companyName: string;
  dba: string;
  linkedInUrl: string;
  contactEmail: string;
  divergentFlowUrl: string;
  wrenchqUrl: string;
  flags: FeatureFlags;
}

const isBuildFlagEnabled = (value: string | undefined): boolean => value === "true";

// Default Configuration: clean discovery mode. All optional flags default off.
// Set the corresponding VITE_SHOW_* build environment variable to "true" to enable a flag.
export const config: AppConfig = {
  companyName: "Gibson Tech, LLC",
  dba: "GTech",
  linkedInUrl: "https://www.linkedin.com/company/gibson-tech-llc/",
  contactEmail: "jgsteeler@gmail.com",
  divergentFlowUrl: import.meta.env.VITE_DIVERGENT_FLOW_URL ?? "https://getdivergentflow.com",
  wrenchqUrl: import.meta.env.VITE_WRENCHQ_URL ?? "https://track.gibsonservice.co/",
  flags: {
    showDetailedHeroCta: isBuildFlagEnabled(import.meta.env.VITE_SHOW_DETAILED_HERO_CTA),
    showDirectEmailCapture: isBuildFlagEnabled(import.meta.env.VITE_SHOW_DIRECT_EMAIL_CAPTURE),
    showPenTestSprintPricing: isBuildFlagEnabled(import.meta.env.VITE_SHOW_PEN_TEST_SPRINT_PRICING),
    showFractionalRetainer: isBuildFlagEnabled(import.meta.env.VITE_SHOW_FRACTIONAL_RETAINER),
    showAiWorkshopOffering: isBuildFlagEnabled(import.meta.env.VITE_SHOW_AI_WORKSHOP_OFFERING),
    showCloudMigrationPackages: isBuildFlagEnabled(import.meta.env.VITE_SHOW_CLOUD_MIGRATION_PACKAGES),
    showDivergentFlowShowcase: isBuildFlagEnabled(import.meta.env.VITE_SHOW_DIVERGENT_FLOW_SHOWCASE),
    showWrenchQShowcase: isBuildFlagEnabled(import.meta.env.VITE_SHOW_WRENCHQ_SHOWCASE),
    showSmallBusinessConsulting: isBuildFlagEnabled(
      import.meta.env.VITE_SHOW_SMALL_BUSINESS_CONSULTING,
    ),
    showInteractiveCalculator: isBuildFlagEnabled(import.meta.env.VITE_SHOW_INTERACTIVE_CALCULATOR),
  }
};
