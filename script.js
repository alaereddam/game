const { copy, categories, benefits, testimonials, products } = window.MAISON_REDDAM_DATA;

const state = {
  locale: "fr",
  category: "all",
  maxPrice: 10000,
  search: "",
  showWishlistOnly: false,
  wishlist: loadStorage("maison-reddam-wishlist"),
  cart: loadStorage("maison-reddam-cart"),
  activeProductId: null,
  activeGalleryIndex: 0
};

const elements = {
  productGrid: document.querySelector("#product-grid"),
  emptyState: document.querySelector("#empty-state"),
  categoryGrid: document.querySelector("#category-grid"),
  benefitGrid: document.querySelector("#benefit-grid"),
  testimonialGrid: document.querySelector("#testimonial-grid"),
  footerCategoryLinks: document.querySelector("#footer-category-links"),
  filterChips: document.querySelector("#filter-chips"),
  categorySelect: document.querySelector("#category-select"),
  search: document.querySelector("#product-search"),
  priceRange: document.querySelector("#price-range"),
  priceOutput: document.querySelector("#price-output"),
  wishlistCount: document.querySelector("#wishlist-count"),
  cartCount: document.querySelector("#cart-count"),
  currentYear: document.querySelector("#current-year"),
  wishlistToggle: document.querySelector("#wishlist-toggle"),
  cartToggle: document.querySelector("#cart-toggle"),
  cartDrawer: document.querySelector("#cart-drawer"),
  drawerOverlay: document.querySelector("#drawer-overlay"),
  cartItems: document.querySelector("#cart-items"),
  cartTotal: document.querySelector("#cart-total"),
  cartOrderLink: document.querySelector("#cart-order-link"),
  cartClose: document.querySelector("#cart-close"),
  cartContinue: document.querySelector("#cart-continue"),
  modal: document.querySelector("#product-modal"),
  modalClose: document.querySelector("#modal-close"),
  modalMainImage: document.querySelector("#modal-main-image"),
  modalThumbnails: document.querySelector("#modal-thumbnails"),
  modalBadge: document.querySelector("#modal-badge"),
  modalTitle: document.querySelector("#modal-title"),
  modalDescription: document.querySelector("#modal-description"),
  modalPrice: document.querySelector("#modal-price"),
  modalStock: document.querySelector("#modal-stock"),
  modalColor: document.querySelector("#modal-color"),
  modalFabric: document.querySelector("#modal-fabric"),
  modalSizes: document.querySelector("#modal-sizes"),
  modalDelivery: document.querySelector("#modal-delivery"),
  modalOccasions: document.querySelector("#modal-occasions"),
  modalAddCart: document.querySelector("#modal-add-cart"),
  modalContactLink: document.querySelector("#modal-contact-link"),
  modalMailLink: document.querySelector("#modal-mail-link"),
  navToggle: document.querySelector("#nav-toggle"),
  siteNav: document.querySelector("#site-nav"),
  toastStack: document.querySelector("#toast-stack"),
  contactForm: document.querySelector("#contact-form")
};

function loadStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function saveStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getText(path) {
  const localized = path.split(".").reduce((accumulator, part) => accumulator?.[part], copy[state.locale]);
  if (localized !== undefined && localized !== null && localized !== "") {
    return localized;
  }

  return path.split(".").reduce((accumulator, part) => accumulator?.[part], copy.fr) || "";
}

function pickLocalized(value) {
  if (value === undefined || value === null) return "";
  if (typeof value !== "object" || Array.isArray(value)) return value;
  return value[state.locale] ?? value.fr ?? value.ar ?? value.es ?? Object.values(value)[0] ?? "";
}

function collectLocalizedText(value) {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value.flatMap((entry) => collectLocalizedText(entry));
  if (typeof value === "object") return Object.values(value).flatMap((entry) => collectLocalizedText(entry));
  return [String(value)];
}

function mergeLocaleField(target, field, values) {
  target[field] = { ...(target[field] || {}), ...values };
}

