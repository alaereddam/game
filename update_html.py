import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Add EN button
content = content.replace(
    '<button class="lang-button is-active" type="button" data-locale="fr">FR</button>\n            <button class="lang-button" type="button" data-locale="es">ES</button>',
    '<button class="lang-button is-active" type="button" data-locale="fr">FR</button>\n            <button class="lang-button" type="button" data-locale="en">EN</button>\n            <button class="lang-button" type="button" data-locale="es">ES</button>'
)

# Add data-wa-message attributes to specific elements
content = re.sub(
    r'(href="https://wa.me/.*?vos%20caftans." target="_blank" rel="noreferrer" data-i18n="hero.ctaOrder")',
    r'\1 data-wa-message="wa.hero"',
    content
)

content = re.sub(
    r'(href="https://wa.me/.*?choisir%20ma%20tenue." target="_blank" rel="noreferrer")',
    r'\1 data-wa-message="wa.about"',
    content
)

content = re.sub(
    r'(href="https://wa.me/.*?vos%20caftans%20et%20takchitas." target="_blank" rel="noreferrer")',
    r'\1 data-wa-message="wa.contact"',
    content
)

content = re.sub(
    r'(<a class="contact-whatsapp-cta" href="https://wa.me/.*?ma%20tenue." target="_blank" rel="noreferrer")',
    r'\1 data-wa-message="wa.contact"',
    content
)

content = re.sub(
    r'(href="https://wa.me/.*?sur%20mesure." target="_blank" rel="noreferrer" id="modal-contact-link" data-i18n="modal.custom")',
    r'\1 data-wa-message="wa.custom"',
    content
)

content = re.sub(
    r'(href="https://wa.me/.*?vos%20caftans." target="_blank" rel="noreferrer" aria-label="WhatsApp Aicha Caftan")',
    r'\1 data-wa-message="wa.float"',
    content
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
