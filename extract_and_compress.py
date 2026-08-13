#!/usr/bin/env python3
"""
Video Frame Extractor & Compressor
Extracts frames from MP4 videos and compresses them to WebP format
"""

import os
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    print("Installing required packages...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "pillow-heif"])
    from PIL import Image
    import pillow_heif
    pillow_heif.register_heif_opener()

BASE_DIR = Path(r"C:\Users\w\Desktop\UI Dentist")
PUBLIC_VIDEOS_DIR = BASE_DIR / "public" / "videos"

VIDEOS = [
    {
        "name": "Video 1",
        "mp4": "1 Directing_dental_clinic_video_wa…_202608131643.mp4",
        "output": "video_1_frames",
    },
    {
        "name": "Video 2", 
        "mp4": "2 Dentist_examining_patient_in_clinic_202608131640.mp4",
        "output": "video_2_frames",
    },
    {
        "name": "Video 3",
        "mp4": "3 Directing_clinic_video_sequence_1080p_202608131649.mp4",
        "output": "video_3_frames",
    },
]

def extract_frames(mp4_path, output_dir):
    """Extract frames from MP4 using FFmpeg"""
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\nExtracting frames from: {mp4_path.name}")
    
    # Extract 2 fps (one frame every 0.5 seconds) for reasonable file count
    frame_pattern = output_dir / "frame_%04d.png"
    cmd = [
        "ffmpeg",
        "-i", str(mp4_path),
        "-vf", "fps=2",
        str(frame_pattern),
        "-y",  # Overwrite without asking
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        frames = sorted([f for f in output_dir.glob("*.png")])
        print(f"✓ Extracted {len(frames)} frames")
        return output_dir
    except subprocess.CalledProcessError as e:
        print(f"✗ Error extracting frames: {e.stderr}")
        return None
    except FileNotFoundError:
        print("✗ FFmpeg not found. Please install FFmpeg:")
        print("  Windows: Download from https://ffmpeg.org/download.html")
        print("  Or use: choco install ffmpeg (if Chocolatey installed)")
        return None

def compress_frames(frames_dir):
    """Compress PNG frames to WebP"""
    png_files = sorted(frames_dir.glob("*.png"))
    print(f"\nCompressing {len(png_files)} PNG frames to WebP...")
    
    converted = 0
    for i, png_file in enumerate(png_files, 1):
        try:
            webp_file = png_file.with_suffix(".webp")
            
            # Open and convert to WebP with quality 75
            img = Image.open(png_file)
            img.save(webp_file, "WEBP", quality=75)
            
            # Remove original PNG
            png_file.unlink()
            converted += 1
            
            if i % 10 == 0:
                print(f"  {converted}/{len(png_files)} frames converted", end="\r")
        except Exception as e:
            print(f"  ✗ Error converting {png_file.name}: {e}")
    
    print(f"\n✓ Converted {converted}/{len(png_files)} frames to WebP")
    return converted

def main():
    print("=" * 60)
    print("Video Frame Extraction & Compression")
    print("=" * 60)
    
    # Ensure output directory exists
    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    
    total_frames = 0
    
    for video in VIDEOS:
        mp4_path = BASE_DIR / video["mp4"]
        output_dir = PUBLIC_VIDEOS_DIR / video["output"]
        
        # Check if MP4 exists
        if not mp4_path.exists():
            print(f"\n✗ {video['name']}: MP4 file not found at {mp4_path}")
            continue
        
        print(f"\n{'─' * 60}")
        print(f"Processing: {video['name']}")
        print(f"{'─' * 60}")
        
        # Extract frames
        frames_dir = extract_frames(mp4_path, output_dir)
        if frames_dir is None:
            continue
        
        # Compress frames
        count = compress_frames(frames_dir)
        total_frames += count
    
    print("\n" + "=" * 60)
    print(f"✓ All done! Processed {total_frames} total frames")
    print("=" * 60)

if __name__ == "__main__":
    main()
