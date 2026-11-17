import urllib.request
import ssl
import re
import os
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

urls = [
    'https://berlocommunications.com/',
    'https://berlocommunications.com/about',
    'https://berlocommunications.com/team-one',
    'https://berlocommunications.com/services',
    'https://berlocommunications.com/blog',
    'https://berlocommunications.com/galleries/dhaka-international-trade',
    'https://berlocommunications.com/galleries/event-management',
    'https://berlocommunications.com/galleries/production-crisis',
    'https://berlocommunications.com/galleries/speaker-program'
]

os.makedirs('c:/wamp64\www/berlo-new/scratch/pages', exist_ok=True)
os.makedirs('c:/wamp64/www/berlo-new/frontend/public/images/berlo/clients', exist_ok=True)
os.makedirs('c:/wamp64/www/berlo-new/frontend/public/images/berlo/team', exist_ok=True)
os.makedirs('c:/wamp64/www/berlo-new/frontend/public/images/berlo/projects', exist_ok=True)

data = {}

for u in urls:
    name = u.replace('https://berlocommunications.com/', '').replace('/', '_') or 'home'
    print(f'Fetching {u}...')
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            path = f'c:/wamp64/www/berlo-new/scratch/pages/{name}.html'
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            data[name] = path
            print(f'Saved {name} ({len(content)} bytes)')
    except Exception as e:
        print(f'Failed {u}: {e}')

print('\nDone fetching pages!')
