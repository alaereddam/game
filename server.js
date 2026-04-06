const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT_DIR = __dirname;
const STORAGE_DIR = path.join(ROOT_DIR, "storage");
const ORDERS_FILE = path.join(STORAGE_DIR, "orders.json");
const MESSAGES_FILE = path.join(STORAGE_DIR, "messages.json");
const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

let writeQueue = Promise.resolve();
let cachedStoreData = null;
let cachedStoreMtimeMs = 0;

async function ensureStorage() {
  await fsp.mkdir(STORAGE_DIR, { recursive: true });
  await Promise.all([
    ensureJsonArrayFile(ORDERS_FILE),
    ensureJsonArrayFile(MESSAGES_FILE)
  ]);
}

async function ensureJsonArrayFile(filePath) {
  try {
    await fsp.access(filePath);
  } catch {
    await fsp.writeFile(filePath, "[]\n", "utf8");
  }
}

async function readJsonArray(filePath) {
  try {
    const raw = await fsp.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function queueJsonAppend(filePath, record) {
  writeQueue = writeQueue.then(async () => {
    const items = await readJsonArray(filePath);
    items.unshift(record);
    await fsp.writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  });

  return writeQueue;
}

function loadStoreData() {
  const filePath = path.join(ROOT_DIR, "data.js");
  const stats = fs.statSync(filePath);
  if (cachedStoreData && cachedStoreMtimeMs === stats.mtimeMs) {
    return cachedStoreData;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: "data.js" });

  cachedStoreData = sandbox.window.MAISON_REDDAM_DATA;
  cachedStoreMtimeMs = stats.mtimeMs;
  return cachedStoreData;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

async function parseJsonBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) {
      throw new Error("Payload too large");
    }
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function validateContactPayload(payload) {
  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const message = String(payload?.message || "").trim();
  const locale = String(payload?.locale || "fr").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Les champs nom, email et message sont requis." };
  }

  return {
    ok: true,
    value: {
      id: crypto.randomUUID(),
      type: "contact",
      locale,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    }
  };
}

function validateOrderPayload(payload, store) {
  const customer = payload?.customer || {};
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const name = String(customer.name || "").trim();
  const email = String(customer.email || "").trim();
  const phone = String(customer.phone || "").trim();
  const notes = String(customer.notes || "").trim();
  const locale = String(payload?.locale || "fr").trim();

  if (!name || !email || !phone) {
    return { ok: false, error: "Les champs nom, email et téléphone sont requis pour la commande." };
  }

  if (!items.length) {
    return { ok: false, error: "Votre panier est vide." };
  }

  const productMap = new Map(store.products.map((product) => [product.id, product]));
  const normalizedItems = [];

  for (const item of items) {
    const product = productMap.get(item?.id);
    const quantity = Number(item?.quantity || 0);

    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      return { ok: false, error: "La commande contient un produit invalide." };
    }

    normalizedItems.push({
      id: product.id,
      name: product.names?.fr || product.id,
      price: product.price,
      quantity,
      lineTotal: product.price * quantity
    });
  }

  const totalQuantity = normalizedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const orderNumber = `MM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

  return {
    ok: true,
    value: {
      id: crypto.randomUUID(),
      orderNumber,
      status: "pending",
      locale,
      customer: { name, email, phone, notes },
      items: normalizedItems,
      totals: { quantity: totalQuantity, amount: totalAmount },
      createdAt: new Date().toISOString()
    }
  };
}

async function handleApi(req, res, pathname) {
  const store = loadStoreData();

  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, service: "maison-malak-backend", date: new Date().toISOString() });
  }

  if (req.method === "GET" && pathname === "/api/store") {
    return sendJson(res, 200, store);
  }

  if (req.method === "GET" && pathname === "/api/products") {
    return sendJson(res, 200, store.products);
  }

  if (req.method === "GET" && pathname.startsWith("/api/products/")) {
    const productId = pathname.slice("/api/products/".length);
    const product = store.products.find((entry) => entry.id === productId);
    if (!product) {
      return sendJson(res, 404, { ok: false, error: "Produit introuvable." });
    }
    return sendJson(res, 200, product);
  }

  if (req.method === "POST" && pathname === "/api/contact") {
    let payload;
    try {
      payload = await parseJsonBody(req);
    } catch {
      return sendJson(res, 400, { ok: false, error: "Le message envoyé n'est pas valide." });
    }

    const result = validateContactPayload(payload);
    if (!result.ok) {
      return sendJson(res, 400, result);
    }

    await queueJsonAppend(MESSAGES_FILE, result.value);
    return sendJson(res, 201, { ok: true, messageId: result.value.id });
  }

  if (req.method === "POST" && pathname === "/api/orders") {
    let payload;
    try {
      payload = await parseJsonBody(req);
    } catch {
      return sendJson(res, 400, { ok: false, error: "La commande envoyée n'est pas valide." });
    }

    const result = validateOrderPayload(payload, store);
    if (!result.ok) {
      return sendJson(res, 400, result);
    }

    await queueJsonAppend(ORDERS_FILE, result.value);
    return sendJson(res, 201, {
      ok: true,
      orderNumber: result.value.orderNumber,
      totals: result.value.totals
    });
  }

  return sendJson(res, 404, { ok: false, error: "Route API introuvable." });
}

async function serveStatic(req, res, pathname) {
  let relativePath = pathname === "/" ? "/index.html" : pathname;
  relativePath = decodeURIComponent(relativePath);

  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT_DIR, safePath);

  if (!filePath.startsWith(ROOT_DIR)) {
    return sendText(res, 403, "Forbidden");
  }

  try {
    const stat = await fsp.stat(filePath);
    if (stat.isDirectory()) {
      return serveStatic(req, res, path.join(relativePath, "index.html"));
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";
    const content = await fsp.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=300"
    });
    res.end(content);
  } catch {
    sendText(res, 404, "Not Found");
  }
}

async function requestListener(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = requestUrl.pathname;

  if (pathname.startsWith("/api/")) {
    return handleApi(req, res, pathname);
  }

  return serveStatic(req, res, pathname);
}

function createServer() {
  return http.createServer((req, res) => {
    requestListener(req, res).catch((error) => {
      console.error("Server error:", error);
      sendJson(res, 500, { ok: false, error: "Erreur interne du serveur." });
    });
  });
}

async function startServer(port = PORT) {
  await ensureStorage();
  const server = createServer();
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Aicha Caftan server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  createServer,
  ensureStorage,
  loadStoreData,
  startServer
};
