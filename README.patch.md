# Patch: Supabase + Cart + Shipping + WhatsApp (for your existing project)

This patch preserves your current design and product assets. It adds the following:
- `lib/supabaseClient.ts` - Supabase client initializer.
- `sql_init.sql` - SQL schema for `products`, `categories`, `shipping_zones`, `orders` and pre-filled governorates (cost=0).
- `components/CartContext.tsx` - Client-side cart stored in localStorage.
- `components/WhatsAppButton.tsx` - Client-side component to collect customer info and open WhatsApp with the order summary.
- `pages/api/save-order.js` - Example server endpoint to save orders into Supabase (requires SUPABASE_SERVICE_ROLE_KEY on server).

WhatsApp number used (from your message): +20 1094004720 (environment variable `NEXT_PUBLIC_WA_NUMBER` is set in .env.example).

---
## How to apply this patch to your project
1. Unzip this patch next to your project root (or merge files into your existing repo).
2. Install supabase package: `npm i @supabase/supabase-js`
3. Copy `.env.example` to `.env.local` and fill the Supabase credentials.
4. Run the SQL in `sql_init.sql` inside your Supabase project SQL editor.
5. Import and wrap your root app with `CartProvider` from `components/CartContext.tsx`.
6. Replace product data sources to fetch from Supabase rather than local constants (examples in README).
7. Add the `WhatsAppButton` component to your cart/checkout UI and implement fetching shipping cost by governorate from Supabase.
8. Protect admin pages using Supabase Auth and provide UI to edit `shipping_zones` costs.

---
If you want, I will now merge these changes into your `Site.zip` (I can create a single ZIP that combines your existing files plus this patch) and then we can continue with step-by-step deploy to Supabase + Vercel. Say "Merge and ZIP" and I'll produce the combined ZIP ready to download.
