const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressFrames(videoDir, videoName) {
  try {
    console.log(`\nProcessing ${videoName}...`);
    const framesPath = path.join(__dirname, 'public', 'videos', videoDir);
    const files = fs.readdirSync(framesPath).filter(f => f.endsWith('.png'));
    
    console.log(`Found ${files.length} PNG frames`);
    
    let converted = 0;
    for (const file of files) {
      const inputPath = path.join(framesPath, file);
      const outputPath = path.join(framesPath, file.replace('.png', '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ quality: 75 })
          .toFile(outputPath);
        
        // Remove the original PNG
        fs.unlinkSync(inputPath);
        converted++;
        
        if (converted % 50 === 0) {
          process.stdout.write(`  ${converted}/${files.length} frames converted\r`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
    
    console.log(`\n✓ ${videoName}: ${converted} WebP frames created, PNG files removed`);
    return converted;
  } catch (error) {
    console.error(`Error with ${videoName}:`, error.message);
  }
}

async function main() {
  console.log('Starting frame compression...');
  
  const v1 = await compressFrames('video_1_frames', 'Video 1');
  const v2 = await compressFrames('video_2_frames', 'Video 2');
  const v3 = await compressFrames('video_3_frames', 'Video 3');
  
  console.log('\n' + '='.repeat(50));
  console.log(`✓ All frame compression complete!`);
  console.log(`  Video 1: ${v1} frames`);
  console.log(`  Video 2: ${v2} frames`);
  console.log(`  Video 3: ${v3} frames`);
  console.log('='.repeat(50));
}

main().catch(console.error);
