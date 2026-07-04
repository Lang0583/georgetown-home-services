import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import LastUpdated from "../../components/LastUpdated";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getStaticPageLastUpdated } from "../../lib/static-pages-last-updated";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Terms of Use",
  description:
    "Terms of use for Georgetown Home Services: no professional advice, no service fulfillment, advertising disclaimer, limitation of liability, and third-party links.",
  pathname: "/terms",
  ogType: "website",
});

export default function TermsPage() {
  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/terms",
            name: "Terms of Use",
            description:
              "Georgetown Home Services terms: informational site only, user responsibility for hiring decisions, external links.",
          })}
        />
      }
      eyebrow="Legal"
      title="Terms of Use"
      description={
        <>
          By using Georgetown Home Services you agree to these terms. The site offers <strong>general homeowner education</strong>{" "}
          and <strong>public directory information</strong>—not professional advice tailored to your property.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Informational only</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Articles, checklists, and FAQs are for research. They are <strong>not</strong> plumbing, electrical, HVAC,
          roofing, legal, insurance, or financial advice. Always consult licensed professionals and your policy documents
          for decisions with health, safety, code, or monetary consequences.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">No service fulfillment</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We do not provide home services, schedule appointments, dispatch providers, or negotiate with contractors on your
          behalf. Forms on the site may connect you with independent businesses; those relationships are <strong>yours</strong>
          , not ours.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Advertising</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We may display third-party advertisements (for example via Google AdSense). Advertisers are responsible for their
          ad content. Inclusion of an ad does not imply our endorsement of the advertised product or service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">No warranties</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The site and content are provided <strong>“as is”</strong> without warranties of any kind, express or implied. We
          disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement to the
          fullest extent permitted by law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Limitation of liability</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          To the fullest extent permitted by law, Georgetown Home Services and its operators will not be liable for any
          indirect, incidental, special, consequential, or exemplary damages arising from your use of the site, reliance on
          content, or hiring decisions—even if we have been advised of the possibility of such damages. Our total liability
          for any claim related to the site will not exceed the greater of <strong>USD $100</strong> or the amounts you paid
          us directly for services (which is typically <strong>zero</strong> for readers). Some jurisdictions do not allow
          certain limitations; in those cases, our liability is limited to the maximum permitted by law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">External links</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We link to third-party websites, maps, and tools. We do not control and are not responsible for their content,
          availability, or privacy practices. Review their terms before submitting personal data elsewhere.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Acceptable use</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          You agree not to misuse the site (for example by scraping at rates that impair service, attempting unauthorized
          access, or submitting fraudulent feedback). We may suspend access that appears harmful or abusive.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Changes</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We may update these terms; the “Last updated” date below will change. Continued use after updates constitutes
          acceptance unless applicable law requires otherwise.
        </p>
        <div className="mt-3 text-sm text-muted">
          <LastUpdated lastUpdated={getStaticPageLastUpdated("/terms")} />
          <p className="mt-1">
            Questions? See{" "}
            <Link href="/contact" className="font-medium text-brand underline-offset-4 hover:underline">
              Contact
            </Link>
            .
          </p>
        </div>
      </section>
    </TrustPage>
  );
}