function applyPremiumContent() {
  Object.assign(copy.fr, {
    brandSubtitle: "Maison de caftans & takchitas",
    hero: {
      ...copy.fr.hero,
      eyebrow: "Maison couture marocaine",
      title: "Caftans & Takchitas d'Exception",
      subtitle: "Aicha Caftan signe des tenues de cérémonie marocaines au tombé noble, aux détails précieux et à l'allure profondément féminine pour les mariages, fiançailles, soirées et fêtes d'exception.",
      ctaCollection: "Découvrir la collection",
      ctaOrder: "Parler à la boutique",
      metricOne: "Confection inspirée de l'atelier marocain",
      metricTwo: "Conseil taille et style sous 48h",
      metricThree: "Expédition suivie partout en Europe",
      badge: "Capsule cérémonie 2026",
      noteValue: "Retouches et ajustements sur demande"
    },
    filters: {
      ...copy.fr.filters,
      title: "Trouver la pièce qui vous ressemble",
      caption: "Explorez les silhouettes, filtrez par univers et laissez-vous guider vers la tenue idéale selon votre occasion."
    },
    categories: {
      ...copy.fr.categories,
      title: "Les univers Aicha Caftan",
      subtitle: "Des lignes pensées pour la mariée, les invitées raffinées et toutes les célébrations qui méritent une présence remarquable."
    },
    about: {
      ...copy.fr.about,
      title: "L'élégance marocaine interprétée comme une maison de cérémonie",
      text: "Aicha Caftan célèbre la grâce marocaine à travers des caftans et takchitas choisis pour leur tombé, leur lumière et la finesse de leurs finitions. Entre artisanat, féminité et luxe discret, chaque modèle accompagne les moments précieux avec une présence rassurante et intensément raffinée.",
      highlightText: "Perles, sfifa, brocart et détails travaillés avec soin pour une allure noble, moderne et résolument couture.",
      pointOne: "Des tissus premium sélectionnés pour leur fluidité, leur tenue et leur confort lors des longues cérémonies.",
      pointTwo: "Une sélection éditoriale pensée pour le mariage, le henné, l'Eid, les fiançailles et les soirées élégantes.",
      pointThree: "Un accompagnement humain pour les tailles, les retouches, les réservations et les demandes sur mesure."
    },
    products: {
      ...copy.fr.products,
      title: "Collection signature",
      link: "Prendre rendez-vous pour une création",
      details: "Découvrir la pièce",
      add: "Ajouter au panier",
      stock: "Disponibilité",
      limited: "Série limitée",
      deliveryShort: "Conseil taille offert",
      signatureLabel: "Signature maison",
      availabilitySoon: "Stock très limité"
    },
    benefits: {
      ...copy.fr.benefits,
      title: "Pourquoi nos clientes choisissent Aicha Caftan",
      subtitle: "Un univers pensé pour rassurer, séduire et magnifier chaque commande comme dans une vraie boutique premium."
    },
    testimonials: {
      ...copy.fr.testimonials,
      title: "Elles nous confient leurs plus beaux moments",
      subtitle: "Chaque retour reflète ce que nous voulons offrir: une tenue qui impressionne, une expérience fluide et un sentiment de confiance."
    },
    contact: {
      ...copy.fr.contact,
      title: "Préparons ensemble votre tenue de cérémonie",
      text: "Pour une commande, un conseil taille, une demande de vidéo produit ou une création sur mesure, Aicha Caftan vous répond avec attention, rapidité et sens du détail."
    },
    footer: {
      ...copy.fr.footer,
      brandText: "Caftans et takchitas marocains haut de gamme",
      note: "Une maison boutique dédiée aux silhouettes de cérémonie, entre héritage marocain, raffinement contemporain et accompagnement personnalisé."
    },
    modal: {
      ...copy.fr.modal,
      order: "Ajouter à mon panier",
      custom: "Parler du sur mesure",
      mail: "Recevoir plus d'informations par email"
    },
    cart: {
      ...copy.fr.cart,
      title: "Panier Aicha Caftan",
      order: "Finaliser ma commande"
    },
    toast: {
      ...copy.fr.toast,
      addedBody: "La pièce a été ajoutée à votre sélection Aicha Caftan."
    },
    misc: {
      ...copy.fr.misc,
      customOrder: "Confection sur commande"
    }
  });

  const categoryOverrides = {
    mariage: "Des pièces lumineuses pour la mariée, le henné et les cérémonies qui demandent une présence inoubliable.",
    caftan: "Des coupes fluides et sophistiquées pour une allure féminine, intemporelle et naturellement chic.",
    luxe: "Tissus précieux, finitions couture et détails remarquables pour les grandes occasions.",
    fete: "Des silhouettes élégantes pour l'Eid, les soirées et les réceptions les plus raffinées.",
    new: "Les nouveautés de la maison, imaginées pour une saison plus couture et plus désirable.",
    commande: "Retouches, ajustements et accompagnement personnalisé selon votre événement."
  };

  categories.forEach((category) => {
    if (categoryOverrides[category.id]) {
      mergeLocaleField(category, "description", { fr: categoryOverrides[category.id] });
    }
  });

  const benefitOverrides = {
    shield: {
      title: "Finitions couture",
      description: "Des matières choisies avec exigence et des détails travaillés pour une tenue impeccable du premier regard jusqu'à la cérémonie."
    },
    sparkle: {
      title: "Broderie artisanale",
      description: "Sfifa, perlage et ornements inspirés du patrimoine marocain pour une richesse visuelle subtile et élégante."
    },
    delivery: {
      title: "Livraison suivie",
      description: "Préparation soignée, emballage boutique et expédition avec suivi pour recevoir votre pièce en toute sérénité."
    },
    crown: {
      title: "Allure marocaine",
      description: "Des lignes qui respectent la tradition tout en parlant le langage d'une boutique haut de gamme contemporaine."
    },
    chat: {
      title: "Conseil réactif",
      description: "Un accompagnement rapide sur WhatsApp ou par email pour confirmer taille, coupe, disponibilité et délai."
    },
    diamond: {
      title: "Éditions choisies",
      description: "Une sélection pensée pour se distinguer, avec des modèles à fort impact visuel et une vraie personnalité."
    }
  };

  benefits.forEach((benefit) => {
    const override = benefitOverrides[benefit.icon];
    if (!override) return;
    mergeLocaleField(benefit, "title", { fr: override.title });
    mergeLocaleField(benefit, "description", { fr: override.description });
  });

  testimonials.splice(
    0,
    testimonials.length,
    {
      quote: {
        fr: "La coupe est sublime et les finitions sont encore plus belles en vrai. J'ai eu l'impression de recevoir une pièce de boutique couture.",
        ar: "الجودة رائعة والتفاصيل أجمل بكثير على الحقيقة."
      },
      author: { fr: "Samira, Paris", ar: "سميرة، باريس" },
      occasion: { fr: "Commande pour fiançailles", ar: "طلب من أجل الخطوبة" }
    },
    {
      quote: {
        fr: "Service très sérieux, réponses rapides sur WhatsApp et robe magnifique dès l'ouverture du colis.",
        ar: "خدمة احترافية وسريعة والفستان جميل جداً."
      },
      author: { fr: "Nadia, Bruxelles", ar: "نادية، بروكسيل" },
      occasion: { fr: "Caftan de fête", ar: "قفطان للحفلات" }
    },
    {
      quote: {
        fr: "Ma takchita de mariage était élégante, bien ajustée et exactement dans l'esprit que je cherchais.",
        ar: "تكشيطة مثالية لزفافي وأناقة فوق المتوقع."
      },
      author: { fr: "Salma, Lyon", ar: "سلمى، ليون" },
      occasion: { fr: "Takchita mariage", ar: "تكشيطة زفاف" }
    },
    {
      quote: {
        fr: "On sent une vraie identité de marque: c'est féminin, raffiné, et très rassurant pour commander à distance.",
        ar: "إحساس فاخر وهوية واضحة وثقة كبيرة عند الطلب."
      },
      author: { fr: "Inès, Amsterdam", ar: "إيناس، أمستردام" },
      occasion: { fr: "Commande depuis l'Europe", ar: "طلب من أوروبا" }
    }
  );

  const productOverrides = {
    "royale-verte": {
      shortDescription: "Une silhouette émeraude majestueuse, pensée pour illuminer les soirées et les entrées remarquées.",
      fullDescription: "Takchita signature à l'esprit couture, cette création émeraude associe un crêpe satiné fluide à des détails brodés qui captent la lumière avec subtilité. Sa ceinture travaillée structure la silhouette tout en gardant une allure féminine, noble et très contemporaine pour les cérémonies où l'on veut marquer les esprits avec élégance.",
      delivery: "Livraison suivie en Europe sous 3 à 5 jours avec conseils de taille avant l'envoi.",
      signature: "Idéale pour une allure affirmée, sophistiquée et intensément féminine."
    },
    "bleu-nuit-luxe": {
      shortDescription: "Une takchita bleu nuit au luxe discret, parfaite pour les soirées marocaines les plus chic.",
      fullDescription: "Cette pièce bleu nuit joue la carte d'un raffinement profond, entre velours léger, broderies lumineuses et ligne élancée. Elle habille la silhouette avec distinction et crée une présence précieuse, idéale pour les invitées ou les célébrations du soir qui demandent une tenue forte mais subtile.",
      delivery: "Préparation premium, emballage boutique et expédition rapide en Europe.",
      signature: "Une pièce de soirée qui combine intensité, grâce et sophistication."
    },
    "mariage-doree": {
      shortDescription: "Une création nuptiale lumineuse, pensée pour le mariage, le henné et les cérémonies d'exception.",
      fullDescription: "Aicha Caftan imagine ici une takchita au rayonnement précieux, travaillée dans des nuances champagne et dorées pour magnifier la mariée. Les matières satinées, les perles cousues avec soin et la ligne majestueuse donnent à cette pièce une aura rare, conçue pour les jours où chaque détail doit évoquer le prestige.",
      delivery: "Confection sur commande possible avec retouches personnalisées et accompagnement sur mesure.",
      signature: "La pièce cérémonielle par excellence pour une allure royale et mémorable."
    },
    "rose-elegance": {
      shortDescription: "Un caftan rose poudré délicat et moderne, pour les moments qui demandent douceur et distinction.",
      fullDescription: "Ce caftan mise sur une féminité lumineuse, avec une base fluide, des manches en organza et une broderie délicate. Il accompagne parfaitement les fiançailles, l'Eid ou un dîner élégant en offrant un luxe plus tendre, plus romantique et immédiatement flatteur.",
      delivery: "Disponible rapidement avec préparation soignée et expédition suivie.",
      signature: "Une pièce douce, chic et très photogénique pour les célébrations raffinées."
    },
    "tradition-atlas": {
      shortDescription: "Une interprétation couture du patrimoine marocain, au caractère rare et très signature.",
      fullDescription: "Avec son duo beige sable et vert atlas, cette takchita traduit une vision plus éditoriale de l'élégance marocaine. Le brocart premium, la ceinture travaillée et les détails couture en font une création de caractère, destinée aux clientes qui recherchent une pièce forte, patrimoniale et hautement distinctive.",
      delivery: "Service dédié, ajustements possibles et accompagnement personnalisé avant validation.",
      signature: "Pour celles qui veulent une pièce rare à la présence immédiatement luxueuse."
    },
    "blanc-perle": {
      shortDescription: "Un caftan blanc perlé à l'allure pure et prestigieuse pour les cérémonies lumineuses.",
      fullDescription: "Le satin duchesse, les détails perlés et la construction raffinée donnent à ce caftan une présence sobrement spectaculaire. Parfait pour un mariage civil, des fiançailles ou une réception de prestige, il exprime une féminité sereine, élégante et profondément haut de gamme.",
      delivery: "Préparation premium avec option sur mesure et validation de la taille avant envoi.",
      signature: "Une silhouette noble et délicate pour les moments les plus précieux."
    }
  };

  products.forEach((product) => {
    const override = productOverrides[product.id];
    if (!override) return;
    mergeLocaleField(product, "shortDescription", { fr: override.shortDescription });
    mergeLocaleField(product, "fullDescription", { fr: override.fullDescription });
    mergeLocaleField(product, "delivery", { fr: override.delivery });
    mergeLocaleField(product, "signature", { fr: override.signature });
  });
}

