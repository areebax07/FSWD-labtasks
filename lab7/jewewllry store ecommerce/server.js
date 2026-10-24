// Lab Task 7 - Task 2: Persistent E-Commerce Store API (Aura & Amethyst Jewelry)
// Uses Node.js built-in HTTP and File System (fs) modules for persistent disk storage.

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, 'store-data.json');

// Initialize default data file if it doesn't exist on disk (Ensures Persistence)
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
    products: [
      { id: 1, name: "Amethyst Crown Solitaire", category: "Rings", price: 340.00, badge: "Bestseller", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
      { id: 2, name: "Oatstone Pearl Pendant", category: "Necklaces", price: 210.00, badge: "New", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
      { id: 3, name: "Plum Enamel Gold Hoops", category: "Earrings", price: 185.00, badge: "", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80" },
      { id: 4, name: "Serpent Gold Cuff", category: "Bracelets", price: 290.00, badge: "Limited", image: "https://i0.wp.com/alamara.pk/wp-content/uploads/2025/10/14k-gold-plated-petal-hand-chain-bracelet-detail.jpg?fit=1325%2C1340&ssl=1" },
      { id: 5, name: "Royal Heirloom Choker", category: "Bridal Sets", price: 890.00, badge: "", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" }
    ],
    cart: [],
    users: [],
    orders: []
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Helper functions to read and write persistently to disk
function loadData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
  // Enable CORS so frontend files can talk to this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  const parseBody = async () => {
    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (Buffer.byteLength(raw) > 65536) return null;
    }
    return raw ? JSON.parse(raw) : {};
  };

  const url = req.url;
  const method = req.method;
  const db = loadData();

  // ==================== 1. PRODUCTS ENDPOINTS ====================
  if (url === '/api/products' && method === 'GET') {
    return send(200, db.products);
  }
  if (url === '/api/products' && method === 'POST') {
    try {
      const body = await parseBody();
      const newProduct = { id: Date.now(), ...body };
      db.products.push(newProduct);
      saveData(db); // Persisted to disk
      return send(201, newProduct);
    } catch (e) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  // ==================== 2. CART ENDPOINTS ====================
  if (url === '/api/cart' && method === 'GET') {
    return send(200, db.cart);
  }
  if (url === '/api/cart' && method === 'POST') {
    try {
      const body = await parseBody();
      db.cart.push(body);
      saveData(db); // Persisted to disk
      return send(201, { message: 'Item added to cart', cart: db.cart });
    } catch (e) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  // ==================== 3. USERS / AUTH ENDPOINTS ====================
  if (url === '/api/users/register' && method === 'POST') {
    try {
      const { name, email, password } = await parseBody();
      if (db.users.some(u => u.email === email)) {
        return send(400, { error: 'Email already registered' });
      }
      const newUser = { id: Date.now(), name, email, password };
      db.users.push(newUser);
      saveData(db); // Persisted to disk
      return send(201, { message: 'User registered successfully', user: { id: newUser.id, name, email } });
    } catch (e) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  if (url === '/api/users/login' && method === 'POST') {
    try {
      const { email, password } = await parseBody();
      const user = db.users.find(u => u.email === email && u.password === password);
      if (!user) {
        return send(401, { error: 'Invalid email or password' });
      }
      return send(200, { message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  // ==================== 4. CHECKOUT / ORDERS ENDPOINTS ====================
  if (url === '/api/orders' && method === 'GET') {
    return send(200, db.orders);
  }
  if (url === '/api/orders' && method === 'POST') {
    try {
      const orderData = await parseBody();
      const newOrder = { id: Date.now(), items: db.cart, ...orderData, date: new Date().toISOString() };
      db.orders.push(newOrder);
      db.cart = []; // Clear cart after successful order
      saveData(db); // Persisted to disk
      return send(201, { message: 'Order placed successfully', order: newOrder });
    } catch (e) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  // Route not found
  send(404, { error: 'Endpoint not found' });
});

server.listen(3005, () => {
  console.log('Aura & Amethyst Persistent E-Commerce API running at: http://localhost:3005');
  console.log('Endpoints: /api/products, /api/cart, /api/users/register, /api/users/login, /api/orders');
});