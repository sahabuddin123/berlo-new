import re
import os
import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_file(url, out_path):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
        return True
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            with open(out_path, 'wb') as f:
                f.write(data)
        print(f"Downloaded: {out_path} ({len(data)} bytes)")
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# Load extracted data
with open('c:/wamp64/www/berlo-new/scratch/extracted_berlo_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. Download Team Images
print("\n--- DOWNLOADING TEAM IMAGES ---")
for member in data['team']:
    img_url = member['image']
    if img_url:
        filename = os.path.basename(img_url)
        local_path = f"c:/wamp64/www/berlo-new/frontend/public/images/berlo/team/{filename}"
        if download_file(img_url, local_path):
            member['local_image'] = f"/images/berlo/team/{filename}"

# 2. Download Client Images
print("\n--- DOWNLOADING CLIENT IMAGES ---")
for client in data['clients']:
    img_url = client['image']
    if img_url:
        filename = os.path.basename(img_url)
        local_path = f"c:/wamp64/www/berlo-new/frontend/public/images/berlo/clients/{filename}"
        if download_file(img_url, local_path):
            client['local_image'] = f"/images/berlo/clients/{filename}"

# Also check for other clients mentioned in about or home
more_client_urls = [
    'https://berlocommunications.com/storage/clients/agery-calture.jpg',
    'https://berlocommunications.com/storage/clients/bubt.jpg',
    'https://berlocommunications.com/storage/clients/epbb.jpg',
    'https://berlocommunications.com/storage/clients/idcol.jpg',
    'https://berlocommunications.com/storage/clients/stynova.jpg',
    'https://berlocommunications.com/storage/clients/uap.jpg',
    'https://berlocommunications.com/storage/synova-150x150.jpg',
    'https://berlocommunications.com/storage/about-3.jpg',
    'https://berlocommunications.com/storage/home-banner2.jpg',
    'https://berlocommunications.com/storage/berlo-new-logos.png'
]

for url in more_client_urls:
    fname = os.path.basename(url)
    lpath = f"c:/wamp64/www/berlo-new/frontend/public/images/berlo/{fname}"
    download_file(url, lpath)

# 3. Extract and Download Project / Gallery Images
print("\n--- DOWNLOADING GALLERY / PROJECT IMAGES ---")
gallery_files = [
    ('dhaka-trade-fair', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_dhaka-international-trade.html'),
    ('event-management', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_event-management.html'),
    ('production-crisis', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_production-crisis.html'),
    ('speaker-program', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_speaker-program.html')
]

all_projects = []
for proj_key, g_path in gallery_files:
    if not os.path.exists(g_path):
        continue
    with open(g_path, 'r', encoding='utf-8') as f:
        gh = f.read()
    
    # Extract all storage images in this gallery
    g_imgs = list(set(re.findall(r'https?://berlocommunications\.com/storage/[^"\'\s]+\.(?:jpg|png|webp)', gh)))
    print(f"\nProject {proj_key} has {len(g_imgs)} storage images:")
    downloaded_imgs = []
    for g_url in g_imgs:
        if '-150x150' in g_url: # skip small thumbnails if full exists
            continue
        g_fname = f"{proj_key}_{os.path.basename(g_url)}"
        g_lpath = f"c:/wamp64/www/berlo-new/frontend/public/images/berlo/projects/{g_fname}"
        if download_file(g_url, g_lpath):
            downloaded_imgs.append(f"/images/berlo/projects/{g_fname}")
    
    # Extract title and description
    title_m = re.search(r'<h[12][^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</h[12]>', gh)
    desc_m = re.search(r'<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>(.*?)</div>', gh, flags=re.DOTALL)
    title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else proj_key.replace('-', ' ').title()
    desc = re.sub(r'<[^>]+>', '', desc_m.group(1)).strip() if desc_m else ''

    all_projects.append({
        'id': proj_key,
        'title': title,
        'desc': desc,
        'images': downloaded_imgs
    })

# Save enriched data
data['projects_detailed'] = all_projects
with open('c:/wamp64/www/berlo-new/scratch/berlo_complete_assets.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n--- ALL ASSETS SUCCESSFULLY DOWNLOADED & COMPILED ---")
