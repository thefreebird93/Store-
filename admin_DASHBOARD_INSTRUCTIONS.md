# Admin Dashboard (instructions & minimal UI)

This folder contains a minimal roadmap for an admin dashboard you can host inside the same Next.js app.
Goal: let admin add/edit products, set shipping cost per governorate, and view orders.

Suggested pages (create under /app/admin or /pages/admin):
- /admin/login - protected by Supabase Auth (or simple secret)
- /admin/products - CRUD UI for products (title, price, images)
- /admin/shipping - list governorates and edit `cost` for each row (writes to `shipping_zones`)
- /admin/orders - list all orders and change status

Important: protect these pages using Supabase Auth or a simple server-side check using SUPABASE_SERVICE_ROLE_KEY.
