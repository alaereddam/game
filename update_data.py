import re

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add wa to fr
content = re.sub(
    r'(misc: \{.*?\})([\s\n]*)\},([\s\n]*es: \{)',
    r'\1,\n    wa: {\n      hero: "Bonjour Aicha Caftan, je souhaite des informations sur vos caftans.",\n      about: "Bonjour Aicha Caftan, j\'aimerais un conseil pour choisir ma tenue.",\n      contact: "Bonjour Aicha Caftan, je souhaite des informations sur vos caftans et takchitas.",\n      custom: "Bonjour Aicha Caftan, je souhaite une pièce sur mesure.",\n      float: "Bonjour Aicha Caftan, j\'aimerais des conseils sur vos caftans."\n    }\2},\3',
    content
)

# 2. Add wa to es
content = re.sub(
    r'(misc: \{.*?\})([\s\n]*)\},([\s\n]*ar: \{)',
    r'\1,\n    wa: {\n      hero: "Hola Aicha Caftan, me gustaría recibir información sobre sus caftanes.",\n      about: "Hola Aicha Caftan, me gustaría que me aconsejen para elegir mi vestido.",\n      contact: "Hola Aicha Caftan, deseo información sobre sus caftanes y takchitas.",\n      custom: "Hola Aicha Caftan, quiero una pieza a medida.",\n      float: "Hola Aicha Caftan, me gustaría recibir consejos sobre sus caftanes."\n    }\2},\3',
    content
)

en_block = """
  en: {
    brandSubtitle: "House of Takchita",
    nav: { collection: "Collection", about: "House", categories: "Categories", testimonials: "Reviews", contact: "Contact" },
    hero: {
      eyebrow: "Moroccan Couture Collection",
      title: "Takchita & Moroccan Caftan Boutique",
      subtitle: "Refined silhouettes designed for weddings, engagements, Eid, and all major celebrations, blending Moroccan craftsmanship with high-end style.",
      ctaCollection: "View Collection",
      ctaOrder: "Order Now",
      metricOne: "Couture finishes & hand embroidery",
      metricTwo: "Personalized response to your order",
      metricThree: "Premium delivery across Europe",
      badge: "New Ceremony Capsule",
      noteLabel: "Tailor-made",
      noteValue: "Custom alterations and finishes"
    },
    filters: {
      eyebrow: "Boutique Selection",
      title: "Find your ideal outfit",
      caption: "Search for a takchita, filter by category, and adjust your budget in seconds.",
      searchLabel: "Search",
      searchPlaceholder: "Name, fabric, occasion...",
      categoryLabel: "Category",
      categoryAll: "All Categories",
      priceLabel: "Max Price"
    },
    categories: {
      eyebrow: "Signature Universe",
      title: "Boutique Categories",
      subtitle: "Discover pieces designed for brides, family ceremonies, and elegant evenings.",
      pieces: "models"
    },
    about: {
      eyebrow: "Our House",
      title: "Moroccan Elegance between Tradition and Modernity",
      text: "Maison Reddam celebrates the art of the takchita through noble fabrics, luminous embroidery, and carefully crafted finishes. Each piece tells a refined Moroccan femininity, inspired by ceremonies, craftsmanship, and discreet luxury.",
      highlightTitle: "Artisanal Couture",
      highlightText: "Pearls, sfifa, brocade, and precision-stitched details for a majestic presence.",
      pointOne: "Premium fabrics selected for their drape and comfort.",
      pointTwo: "Feminine designs inspired by Moroccan festivities and contemporary silhouettes.",
      pointThree: "Personalized service for alterations, custom orders, and styling advice."
    },
    products: {
      eyebrow: "Featured Pieces",
      title: "Takchita & Caftan Collection",
      link: "Request a custom creation",
      emptyTitle: "No models found",
      emptyText: "Adjust your filters or discover the full collection.",
      stock: "In stock",
      sizes: "Sizes",
      color: "Color",
      fabric: "Fabric",
      occasion: "Occasion",
      details: "View details",
      add: "Add to cart",
      wishlistOn: "Favorites mode enabled",
      wishlistOff: "Favorites mode disabled"
    },
    benefits: {
      eyebrow: "Why Choose Us",
      title: "A Premium Boutique Experience",
      subtitle: "Every detail is thoughtfully designed to offer an exceptional dress and professional support."
    },
    testimonials: {
      eyebrow: "Client Reviews",
      title: "Feedback that speaks for itself",
      subtitle: "The collection is designed to magnify great days with impeccable finishing quality."
    },
    contact: {
      eyebrow: "Contact & Order",
      title: "Let's talk about your perfect outfit",
      text: "Contact us for an order, a custom request, or personalized advice. We respond quickly with an attentive and elegant approach.",
      mailLabel: "Email",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      placeholderName: "Your name",
      placeholderEmail: "Your email",
      placeholderMessage: "Describe your occasion or order",
      send: "Send message"
    },
    footer: {
      brandText: "High-end Moroccan Takchita & Caftan",
      note: "Feminine creations inspired by Moroccan heritage, designed to celebrate your most beautiful moments.",
      quickLinks: "Quick Links",
      categories: "Categories",
      contact: "Contact",
      rights: "All rights reserved."
    },
    modal: {
      colors: "Colors",
      fabric: "Fabric",
      sizes: "Sizes",
      delivery: "Delivery",
      occasions: "Occasions",
      order: "Order",
      custom: "Contact for custom made",
      mail: "Request more info via email"
    },
    cart: {
      eyebrow: "Your Selection",
      title: "Boutique Cart",
      subtotal: "Subtotal",
      order: "Order Selection",
      continue: "Continue Shopping",
      empty: "Your cart is currently empty.",
      quantity: "Quantity"
    },
    badges: { new: "New", bestseller: "Best Seller" },
    toast: {
      addedTitle: "Added to Cart",
      addedBody: "The piece has been successfully added to your selection.",
      wishlistAddTitle: "Added to Favorites",
      wishlistAddBody: "The model has been saved to your favorites.",
      wishlistRemoveTitle: "Removed from Favorites",
      wishlistRemoveBody: "The model has been removed from your favorites.",
      formTitle: "Message Ready",
      formBody: "Your email client will open to complete the message."
    },
    misc: { customOrder: "Custom order available", remove: "Remove", plus: "Increase", minus: "Decrease" },
    wa: {
      hero: "Hello Aicha Caftan, I would like some information about your caftans.",
      about: "Hello Aicha Caftan, I would like some advice on choosing my outfit.",
      contact: "Hello Aicha Caftan, I would like information about your caftans and takchitas.",
      custom: "Hello Aicha Caftan, I want a custom-made piece.",
      float: "Hello Aicha Caftan, I would like some advice about your caftans."
    }
  }
"""

