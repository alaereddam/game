import re

fr_blocks = """
    about: {
      eyebrow: "Notre maison",
      title: "L'élégance marocaine entre tradition et modernité",
      text: "Aicha Caftan célèbre l'art de la takchita à travers des tissus nobles, des broderies lumineuses et des finitions réalisées avec soin. Chaque pièce raconte une féminité marocaine raffinée, inspirée des cérémonies, du savoir-faire artisanal et du luxe discret.",
      highlightTitle: "Couture artisanale",
      highlightText: "Perles, sfifa, brocart et détails travaillés avec soin pour une allure majestueuse.",
      pointOne: "Des tissus premium sélectionnés pour leur fluidité et leur confort.",
      pointTwo: "Une sélection éditoriale pensée pour le mariage, l'Eid et les soirées élégantes.",
      pointThree: "Un accompagnement humain pour les retouches et les demandes sur mesure."
    },
    atelier: {
      eyebrow: "Expérience Maison",
      title: "Une boutique pensée comme un salon de cérémonie",
      text: "Aicha Caftan imagine une expérience d'achat plus intime, plus rassurante et plus inspirante. Chaque pièce est présentée avec la même exigence qu'en boutique: conseils, lecture des matières, mise en valeur des broderies et accompagnement jusqu'à la commande.",
      point1Title: "Sélection éditoriale",
      point1Text: "Des modèles choisis pour le mariage, les fiançailles, l'Eid et les soirées de prestige.",
      point2Title: "Voix de conseillère",
      point2Text: "Un ton doux, précis et rassurant pour guider vos choix comme dans une vraie maison couture.",
      point3Title: "Commande sereine",
      point3Text: "WhatsApp, email et formulaire pour poser vos questions, réserver une pièce ou lancer une création."
    },
"""

es_blocks = """
    about: {
      eyebrow: "Nuestra casa",
      title: "La elegancia marroquí entre tradición y modernidad",
      text: "Aicha Caftan celebra el arte de la takchita a través de tejidos nobles, bordados luminosos y acabados realizados con cuidado. Cada pieza cuenta una feminidad marroquí refinada, inspirada en las ceremonias, la artesanía y el lujo discreto.",
      highlightTitle: "Costura artesanal",
      highlightText: "Perlas, sfifa, brocado y detalles cosidos con precisión para una presencia majestuosa.",
      pointOne: "Tejidos premium seleccionados por su caída y comodidad.",
      pointTwo: "Diseños femeninos inspirados en las fiestas marroquíes y las siluetas contemporáneas.",
      pointThree: "Servicio personalizado para retoques, confección por encargo y asesoramiento de estilo."
    },
    atelier: {
      eyebrow: "Experiencia Boutique",
      title: "Una boutique pensada como un salón de ceremonias",
      text: "Aicha Caftan imagina una experiencia de compra más íntima, tranquilizadora e inspiradora. Cada pieza se presenta con la misma exigencia que en la boutique: consejos, análisis de tejidos, valorización de los bordados y acompañamiento hasta el pedido.",
      point1Title: "Selección editorial",
      point1Text: "Modelos elegidos para bodas, compromisos, Eid y veladas de prestigio.",
      point2Title: "Voz de asesora",
      point2Text: "Un tono suave, preciso y tranquilizador para guiar tus decisiones como en una verdadera casa de alta costura.",
      point3Title: "Pedido sereno",
      point3Text: "WhatsApp, correo electrónico y formulario para enviar tus dudas, reservar una pieza o pedir una creación."
    },
"""

ar_blocks = """
    about: {
      eyebrow: "دارنا",
      title: "الأناقة المغربية بين الأصالة والمعاصرة",
      text: "تحتفل عائشة قفطان بفن التكشيطة من خلال الأقمشة النبيلة والتطريزات المضيئة والتشطيبات المتقنة. كل قطعة تروي أنوثة مغربية راقية، مستوحاة من المناسبات والحرفية اليدوية والفخامة الهادئة.",
      highlightTitle: "خياطة حرفية",
      highlightText: "لؤلؤ، سفيفة، بروكار، وتفاصيل محاكة بدقة لحضور مهيب.",
      pointOne: "أقمشة فاخرة مختارة بعناية لانسيابها وراحتها.",
      pointTwo: "تصاميم أنثوية مستوحاة من الأعياد المغربية والقصات العصرية.",
      pointThree: "تواصل شخصي ومباشر للحصول على مقاساتك واحتياجاتك الخاصة."
    },
    atelier: {
      eyebrow: "تجربة البوتيك",
      title: "بوتيك مصمم كصالون للمناسبات",
      text: "تصمم عائشة قفطان تجربة تسوق أكثر حميمية وطمأنينة وإلهامًا. تقدم كل قطعة بنفس معايير البوتيك: نصائح، قراءة للمواد، إبراز للتطريزات ومرافقة حتى الطلب.",
      point1Title: "اختيار متخصص",
      point1Text: "نماذج مختارة لحفلات الزفاف والخطوبة والعيد والسهرات المرموقة.",
      point2Title: "صوت مستشارة",
      point2Text: "نبرة هادئة ودقيقة ومطمئنة لتوجيه اختياراتك تمامًا كدار أزياء حقيقية.",
      point3Title: "طلب بكل طمأنينة",
      point3Text: "واتساب، بريد إلكتروني، ونموذج لطرح الأسئلة، أو حجز قطعة، أو إطلاق تصميم خاص."
    },
"""

