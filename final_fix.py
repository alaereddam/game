import sys

ar_about = """    about: {
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
    },"""

en_about = """    about: {
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
    },"""

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# We will locate the about and atelier blocks inside 'ar' and 'en'
# They are located right before "products: {"
# Since we know the exact string to look for, we can chunk by "  ar: {" and "  en: {"
def substitute_lang(lang_marker, new_text, full_text, next_marker):
    start = full_text.find(lang_marker)
    if start == -1: return full_text
    end = full_text.find(next_marker) if next_marker else len(full_text)
    chunk = full_text[start:end]
    
    # We strip out everything from "about: {" until "products: {"
    chunk = re.sub(
        r'    about: \{[\s\S]*?(?:atelier: \{[\s\S]*?\}\,?)?\s*(    products: \{)',
        new_text + r'\n\1',
        chunk
    )
    return full_text[:start] + chunk + full_text[end:]

text = substitute_lang("  ar: {", ar_about, text, "  en: {")
text = substitute_lang("  en: {", en_about, text, "  categories: [")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)
