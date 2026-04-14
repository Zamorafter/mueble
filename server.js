const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files from root

// Endpoint API para procesar el pago móvil
// Validará los 6 dígitos y el banco para retornar el link de descarga del PDF
app.post('/api/checkout', (req, res) => {
    const { ref, bank, cart } = req.body;
    
    // Aquí el backend real validaría en la base de datos o API del banco
    // Por motivos de la demostración, aceptamos cualquier pago y retornamos éxito
    console.log("💳 Pago recibido:", bank, "Ref:", ref);
    console.log("🛍️ Carrito:", cart);
    
    if (ref && ref.length === 6 && bank) {
        // En un caso real, generar un PDF único o tokenizado
        return res.json({ 
            success: true, 
            message: "Pago verificado con éxito",
            downloadLink: "/api/download-course"
        });
    } else {
        return res.status(400).json({ 
            success: false, 
            message: "Datos de pago inválidos" 
        });
    }
});

// Endpoint para descargar el curso
app.get('/api/download-course', (req, res) => {
    const PDFDocument = require('pdfkit');
    res.setHeader('Content-disposition', 'attachment; filename=MasterClass_GlobalTrade.pdf');
    res.setHeader('Content-type', 'application/pdf');

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    // Portada Elegante
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#030303');
    doc.fillColor('#6366f1').fontSize(40).text('GlobalTrade', 0, 200, { align: 'center' });
    doc.fillColor('#ffffff').fontSize(25).text('MasterClass de Exportación', { align: 'center' });
    doc.fontSize(12).fillColor('#9ca3af').text('La guía definitiva para Negocios Internacionales', { align: 'center' });
    
    doc.moveDown(2);
    doc.fillColor('#ffffff').fontSize(16).text('Índice de Materias', 50, 400);
    doc.moveTo(50, 420).lineTo(545, 420).strokeColor('#6366f1').stroke();
    doc.moveDown(1);
    doc.fontSize(14).fillColor('#d1d5db')
       .text('1. Experto en Importación y Exportación', { align: 'left' })
       .moveDown(0.5)
       .text('2. Gestión Aduanera Completa')
       .moveDown(0.5)
       .text('3. Exportar desde China Paso a Paso');

    // Capítulo 1
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 100).fill('#6366f1');
    doc.fillColor('#ffffff').fontSize(30).text('1. Importación y Exportación', 50, 40);
    doc.fillColor('#374151').fontSize(18).text('Fundamentos del Comercio Logístico', 50, 120);
    doc.fillColor('#4b5563').fontSize(12).moveDown(1)
       .text('El comercio internacional es el intercambio de bienes a través de fronteras marítimas.')
       .moveDown()
       .text('Logística Internacional: Involucra transporte marítimo, aéreo y terrestre. El marítimo representa el 80% mundial por volumen.')
       .moveDown()
       .text('Tipos de Contenedores:')
       .list(['Dry Van: Estándar para carga seca.', 'Reefer: Refrigerado para perecederos.', 'Open Top: Para maquinaria pesada.']);
    
    // Capítulo 2
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 100).fill('#6366f1');
    doc.fillColor('#ffffff').fontSize(30).text('2. Gestión Aduanera', 50, 40);
    doc.fillColor('#374151').fontSize(18).text('Regulaciones e Incoterms', 50, 120);
    doc.fillColor('#4b5563').fontSize(12).moveDown(1)
       .text('En toda transacción, la aduana regula la entrada y salida, aplicando aranceles y normativas.')
       .moveDown()
       .text('Incoterms más utilizados:')
       .list(['EXW (Ex Works): El comprador asume todo el riesgo.', 'FOB (Free on Board): Vendedor entrega a bordo del buque.', 'CIF (Cost, Insurance & Freight): Vendedor cubre flete.'])
       .moveDown()
       .text('Documentación: Factura Comercial, Bill of Lading (B/L), y Certificado de Origen.');

    // Capítulo 3 (Nuevo)
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 100).fill('#6366f1');
    doc.fillColor('#ffffff').fontSize(26).text('3. Exportar desde China', 50, 40);
    doc.fillColor('#374151').fontSize(18).text('El Gigante Asiático paso a paso', 50, 120);
    doc.fillColor('#4b5563').fontSize(12).moveDown(1)
       .text('Importar desde China es clave para competir en costos de B2B:')
       .moveDown()
       .text('1. Búsqueda de Proveedores: Alibaba y Global Sources. Valida Trade Assurance.')
       .moveDown()
       .text('2. Pedido de Muestras: Nunca comiences una orden CBM grande sin validar la calidad.')
       .moveDown()
       .text('3. Negociación (T/T): Usualmente se paga 30% adelantado y 70% contra documento B/L.')
       .moveDown()
       .text('4. Control de Calidad: Inspección (SGS) en la fábrica antes de consolidación en puerto.')
       .moveDown()
       .text('5. LCL vs FCL: Si compras menos de un contenedor (LCL). Si llenas uno (FCL).');

    doc.end();
});

// Redirigir siempre al index o servir las vistas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
