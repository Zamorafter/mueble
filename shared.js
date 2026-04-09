// =============================================
// SHARED.JS - Lógica compartida entre páginas
// Carrito, Productos, Órdenes
// =============================================

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'Siena Reclinable', desc: 'Sofá reclinable piel auténtica grado 15 • Motores duales independientes', price: 2890, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop', category: 'sofás' },
    { id: 2, name: 'Venezia Seccional', desc: 'Diseño modular XL • Asientos de densidad variable premium', price: 4150, img: './7155RBIuv+L.jpg', category: 'sofás' },
    { id: 3, name: 'Milano Accent', desc: 'Butaca de diseño arquitectónico • Detalles en acero inoxidable', price: 1690, img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop', category: 'sillones' },
    { id: 4, name: 'Roma Chaise', desc: 'Chaise longue de piel italiana • Estructura en madera noble', price: 3200, img: 'https://images.unsplash.com/photo-1540574163026-643ea20abc46?q=80&w=800&auto=format&fit=crop', category: 'sofás' },
    { id: 5, name: 'Florencia 2P', desc: 'Sofá 2 puestos compact • Ideal para espacios medianos', price: 1950, img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800&auto=format&fit=crop', category: 'sofás' },
    { id: 6, name: 'Toscana Executive', desc: 'Sillón ejecutivo de cuero plena flor • Tapizado artesanal', price: 2100, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop', category: 'sillones' },
    { id: 7, name: 'Napoli Corner', desc: 'Sofá esquinero 5 puestos • Piel sintética de alta gama', price: 5500, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop', category: 'modulares' },
    { id: 8, name: 'Capri Ottoman', desc: 'Puf/reposapiés de cuero italiano • Combinable con colección', price: 680, img: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop', category: 'accesorios' },
];

function getProducts() {
    const stored = JSON.parse(localStorage.getItem('casapiel_products') || 'null');
    return stored || DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem('casapiel_products', JSON.stringify(products));
}

// ── CARRITO ──────────────────────────────────
let cart = JSON.parse(sessionStorage.getItem('casapiel_cart') || '[]');

function saveCart() {
    sessionStorage.setItem('casapiel_cart', JSON.stringify(cart));
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (!sidebar) return;
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('hidden');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-x-12', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-12', 'pointer-events-none');
        toast.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
    }, 3000);
}

function addToCart(name, desc, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, desc, price, qty: 1 });
    saveCart();
    renderCart();
    showToast(`"${name}" añadido al pedido`);
}

function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    renderCart();
}

function changeQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(name);
    else { saveCart(); renderCart(); }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const empty = document.getElementById('cart-empty');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

    if (badge) {
        badge.textContent = totalQty;
        badge.classList.toggle('visible', totalQty > 0);
        // Pequeña animación de salto al actualizar
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
    }
    if (totalEl) totalEl.textContent = '$' + totalPrice.toLocaleString();
    if (empty) empty.style.display = cart.length === 0 ? 'block' : 'none';

    container.querySelectorAll('.cart-item').forEach(el => el.remove());
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item glass-card rounded-2xl p-4 flex items-start gap-4 border border-white/5';
        div.innerHTML = `
            <div class="flex-1">
                <p class="text-white font-medium text-sm">${item.name}</p>
                <p class="text-zinc-500 text-xs mt-0.5">${item.desc}</p>
                <p class="text-yellow-500 text-sm font-semibold mt-1">$${(item.price * item.qty).toLocaleString()}</p>
                <div class="flex items-center gap-2 mt-3">
                    <button onclick="changeQty('${item.name}',-1)" class="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 flex items-center justify-center">−</button>
                    <span class="text-sm text-white w-5 text-center">${item.qty}</span>
                    <button onclick="changeQty('${item.name}',1)" class="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 flex items-center justify-center">+</button>
                </div>
            </div>
            <button onclick="removeFromCart('${item.name}')" class="text-zinc-600 hover:text-red-400 transition-colors mt-1"><i class="fa-solid fa-trash text-xs"></i></button>
        `;
        container.appendChild(div);
    });
}

function sendCartToWhatsApp() {
    if (cart.length === 0) { alert('Tu carrito está vacío.'); return; }
    
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const orderId = Math.floor(Math.random() * 9000) + 1000;
    
    let msg = '🛋️ *CASAPIEL • LAS MERCEDES*\n';
    msg += '──────────────────────────\n';
    msg += `🧾 *ORDEN DE PEDIDO #${orderId}*\n\n`;
    
    msg += '📦 *DETALLE DE PIEZAS:*\n';
    cart.forEach((item, index) => {
        msg += `${index + 1}. *${item.name}*\n`;
        msg += `   _Cant: ${item.qty} | Subtotal: $${(item.price * item.qty).toLocaleString()}_\n`;
    });
    
    msg += '\n──────────────────────────\n';
    msg += `💰 *TOTAL ESTIMADO: $${totalPrice.toLocaleString()}*\n`;
    msg += '──────────────────────────\n\n';
    
    msg += '📍 _Hola, he armado este pedido desde su catálogo online. Quiero confirmar disponibilidad y coordinar el pago/visita a la tienda._\n\n';
    msg += '✨ *¡Gracias por su atención!*';

    const orders = JSON.parse(localStorage.getItem('casapiel_orders') || '[]');
    orders.unshift({ id: orderId, items: [...cart], total: totalPrice, date: new Date().toLocaleString('es-VE'), status: 'Pendiente' });
    localStorage.setItem('casapiel_orders', JSON.stringify(orders));

    window.open('https://wa.me/584241437204?text=' + encodeURIComponent(msg), '_blank');
}

function productCardHTML(p) {
    const safeName = p.name.replace(/'/g, "\\'");
    const safeDesc = p.desc.replace(/'/g, "\\'");
    return `
    <div class="glass-card rounded-3xl overflow-hidden group">
        <div class="relative overflow-hidden aspect-[4/3]">
            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="absolute top-4 left-4">
                <span class="bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">${p.category}</span>
            </div>
            <div class="absolute top-4 right-4 bg-yellow-500 text-black text-[11px] px-3 py-1 rounded-full font-bold shadow-lg">$${p.price.toLocaleString()}</div>
            <div class="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <button onclick="addToCart('${safeName}','${safeDesc}',${p.price})" class="w-full bg-white text-black py-4 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] shadow-xl hover:bg-yellow-500 transition-colors">
                    Añadir al Pedido
                </button>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-heading text-white mb-2 group-hover:text-yellow-500 transition-colors">${p.name}</h3>
            <p class="text-zinc-500 font-light text-xs leading-relaxed line-clamp-2">${p.desc}</p>
        </div>
    </div>`;
}
