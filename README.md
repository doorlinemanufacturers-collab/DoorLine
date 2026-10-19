# DoorLine Manufacturers - Next.js 14 SEO Website

## Local run
npm install && npm run dev

## Deploy (GitHub -> Vercel)
1. GitHub par naya repo banayein aur ye folder push karein.
2. Vercel > Add New Project > repo import > Deploy.
3. Vercel Project > Settings > Environment Variables: NEXT_PUBLIC_SITE_URL = https://aapka-domain.com
4. **Admin edits save hone ke liye (zaroori):** Vercel Project > Storage > "Upstash Redis" (KV) create/connect karein (KV_REST_API_URL / KV_REST_API_TOKEN khud add ho jate hain).
5. **Admin se image upload ke liye:** Storage > Blob create karein (BLOB_READ_WRITE_TOKEN auto). Redeploy karein.
6. /admin par login: username `waheed999`.

## Images
Apni images /public/images me rakhein aur admin me path likhein: /images/file-name.jpg

## Security
Admin password code me default hai. Apne Vercel env me ADMIN_USER, ADMIN_PASS, AUTH_SECRET set kar ke isay override karein.
