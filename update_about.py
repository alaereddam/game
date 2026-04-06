import re
import json

with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

about_fr = """
    about: {
      eyebrow: "Expérience Maison",
      title: "Une boutique pensée comme un salon de cérémonie",
      text: "Aicha Caftan imagine une expérience d'achat plus intime, plus rassurante et plus inspirante. Chaque pièce est présentée avec la même exigence qu'en boutique: conseils, lecture des matières, mise en valeur des broderies et accompagnement jusqu'à la commande.",
      point1Title: "Sélection éditoriale",
      point1Text: "Des modèles choisis pour le mariage, les fiançailles, l'Eid et les soirées de prestige.",
      point2Title: "Voix de conseillère",
      point2Text: "Un ton doux, précis et rassurant pour guider vos choix comme dans une vraie maison couture.",
      point3Title: "Commande sereine",
      point3Text: "WhatsApp, email et formulaire pour poser vos questions, réserver une pièce ou lancer une création."
    },"""

about_es = """
    about: {
      eyebrow: "Experiencia Boutique",
      title: "Una boutique pensada como un salón de ceremonias",
      text: "Aicha Caftan imagina una experiencia de compra más íntima, tranquilizadora e inspiradora. Cada pieza se presenta con la misma exigencia que en la boutique: consejos, análisis de tejidos, valorización de los bordados y acompañamiento hasta el pedido.",
      point1Title: "Selección editorial",
      point1Text: "Modelos elegidos para bodas, compromisos, Eid y veladas de prestigio.",
      point2Title: "Voz de asesora",
      point2Text: "Un tono suave, preciso y tranquilizador para guiar tus decisiones como en una verdadera casa de alta costura.",
      point3Title: "Pedido sereno",
      point3Text: "WhatsApp, correo electrónico y formulario para enviar tus dudas, reservar una pieza o pedir una creación."
    },"""

about_ar = """
    about: {
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

about_en = """
    about: {
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

def replace_block(pattern, replace_text, data):
    return re.sub(pattern, replace_text, data, flags=re.DOTALL)

text = replace_block(r'    about: \{.*?\},\n    products', about_fr + '\n    products', text)
# Need to do it 4 times if the pattern matched 4 times? 
# Wait, let's target each language explicitly using the previous key.
# For FR: categories: {...}, about: {...}, products: {...}
text = replace_block(r'(fr: \{.*?categories: \{.*?\},\s*)about: \{.*?\}\,(\s*products:)', r'\1' + about_fr.strip() + r',\2', text)
text = replace_block(r'(es: \{.*?categories: \{.*?\},\s*)about: \{.*?\}\,(\s*products:)', r'\1' + about_es.strip() + r',\2', text)
text = replace_block(r'(ar: \{.*?categories: \{.*?\},\s*)about: \{.*?\}\,(\s*products:)', r'\1' + about_ar.strip() + r',\2', text)
text = replace_block(r'(en: \{.*?categories: \{.*?\},\s*)about: \{.*?\}\,(\s*products:)', r'\1' + about_en.strip() + r',\2', text)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(text)
