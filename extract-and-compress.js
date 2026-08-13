const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const baseDir = 'c:\\Users\\w\\Desktop\\UI Dentist';
const videoFiles = [
  { mp4: '1 Directing_dental_clinic_video_wa…_202608131643.mp4', output: 'video_1_frames' },
  { mp4: '2 Dentist_examining_patient_in_clinic_202608131640.mp4', output: 'video_2_frames' },
  { mp4: '3 Directing_clinic_video_sequence_1080p_202608131649.mp4', output: 'video_3_frames' },
];

async function extractFrames(videoPath, outputDir) {
  try {
    const fullInputPath = path.join(baseDir, videoPath);
    const fullOutputDir = path.join(baseDir, 'public', 'videos', outputDir);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(fullOutputDir)) {
      fs.mkdirSync(fullOutputDir, { recursive: true });
    }
    
    console.log(`\nExtracting frames from: ${videoPath}`);
    console.log(`Output directory: ${fullOutputDir}`);
    
    // FFmpeg command to extract frames (one every second or 2fps for faster processing)
    // Using 2 fps: -vf fps=2
    const framePattern = path.join(fullOutputDir, 'frame_%04d.png');
    const cmd = `ffmpeg -i "${fullInputPath}" -vf fps=2 "${framePattern}" -y`;
    
    console.log('Running FFmpeg...');
    const output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(output);
    
    // Count extracted frames
    const files = fs.readdirSync(fullOutputDir).filter(f => f.endsWith('.png'));
    console.log(`✓ Extracted ${files.length} frames from ${videoPath}`);
    
    return fullOutputDir;
  } catch (error) {
    console.error(`Error extracting frames from ${videoPath}:`, error.message);
    return null;
  }
}

async function compressFrames(videoDir) {
  try {
    console.log(`\nCompressing frames in: ${videoDir}`);
    const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.png'));
    
    console.log(`Found ${files.length} PNG frames to compress`);
    
    let converted = 0;
    for (const file of files) {
      const inputPath = path.join(videoDir, file);
      const outputPath = path.join(videoDir, file.replace('.png', '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ quality: 75 })
          .toFile(outputPath);
        
        // Remove the original PNG
        fs.unlinkSync(inputPath);
        converted++;
        
        if (converted % 10 === 0) {
          process.stdout.write(`  ${converted}/${files.length} frames converted\r`);
        }
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
    
    console.log(`\n✓ Converted ${converted} frames to WebP format`);
    return converted;
  } catch (error) {
    console.error(`Error compressing frames:`, error.message);
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Video Frame Extraction & Compression Tool');
  console.log('='.repeat(60));
  
  try {
    // Check if FFmpeg is available
    console.log('\nChecking FFmpeg availability...');
    const ffmpegTest = execSync('ffmpeg -version', { encoding: 'utf-8', stdio: 'pipe' });
    console.log('✓ FFmpeg is available');
  } catch (error) {
    console.error('✗ FFmpeg not found. Please install FFmpeg first.');
    console.error('  Install from: https://ffmpeg.org/download.html');
    process.exit(1);
  }
  
  // Extract and compress each video
  for (const video of videoFiles) {
    try {
      const outputDir = await extractFrames(video.mp4, video.output);
      if (outputDir) {
        await compressFrames(outputDir);
      }
    } catch (error) {
      console.error(`Failed to process ${video.mp4}:`, error.message);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✓ Processing complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
