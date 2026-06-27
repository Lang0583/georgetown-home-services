# Vercel root directory shim

Some Vercel projects use **Root Directory** `georgetown-home-services`. The Next.js app lives at the repository root; this folder exists only so those deployments can clone and build successfully.

Install and build commands delegate to the parent directory (`..`).
