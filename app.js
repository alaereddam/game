const backendUI = {
  fr: {
    eyebrow: "Commande",
    title: "Finaliser votre commande",
    subtitle: "Renseignez vos informations pour enregistrer votre demande de commande.",
    totalLabel: "Total",
    nameLabel: "Nom complet",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    notesLabel: "Notes",
    submit: "Confirmer la commande",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "Votre email",
    phonePlaceholder: "+33 ...",
    notesPlaceholder: "Précisez votre occasion, taille ou demande spéciale",
    quantity: "Quantité",
    contactSuccessTitle: "Message enregistré",
    contactSuccessBody: "Votre message a bien été envoyé à la boutique.",
    orderSuccessTitle: "Commande enregistrée",
    orderSuccessBody: (orderNumber) => `Votre demande a bien été reçue sous le numéro ${orderNumber}.`,
    emptyCartTitle: "Panier vide",
    emptyCartBody: "Ajoutez au moins une pièce avant de confirmer une commande.",
    errorTitle: "Action indisponible",
    errorBody: "Le serveur n'a pas pu traiter votre demande pour le moment."
  },
  ar: {
    eyebrow: "الطلب",
    title: "تأكيد الطلب",
    subtitle: "أدخلي معلوماتك لتسجيل طلبك لدى البوتيك.",
    totalLabel: "المجموع",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    notesLabel: "ملاحظات",
    submit: "تأكيد الطلب",
    namePlaceholder: "اسمك",
    emailPlaceholder: "بريدك الإلكتروني",
    phonePlaceholder: "+33 ...",
    notesPlaceholder: "أضيفي المناسبة أو المقاس أو أي طلب خاص",
    quantity: "الكمية",
    contactSuccessTitle: "تم تسجيل الرسالة",
    contactSuccessBody: "تم إرسال رسالتك إلى البوتيك بنجاح.",
    orderSuccessTitle: "تم تسجيل الطلب",
    orderSuccessBody: (orderNumber) => `تم استلام طلبك تحت الرقم ${orderNumber}.`,
    emptyCartTitle: "السلة فارغة",
    emptyCartBody: "أضيفي قطعة واحدة على الأقل قبل تأكيد الطلب.",
    errorTitle: "الخدمة غير متاحة",
    errorBody: "تعذر على الخادم معالجة طلبك حاليا."
  },
  es: {
    eyebrow: "Pedido",
    title: "Confirmar pedido",
    subtitle: "Introduzca su información para reservar su pieza en Aicha Caftan.",
    totalLabel: "Total",
    nameLabel: "Nombre completo",
    emailLabel: "Email",
    phoneLabel: "Teléfono",
    notesLabel: "Notas",
    submit: "Confirmar el pedido",
    namePlaceholder: "Su nombre",
    emailPlaceholder: "Su email",
    phonePlaceholder: "+34 ...",
    notesPlaceholder: "Añada la ocasión, talla o petición especial",
    quantity: "Cantidad",
    contactSuccessTitle: "Mensaje registrado",
    contactSuccessBody: "Su mensaje ha sido enviado a la boutique con éxito.",
    orderSuccessTitle: "Pedido registrado",
    orderSuccessBody: (orderNumber) => `Su solicitud ha sido recibida con el número ${orderNumber}.`,
    emptyCartTitle: "Carrito vacío",
    emptyCartBody: "Añada al menos una pieza antes de confirmar el pedido.",
    errorTitle: "Servicio no disponible",
    errorBody: "El servidor no pudo procesar su solicitud en este momento."
  },
  en: {
    eyebrow: "Order",
    title: "Complete Your Order",
    subtitle: "Enter your information to record your request with Aicha Caftan.",
    totalLabel: "Total",
    nameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    notesLabel: "Notes",
    submit: "Confirm Order",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    phonePlaceholder: "+44 ...",
    notesPlaceholder: "Add occasion, size or any special request",
    quantity: "Quantity",
    contactSuccessTitle: "Message sent",
    contactSuccessBody: "Your message has been sent to the boutique successfully.",
    orderSuccessTitle: "Order received",
    orderSuccessBody: (orderNumber) => `Your request has been received under the number ${orderNumber}.`,
    emptyCartTitle: "Empty Cart",
    emptyCartBody: "Add at least one piece before confirming an order.",
    errorTitle: "Service Unavailable",
    errorBody: "The server could not process your request at this time."
  }
};

