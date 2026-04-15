const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Helper para leer/escribir ordenes
function getOrders() {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    try {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
        console.log("✅ Orden guardada correctamente.");
    } catch (e) {
        console.error("❌ Error escribiendo orders.json:", e);
    }
}

// ── API ──────────────────────────────────────

// Crear orden pendiente
app.post('/api/orders', (req, res) => {
    const { bank, ref, cart, total } = req.body;
    const orders = getOrders();
    const normalizedRef = String(ref || '').trim();

    if (!/^\d{6}$/.test(normalizedRef)) {
        return res.status(400).json({ success: false, message: 'La referencia debe tener exactamente 6 dígitos.' });
    }

    const existingRefOrder = orders.find(o => String(o.ref || '').trim() === normalizedRef);
    if (existingRefOrder) {
        return res.status(409).json({
            success: false,
            message: 'Esta referencia ya fue registrada en otra compra. Verifica el comprobante o usa una referencia nueva.'
        });
    }
    
    const newOrder = {
        id: Math.floor(Math.random() * 900000) + 100000,
        bank,
        ref: normalizedRef,
        cart,
        total,
        status: 'Pendiente', // Pendiente, Aprobado
        date: new Date().toLocaleString('es-VE'),
        createdAt: new Date().toISOString()
    };
    
    orders.unshift(newOrder);
    saveOrders(orders);
    
    res.json({ success: true, orderId: newOrder.id });
});

// Listar todas las ordenes (para admin)
app.get('/api/orders', (req, res) => {
    res.json(getOrders());
});

// Aprobar una orden
app.patch('/api/orders/:id/approve', (req, res) => {
    const id = parseInt(req.params.id);
    let orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'Aprobado';
        if (!orders[orderIndex].approvedAt) {
            orders[orderIndex].approvedAt = new Date().toISOString();
        }
        saveOrders(orders);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: "Orden no encontrada" });
    }
});

// Consultar status de una orden
app.get('/api/orders/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    
    if (order) {
        res.json({ status: order.status });
    } else {
        res.status(404).json({ success: false });
    }
});

// Endpoint para descargar el curso (Solo si se conoce un ID aprobado o via token en un escenario real)
// Para esta demo lo mantenemos abierto pero el frontend solo lo muestra si esta aprobado
app.get('/api/download-course', (req, res) => {
    const manualPath = path.join(__dirname, 'EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf');

    if (!fs.existsSync(manualPath)) {
        return res.status(404).json({ success: false, message: 'Manual no disponible' });
    }

    res.download(manualPath, 'EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
