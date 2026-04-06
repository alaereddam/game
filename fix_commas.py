import sys
with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(r'(noteValue: "[^"]*")(\s*highlight1:)', r'\1,\2', text)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)