const backendState = {
  apiAvailable: false,
  contactSubmitting: false,
  orderSubmitting: false
};

Object.assign(backendUI.fr, {
  title: "Finaliser votre demande",
  subtitle: "Renseignez vos informations pour réserver votre pièce auprès de Aicha Caftan.",
  phoneLabel: "Téléphone",
  submit: "Confirmer ma commande",
  notesPlaceholder: "Précisez votre occasion, votre taille ou toute demande spéciale",
  quantity: "Quantité",
  contactSuccessTitle: "Message enregistré",
  contactSuccessBody: "Votre message a bien été envoyé à la boutique.",
  orderSuccessTitle: "Commande enregistrée",
  orderSuccessBody: (orderNumber) => `Votre demande a bien été reçue sous le numéro ${orderNumber}.`,
  emptyCartBody: "Ajoutez au moins une pièce avant de confirmer une commande."
});

const backendElements = {
  toastStack: document.querySelector("#toast-stack"),
  contactForm: document.querySelector("#contact-form"),
  cartDrawer: document.querySelector("#cart-drawer"),
  productModal: document.querySelector("#product-modal"),
  cartOrderLink: document.querySelector("#cart-order-link"),
  checkoutModal: document.querySelector("#checkout-modal"),
  checkoutClose: document.querySelector("#checkout-close"),
  checkoutForm: document.querySelector("#checkout-form"),
  checkoutSummaryList: document.querySelector("#checkout-summary-list"),
  checkoutTotal: document.querySelector("#checkout-total"),
  checkoutSubmit: document.querySelector("#checkout-submit"),
  checkoutName: document.querySelector("#checkout-name"),
  checkoutEmail: document.querySelector("#checkout-email"),
  checkoutPhone: document.querySelector("#checkout-phone"),
  checkoutNotes: document.querySelector("#checkout-notes")
};

function backendLocale() {
  const lang = document.documentElement.lang;
  return lang === "ar" ? "ar" : lang === "es" ? "es" : lang === "en" ? "en" : "fr";
}

function backendText(key) {
  return backendUI[backendLocale()][key];
}

function localizedValue(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  return value[backendLocale()] ?? value.fr ?? Object.values(value)[0] ?? "";
}

function readCart() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem("maison-reddam-cart") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  window.localStorage.setItem("maison-reddam-cart", JSON.stringify(items));
}

function backendProductById(id) {
  return window.MAISON_REDDAM_DATA?.products?.find((product) => product.id === id);
}

function backendFormatPrice(value) {
  return new Intl.NumberFormat(backendLocale() === "ar" ? "ar-MA" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function backendShowToast(title, body) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
  backendElements.toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}

function syncBackendScrollLock() {
  const locked = backendElements.cartDrawer.classList.contains("is-open")
    || backendElements.productModal.classList.contains("is-open")
    || backendElements.checkoutModal.classList.contains("is-open");

  document.body.classList.toggle("no-scroll", locked);
}

function localizeCheckoutUI() {
  document.querySelectorAll("[data-checkout]").forEach((element) => {
    const value = backendText(element.dataset.checkout);
    if (value) {
      element.textContent = value;
    }
  });

  backendElements.checkoutName.placeholder = backendText("namePlaceholder");
  backendElements.checkoutEmail.placeholder = backendText("emailPlaceholder");
  backendElements.checkoutPhone.placeholder = backendText("phonePlaceholder");
  backendElements.checkoutNotes.placeholder = backendText("notesPlaceholder");
}

function renderCheckoutSummary() {
  const cartItems = readCart()
    .map((entry) => ({ ...entry, product: backendProductById(entry.id) }))
    .filter((entry) => entry.product);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  backendElements.checkoutSummaryList.innerHTML = cartItems
    .map(({ product, quantity }) => `<article class="checkout-item">
      <div>
        <strong>${localizedValue(product.names)}</strong>
        <span>${backendText("quantity")}: ${quantity}</span>
      </div>
      <strong>${backendFormatPrice(product.price * quantity)}</strong>
    </article>`)
    .join("");

  backendElements.checkoutTotal.textContent = backendFormatPrice(totalAmount);
}

function openCheckoutModal() {
  const cart = readCart();
  if (!cart.length) {
    backendShowToast(backendText("emptyCartTitle"), backendText("emptyCartBody"));
    return;
  }

  localizeCheckoutUI();
  renderCheckoutSummary();
  backendElements.checkoutModal.classList.add("is-open");
  syncBackendScrollLock();
}

function closeCheckoutModal() {
  backendElements.checkoutModal.classList.remove("is-open");
  syncBackendScrollLock();
}

async function backendRequest(path, options = {}) {
  const response = await fetch(path, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || backendText("errorBody"));
  }

  return data;
}

