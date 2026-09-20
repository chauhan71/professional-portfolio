const { Jimp } = require('jimp');

async function createIcebergFrame() {
  const img = await Jimp.read('public/iceberg_landscape.jpg');
  const w = img.bitmap.width;
  const h = img.bitmap.height;

  const cx = w * 0.50;
  const cy = h * 0.42;
  const rx = w * 0.30;
  const ry = h * 0.36;

  img.scan(0, 0, w, h, function (x, y, idx) {
    const dx = (x - cx) / rx;
    const dy = (y - cy) / ry;
    
    // Add slight organic distortion to the oval
    const angle = Math.atan2(dy, dx);
    const wobble = 1 + 0.08 * Math.sin(angle * 5) + 0.05 * Math.cos(angle * 3);
    const dist = Math.sqrt(dx * dx + dy * dy) / wobble;

    let alpha = 255;
    if (dist < 0.78) {
      alpha = 0;
    } else if (dist < 1.22) {
      const t = (dist - 0.78) / (1.22 - 0.78);
      // Smooth hermite step
      alpha = Math.round(t * t * (3 - 2 * t) * 255);
    } else {
      alpha = 255;
    }

    this.bitmap.data[idx + 3] = alpha;
  });

  await img.write('public/iceberg_frame.png');
  console.log('Successfully generated public/iceberg_frame.png');
}

createIcebergFrame().catch(err => console.error(err));