content = re.sub(
    r'(misc: \{.*?\})([\s\n]*)\}([\s\n]*)\},([\s\n]*)categories: \[',
    r'\1,\n    wa: {\n      hero: "مرحباً عائشة قفطان، أرغب في الحصول على معلومات حول القفاطين.",\n      about: "مرحباً عائشة قفطان، أود نصيحة لاختيار إطلالتي.",\n      contact: "مرحباً عائشة قفطان، أرغب في معلومات عن القفاطين والتكاشيط.",\n      custom: "مرحباً عائشة قفطان، أريد تفصيل قطعة خاصة بي.",\n      float: "مرحباً عائشة قفطان، أود الحصول على نصائح حول قفاطينكم."\n    }\2}\3,' + en_block + '\n},\4categories: [',
    content
)

# Replace data arrays
arrays_payload = r"""  categories: [
    { id: "mariage", icon: "arch", title: { fr: "Takchita Mariage", es: "Takchita de Boda", ar: "تكشيطة الزفاف", en: "Wedding Takchita" }, description: { fr: "Des modèles lumineux pour les mariées, le henné et les cérémonies d'exception.", es: "Modelos luminosos para novias, henna y ceremonias excepcionales.", ar: "موديلات مضيئة للعروس والحنة والمناسبات الراقية.", en: "Luminous models for brides, henna and exceptional ceremonies." } },
    { id: "caftan", icon: "hanger", title: { fr: "Caftan Marocain", es: "Caftán Marroquí", ar: "القفطان المغربي", en: "Moroccan Caftan" }, description: { fr: "Des coupes fluides et sophistiquées pour un chic intemporel.", es: "Cortes fluidos y sofisticados para un estilo atemporal chic.", ar: "قصات انسيابية وراقية لأناقة مغربية خالدة.", en: "Fluid and sophisticated cuts for a timeless chic style." } },
    { id: "luxe", icon: "sparkle", title: { fr: "Takchita Luxe", es: "Takchita de Lujo", ar: "تكشيطة فاخرة", en: "Luxury Takchita" }, description: { fr: "Tissus nobles, ceintures travaillées et finitions dignes d'une boutique premium.", es: "Tejidos nobles, cinturones elaborados y acabados de primera.", ar: "أقمشة نبيلة وأحزمة فاخرة وتشطيبات تليق ببوتيك راق.", en: "Noble fabrics, crafted belts, and premium boutique finishes." } },
    { id: "fete", icon: "stars", title: { fr: "Tenues de Fête", es: "Trajes de Fiesta", ar: "أزياء السهرات", en: "Party Outfits" }, description: { fr: "Des silhouettes féminines pour l'Eid, les soirées et les réceptions élégantes.", es: "Siluetas femeninas para el Eid, veladas y recepciones elegantes.", ar: "إطلالات أنثوية للعيد والسهرات والاستقبالات الراقية.", en: "Feminine silhouettes for Eid, elegant evenings and receptions." } },
    { id: "new", icon: "leaf", title: { fr: "Nouvelle Collection", es: "Nueva Colección", ar: "المجموعة الجديدة", en: "New Collection" }, description: { fr: "Les dernières créations de la maison, pensées pour la saison.", es: "Las últimas creaciones de la casa diseñadas para la temporada.", ar: "أحدث إبداعات الدار المصممة للموسم الحالي.", en: "The latest creations of the house, designed for the season." } },
    { id: "commande", icon: "needle", title: { fr: "Sur commande", es: "Por encargo", ar: "حسب الطلب", en: "Made to Order" }, description: { fr: "Retouches, ajustements et confection personnalisée selon votre événement.", es: "Retoques, ajustes y confección personalizada según el evento.", ar: "تعديلات وخياطة خاصة حسب المناسبة والمقاس.", en: "Alterations, adjustments, and customized tailoring for your event." } }
  ],
  benefits: [
    { icon: "shield", title: { fr: "Haute qualité", es: "Alta calidad", ar: "جودة عالية", en: "High Quality" }, description: { fr: "Des tissus premium et des finitions propres pour une présence impeccable.", es: "Tejidos premium y acabados limpios para una presencia impecable.", ar: "أقمشة فاخرة وتشطيبات دقيقة لإطلالة متقنة.", en: "Premium fabrics and clean finishes for an impeccable presence." } },
    { icon: "sparkle", title: { fr: "Broderie artisanale", es: "Bordado artesanal", ar: "تطريز حرفي", en: "Artisanal Embroidery" }, description: { fr: "Sfifa, perles et broderies inspirées de l'héritage marocain.", es: "Sfifa, perlas y bordados inspirados en la herencia marroquí.", ar: "سفيفة وخرز وتطريزات مستوحاة من التراث المغربي.", en: "Sfifa, pearls, and embroideries inspired by Moroccan heritage." } },
    { icon: "delivery", title: { fr: "Livraison rapide", es: "Entrega rápida", ar: "توصيل سريع", en: "Fast Delivery" }, description: { fr: "Expédition élégante et suivi de commande pour l'Europe.", es: "Envío elegante y seguimiento de pedidos por Europa.", ar: "شحن أنيق مع تتبع الطلب داخل أوروبا.", en: "Elegant shipping and order tracking across Europe." } },
    { icon: "crown", title: { fr: "Élégance marocaine", es: "Elegancia marroquí", ar: "أناقة مغربية", en: "Moroccan Elegance" }, description: { fr: "Des coupes qui honorent la tradition tout en restant très modernes.", es: "Cortes que respetan la tradición siendo a la vez muy modernos.", ar: "قصات تحتفي بالأصالة وتبقى عصرية جدا.", en: "Cuts that honor tradition while remaining highly modern." } },
    { icon: "chat", title: { fr: "Service client réactif", es: "Servicio al cliente", ar: "خدمة سريعة", en: "Responsive Support" }, description: { fr: "Un accompagnement chaleureux pour choisir la robe idéale.", es: "Acompañamiento cálido para elegir el vestido ideal.", ar: "مرافقة أنيقة لاختيار القطعة المناسبة بسرعة.", en: "Warm guidance to help you choose the ideal dress." } },
    { icon: "diamond", title: { fr: "Modèles exclusifs", es: "Modelos exclusivos", ar: "موديلات حصرية", en: "Exclusive Models" }, description: { fr: "Une sélection boutique pensée pour se démarquer lors des grandes occasions.", es: "Selección de la boutique para destacar en grandes ocasiones.", ar: "تشكيلة حصرية مميزة للحفلات والمناسبات الكبيرة.", en: "A boutique selection designed to stand out on grand occasions." } }
  ],
  testimonials: [
    { quote: { fr: "Très belle qualité, finition magnifique.", es: "Excelente calidad, un acabado magnífico.", ar: "جودة رائعة وتشطيب جميل جدا.", en: "Very nice quality, magnificent finish." }, author: { fr: "Samira, Paris", es: "Samira, París", ar: "سميرة، باريس", en: "Samira, Paris" } },
    { quote: { fr: "La robe est encore plus belle en vrai.", es: "El vestido es aún más hermoso en persona.", ar: "الفستان أجمل بكثير في الحقيقة.", en: "The dress is even more beautiful in person." }, author: { fr: "Nadia, Bruxelles", es: "Nadia, Bruselas", ar: "نادية، بروكسيل", en: "Nadia, Brussels" } },
    { quote: { fr: "Service professionnel et livraison rapide.", es: "Servicio muy profesional y entrega rápida.", ar: "خدمة احترافية وتوصيل سريع.", en: "Professional service and fast delivery." }, author: { fr: "Salma, Lyon", es: "Salma, Lyon", ar: "سلمى، ليون", en: "Salma, Lyon" } },
    { quote: { fr: "Une takchita parfaite pour mon mariage.", es: "Una takchita perfecta para mi boda.", ar: "تكشيطة مثالية ليوم زفافي.", en: "A perfect takchita for my wedding." }, author: { fr: "Inès, Amsterdam", es: "Inés, Ámsterdam", ar: "إيناس، أمستردام", en: "Inès, Amsterdam" } }
  ],
  products: [
    { id: "royale-verte", badge: "bestseller", image: "assets/takchita-royale-verte.webp", gallery: ["assets/takchita-royale-verte.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["luxe", "fete"], names: { fr: "Takchita Royale Verte", es: "Takchita Real Verde", ar: "تكشيطة رويال خضراء", en: "Royal Green Takchita" }, shortDescription: { fr: "Une silhouette émeraude sophistiquée avec ceinture travaillée et manches vaporeuses.", es: "Silueta esmeralda sofisticada con cinturón y mangas vaporosas.", ar: "إطلالة زمردية راقية بحزام فاخر وأكمام انسيابية.", en: "A sophisticated emerald silhouette with a crafted belt and vaporous sleeves." }, fullDescription: { fr: "Cette takchita en vert émeraude marie un crêpe satin lumineux à un tulle délicatement brodé. Les détails sfifa et la ceinture structurée apportent une présence majestueuse idéale pour les soirées, les fiançailles ou une réception élégante.", es: "Esta takchita en verde esmeralda combina crepé satinado luminoso con tul delicadamente bordado. Los detalles sfifa y el cinturón estructurado aportan una presencia majestuosa.", ar: "هذه التكشيطة باللون الزمردي تجمع بين كريب ساتان لامع وتول مطرز بنعومة. تفاصيل السفيفة والحزام المهيكل يمنحانها حضورا فخما مناسبا للسهرات والخطوبة والاستقبال الراقي.", en: "This emerald green takchita blends luminous crepe satin with delicately embroidered tulle. Sfifa details and the structured belt provide a majestic presence ideal for evenings or elegant receptions." }, price: 500, stock: 5, sizes: ["S", "M", "L", "XL"], color: { fr: "Vert émeraude", es: "Verde esmeralda", ar: "أخضر زمردي", en: "Emerald green" }, fabric: { fr: "Crêpe satin & tulle brodé", es: "Crepé satinado y tul bordado", ar: "كريب ساتان وتول مطرز", en: "Crepe satin & embroidered tulle" }, occasion: { fr: ["Fiançailles", "Soirée", "Réception"], es: ["Compromiso", "Velada", "Recepción"], ar: ["خطوبة", "سهرة", "استقبال"], en: ["Engagement", "Evening", "Reception"] }, delivery: { fr: "Livraison Europe sous 3 à 5 jours, ajustements possibles.", es: "Envío a Europa en 3 a 5 días, personalización posible.", ar: "توصيل إلى أوروبا خلال 3 إلى 5 أيام مع إمكانية التعديل.", en: "Europe delivery 3-5 days, adjustments possible." } },
    { id: "bleu-nuit-luxe", badge: "new", image: "assets/takchita-bleu-nuit.webp", gallery: ["assets/takchita-bleu-nuit.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["luxe", "fete", "new"], names: { fr: "Takchita Bleu Nuit Luxe", es: "Takchita Lujo Azul Noche", ar: "تكشيطة فاخرة باللون الأزرق الليلي", en: "Luxury Midnight Blue Takchita" }, shortDescription: { fr: "Une allure profonde et couture, parfaite pour une soirée marocaine très chic.", es: "Aspecto intenso de alta costura, perfecto para una noche elegante.", ar: "إطلالة عميقة وراقية مثالية للسهرات المغربية الأنيقة.", en: "A deep couture look, perfect for a very chic Moroccan evening." }, fullDescription: { fr: "Pensée pour les cérémonies du soir, cette takchita bleu nuit joue sur la richesse du velours léger et des broderies dorées. Son tombé élancé allonge la silhouette et révèle un luxe discret, féminin et moderne.", es: "Diseñada para ceremonias de noche, esta takchita azul noche juega con la riqueza del terciopelo ligero y bordados dorados. Revela un lujo discreto, femenino y moderno.", ar: "هذه التكشيطة الزرقاء صممت لسهرات المساء وتعتمد على فخامة المخمل الخفيف والتطريز الذهبي. قصتها الطويلة تمنح القوام أناقة رشيقة وملوكية.", en: "Designed for evening ceremonies, this midnight blue takchita plays on the richness of light velvet and golden embroidery. It reveals a discreet, feminine, and modern luxury." }, price: 306, stock: 3, sizes: ["M", "L", "XL"], color: { fr: "Bleu nuit", es: "Azul noche", ar: "أزرق ليلي", en: "Midnight blue" }, fabric: { fr: "Velours léger & broderie sfifa", es: "Terciopelo ligero y bordado sfifa", ar: "مخمل خفيف وتطريز سفيفة", en: "Light velvet & sfifa embroidery" }, occasion: { fr: ["Eid", "Soirée", "Invitée mariage"], es: ["Eid", "Velada", "Invitada boda"], ar: ["العيد", "سهرة", "ضيفة زفاف"], en: ["Eid", "Evening party", "Wedding guest"] }, delivery: { fr: "Livraison premium et emballage boutique inclus.", es: "Entrega premium en bolsa de la boutique.", ar: "توصيل فاخر مع تغليف أنيق.", en: "Premium delivery & boutique packaging included." } },
    { id: "mariage-doree", badge: "bestseller", image: "assets/takchita-mariage-doree.webp", gallery: ["assets/takchita-mariage-doree.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["mariage", "commande"], names: { fr: "Takchita Mariage Dorée", es: "Takchita Dorada de Boda", ar: "تكشيطة ذهبية للزفاف", en: "Golden Wedding Takchita" }, shortDescription: { fr: "Une pièce nuptiale lumineuse au tombé majestueux pour un jour inoubliable.", es: "Una pieza nupcial luminosa con caída majestuosa.", ar: "قطعة زفاف مضيئة بانسياب ملوكي ليوم لا ينسى.", en: "A luminous bridal piece with majestic drape for an unforgettable day." }, fullDescription: { fr: "Cette création dorée met en avant une mousseline satinée, des perlages cousus main et une palette champagne raffinée. C'est le choix idéal pour une mariée, une cérémonie de henné ou un événement où chaque détail doit respirer le prestige.", es: "Esta creación destaca por su gasa satinada, abalorios cosidos a mano y paleta refinada color champán. Elección ideal para novias, ceremonias de henna o eventos de prestigio.", ar: "هذه القطعة الذهبية تبرز الموسلين الساتاني والخرز المخيط يدويا مع درجات شامبان فاخرة. إنها خيار مثالي للعروس أو لحفل الحناء أو لأي مناسبة تحتاج حضورا مميزا.", en: "This golden creation features satin muslin, hand-sewn pearls, and a refined champagne palette. Ideal choice for a bride, henna ceremony, or prestigious event." }, price: 405, stock: 2, sizes: ["S", "M", "L"], color: { fr: "Or champagne", es: "Oro champán", ar: "ذهبي شامبان", en: "Champagne gold" }, fabric: { fr: "Mousseline satinée & perlage couture", es: "Gasa satinada y bordados de alta costura", ar: "موسلين ساتاني وخرز فاخر", en: "Satin muslin & couture pearls" }, occasion: { fr: ["Mariage", "Henné", "Cérémonie"], es: ["Boda", "Henna", "Ceremonia"], ar: ["زفاف", "حنة", "مراسم"], en: ["Wedding", "Henna", "Ceremony"] }, delivery: { fr: "Confection sur commande possible avec retouches personnalisées.", es: "Se puede confeccionar por encargo con retoques personalizados.", ar: "إمكانية التفصيل حسب الطلب مع تعديلات خاصة.", en: "Custom made available with personalized adjustments." } },
    { id: "rose-elegance", badge: "new", image: "assets/caftan-rose-elegance.webp", gallery: ["assets/caftan-rose-elegance.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["caftan", "fete", "new"], names: { fr: "Caftan Rose Élégance", es: "Caftán Rosa Elegancia", ar: "قفطان روز أناقة", en: "Elegance Pink Caftan" }, shortDescription: { fr: "Une douceur rose poudrée, féminine et chic pour les fêtes raffinées.", es: "Una suavidad rosa empolvada, femenina y chic para fiestas.", ar: "لون وردي ناعم وأنوثة راقية للحفلات الهادئة.", en: "A powder pink softness, feminine and chic for refined parties." }, fullDescription: { fr: "Ce caftan rose poudré séduit par sa fluidité, ses manches en organza et sa broderie légère. Il accompagne avec grâce les fiançailles, l'Eid ou un dîner élégant où l'on recherche un luxe délicat.", es: "Este caftán cautiva por su fluidez, mangas de organza y bordados ligeros. Acompaña con gracia compromisos, Eid o cenas elegantes.", ar: "هذا القفطان الوردي يتميز بانسيابه وأكمامه بالأورغانزا مع تطريز خفيف. يرافقك بأناقة في الخطوبة والعيد والعشاء الراقي.", en: "This powder pink caftan seduces with its fluidity, organza sleeves and light embroidery. It gracefully accompanies engagements, Eid or elegant dinners." }, price: 350, stock: 7, sizes: ["S", "M", "L", "XL"], color: { fr: "Rose poudré", es: "Rosa empolvado", ar: "وردي باودر", en: "Powder pink" }, fabric: { fr: "Crêpe fluide & organza", es: "Crepé fluido y organza", ar: "كريب انسيابي وأورغانزا", en: "Fluid crepe & organza" }, occasion: { fr: ["Fiançailles", "Eid", "Dîner chic"], es: ["Compromiso", "Eid", "Cena elegante"], ar: ["خطوبة", "العيد", "عشاء أنيق"], en: ["Engagement", "Eid", "Chic dinner"] }, delivery: { fr: "Disponible immédiatement avec expédition rapide.", es: "Disponible de inmediato, envío rápido.", ar: "متوفر حاليا مع شحن سريع.", en: "Available immediately with fast shipping." } },
    { id: "tradition-atlas", badge: "new", image: "assets/takchita-atlas.webp", gallery: ["assets/takchita-atlas.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["luxe", "commande", "new"], names: { fr: "Takchita Tradition Atlas", es: "Takchita Tradición Atlas", ar: "تكشيطة تقليد الأطلس", en: "Atlas Tradition Takchita" }, shortDescription: { fr: "Une inspiration patrimoniale revisitée avec une allure couture contemporaine.", es: "Inspiración del patrimonio revisitada con alta costura contemporánea.", ar: "روح الأطلس التقليدية بلمسة كوتور عصرية.", en: "Heritage inspiration reimagined with a contemporary couture allure." }, fullDescription: { fr: "Avec son jeu de beige sable et de vert atlas, cette takchita rend hommage au patrimoine marocain dans une version très premium. Le brocart, la mdamma travaillée et les détails couture en font un modèle signature pour les clientes qui veulent une pièce rare.", es: "Con tonos beige arena y verde atlas, rinde homenaje al patrimonio marroquí. Brocado, cinturón elaborado y detalles de costura para clientes que buscan una pieza rara.", ar: "تجمع هذه التكشيطة بين البيج الرملي والأخضر الأطلسي لتقدم روحا مغربية أصيلة في نسخة فاخرة. البروكار والحزام المهيكل والتفاصيل الراقية تجعلها قطعة مميزة ونادرة.", en: "With sandy beige and atlas green, this takchita pays homage to Moroccan heritage in a premium version. Brocade, crafted mdamma, and couture details make it a rare signature piece." }, price: 909, stock: 4, sizes: ["M", "L", "XL"], color: { fr: "Beige sable & vert atlas", es: "Beige arena y verde atlas", ar: "بيج رملي وأخضر أطلسي", en: "Sandy beige & atlas green" }, fabric: { fr: "Brocart premium & ceinture mdamma", es: "Brocado premium y cinturón mdamma", ar: "بروكار فاخر وحزام مدمّة", en: "Premium brocade & mdamma belt" }, occasion: { fr: ["Fête", "Réception", "Sur commande"], es: ["Fiesta", "Recepción", "Encargo"], ar: ["حفلة", "استقبال", "حسب الطلب"], en: ["Party", "Reception", "Made to order"] }, delivery: { fr: "Confection ajustable et service client dédié.", es: "Confección ajustable y servicio al cliente dedicado.", ar: "خدمة تفصيل قابلة للتعديل ومرافقة خاصة.", en: "Adjustable tailoring and dedicated support." } },
    { id: "blanc-perle", badge: "bestseller", image: "assets/caftan-blanc-perle.webp", gallery: ["assets/caftan-blanc-perle.webp", "assets/detail-broderie.svg", "assets/atelier-luxe.svg"], categories: ["caftan", "mariage", "commande"], names: { fr: "Caftan Blanc Perlé", es: "Caftán Blanco Perla", ar: "قفطان أبيض مرصع", en: "Pearl White Caftan" }, shortDescription: { fr: "Une présence délicate et noble, pensée pour les cérémonies lumineuses.", es: "Una presencia delicada y noble, ideal para ceremonias luminosas.", ar: "حضور ناعم ونبيل للمناسبات المضيئة.", en: "A delicate and noble presence, designed for luminous ceremonies." }, fullDescription: { fr: "Le satin duchesse blanc perlé, les perles cousues main et la structure raffinée font de ce caftan une option prestigieuse pour un mariage civil, une cérémonie ou une réception de luxe. Il évoque la pureté, la féminité et le soin du détail.", es: "Satén duquesa blanco perla, perlas cosidas a mano y estructura refinada hacen de este caftán una opción prestigiosa para bodas civiles o recepciones de lujo.", ar: "يتميز هذا القفطان بالساتان الأبيض الفاخر والخرز المخيط يدويا مع بنية راقية. إنه اختيار مثالي للزواج المدني أو للمراسم والاستقبالات الفخمة.", en: "Pearl white duchess satin, hand-sewn pearls and refined structure make this caftan a prestigious option for a civil wedding or a luxury reception." }, price: 800, stock: 2, sizes: ["S", "M", "L"], color: { fr: "Blanc perlé", es: "Blanco perla", ar: "أبيض لؤلؤي", en: "Pearl white" }, fabric: { fr: "Satin duchesse & perles cousues main", es: "Satén duquesa y perlas cosidas a mano", ar: "ساتان دوشيس وخرز مخيط يدويا", en: "Duchess satin & hand-sewn pearls" }, occasion: { fr: ["Mariage civil", "Fiançailles", "Soirée"], es: ["Boda civil", "Compromiso", "Evento especial"], ar: ["زواج مدني", "خطوبة", "سهرة"], en: ["Civil wedding", "Engagement", "Evening"] }, delivery: { fr: "Préparation premium avec option de sur mesure.", es: "Preparación premium con opciones a medida.", ar: "تحضير فاخر مع إمكانية التفصيل حسب المقاس.", en: "Premium prep with made to measure option." } }
  ]"""
content = re.sub(r'  categories: \[[\s\S]*\}\n  \]', arrays_payload, content)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(content)