function formatPrice(value) {
  const localeMap = {
    fr: "fr-FR",
    es: "es-ES",
    ar: "ar-MA"
  };

  return new Intl.NumberFormat(localeMap[state.locale] || "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

applyPremiumContent();

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function iconMarkup(name) {
  const icons = {
    arch: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V9.5C4 5.9 7.1 3 11 3h2c3.9 0 7 2.9 7 6.5V20"></path><path d="M8 20v-6"></path><path d="M16 20v-6"></path></svg>',
    hanger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7a3 3 0 1 1 6 0c0 1.1-.6 1.9-1.5 2.5L18 12"></path><path d="M6 13h12l2.5 4H3.5z"></path></svg>',
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"></path><path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"></path></svg>',
    stars: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 1.9 4 4.4.6-3.2 3 1 4.4-4.1-2.2L7.9 16l1-4.4-3.2-3L10.1 8z"></path></svg>',
    leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5c-7.6.1-12 4.2-12 10 0 2.4 1.6 4 4.1 4 5.9 0 10-4.4 9.9-14Z"></path><path d="M8 16c1.8-2.1 4.2-4 7.1-5.8"></path></svg>',
    needle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 18 12-12"></path><path d="M15 4h5v5"></path><path d="m5 13 6 6"></path></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.7 2.9 8.9 7 10 4.1-1.1 7-5.3 7-10V6z"></path><path d="m9.5 12 1.8 1.8 3.5-3.8"></path></svg>',
    delivery: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v8H3z"></path><path d="M14 10h3l3 3v2h-6"></path><circle cx="7" cy="18" r="1.8"></circle><circle cx="17" cy="18" r="1.8"></circle></svg>',
    crown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 8 4 4 4-6 4 6 4-4-2 10H6z"></path></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18V6h14v9H9z"></path><path d="m9 15-4 3"></path></svg>',
    diamond: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4-4 6 9 10 9-10-4-6z"></path><path d="M7 4h10"></path><path d="m9 4 3 16 3-16"></path></svg>'
  };

  return icons[name] || icons.sparkle;
}

function localizePage() {
  document.documentElement.lang = state.locale;
  document.documentElement.dir = state.locale === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getText(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = getText(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.locale === state.locale);
  });

  elements.priceOutput.textContent = formatPrice(Number(elements.priceRange.value));
}

function renderCategoryControls() {
  const allLabel = getText("filters.categoryAll");
  elements.categorySelect.innerHTML = [`<option value="all">${allLabel}</option>`]
    .concat(categories.map((category) => `<option value="${category.id}" ${state.category === category.id ? "selected" : ""}>${pickLocalized(category.title)}</option>`))
    .join("");

  elements.filterChips.innerHTML = [`<button class="chip ${state.category === "all" ? "is-active" : ""}" data-category="all" type="button">${allLabel}</button>`]
    .concat(categories.map((category) => `<button class="chip ${state.category === category.id ? "is-active" : ""}" data-category="${category.id}" type="button">${pickLocalized(category.title)}</button>`))
    .join("");
}

function renderCategories() {
  elements.categoryGrid.innerHTML = categories
    .map((category) => {
      const count = products.filter((product) => product.categories.includes(category.id)).length;
      return `<button class="category-card reveal" type="button" data-category-filter="${category.id}">
        <span class="card-icon">${iconMarkup(category.icon)}</span>
        <h3>${pickLocalized(category.title)}</h3>
        <p>${pickLocalized(category.description)}</p>
        <span class="count-label">${count} ${getText("categories.pieces")}</span>
      </button>`;
    })
    .join("");
}

function renderBenefits() {
  elements.benefitGrid.innerHTML = benefits
    .map((benefit) => `<article class="benefit-card reveal"><span class="card-icon">${iconMarkup(benefit.icon)}</span><h3>${pickLocalized(benefit.title)}</h3><p>${pickLocalized(benefit.description)}</p></article>`)
    .join("");
}

function renderTestimonials() {
  const stars = new Array(5).fill('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 17.1 6.8 19.8l1-5.9-4.3-4.1 5.9-.9z"></path></svg>').join("");
  elements.testimonialGrid.innerHTML = testimonials
    .map((testimonial) => `<article class="testimonial-card reveal">
      <div class="testimonial-topline">
        <div class="stars">${stars}</div>
        ${testimonial.occasion ? `<span class="testimonial-tag">${pickLocalized(testimonial.occasion)}</span>` : ""}
      </div>
      <h3>“${pickLocalized(testimonial.quote)}”</h3>
      <span class="testimonial-author">${pickLocalized(testimonial.author)}</span>
    </article>`)
    .join("");
}

function renderFooterCategories() {
  elements.footerCategoryLinks.innerHTML = categories
    .slice(0, 5)
    .map((category) => `<li><a href="#collection" data-category-link="${category.id}">${pickLocalized(category.title)}</a></li>`)
    .join("");
}

function getFilteredProducts() {
  const searchTerm = state.search.trim().toLowerCase();
  return products.filter((product) => {
    const haystack = [
      ...collectLocalizedText(product.names),
      ...collectLocalizedText(product.shortDescription),
      ...collectLocalizedText(product.fullDescription),
      ...collectLocalizedText(product.fabric),
      ...collectLocalizedText(product.color),
      ...collectLocalizedText(product.occasion),
      ...collectLocalizedText(product.signature)
    ].join(" ").toLowerCase();
    return (!searchTerm || haystack.includes(searchTerm)) && (state.category === "all" || product.categories.includes(state.category)) && product.price <= state.maxPrice && (!state.showWishlistOnly || state.wishlist.includes(product.id));
  });
}

function productCategoryLabel(product) {
  const primaryCategoryId = product.categories.find((categoryId) => categoryId !== "new") || product.categories[0];
  return pickLocalized(categories.find((category) => category.id === primaryCategoryId)?.title) || getText("filters.categoryAll");
}

function stockPillMarkup(product) {
  const label = product.stock <= 3 ? getText("products.availabilitySoon") : getText("products.stock");
  return `<span class="stock-pill ${product.stock <= 3 ? "is-limited" : ""}">${label}: ${product.stock}</span>`;
}

function productDeliverySnippet(product) {
  const delivery = pickLocalized(product.delivery);
  return delivery.split(".")[0];
}



function updateWishlistCount() {
  elements.wishlistCount.textContent = state.wishlist.length;
  elements.wishlistToggle.classList.toggle("is-active", state.showWishlistOnly);
}



function showToast(title, body) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
  elements.toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);
  existing ? (existing.quantity += 1) : state.cart.push({ id: productId, quantity: 1 });
  saveStorage("maison-reddam-cart", state.cart);
  renderCart();
  showToast(getText("toast.addedTitle"), getText("toast.addedBody"));
}

