import re
import json

with open('c:/wamp64/www/berlo-new/scratch/berlo_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find internal links
links = set(re.findall(r'href=["\'](https?://berlocommunications\.com/[^"\'#\s]*)["\']', html))
print('=== INTERNAL LINKS ===')
for l in sorted(links):
    print(' -', l)

# Find all images
imgs = set(re.findall(r'src=["\']([^"\'\s]+\.(?:png|jpe?g|webp|svg))["\']', html))
print(f'\n=== IMAGES FOUND ({len(imgs)}) ===')
for img in sorted(imgs):
    if 'berlocommunications.com' in img:
        print(' -', img)

# Find headings
headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', html, flags=re.DOTALL)
print(f'\n=== HEADINGS ({len(headings)}) ===')
for h in headings:
    clean_h = re.sub(r'<[^>]+>', '', h).strip()
    if clean_h:
        print(' *', clean_h)
