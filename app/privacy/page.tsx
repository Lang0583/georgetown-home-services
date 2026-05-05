import { permanentRedirect } from "next/navigation";

/** Canonical privacy policy lives at `/privacy-policy`. */
export default function PrivacyAliasPage() {
  permanentRedirect("/privacy-policy");
}
