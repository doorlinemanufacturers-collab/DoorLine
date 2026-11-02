import fs from 'fs';
import path from 'path';

// Reads pictures that you copy into public/images/<folder>/ (anodizing, electroplating).
// No admin upload needed: add files, git push, done. Every picture gets an SEO alt text from its file name.
const EXT = /\.(jpe?g|png|webp|avif)$/i;
const LABEL = {
  anodizing: 'aluminium anodizing in Lahore, Pakistan',
  electroplating: 'aluminium electroplating in Lahore, Pakistan',
};

export function getLocalGallery(folder) {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', folder);
    return fs.readdirSync(dir)
      .filter((f) => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f, i) => {
        const nice = f.replace(EXT, '').replace(/[-_]+/g, ' ').replace(/\b\d{6,}\b/g, '').replace(/\s+/g, ' ').trim();
        const hint = nice && !/^(img|image|photo|pic|whatsapp|screenshot|dsc)\b/i.test(nice) ? `${nice} - ` : '';
        return { url: `/images/${folder}/${f}`, alt: `${hint}${LABEL[folder] || folder} - DoorLine Manufacturers sample ${i + 1}` };
      });
  } catch (e) {
    return [];
  }
}