function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    state.cart = state.cart.filter((item) => item.id !== productId);
  } else {
    const item = state.cart.find((entry) => entry.id === productId);
    if (item) item.quantity = quantity;
  }
  saveStorage("maison-reddam-cart", state.cart);
  renderCart();
}

function toggleWishlist(productId) {
  const exists = state.wishlist.includes(productId);
  state.wishlist = exists ? state.wishlist.filter((id) => id !== productId) : [...state.wishlist, productId];
  saveStorage("maison-reddam-wishlist", state.wishlist);
  updateWishlistCount();
  renderProducts();
  showToast(getText(exists ? "toast.wishlistRemoveTitle" : "toast.wishlistAddTitle"), getText(exists ? "toast.wishlistRemoveBody" : "toast.wishlistAddBody"));
}

function openCart() {
  elements.cartDrawer.classList.add("is-open");
  elements.drawerOverlay.classList.add("is-visible");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  elements.cartDrawer.classList.remove("is-open");
  elements.drawerOverlay.classList.remove("is-visible");
  if (!elements.modal.classList.contains("is-open")) document.body.classList.remove("no-scroll");
}

function openModal(productId) {
  state.activeProductId = productId;
  state.activeGalleryIndex = 0;
  renderModal();
  elements.modal.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  elements.modal.classList.remove("is-open");
  state.activeProductId = null;
  if (!elements.cartDrawer.classList.contains("is-open")) document.body.classList.remove("no-scroll");
}

