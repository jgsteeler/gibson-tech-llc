import type { APIRoute } from "astro";
import { config } from "../config/features";

export const prerender = true;

const portfolioItems = [
  config.flags.showDivergentFlowShowcase
    ? `- **Divergent Flow:** A personal product exploring observable workflows with React and modern .NET event-driven services. [Visit Divergent Flow](${config.divergentFlowUrl})`
    : undefined,
  config.flags.showWrenchQShowcase
    ? `- **WrenchQ:** A shop operations proof of concept for jobs, customers, and equipment. [Visit WrenchQ](${config.wrenchqUrl})`
    : undefined,
].filter((item): item is string => item !== undefined);

const portfolioSection = portfolioItems.length
  ? `## Selected Engineering Work

These are portfolio projects and proofs of execution, not commercial SaaS offerings.

${portfolioItems.join("\n")}

`
  : "";

const content = `# Gibson Tech, LLC

> Enterprise systems architecture, application security, cloud modernization, and engineering leadership.

- Organization: Gibson Tech, LLC
- Principal Architect: Johnny Gibson
- Website: [gibsontechworks.com](https://gibsontechworks.com/)
- Contact: [${config.contactEmail}](mailto:${config.contactEmail})
- Location: Topeka, Kansas
- Company LinkedIn: [Gibson Tech, LLC](https://www.linkedin.com/company/gibson-tech-llc/)
- Principal LinkedIn: [Johnny Gibson](https://www.linkedin.com/in/johnnypgibson)

## Advisory Areas

- **Enterprise systems architecture:** Architecture guidance for distributed systems, system boundaries, cloud modernization, and event-driven design.
- **Application security and audit readiness:** Review API gateways, OAuth 2.0 PKCE flows, Okta CIAM migrations, and OWASP API risks, with prioritized remediation guidance.
- **AI-era engineering mentorship:** Help teams use AI coding tools while preserving sound design principles, critical code review, and maintainable systems.

${portfolioSection}## About

Johnny Gibson is a Principal Software Architect and Lead Application Security Engineer based in Topeka, Kansas. He brings approximately 25 years of experience across healthcare, financial services, and distributed cloud systems.

The focus is straightforward: help teams build systems that remain resilient, observable, and maintainable after the engagement ends.
`;

export const GET: APIRoute = () =>
  new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