en_blocks = """
    about: {
      eyebrow: "Our House",
      title: "Moroccan Elegance between Tradition and Modernity",
      text: "Aicha Caftan celebrates the art of the takchita through noble fabrics, luminous embroidery, and carefully crafted finishes. Each piece tells a refined Moroccan femininity, inspired by ceremonies, craftsmanship, and discreet luxury.",
      highlightTitle: "Artisanal Couture",
      highlightText: "Pearls, sfifa, brocade, and precision-stitched details for a majestic presence.",
      pointOne: "Premium fabrics selected for their drape and comfort.",
      pointTwo: "Feminine designs inspired by Moroccan festivities and contemporary silhouettes.",
      pointThree: "Personalized service for alterations, custom orders, and styling advice."
    },
    atelier: {
      eyebrow: "Boutique Experience",
      title: "A boutique designed like a ceremony salon",
      text: "Aicha Caftan imagines a more intimate, reassuring, and inspiring shopping experience. Each piece is presented with the same standard as in the boutique: advice, material readings, embroidery highlighting, and guidance all the way to the order.",
      point1Title: "Editorial selection",
      point1Text: "Curated models for weddings, engagements, Eid, and prestigious evenings.",
      point2Title: "Advisor's voice",
      point2Text: "A soft, precise, and reassuring tone to guide your choices like in a real couture house.",
      point3Title: "Serene ordering",
      point3Text: "WhatsApp, email, and forms to ask your questions, reserve a piece, or start a creation."
    },
"""

import sys
with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

# Instead of global regex, we split into known blocks.
# The keys are: fr:, es:, ar:, en:
def replace_in_lang(lang_prefix, new_blocks, full_text, next_lang=None):
    start_idx = full_text.find(lang_prefix)
    if start_idx == -1: return full_text
    
    end_idx = full_text.find(next_lang) if next_lang else len(full_text)
    
    chunk = full_text[start_idx:end_idx]
    
    # Inside this chunk, replace from "about: {" up to "products: [" or "products: {"
    # We will just replace 'about: { ... }' AND 'atelier: { ... }' completely by capturing anything between categories and products.
    replaced_chunk = re.sub(
        r'(categories: \{[^}]+\},\s*)(about: \{.*?\}|atelier: \{.*?\}|\s*|,) *(products: )', 
        r'\1' + new_blocks.strip() + r',\n    \3', 
        chunk, 
        flags=re.DOTALL
    )
    
    # If the above failed (maybe about was already gone), try a stronger replacement:
    # Match from categories body to products body
    replaced_chunk = re.sub(
        r'(categories: \{[\s\S]*?pieces: "[^\"]*"\s*\}\,)([\s\S]*?)(\s*products: \[)',
        r'\1\n' + new_blocks.strip() + r',\2\3',
        chunk
    )
    
    # Wait, my previous regex might be safer. Let's just wipe between categories and products:
    replaced_chunk = re.sub(
        r'(categories:\s*\{[\s\S]*?\}\,)\s*(?:about:\s*\{[\s\S]*?\}\,?)?\s*(?:atelier:\s*\{[\s\S]*?\}\,?)?\s*(products:\s*\[)',
        r'\1\n' + new_blocks.rstrip() + r',\n    \2',
        chunk
    )
    
    return full_text[:start_idx] + replaced_chunk + full_text[end_idx:]

text = replace_in_lang("  fr: {", fr_blocks, text, "  es: {")
text = replace_in_lang("  es: {", es_blocks, text, "  ar: {")
text = replace_in_lang("  ar: {", ar_blocks, text, "  en: {")
text = replace_in_lang("  en: {", en_blocks, text, " categories: [") # The array at the bottom

with open("data.js", "w", encoding="utf-8") as f:
    f.write(text)