function observeReveals() {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
}

function closeMobileNav() {
  elements.siteNav.classList.remove("is-open");
  elements.navToggle.setAttribute("aria-expanded", "false");
}

function renderAll() {
  localizePage();
  renderCategoryControls();
  renderCategories();
  renderBenefits();
  renderTestimonials();
  renderFooterCategories();
  renderProducts();
  renderCart();
  updateWishlistCount();
  if (state.activeProductId) renderModal();
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  elements.productGrid.innerHTML = filteredProducts
    .map((product, index) => {
      const localizedOccasions = Array.isArray(pickLocalized(product.occasion)) ? pickLocalized(product.occasion) : [pickLocalized(product.occasion)];

      return `<article class="product-card reveal ${index === 0 ? "is-spotlight" : ""}">
        <div class="product-media">
          <img src="${product.image}" alt="${pickLocalized(product.names)}">
          ${product.badge ? `<span class="product-badge">${getText(`badges.${product.badge}`)}</span>` : ""}
          <button class="icon-button wishlist-button ${state.wishlist.includes(product.id) ? "is-active" : ""}" type="button" data-action="wishlist" data-id="${product.id}" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 4.35 13a4.85 4.85 0 1 1 6.86-6.86L12 6.92l.79-.78A4.85 4.85 0 0 1 19.65 13L12 20.6Z"></path></svg>
          </button>
        </div>
        <div class="product-body">
          <div class="product-label-row">
            <span class="product-category-tag">${productCategoryLabel(product)}</span>
            <span class="product-occasion-tag">${localizedOccasions[0]}</span>
          </div>
          <div class="product-header">
            <h3>${pickLocalized(product.names)}</h3>
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          ${stockPillMarkup(product)}
          <p class="product-signature">${pickLocalized(product.signature) || getText("products.deliveryShort")}</p>
          <p class="product-description">${pickLocalized(product.shortDescription)}</p>
          <div class="product-meta-grid">
            <article class="product-meta-card">
              <span>${getText("products.sizes")}</span>
              <strong>${product.sizes.join(" · ")}</strong>
            </article>
            <article class="product-meta-card">
              <span>${getText("products.color")}</span>
              <strong>${pickLocalized(product.color)}</strong>
            </article>
            <article class="product-meta-card">
              <span>${getText("products.fabric")}</span>
              <strong>${pickLocalized(product.fabric)}</strong>
            </article>
            <article class="product-meta-card">
              <span>${getText("products.occasion")}</span>
              <strong>${localizedOccasions.join(", ")}</strong>
            </article>
          </div>
          <div class="product-support-note">
            <strong>${getText("products.signatureLabel")}</strong>
            <span>${productDeliverySnippet(product)}</span>
          </div>
          <div class="product-actions">
            <button class="button secondary" type="button" data-action="details" data-id="${product.id}">${getText("products.details")}</button>
            <button class="button primary" type="button" data-action="cart" data-id="${product.id}">${getText("products.add")}</button>
          </div>
        </div>
      </article>`;
    })
    .join("");

  elements.emptyState.classList.toggle("hidden", filteredProducts.length > 0);
  observeReveals();
}

