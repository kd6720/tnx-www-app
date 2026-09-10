import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Blog image version map, computed at build time.
 *
 * Maps every file under public/blog-images (relative path, e.g.
 * "thumbs/foo.jpg") to a short hash of its bytes. The blog renders image
 * URLs as "/blog-images/<file>?v=<hash>", so:
 *   - when an image is regenerated under the same filename, the URL changes
 *     and no browser or CDN (Cloudflare sits in front of Netlify) can serve
 *     the old copy;
 *   - the app knows at build time which derivatives exist, so a missing
 *     thumbnail or hero JPEG falls back to the original PNG instead of
 *     rendering a broken image.
 */
function blogImageVersions(): Record<string, string> {
  const root = fileURLToPath(new URL('./public/blog-images', import.meta.url));
  const out: Record<string, string> = {};
  if (!existsSync(root)) return out;
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, `${prefix}${entry.name}/`);
      else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
        out[`${prefix}${entry.name}`] = createHash('md5').update(readFileSync(full)).digest('hex').slice(0, 8);
      }
    }
  };
  walk(root, '');
  return out;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BLOG_IMAGE_VERSIONS__: JSON.stringify(blogImageVersions()),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
