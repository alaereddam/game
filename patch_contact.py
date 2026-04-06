import re
import sys

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace Maison Reddam -> Aicha Caftan and add whatsappLabel

# 1. French
text = re.sub(
    r'(contact:\s*\{[\s\S]*?)(send: "Envoyer le message"\s*\n\s*\})',
    r'\1whatsappLabel: "Réponse rapide pour tailles, vidéos et disponibilités",\n      \2',
    text, count=1
)
text = text.replace("Contactez Maison Reddam", "Contactez Aicha Caftan")

# 2. Spanish
text = re.sub(
    r'(contact:\s*\{[\s\S]*?)(send: "Enviar mensaje"\s*\n\s*\})',
    r'\1whatsappLabel: "Respuesta rápida para tallas, videos y disponibilidades",\n      \2',
    text, count=1
)
text = text.replace("Contacta con Maison Reddam", "Contacta con Aicha Caftan")

# 3. Arabic
text = re.sub(
    r'(contact:\s*\{[\s\S]*?)(send: "إرسال الرسالة"\s*\n\s*\})',
    r'\1whatsappLabel: "رد سريع حول المقاسات، الفيديوهات، والتوافر",\n      \2',
    text, count=1
)
text = text.replace("دار ردّام", "عائشة قفطان")

# 4. English
text = re.sub(
    r'(contact:\s*\{[\s\S]*?)(send: "Send message"\s*\n\s*\})',
    r'\1whatsappLabel: "Fast response for sizes, videos, and availability",\n      \2',
    text, count=1
)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)
