/** localStorage value when user accepts analytics + personalized ads. */
export const COOKIE_CONSENT_ALL = "all";
/** localStorage value when user declines non-essential cookies (ads + analytics). */
export const COOKIE_CONSENT_ESSENTIAL = "essential";

export const COOKIE_CONSENT_STORAGE_KEY = "ghs_consent_v1";

/**
 * Runs in &lt;head&gt; before gtag loads — must stay in sync with {@link COOKIE_CONSENT_STORAGE_KEY}.
 * Google Consent Mode v2 defaults: denied until user accepts "all".
 */
export function getGoogleConsentDefaultBootstrapScript(): string {
  const key = COOKIE_CONSENT_STORAGE_KEY;
  return `(function(){var v="";try{v=localStorage.getItem(${JSON.stringify(key)})||"";}catch(e){}var all=v===${JSON.stringify(COOKIE_CONSENT_ALL)};window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{ad_storage:all?"granted":"denied",ad_user_data:all?"granted":"denied",ad_personalization:all?"granted":"denied",analytics_storage:all?"granted":"denied",personalization_storage:all?"granted":"denied",functionality_storage:"granted",security_storage:"granted",wait_for_update:500});})();`;
}
