#!/usr/bin/env python3
"""
Script to recursively update HTML files with logo images and JSON-LD schema.
"""

import os
import json
from pathlib import Path
from bs4 import BeautifulSoup
import re

def find_logo_file(start_path="."):
    """Find the logobw.png file and return its relative path from start_path."""
    for root, dirs, files in os.walk(start_path):
        if "logobw.png" in files:
            logo_path = os.path.join(root, "logobw.png")
            # Get relative path from start_path
            relative_path = os.path.relpath(logo_path, start_path)
            return relative_path
    return None

def find_html_files(start_path="."):
    """Find all HTML files in the project."""
    html_files = []
    for root, dirs, files in os.walk(start_path):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def get_relative_path_to_logo(html_file_path, logo_relative_path):
    """Calculate the relative path from HTML file to logo file."""
    html_dir = os.path.dirname(html_file_path)
    if html_dir == "":
        html_dir = "."
    
    # Calculate relative path from HTML file location to logo
    relative_to_logo = os.path.relpath(logo_relative_path, html_dir)
    return relative_to_logo

def has_logo_image(soup, logo_path):
    """Check if the HTML already has an img tag with the logo."""
    img_tags = soup.find_all('img')
    for img in img_tags:
        src = img.get('src', '')
        if logo_path in src:
            return True
    return False

def has_organization_schema(soup):
    """Check if the HTML already has Organization JSON-LD schema."""
    scripts = soup.find_all('script', type='application/ld+json')
    for script in scripts:
        try:
            data = json.loads(script.string)
            if data.get('@type') == 'Organization':
                return True
        except (json.JSONDecodeError, AttributeError):
            continue
    return False

def insert_logo_image(soup, logo_path):
    """Insert logo image into header or body."""
    # Look for header tag first
    header = soup.find('header')
    if header:
        # Insert at the beginning of header
        img_tag = soup.new_tag('img', src=logo_path, alt="DualSpark Studio Logo", height="50")
        header.insert(0, img_tag)
        return True
    else:
        # Look for body tag
        body = soup.find('body')
        if body:
            # Insert at the beginning of body
            img_tag = soup.new_tag('img', src=logo_path, alt="DualSpark Studio Logo", height="50")
            body.insert(0, img_tag)
            return True
    return False

def insert_organization_schema(soup, full_logo_url):
    """Insert Organization JSON-LD schema into head."""
    head = soup.find('head')
    if not head:
        return False
    
    schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DualSpark Studio",
        "url": "https://dualsparkstudio.com",
        "logo": full_logo_url
    }
    
    script_tag = soup.new_tag('script', type='application/ld+json')
    script_tag.string = json.dumps(schema, indent=2)
    
    # Insert before the closing head tag
    head.append(script_tag)
    return True

def update_html_file(html_file_path, logo_relative_path):
    """Update a single HTML file with logo and schema."""
    print(f"Processing: {html_file_path}")
    
    # Read the HTML file
    with open(html_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Calculate relative path from this HTML file to logo
    relative_to_logo = get_relative_path_to_logo(html_file_path, logo_relative_path)
    
    # Calculate full URL for the logo
    full_logo_url = f"https://dualsparkstudio.com/{logo_relative_path.replace(os.sep, '/')}"
    
    changes_made = []
    
    # Check and insert logo image
    if not has_logo_image(soup, relative_to_logo):
        if insert_logo_image(soup, relative_to_logo):
            changes_made.append("Added logo image")
        else:
            print(f"  Warning: Could not insert logo image (no header or body tag found)")
    else:
        print(f"  Skipped: Logo image already exists")
    
    # Check and insert Organization schema
    if not has_organization_schema(soup):
        if insert_organization_schema(soup, full_logo_url):
            changes_made.append("Added Organization JSON-LD schema")
        else:
            print(f"  Warning: Could not insert schema (no head tag found)")
    else:
        print(f"  Skipped: Organization schema already exists")
    
    # Save changes if any were made
    if changes_made:
        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"  Updated: {', '.join(changes_made)}")
        return True
    else:
        print(f"  No changes needed")
        return False

def main():
    """Main function to orchestrate the HTML file updates."""
    print("Starting HTML file update process...")
    
    # Step 1: Find the logo file
    print("\n1. Searching for logobw.png...")
    logo_path = find_logo_file()
    if not logo_path:
        print("Error: logobw.png not found in the project directory!")
        return
    
    print(f"Found logo at: {logo_path}")
    
    # Step 2: Find all HTML files
    print("\n2. Searching for HTML files...")
    html_files = find_html_files()
    if not html_files:
        print("No HTML files found in the project directory!")
        return
    
    print(f"Found {len(html_files)} HTML file(s):")
    for html_file in html_files:
        print(f"  - {html_file}")
    
    # Step 3: Update each HTML file
    print("\n3. Updating HTML files...")
    updated_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        try:
            if update_html_file(html_file, logo_path):
                updated_count += 1
            else:
                skipped_count += 1
        except Exception as e:
            print(f"Error processing {html_file}: {e}")
            skipped_count += 1
    
    # Summary
    print(f"\n4. Summary:")
    print(f"  Files updated: {updated_count}")
    print(f"  Files skipped: {skipped_count}")
    print(f"  Total files processed: {len(html_files)}")

if __name__ == "__main__":
    main() 