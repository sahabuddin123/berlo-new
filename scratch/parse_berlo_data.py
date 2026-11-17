import re
import os
import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_image(url, target_path):
    if os.path.exists(target_path):
        return True
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            with open(target_path, 'wb') as f:
                f.write(resp.read())
        print(f"Downloaded: {target_path}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# ==========================================
# 1. PARSE TEAM MEMBERS from team-one.html
# ==========================================
with open('c:/wamp64/www/berlo-new/scratch/pages/team-one.html', 'r', encoding='utf-8') as f:
    team_html = f.read()

print("--- PARSING TEAM ---")
# Find team blocks: typical apexa theme structure
# e.g., team-item, team-thumb, team-content, h4, span
team_items = re.findall(r'<div[^>]*class="[^"]*team-item[^"]*"[^>]*>(.*?)</div>\s*</div>', team_html, flags=re.DOTALL)
if not team_items:
    # try another pattern
    team_items = re.findall(r'<div[^>]*class="[^"]*team-thumb[^"]*"[^>]*>(.*?)(?=<div[^>]*class="[^"]*team-thumb[^"]*"|\Z)', team_html, flags=re.DOTALL)

print(f"Found {len(team_items)} team raw items")

# Let's search for team names, images, roles in team_html
team_members = []
# Look for images and names
raw_matches = re.findall(r'<div[^>]*class="[^"]*team-(?:item|thumb)[^"]*"[^>]*>.*?<img[^>]*src="([^"]+)".*?<h[345][^>]*>(?:<a[^>]*>)?([^<]+)(?:</a>)?</h[345]>.*?<span[^>]*>([^<]+)</span>', team_html, flags=re.DOTALL)
print(f"Regex matches: {len(raw_matches)}")
for img, name, role in raw_matches:
    team_members.append({
        'name': name.strip(),
        'role': role.strip(),
        'image': img.strip()
    })
    print(f"Team: {name.strip()} | {role.strip()} | {img.strip()}")

# If raw_matches is empty, let's dump all img + h3/h4 in team_html
if not team_members:
    print("Trying alternative regex for team...")
    card_matches = re.findall(r'<div class="team-[^"]*">(.*?)</div>\s*</div>\s*</div>', team_html, flags=re.DOTALL)
    for c in card_matches:
        img_m = re.search(r'<img[^>]*src="([^"]+)"', c)
        name_m = re.search(r'<h[345][^>]*>(.*?)</h[345]>', c)
        role_m = re.search(r'<span[^>]*>(.*?)</span>', c)
        if name_m:
            name = re.sub(r'<[^>]+>', '', name_m.group(1)).strip()
            role = re.sub(r'<[^>]+>', '', role_m.group(1)).strip() if role_m else 'Team Member'
            img = img_m.group(1).strip() if img_m else ''
            team_members.append({'name': name, 'role': role, 'image': img})
            print(f"Alt Team: {name} | {role} | {img}")

# ==========================================
# 2. PARSE CLIENTS from home.html
# ==========================================
print("\n--- PARSING CLIENTS ---")
with open('c:/wamp64/www/berlo-new/scratch/pages/home.html', 'r', encoding='utf-8') as f:
    home_html = f.read()

client_imgs = re.findall(r'<img[^>]*src="([^"]*(?:clients|brand|client)[^"]*)"[^>]*alt="([^"]*)"', home_html, flags=re.IGNORECASE)
if not client_imgs:
    client_imgs = re.findall(r'src="([^"]*clients/[^"]*)"', home_html)
    client_imgs = [(img, os.path.basename(img).split('.')[0].replace('-', ' ').title()) for img in client_imgs]

clients = []
for img, alt in client_imgs:
    if not alt or alt.strip() == '':
        alt = os.path.basename(img).split('.')[0].replace('-', ' ').title()
    clients.append({'image': img, 'name': alt})
    print(f"Client: {alt} -> {img}")

# Also check all clients images mentioned in home.html
all_storage_imgs = set(re.findall(r'https?://berlocommunications\.com/storage/[^"\'\s]+\.(?:jpg|png|webp)', home_html))
for s in sorted(all_storage_imgs):
    print("Storage img in home:", s)

# ==========================================
# 3. PARSE GALLERIES / PROJECTS
# ==========================================
print("\n--- PARSING GALLERIES / PROJECTS ---")
galleries = [
    ('dhaka-international-trade', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_dhaka-international-trade.html'),
    ('event-management', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_event-management.html'),
    ('production-crisis', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_production-crisis.html'),
    ('speaker-program', 'c:/wamp64/www/berlo-new/scratch/pages/galleries_speaker-program.html')
]

projects = []
for slug, path in galleries:
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as gf:
            g_html = gf.read()
        title_m = re.search(r'<h[12][^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</h[12]>', g_html)
        if not title_m:
            title_m = re.search(r'<h1[^>]*>(.*?)</h1>', g_html)
        title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else slug.replace('-', ' ').title()
        
        # find gallery images
        imgs = re.findall(r'<img[^>]*src="([^"]*(?:storage|galleries)[^"]*\.(?:jpg|png|webp))"', g_html)
        # find description
        desc_m = re.search(r'<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>(.*?)</div>', g_html, flags=re.DOTALL)
        desc = re.sub(r'<[^>]+>', '', desc_m.group(1)).strip() if desc_m else ''
        
        projects.append({
            'slug': slug,
            'title': title,
            'desc': desc[:300] if desc else '',
            'images': list(set(imgs))[:8]
        })
        print(f"Project: {title} | {len(imgs)} images | {desc[:60]}...")

# ==========================================
# 4. PARSE BLOG POSTS
# ==========================================
print("\n--- PARSING BLOG POSTS ---")
with open('c:/wamp64/www/berlo-new/scratch/pages/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

blog_posts = []
posts_raw = re.findall(r'<article[^>]*>(.*?)</article>', blog_html, flags=re.DOTALL)
for p in posts_raw:
    title_m = re.search(r'<h[234][^>]*>(?:<a[^>]*>)?([^<]+)(?:</a>)?</h[234]>', p)
    img_m = re.search(r'<img[^>]*src="([^"]+)"', p)
    date_m = re.search(r'<time[^>]*>([^<]+)</time>', p) or re.search(r'<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]+)</span>', p)
    desc_m = re.search(r'<p[^>]*>([^<]+)</p>', p)
    
    if title_m:
        blog_posts.append({
            'title': title_m.group(1).strip(),
            'image': img_m.group(1).strip() if img_m else '',
            'date': date_m.group(1).strip() if date_m else '',
            'excerpt': desc_m.group(1).strip() if desc_m else ''
        })
        print(f"Blog: {title_m.group(1).strip()} | {date_m.group(1).strip() if date_m else ''}")

# Save extracted JSON
out = {
    'team': team_members,
    'clients': clients,
    'projects': projects,
    'blogs': blog_posts
}

with open('c:/wamp64/www/berlo-new/scratch/extracted_berlo_data.json', 'w', encoding='utf-8') as out_f:
    json.dump(out, out_f, indent=2, ensure_ascii=False)

print("\nSuccessfully saved extracted_berlo_data.json!")
