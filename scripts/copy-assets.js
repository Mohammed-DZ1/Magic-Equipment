import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Copy videos from public to dist
const videosToCopy = [
  'Hero.mp4',
  'hero-mobile.mp4'
];

videosToCopy.forEach(video => {
  const src = path.join(projectRoot, 'public', video);
  const dest = path.join(projectRoot, 'dist', video);
  
  try {
    if (fs.existsSync(src)) {
      fs.copySync(src, dest);
      console.log(`✓ Copied ${video} to dist/`);
    }
  } catch (error) {
    console.error(`✗ Error copying ${video}:`, error.message);
  }
});

console.log('✓ Asset copy complete');
