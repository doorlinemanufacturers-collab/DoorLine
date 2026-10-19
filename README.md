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