function renderCart() {
  const cartItems = state.cart.map((entry) => ({ ...entry, product: getProduct(entry.id) })).filter((entry) => entry.product);
  elements.cartItems.innerHTML = cartItems.length
    ? cartItems.map(({ product, quantity }) => `<article class="cart-item">
      <img src="${product.image}" alt="${pickLocalized(product.names)}">
      <div class="cart-item-details">
        <strong>${pickLocalized(product.names)}</strong>
        <p>${formatPrice(product.price)}</p>
        <div class="cart-item-controls">
          <div class="qty-controls" aria-label="${getText("cart.quantity")}">
            <button type="button" data-cart-action="decrease" data-id="${product.id}" aria-label="${getText("misc.minus")}">-</button>
            <span>${quantity}</span>
            <button type="button" data-cart-action="increase" data-id="${product.id}" aria-label="${getText("misc.plus")}">+</button>
          </div>
          <button class="chip" type="button" data-cart-action="remove" data-id="${product.id}">${getText("misc.remove")}</button>
        </div>
      </div>
    </article>`).join("")
    : `<div class="cart-empty"><p>${getText("cart.empty")}</p></div>`;

  const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = state.cart.reduce((total, item) => total + (getProduct(item.id)?.price || 0) * item.quantity, 0);
  elements.cartCount.textContent = totalQuantity;
  elements.cartTotal.textContent = formatPrice(totalAmount);
  updateCartOrderLink(cartItems, totalAmount);
}

