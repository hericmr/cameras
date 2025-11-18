#!/usr/bin/env python3
"""
Script to merge camera data from CSV file with existing cameras.json
Creates a detailed JSON file with all camera information.
"""

import csv
import json
import re
import os
from typing import Dict, Any, Optional

def extract_camera_number_from_url(url: str) -> Optional[str]:
    """
    Extracts camera number from URL (e.g., cam0451 -> CAM0451)
    Matches the logic in csvParser.ts
    """
    match = re.search(r'/cam(\d+)/', url, re.IGNORECASE)
    if match:
        camera_num = match.group(1)
        # Pad with zeros to 4 digits
        return f"CAM{camera_num.zfill(4)}"
    return None

def load_csv_data(csv_path: str) -> Dict[str, Dict[str, Any]]:
    """
    Loads CSV data and creates a dictionary indexed by camera_number
    """
    camera_data = {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            camera_number = row.get('camera_number', '').strip()
            if camera_number:
                camera_data[camera_number] = dict(row)
    
    return camera_data

def load_json_data(json_path: str) -> Dict[str, Dict[str, Any]]:
    """
    Loads existing cameras.json file
    """
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def merge_camera_data(json_data: Dict[str, Dict[str, Any]], 
                     csv_data: Dict[str, Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    """
    Merges JSON camera data with CSV data
    """
    merged_data = {}
    matched_count = 0
    unmatched_cameras = []
    
    for camera_id, camera_info in json_data.items():
        url = camera_info.get('url', '')
        
        # Extract camera number from URL
        camera_number = extract_camera_number_from_url(url)
        
        # Start with existing JSON data (without lugar field)
        merged_camera = {
            'id': camera_id,
            'url': url,
        }
        
        # Try to match with CSV data
        if camera_number and camera_number in csv_data:
            csv_info = csv_data[camera_number]
            
            # Add all CSV fields to merged camera
            merged_camera.update({
                'camera_number': csv_info.get('camera_number', ''),
                'original_id': csv_info.get('original_id', ''),
                'latitude': csv_info.get('latitude', ''),
                'longitude': csv_info.get('longitude', ''),
                'utm_x': csv_info.get('utm_x', ''),
                'utm_y': csv_info.get('utm_y', ''),
                'street': csv_info.get('street', ''),
                'intersection': csv_info.get('intersection', ''),
                'neighborhood': csv_info.get('neighborhood', ''),
                'camera_type': csv_info.get('camera_type', ''),
                'status': csv_info.get('status', ''),
                'status_id': csv_info.get('status_id', ''),
                'organizational_unit': csv_info.get('organizational_unit', ''),
                'installation_date': csv_info.get('installation_date', ''),
                'is_active': csv_info.get('is_active', ''),
                'is_public': csv_info.get('is_public', ''),
                'is_santos_aovivo': csv_info.get('is_santos_aovivo', ''),
                'created_at': csv_info.get('created_at', ''),
                'updated_at': csv_info.get('updated_at', ''),
            })
            matched_count += 1
        else:
            # Camera not found in CSV - keep only JSON data
            unmatched_cameras.append({
                'id': camera_id,
                'camera_number': camera_number or 'N/A',
                'url': url
            })
        
        merged_data[camera_id] = merged_camera
    
    # Print statistics
    print(f"\n{'='*60}")
    print(f"Merge Statistics:")
    print(f"{'='*60}")
    print(f"Total cameras in JSON: {len(json_data)}")
    print(f"Matched with CSV: {matched_count}")
    print(f"Unmatched cameras: {len(unmatched_cameras)}")
    
    if unmatched_cameras:
        print(f"\nUnmatched cameras:")
        for cam in unmatched_cameras[:10]:  # Show first 10
            print(f"  - ID: {cam['id']}, Camera: {cam['camera_number']}, URL: {cam['url'][:60]}...")
        if len(unmatched_cameras) > 10:
            print(f"  ... and {len(unmatched_cameras) - 10} more")
    
    return merged_data

def main():
    # File paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, 'cameras_rows.csv')
    json_path = os.path.join(script_dir, 'src', 'assets', 'cameras.json')
    output_path = os.path.join(script_dir, 'src', 'assets', 'cameras_detailed.json')
    
    print(f"CSV file: {csv_path}")
    print(f"JSON file: {json_path}")
    print(f"Output file: {output_path}")
    
    # Check if files exist
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        return
    
    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}")
        return
    
    # Load data
    print("\nLoading CSV data...")
    csv_data = load_csv_data(csv_path)
    print(f"Loaded {len(csv_data)} cameras from CSV")
    
    print("\nLoading JSON data...")
    json_data = load_json_data(json_path)
    print(f"Loaded {len(json_data)} cameras from JSON")
    
    # Merge data
    print("\nMerging data...")
    merged_data = merge_camera_data(json_data, csv_data)
    
    # Write output
    print(f"\nWriting merged data to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, indent=4, ensure_ascii=False)
    
    print(f"\n✓ Successfully created detailed JSON file!")
    print(f"  Output: {output_path}")
    print(f"  Total cameras: {len(merged_data)}")

if __name__ == '__main__':
    main()

