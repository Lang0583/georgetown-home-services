"use client";

import { useEffect } from "react";
import { trackAiReferral } from "@/lib/analytics";

const AI_HOST_PATTERNS: { hostIncludes: string; source: string }[] = [
  { hostIncludes: "chatgpt.com", source: "chatgpt" },
  { hostIncludes: "chat.openai.com", source: "chatgpt" },
  { hostIncludes: "perplexity.ai", source: "perplexity" },
  { hostIncludes: "claude.ai", source: "claude" },
  { hostIncludes: "copilot.microsoft.com", source: "copilot" },
  { hostIncludes: "bing.com", source: "bing_chat" },
  { hostIncludes: "gemini.google.com", source: "gemini" },
];

/**
 * Fires a one-shot GA4 `ai_referral` event when document.referrer looks like an AI answer engine.
 */
export default function AiReferralTracker() {
  useEffect(() => {
    try {
      const ref = document.referrer;
      if (!ref) return;
      const host = new URL(ref).hostname.toLowerCase();
      const match = AI_HOST_PATTERNS.find((p) => host.includes(p.hostIncludes));
      if (!match) return;
      const key = `ghs_ai_ref_${match.source}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      trackAiReferral(match.source, host);
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
