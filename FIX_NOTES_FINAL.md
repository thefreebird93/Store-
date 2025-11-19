Fix notes:
- Removed `pages/` directory to use App Router (app/) exclusively.
- Rewrote next.config.js to safely inject webpack alias '@' -> project root and remove experimental.appDir.
- Added jsconfig.json so IDEs and build tools resolve the '@/*' alias.
- Ensure environment variables are set in Vercel before deploying:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  NEXT_PUBLIC_WA_NUMBER
