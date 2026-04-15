// =============================================
// SHARED.JS - Lógica compartida para Cursos
// Carrito, Productos, Órdenes
// =============================================

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'Experto en Importación y Exportación', desc: 'Aprende los secretos del comercio marítimo, gestión de contenedores y logística internacional.', price: 5, img: 'https://images.unsplash.com/photo-1586528116311-ad8ed745d44c?q=80&w=800&auto=format&fit=crop', category: 'Logística' },
    { id: 2, name: 'Gestión Aduanera Completa', desc: 'Documentación de aduanas, aranceles, incoterms y regulaciones requeridas para importación aérea y marítima.', price: 5, img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop', category: 'Aduanas' },
    { id: 3, name: 'Exportar desde China Paso a Paso', desc: 'Descubre proveedores, domina Alibaba, incoterms LCL/FCL y negocia con seguridad. Incluye manual PDF actualizado para Venezuela.', price: 5, img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', category: 'Mercados' },
];

function getProducts() {
    const stored = JSON.parse(localStorage.getItem('premium_cursos_products') || 'null');
    return stored || DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem('premium_cursos_products', JSON.stringify(products));
}

// ── CARRITO ──────────────────────────────────
let cart = JSON.parse(sessionStorage.getItem('premium_cursos_cart') || '[]');

function saveCart() {
    sessionStorage.setItem('premium_cursos_cart', JSON.stringify(cart));
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
    if (!existing) {
        cart.push({ name, desc, price, qty: 1 });
        saveCart();
        renderCart();
        showToast(`"${name}" añadido al carrito`);
    } else {
        showToast(`"${name}" ya está en el carrito`);
    }
}

function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    renderCart();
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
        badge.classList.toggle('hidden', totalQty === 0);
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
                <p class="text-indigo-400 text-sm font-semibold mt-1">$${(item.price * item.qty).toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')" class="text-zinc-600 hover:text-red-400 transition-colors mt-1"><i class="fa-solid fa-trash text-xs"></i></button>
        `;
        container.appendChild(div);
    });
}

function processCheckout() {
    if (cart.length === 0) { alert('Tu carrito está vacío.'); return; }
    window.location.href = 'checkout.html';
}

function productCardHTML(p) {
    const safeName = p.name.replace(/'/g, "\\'");
    const safeDesc = p.desc.replace(/'/g, "\\'");
    const chinaManualLink = p.id === 3
        ? `
            <a href="EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf" download class="block w-full text-center mt-3 bg-indigo-500/15 text-indigo-300 py-3 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] border border-indigo-500/30 hover:bg-indigo-500/25 transition-colors">
                Descargar Manual PDF
            </a>
          `
        : '';
    return `
    <div class="glass-card rounded-3xl overflow-hidden group">
        <div class="relative overflow-hidden aspect-[4/3]">
            <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="absolute top-4 left-4">
                <span class="bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">${p.category}</span>
            </div>
            <div class="absolute top-4 right-4 bg-indigo-500 text-white text-[11px] px-3 py-1 rounded-full font-bold shadow-lg">$${p.price.toLocaleString()}</div>
            <div class="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <button onclick="addToCart('${safeName}','${safeDesc}',${p.price})" class="w-full bg-white text-black py-4 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] shadow-xl hover:bg-indigo-400 hover:text-white transition-colors">
                    Añadir al Carrito
                </button>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-heading text-white mb-2 group-hover:text-indigo-400 transition-colors">${p.name}</h3>
            <p class="text-zinc-500 font-light text-xs leading-relaxed line-clamp-2">${p.desc}</p>
            ${chinaManualLink}
        </div>
    </div>`;
}
