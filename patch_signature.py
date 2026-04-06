import re
import sys

def patch_hero_and_signature(lang_prefix, additions, next_lang, full_text):
    start_idx = full_text.find(lang_prefix)
    if start_idx == -1: return full_text
    
    end_idx = full_text.find(next_lang) if next_lang else len(full_text)
    chunk = full_text[start_idx:end_idx]
    
    # 1. Add into hero block
    # Match the end of hero block: "noteValue: "..."\n    },"
    hero_end_pattern = r'(hero:\s*\{[\s\S]*?)(    \},)'
    
    hero_additions = f"""
      highlight1: "{additions['h1']}",
      highlight2: "{additions['h2']}",
      highlight3: "{additions['h3']}",
      link: "{additions['link']}",
      metric1Label: "{additions['m1']}",
      metric2Label: "{additions['m2']}",
      metric3Label: "{additions['m3']}",
      signatureTitle: "{additions['st']}",
      signatureText: "{additions['sx']}"
"""
    
    # Insert before the closing brace of hero
    chunk = re.sub(hero_end_pattern, r'\1' + hero_additions + r'\2', chunk, count=1)
    
    # 2. Add signature block after hero block
    signature_block = f"""
    signature: {{
      card1Title: "{additions['s1t']}",
      card1Text: "{additions['s1x']}",
      card2Title: "{additions['s2t']}",
      card2Text: "{additions['s2x']}",
      card3Title: "{additions['s3t']}",
      card3Text: "{additions['s3x']}",
      card4Title: "{additions['s4t']}",
      card4Text: "{additions['s4x']}"
    }},"""
    
    # Place it immediately after hero: { ... },
    chunk = re.sub(r'(hero:\s*\{[\s\S]*?    \}\,)', r'\1\n' + signature_block, chunk, count=1)
    
    return full_text[:start_idx] + chunk + full_text[end_idx:]

fr_adds = {
    'h1': "Caftans de cérémonie", 'h2': "Broderies raffinées", 'h3': "Conseil WhatsApp",
    'link': "Découvrir l'univers Aicha Caftan",
    'm1': "Atelier", 'm2': "48h", 'm3': "Europe",
    'st': "Signature Maison", 'sx': "Des coupes allongées, une palette précieuse et un luxe discret pensé pour les grands jours.",
    's1t': "Essayage conseillé", 's1x': "Nous vous orientons vers la coupe, la taille et la pièce les plus flatteuses.",
    's2t': "WhatsApp boutique", 's2x': "Un échange direct pour demander des détails, des vidéos et des conseils personnalisés.",
    's3t': "Confection & retouches", 's3x': "Sur commande, ajustements, finitions et touches couture selon votre événement.",
    's4t': "Livraison suivie", 's4x': "Préparation soignée et expédition vers l'Europe avec suivi de commande."
}

es_adds = {
    'h1': "Caftanes de ceremonia", 'h2': "Bordados refinados", 'h3': "Consejo por WhatsApp",
    'link': "Descubrir el universo Aicha Caftan",
    'm1': "Taller", 'm2': "48h", 'm3': "Europa",
    'st': "Firma de la Casa", 'sx': "Cortes alargados, una paleta preciosa y un lujo discreto pensado para los grandes días.",
    's1t': "Prueba asesorada", 's1x': "Te orientamos hacia el corte, la talla y la pieza más favorecedora.",
    's2t': "WhatsApp boutique", 's2x': "Un intercambio directo para pedir detalles, videos y consejos personalizados.",
    's3t': "Confección y retoques", 's3x': "Por encargo, ajustes, acabados y detalles de costura según tu evento.",
    's4t': "Envío con seguimiento", 's4x': "Preparación cuidadosa y envío a Europa con seguimiento de pedido."
}

ar_adds = {
    'h1': "قفاطين المناسبات", 'h2': "تطريزات راقية", 'h3': "نصائح عبر واتس آب",
    'link': "اكتشفي عالم عائشة قفطان",
    'm1': "المشغل", 'm2': "48 ساعة", 'm3': "أوروبا",
    'st': "بصمة الدار", 'sx': "قصات طويلة، ألوان ثمينة، وفخامة هادئة مصممة للأيام الكبيرة.",
    's1t': "نصائح القياس", 's1x': "نُوجهك نحو القَصة والمقاس والقطعة التي تناسبك بشكل أفضل.",
    's2t': "واتساب البوتيك", 's2x': "تواصل مباشر لطلب تفاصيل، فيديوهات، ونصائح مخصصة.",
    's3t': "تفصيل وتعديلات", 's3x': "حسب الطلب، تعديلات، تشطيبات ولمسات خياطة راقية لمناسبتك.",
    's4t': "توصيل مُتتَبَّع", 's4x': "تجهيز بعناية وشحن إلى أوروبا مع تتبع الطلب."
}

en_adds = {
    'h1': "Ceremony Caftans", 'h2': "Refined Embroidery", 'h3': "WhatsApp Support",
    'link': "Discover Aicha Caftan's world",
    'm1': "Atelier", 'm2': "48h", 'm3': "Europe",
    'st': "House Signature", 'sx': "Elongated cuts, a precious palette, and discreet luxury designed for the big days.",
    's1t': "Fitting advice", 's1x': "We guide you to the most flattering cut, size, and piece.",
    's2t': "Boutique WhatsApp", 's2x': "Direct exchange to ask for details, videos, and personalized advice.",
    's3t': "Tailoring & alterations", 's3x': "Made to order, adjustments, finishes, and couture touches for your event.",
    's4t': "Tracked delivery", 's4x': "Careful preparation and shipping to Europe with order tracking."
}

with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

text = patch_hero_and_signature("  fr: {", fr_adds, "  es: {", text)
text = patch_hero_and_signature("  es: {", es_adds, "  ar: {", text)
text = patch_hero_and_signature("  ar: {", ar_adds, "  en: {", text)
text = patch_hero_and_signature("  en: {", en_adds, " categories: [", text)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(text)
