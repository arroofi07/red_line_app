const https = require('https');

https.get('https://redlinecomunication.com/production-redline/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[1].match(/\.(png|jpe?g|webp|svg)/i)) {
        images.add(match[1]);
      }
    }
    
    // Check for inline background images
    const bgRegex = /background-image:\s*url\((['"]?)([^'")]+)\1\)/g;
    while ((match = bgRegex.exec(data)) !== null) {
      if (match[2].match(/\.(png|jpe?g|webp|svg)/i)) {
        images.add(match[2]);
      }
    }

    // Check for Elementor/WordPress data attributes
    const dataSrcRegex = /data-src="([^">]+)"/g;
    while ((match = dataSrcRegex.exec(data)) !== null) {
      if (match[1].match(/\.(png|jpe?g|webp|svg)/i)) {
        images.add(match[1]);
      }
    }

    console.log(Array.from(images).join('\n'));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
