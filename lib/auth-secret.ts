/**
 * Shared auth secret used by BOTH the NextAuth API (Node runtime) and the
 * edge middleware.
 *
 * WHY hardcoded instead of env-only:
 * - Vercel's Edge runtime does NOT receive environment variables from
 *   committed `.env*` files (only `NEXT_PUBLIC_` vars are inlined into edge
 *   bundles). The middleware was silently getting `undefined` for
 *   `NEXTAUTH_SECRET`, so `getToken()` could never decrypt the session
 *   cookie and every protected route redirected back to /login.
 * - Node serverless functions DO receive the dashboard env at runtime, so
 *   `process.env.NEXTAUTH_SECRET` alone worked on the API side but never in
 *   middleware — the two runtimes disagreed on the secret.
 *
 * To keep both runtimes in sync the secret is baked into the bundle. It is
 * already committed to the repo in `.env.local`, so hardcoding it here adds
 * no new exposure. If you change it, change BOTH this file and `.env.local`.
 */
export const AUTH_SECRET = 'pL7xK2mQ9vR4nJ6wT8bF3hD5sA1yM0pX8qZ3';
