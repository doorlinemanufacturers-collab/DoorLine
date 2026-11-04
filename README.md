# DoorLine Manufacturers - Next.js 14 SEO Website

Pages: Home, Products (with categories), Product detail, About, FAQ, Contact Us, /admin.

## Run locally
npm install && npm run dev

## Deploy (GitHub -> Vercel)
1. Push this folder to your GitHub repository.
2. In Vercel: Add New Project, import the repository, Deploy.
3. Project Settings > Environment Variables: NEXT_PUBLIC_SITE_URL = https://your-domain.com
4. Admin saving (required): Project > Storage > create an Upstash Redis (KV) database and connect it to the project. KV_REST_API_URL and KV_REST_API_TOKEN are added automatically. Redeploy.
5. Admin image upload: Storage > create a Blob store and connect it (BLOB_READ_WRITE_TOKEN is added automatically). Redeploy.
6. Open /admin and log in.

## Images
Put images in /public/images and enter the path in the admin, for example /images/file-name.jpg

## Security
Set ADMIN_USER, ADMIN_PASS and AUTH_SECRET in Vercel environment variables to override the defaults in the code.

## AI Product Writer (optional)
Add ANTHROPIC_API_KEY (from console.anthropic.com) in Vercel Environment Variables and Redeploy. In the admin, open a product and click Write draft with AI. Review the draft before saving.

## SEO notes
- Business schema (JSON-LD) lives in app/layout.js. All JSON-LD goes through jsonLd() in lib/site.js (escapes < > & so text can never break the script tag).
- Set NEXT_PUBLIC_SITE_URL to the exact domain you serve (https://www.doorlinemanufacturers.com) and redirect the other version (www or non-www) to it.
- If you ever saved content in /admin, saved values override defaultContent.js. Update hero text, FAQs, badges, email and address in /admin too.
- Optional: put latitude/longitude from Google Maps in site.lat / site.lng (lib/defaultContent.js) to add geo coordinates to the schema.

## Anodizing / electroplating pictures
Copy photos into public/images/anodizing/ (or public/images/electroplating/), git add, commit, push. They show on the service page and the homepage automatically; the file name becomes the Google picture description. Rule for all text: never write only "Lahore", always "Lahore, Pakistan" (text saved from /admin is fixed automatically by withPakistan() in lib/site.js).

## Internal linking (topic clusters)
All link targets live in lib/linkMap.js. Clusters: handles, hardware, finishing (anodizing + electroplating), manufacturer/wholesale.
- Every page ends with a RelatedLinks block (components/RelatedLinks.js) built from the cluster map.
- Body text gets one contextual link per keyword via makeLinker() (first mention only, max 7 per page, 2 per paragraph).
- Header, footer and popular-search chips always contain the main keyword pages (withCoreChips()).
- Factory map: footer iframe on every page, LocationBlock on home + Lahore page, contact page map, schema hasMap. Put your Google Business Profile link in /admin (Google Business) and site.mapUrl / site.lat / site.lng in lib/defaultContent.js.