function renderModal() {
  const product = getProduct(state.activeProductId);
  if (!product) return;

  const activeImage = product.gallery[state.activeGalleryIndex];
  const localizedName = pickLocalized(product.names);
  const localizedOccasions = Array.isArray(pickLocalized(product.occasion)) ? pickLocalized(product.occasion) : [pickLocalized(product.occasion)];

  elements.modalMainImage.src = activeImage;
  elements.modalMainImage.alt = localizedName;
  elements.modalBadge.textContent = product.badge ? getText(`badges.${product.badge}`) : getText("misc.customOrder");
  elements.modalTitle.textContent = localizedName;
  elements.modalDescription.innerHTML = `${pickLocalized(product.signature) ? `<span class="modal-signature">${pickLocalized(product.signature)}</span>` : ""}${pickLocalized(product.fullDescription)}`;
  elements.modalPrice.textContent = formatPrice(product.price);
  elements.modalStock.textContent = `${getText(product.stock <= 3 ? "products.availabilitySoon" : "products.stock")}: ${product.stock}`;
  elements.modalColor.textContent = pickLocalized(product.color);
  elements.modalFabric.textContent = pickLocalized(product.fabric);
  elements.modalSizes.textContent = product.sizes.join(" · ");
  elements.modalDelivery.textContent = pickLocalized(product.delivery);
  elements.modalAddCart.dataset.id = product.id;
  elements.modalContactLink.href = `https://wa.me/34642295198?text=${encodeURIComponent(`Bonjour Aicha Caftan, je souhaite plus d'informations sur ${localizedName}.`)}`;
  elements.modalMailLink.href = `mailto:alae200409rd@gmail.com?subject=${encodeURIComponent(`${state.locale === "ar" ? "استفسار حول" : "Demande sur"} ${localizedName}`)}&body=${encodeURIComponent(state.locale === "ar" ? `مرحبا، أريد معلومات أكثر حول ${localizedName}.` : `Bonjour, je souhaite plus d'informations concernant ${localizedName}.`)}`;
  elements.modalThumbnails.innerHTML = product.gallery
    .map((image, index) => `<button class="thumb-button ${index === state.activeGalleryIndex ? "is-active" : ""}" type="button" data-thumb-index="${index}"><img src="${image}" alt="${localizedName}"></button>`)
    .join("");
  elements.modalOccasions.innerHTML = localizedOccasions.map((occasion) => `<span class="chip">${occasion}</span>`).join("");
}