async function detectBackend() {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }

  try {
    const response = await fetch("/api/health", { headers: { Accept: "application/json" } });
    backendState.apiAvailable = response.ok;
  } catch {
    backendState.apiAvailable = false;
  }
}

function syncExistingCartView() {
  if (typeof state !== "undefined") {
    state.cart = readCart();
  }

  if (typeof renderCart === "function") {
    renderCart();
  }
}

async function handleContactSubmit(event) {
  if (!backendState.apiAvailable || backendState.contactSubmitting) {
    return;
  }

  event.preventDefault();
  backendState.contactSubmitting = true;

  const formData = new FormData(backendElements.contactForm);
  const payload = {
    locale: backendLocale(),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };

  try {
    await backendRequest("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    backendShowToast(backendText("contactSuccessTitle"), backendText("contactSuccessBody"));
    backendElements.contactForm.reset();
  } catch (error) {
    backendShowToast(backendText("errorTitle"), error.message || backendText("errorBody"));
  } finally {
    backendState.contactSubmitting = false;
  }
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  if (!backendState.apiAvailable || backendState.orderSubmitting) {
    return;
  }

  const cart = readCart();
  if (!cart.length) {
    backendShowToast(backendText("emptyCartTitle"), backendText("emptyCartBody"));
    return;
  }

  backendState.orderSubmitting = true;
  backendElements.checkoutSubmit.disabled = true;

  const payload = {
    locale: backendLocale(),
    customer: {
      name: backendElements.checkoutName.value.trim(),
      email: backendElements.checkoutEmail.value.trim(),
      phone: backendElements.checkoutPhone.value.trim(),
      notes: backendElements.checkoutNotes.value.trim()
    },
    items: cart.map((item) => ({ id: item.id, quantity: item.quantity }))
  };

  try {
    const data = await backendRequest("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    writeCart([]);
    syncExistingCartView();
    backendElements.checkoutForm.reset();
    closeCheckoutModal();
    backendShowToast(backendText("orderSuccessTitle"), backendText("orderSuccessBody")(data.orderNumber));
  } catch (error) {
    backendShowToast(backendText("errorTitle"), error.message || backendText("errorBody"));
  } finally {
    backendState.orderSubmitting = false;
    backendElements.checkoutSubmit.disabled = false;
  }
}

function bindBackendEvents() {
  backendElements.contactForm.addEventListener("submit", handleContactSubmit);

  backendElements.cartOrderLink.addEventListener("click", (event) => {
    if (!backendState.apiAvailable || !readCart().length) {
      return;
    }
    event.preventDefault();
    openCheckoutModal();
  });

  backendElements.checkoutClose.addEventListener("click", closeCheckoutModal);

  backendElements.checkoutModal.addEventListener("click", (event) => {
    if (event.target === backendElements.checkoutModal) {
      closeCheckoutModal();
    }
  });

  backendElements.checkoutForm.addEventListener("submit", handleOrderSubmit);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCheckoutModal();
    }
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(localizeCheckoutUI, 0);
    });
  });
}

async function bootstrapBackend() {
  localizeCheckoutUI();
  bindBackendEvents();
  await detectBackend();
}

bootstrapBackend();
