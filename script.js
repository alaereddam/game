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
  return path.split(".").reduce((accumulator, part) => accumulator?.[part], copy[state.locale]) || "";
}

function formatPrice(value) {
  return new Intl.NumberFormat(state.locale === "ar" ? "ar-MA" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

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
    .concat(categories.map((category) => `<option value="${category.id}" ${state.category === category.id ? "selected" : ""}>${category.title[state.locale]}</option>`))
    .join("");

  elements.filterChips.innerHTML = [`<button class="chip ${state.category === "all" ? "is-active" : ""}" data-category="all" type="button">${allLabel}</button>`]
    .concat(categories.map((category) => `<button class="chip ${state.category === category.id ? "is-active" : ""}" data-category="${category.id}" type="button">${category.title[state.locale]}</button>`))
    .join("");
}

function renderCategories() {
  elements.categoryGrid.innerHTML = categories
    .map((category) => {
      const count = products.filter((product) => product.categories.includes(category.id)).length;
      return `<button class="category-card reveal" type="button" data-category-filter="${category.id}">
        <span class="card-icon">${iconMarkup(category.icon)}</span>
        <h3>${category.title[state.locale]}</h3>
        <p>${category.description[state.locale]}</p>
        <span class="count-label">${count} ${getText("categories.pieces")}</span>
      </button>`;
    })
    .join("");
}

function renderBenefits() {
  elements.benefitGrid.innerHTML = benefits
    .map((benefit) => `<article class="benefit-card reveal"><span class="card-icon">${iconMarkup(benefit.icon)}</span><h3>${benefit.title[state.locale]}</h3><p>${benefit.description[state.locale]}</p></article>`)
    .join("");
}

function renderTestimonials() {
  const stars = new Array(5).fill('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 17.1 6.8 19.8l1-5.9-4.3-4.1 5.9-.9z"></path></svg>').join("");
  elements.testimonialGrid.innerHTML = testimonials
    .map((testimonial) => `<article class="testimonial-card reveal"><div class="stars">${stars}</div><h3>${testimonial.quote[state.locale]}</h3><span class="testimonial-author">${testimonial.author[state.locale]}</span></article>`)
    .join("");
}

function renderFooterCategories() {
  elements.footerCategoryLinks.innerHTML = categories
    .slice(0, 5)
    .map((category) => `<li><a href="#collection" data-category-link="${category.id}">${category.title[state.locale]}</a></li>`)
    .join("");
}

function getFilteredProducts() {
  const searchTerm = state.search.trim().toLowerCase();
  return products.filter((product) => {
    const haystack = [product.names.fr, product.names.ar, product.shortDescription.fr, product.shortDescription.ar, product.fabric.fr, product.fabric.ar, product.color.fr, product.color.ar, ...product.occasion.fr, ...product.occasion.ar].join(" ").toLowerCase();
    return (!searchTerm || haystack.includes(searchTerm)) && (state.category === "all" || product.categories.includes(state.category)) && product.price <= state.maxPrice && (!state.showWishlistOnly || state.wishlist.includes(product.id));
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  elements.productGrid.innerHTML = filteredProducts
    .map((product) => `<article class="product-card reveal">
      <div class="product-media">
        <img src="${product.image}" alt="${product.names[state.locale]}">
        ${product.badge ? `<span class="product-badge">${getText(`badges.${product.badge}`)}</span>` : ""}
        <button class="icon-button wishlist-button ${state.wishlist.includes(product.id) ? "is-active" : ""}" type="button" data-action="wishlist" data-id="${product.id}" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 4.35 13a4.85 4.85 0 1 1 6.86-6.86L12 6.92l.79-.78A4.85 4.85 0 0 1 19.65 13L12 20.6Z"></path></svg>
        </button>
      </div>
      <div class="product-body">
        <div class="product-header"><h3>${product.names[state.locale]}</h3><span class="product-price">${formatPrice(product.price)}</span></div>
        <span class="stock-pill">${getText("products.stock")}: ${product.stock}</span>
        <p class="product-description">${product.shortDescription[state.locale]}</p>
        <div class="product-meta">
          <div class="meta-row"><strong>${getText("products.sizes")}</strong><span>${product.sizes.join(" · ")}</span></div>
          <div class="meta-row"><strong>${getText("products.color")}</strong><span>${product.color[state.locale]}</span></div>
          <div class="meta-row"><strong>${getText("products.fabric")}</strong><span>${product.fabric[state.locale]}</span></div>
          <div class="meta-row"><strong>${getText("products.occasion")}</strong><span>${product.occasion[state.locale].join(", ")}</span></div>
        </div>
        <div class="product-actions">
          <button class="button secondary" type="button" data-action="details" data-id="${product.id}">${getText("products.details")}</button>
          <button class="button primary" type="button" data-action="cart" data-id="${product.id}">${getText("products.add")}</button>
        </div>
      </div>
    </article>`)
    .join("");

  elements.emptyState.classList.toggle("hidden", filteredProducts.length > 0);
  observeReveals();
}

function renderCart() {
  const cartItems = state.cart.map((entry) => ({ ...entry, product: getProduct(entry.id) })).filter((entry) => entry.product);
  elements.cartItems.innerHTML = cartItems.length
    ? cartItems.map(({ product, quantity }) => `<article class="cart-item">
      <img src="${product.image}" alt="${product.names[state.locale]}">
      <div class="cart-item-details">
        <strong>${product.names[state.locale]}</strong>
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

function updateCartOrderLink(cartItems, totalAmount) {
  if (!cartItems.length) {
    elements.cartOrderLink.href = "mailto:alae200409rd@gmail.com";
    return;
  }
  const intro = state.locale === "ar" ? "مرحبا، أرغب في طلب القطع التالية:" : "Bonjour, je souhaite commander les pièces suivantes :";
  const lines = cartItems.map(({ product, quantity }) => `- ${product.names[state.locale]} x${quantity} : ${formatPrice(product.price * quantity)}`).join("\n");
  const totalLine = state.locale === "ar" ? `المجموع: ${formatPrice(totalAmount)}` : `Total: ${formatPrice(totalAmount)}`;
  elements.cartOrderLink.href = `mailto:alae200409rd@gmail.com?subject=${encodeURIComponent(state.locale === "ar" ? "طلب Maison Reddam" : "Commande Maison Reddam")}&body=${encodeURIComponent(`${intro}\n${lines}\n\n${totalLine}`)}`;
}

function updateWishlistCount() {
  elements.wishlistCount.textContent = state.wishlist.length;
  elements.wishlistToggle.classList.toggle("is-active", state.showWishlistOnly);
}

function renderModal() {
  const product = getProduct(state.activeProductId);
  if (!product) return;
  const activeImage = product.gallery[state.activeGalleryIndex];
  elements.modalMainImage.src = activeImage;
  elements.modalMainImage.alt = product.names[state.locale];
  elements.modalBadge.textContent = product.badge ? getText(`badges.${product.badge}`) : getText("misc.customOrder");
  elements.modalTitle.textContent = product.names[state.locale];
  elements.modalDescription.textContent = product.fullDescription[state.locale];
  elements.modalPrice.textContent = formatPrice(product.price);
  elements.modalStock.textContent = `${getText("products.stock")}: ${product.stock}`;
  elements.modalColor.textContent = product.color[state.locale];
  elements.modalFabric.textContent = product.fabric[state.locale];
  elements.modalSizes.textContent = product.sizes.join(" · ");
  elements.modalDelivery.textContent = product.delivery[state.locale];
  elements.modalAddCart.dataset.id = product.id;
  elements.modalMailLink.href = `mailto:alae200409rd@gmail.com?subject=${encodeURIComponent(`${state.locale === "ar" ? "استفسار حول" : "Demande sur"} ${product.names[state.locale]}`)}&body=${encodeURIComponent(state.locale === "ar" ? `مرحبا، أريد معلومات أكثر حول ${product.names[state.locale]}.` : `Bonjour, je souhaite plus d'informations concernant ${product.names[state.locale]}.`)}`;
  elements.modalThumbnails.innerHTML = product.gallery.map((image, index) => `<button class="thumb-button ${index === state.activeGalleryIndex ? "is-active" : ""}" type="button" data-thumb-index="${index}"><img src="${image}" alt="${product.names[state.locale]}"></button>`).join("");
  elements.modalOccasions.innerHTML = product.occasion[state.locale].map((occasion) => `<span class="chip">${occasion}</span>`).join("");
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
  elements.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(elements.contactForm);
    const body = `${state.locale === "ar" ? "الاسم" : "Nom"}: ${formData.get("name")}\n${state.locale === "ar" ? "البريد" : "Email"}: ${formData.get("email")}\n\n${formData.get("message")}`;
    showToast(getText("toast.formTitle"), getText("toast.formBody"));
    window.location.href = `mailto:alae200409rd@gmail.com?subject=${encodeURIComponent(state.locale === "ar" ? "رسالة من موقع Maison Reddam" : "Message depuis le site Maison Reddam")}&body=${encodeURIComponent(body)}`;
    elements.contactForm.reset();
  });
}

elements.currentYear.textContent = String(new Date().getFullYear());
state.maxPrice = Number(elements.priceRange.value);
bindEvents();
renderAll();
observeReveals();