function updateCartOrderLink(cartItems, totalAmount) {
  const phoneNumber = "34642295198";

  if (!cartItems.length) {
    const emptyMessage =
      state.locale === "ar"
        ? "مرحبا، أريد معلومات أكثر حول منتجات المتجر."
        : state.locale === "es"
        ? "Hola, quiero más información sobre los productos de la tienda."
        : "Bonjour, je souhaite plus d'informations sur vos produits.";

    elements.cartOrderLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(emptyMessage)}`;
    return;
  }

  const intro =
    state.locale === "ar"
      ? "مرحبا، أريد طلب المنتجات التالية:"
      : state.locale === "es"
      ? "Hola, quiero pedir los siguientes productos:"
      : "Bonjour, je souhaite commander les pièces suivantes :";

  const lines = cartItems
    .map(({ product, quantity }) => `- ${pickLocalized(product.names)} x${quantity} : ${formatPrice(product.price * quantity)}`)
    .join("\n");

  const totalLine =
    state.locale === "ar"
      ? `المجموع: ${formatPrice(totalAmount)}`
      : "Total: " + formatPrice(totalAmount);

  elements.cartOrderLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`${intro}\n${lines}\n\n${totalLine}`)}`;
}

function bindEvents() {
  document.querySelectorAll(".lang-button").forEach((button) => button.addEventListener("click", () => { state.locale = button.dataset.locale; renderAll(); }));
  elements.search.addEventListener("input", (event) => { state.search = event.target.value; renderProducts(); });
  elements.priceRange.addEventListener("input", (event) => { state.maxPrice = Number(event.target.value); elements.priceOutput.textContent = formatPrice(state.maxPrice); renderProducts(); });
  elements.categorySelect.addEventListener("change", (event) => { state.category = event.target.value; renderCategoryControls(); renderProducts(); });
  elements.filterChips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderCategoryControls();
    renderProducts();
  });
  elements.categoryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category-filter]");
    if (!button) return;
    state.category = button.dataset.categoryFilter;
    renderCategoryControls();
    renderProducts();
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  elements.footerCategoryLinks.addEventListener("click", (event) => {
    const link = event.target.closest("[data-category-link]");
    if (!link) return;
    state.category = link.dataset.categoryLink;
    renderCategoryControls();
    renderProducts();
  });
  elements.productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "details") openModal(button.dataset.id);
    if (button.dataset.action === "cart") { addToCart(button.dataset.id); openCart(); }
    if (button.dataset.action === "wishlist") toggleWishlist(button.dataset.id);
  });
  elements.modalThumbnails.addEventListener("click", (event) => {
    const button = event.target.closest("[data-thumb-index]");
    if (!button) return;
    state.activeGalleryIndex = Number(button.dataset.thumbIndex);
    renderModal();
  });
  elements.modalAddCart.addEventListener("click", () => {
    if (!elements.modalAddCart.dataset.id) return;
    addToCart(elements.modalAddCart.dataset.id);
    openCart();
  });
  elements.wishlistToggle.addEventListener("click", () => {
    state.showWishlistOnly = !state.showWishlistOnly;
    updateWishlistCount();
    renderProducts();
    showToast(state.showWishlistOnly ? getText("products.wishlistOn") : getText("products.wishlistOff"), state.showWishlistOnly ? getText("toast.wishlistAddBody") : getText("toast.wishlistRemoveBody"));
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  elements.cartToggle.addEventListener("click", openCart);
  elements.cartClose.addEventListener("click", closeCart);
  elements.cartContinue.addEventListener("click", closeCart);
  elements.drawerOverlay.addEventListener("click", () => { closeCart(); closeModal(); });
  elements.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const item = state.cart.find((entry) => entry.id === button.dataset.id);
    if (!item) return;
    if (button.dataset.cartAction === "increase") updateCartQuantity(button.dataset.id, item.quantity + 1);
    if (button.dataset.cartAction === "decrease") updateCartQuantity(button.dataset.id, item.quantity - 1);
    if (button.dataset.cartAction === "remove") updateCartQuantity(button.dataset.id, 0);
  });
  elements.modal.addEventListener("click", (event) => { if (event.target === elements.modal) closeModal(); });
  elements.modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeCart(); closeModal(); closeMobileNav(); } });
  elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.siteNav.classList.toggle("is-open");
    elements.navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  elements.siteNav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMobileNav(); });
  
}

elements.currentYear.textContent = String(new Date().getFullYear());
state.maxPrice = Number(elements.priceRange.value);
bindEvents();
renderAll();
observeReveals();
