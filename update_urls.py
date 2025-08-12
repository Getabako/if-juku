#!/usr/bin/env python3
import os
import re
import json

def update_wordpress_urls(content):
    """Replace WordPress URLs with local public folder URLs"""
    # Pattern to match WordPress URLs
    pattern = r'https://if-juku\.net/wp-content/uploads/(\d{4})/(\d{2})/([^"\']+)'
    
    # Replace with local path format
    # For GitHub Pages, we need to use relative paths from the root
    replacement = r'/\1/\2/\3'
    
    return re.sub(pattern, replacement, content)

def process_file(filepath):
    """Process a single file to update URLs"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file contains WordPress URLs
        if 'https://if-juku.net/wp-content/uploads/' in content:
            updated_content = update_wordpress_urls(content)
            
            # Write back only if content changed
            if updated_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"Updated: {filepath}")
                return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Main function to process all relevant files"""
    updated_count = 0
    
    # Process TypeScript/React files
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    updated_count += 1
    
    # Process JSON data files
    for root, dirs, files in os.walk('src/data'):
        for file in files:
            if file.endswith('.json'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    updated_count += 1
    
    print(f"\nTotal files updated: {updated_count}")

if __name__ == "__main__":
    main()