const fs = require('fs');
const PDFDocument = require('pdfkit');

const outputPath = 'C:/Users/rquevedo/Music/muebles/EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf';
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 54, bottom: 54, left: 54, right: 54 },
  bufferPages: true,
  info: {
    Title: 'EXPORTACION DESDE CHINA HACIA VENEZUELA: MANUAL PASO A PASO',
    Author: 'GlobalTrade Academy',
    Subject: 'Manual tecnico de importacion'
  }
});

doc.pipe(fs.createWriteStream(outputPath));

const toc = [];

function curPage() { return doc.bufferedPageRange().count; }
function ensureSpace(min = 90) { if (doc.y > doc.page.height - doc.page.margins.bottom - min) doc.addPage(); }

function drawLogo(x, y, s = 1) {
  const w = 120 * s;
  const h = 46 * s;
  doc.roundedRect(x, y, w, h, 8).lineWidth(1.2).stroke('#111111');
  doc.font('Helvetica-Bold').fontSize(20 * s).fillColor('#111111').text('GT', x + 12 * s, y + 11 * s, { width: 38 * s });
  doc.moveTo(x + 52 * s, y + 8 * s).lineTo(x + 52 * s, y + h - 8 * s).lineWidth(1).stroke('#111111');
  doc.font('Helvetica-Bold').fontSize(11 * s).text('GLOBALTRADE', x + 60 * s, y + 12 * s, { width: 54 * s });
  doc.font('Helvetica').fontSize(7.5 * s).text('ACADEMY', x + 60 * s, y + 28 * s, { width: 54 * s });
}

function h1(t) { ensureSpace(120); toc.push({ label: t, page: curPage() }); doc.moveDown(0.5); doc.font('Helvetica-Bold').fontSize(17).fillColor('#111111').text(t); doc.moveDown(0.25); doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(0.8).stroke('#111111'); doc.moveDown(0.35); }
function h2(t) { ensureSpace(80); doc.font('Helvetica-Bold').fontSize(12.5).fillColor('#111111').text(t); doc.moveDown(0.2); }
function p(t) { ensureSpace(70); doc.font('Times-Roman').fontSize(10.8).fillColor('#111111').text(t, { align: 'justify', lineGap: 2 }); doc.moveDown(0.22); }
function b(t) { ensureSpace(40); doc.font('Times-Roman').fontSize(10.8).fillColor('#111111').text(`- ${t}`, { indent: 12, lineGap: 2 }); }
function note(t) { ensureSpace(64); const y = doc.y; const w = doc.page.width - doc.page.margins.left - doc.page.margins.right; doc.rect(doc.page.margins.left, y, w, 34).lineWidth(0.9).stroke('#111111'); doc.font('Helvetica-Bold').fontSize(9.2).fillColor('#111111').text(`NOTA OPERATIVA: ${t}`, doc.page.margins.left + 8, y + 10, { width: w - 16 }); doc.y = y + 40; }

function addFooter() {
  const r = doc.bufferedPageRange();
  for (let i = 0; i < r.count; i++) {
    doc.switchToPage(i);
    doc.font('Helvetica').fontSize(8).fillColor('#444444').text(`Pagina ${i + 1}`, 0, 742, { align: 'center' });
  }
}

// Cover

doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
drawLogo(54, 60, 1.1);
doc.moveDown(6.5);
doc.font('Helvetica-Bold').fontSize(25).fillColor('#111111').text('EXPORTACION DESDE CHINA', { align: 'left' });
doc.font('Helvetica-Bold').fontSize(25).text('HACIA VENEZUELA', { align: 'left' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(13).text('MANUAL PASO A PASO', { align: 'left' });
doc.moveDown(1.1);
doc.font('Times-Roman').fontSize(11).text('Edicion ampliada con registro detallado en plataformas de compra, seleccion de proveedores, casilleros internacionales, planes maritimos y aereos, y casos numericos con enfoque practico para Venezuela.', { align: 'justify', lineGap: 2 });
doc.moveDown(8.5);
doc.font('Helvetica').fontSize(9).text(`Version generada: ${new Date().toLocaleDateString('es-VE')}`);

// Index page

doc.addPage();
doc.font('Helvetica-Bold').fontSize(19).fillColor('#111111').text('INDICE');
doc.moveDown(0.35);
doc.font('Times-Roman').fontSize(10.5).text('Capitulos y paginas');

// Content

doc.addPage();

h1('Capitulo 1. Registro en plataformas de compra (paso a paso completo)');
h2('1.1 Registro en Alibaba para compras mayoristas');
p('Paso 1: Crear cuenta buyer con correo corporativo. Paso 2: Verificar correo y telefono. Paso 3: Completar perfil comercial con sector, volumen y destino Venezuela. Paso 4: Activar autenticacion de dos factores. Paso 5: Configurar moneda USD y direccion de facturacion. Paso 6: Cargar datos de empresa o RIF para soporte documental. Paso 7: Crear primera RFQ con especificaciones tecnicas, MOQ objetivo y fecha de entrega. Paso 8: Solicitar proforma formal y confirmar condiciones de pago protegidas. Paso 9: Guardar toda negociacion dentro del chat oficial de plataforma. Paso 10: Ejecutar orden piloto con Trade Assurance.');
h2('1.2 Registro en Shein para lotes de prueba');
p('Paso 1: Crear cuenta y validar correo. Paso 2: Cargar direccion del casillero con codigo de cliente. Paso 3: Crear listas por categoria y temporada. Paso 4: Configurar notificaciones de tracking. Paso 5: Confirmar metodo de pago. Paso 6: Realizar pedido de validacion por SKU y talla. Paso 7: Guardar comprobantes y codigos de producto para control de reposicion.');
h2('1.3 Registro en Made-in-China');
p('Paso 1: Crear cuenta buyer y perfil tecnico. Paso 2: Filtrar por proveedores auditados. Paso 3: Solicitar documentos de calidad y ficha tecnica. Paso 4: Pedir video de prueba. Paso 5: Cotizar con al menos tres fabricantes del mismo producto. Paso 6: Definir termino de pago y plan de inspeccion.');
h2('1.4 Registro en DHgate, Global Sources y 1688');
p('DHgate: activar proteccion de comprador y revisar historico de tienda. Global Sources: perfil comprador y contacto de proveedores verificados. 1688: operativa recomendada con agente local para idioma, pago interno y consolidacion en China.');
note('Nunca mover pago fuera de la plataforma cuando el proveedor fue captado dentro de ella.');

h1('Capitulo 2. Como identificar a los mejores proveedores dentro de las apps');
h2('2.1 Matriz de evaluacion (puntaje 100)');
b('Verificacion legal: 20 puntos.');
b('Historial comercial comprobable: 15 puntos.');
b('Calidad de muestra vs especificacion: 20 puntos.');
b('Tiempo y calidad de respuesta comercial: 10 puntos.');
b('Terminos de pago y proteccion: 15 puntos.');
b('Capacidad de despacho y empaque: 10 puntos.');
b('Politica de garantia y postventa: 10 puntos.');
p('Umbral de decision: solo avanzar con proveedores iguales o superiores a 75/100 y sin fallas en licencia o muestra.');
h2('2.2 Checklist de validacion antes de pagar');
b('Licencia comercial y nombre del beneficiario bancario coinciden.');
b('Video de fabrica/almacen en tiempo real.');
b('Muestra aprobada por control interno.');
b('Proforma con especificacion tecnica y penalidades.');
b('Plan de inspeccion preembarque definido.');

h1('Capitulo 3. Registro en casilleros y planes maritimos/aereos');
h2('3.1 Alta de casillero desde Venezuela');
p('Paso 1: Registro web. Paso 2: Cedula, telefono y direccion local. Paso 3: Recepcion de codigo de cliente. Paso 4: Configuracion de direccion de entrega en las plataformas de compra. Paso 5: Prealerta con tracking y factura. Paso 6: Seleccion de plan aereo o maritimo segun urgencia y volumen.');
h2('3.2 Registro por empresa (resumen operativo)');
b('Liberty Express: alta en portal, identidad, codigo de casillero y prealerta.');
b('Zoom: registro de casillero internacional, datos de receptor y tracking.');
b('MRW/aliado internacional: alta de usuario y vinculacion de entrega local.');
b('Tealca: registro de casillero y definicion de sucursal de retiro.');
b('Akcesoria: alta, seleccion de modalidad y despacho a ciudad destino.');
h2('3.3 Planes referenciales aereo/maritimo');
p('Aereo se usa para mercancia urgente y liviana de alto margen. Maritimo se usa para volumen y optimizacion del costo unitario. Referencias operativas frecuentes del mercado: aereo entre USD 5.5 y 8.0 por libra facturable; maritimo entre USD 33 y 40 por pie cubico, segun operador y destino local.');
note('Confirmar siempre minimo facturable, recargos por electronica y peso volumetrico antes de pagar.');

h1('Capitulo 4. Paso a paso de exportacion por producto con numeros reales de ejemplo');
h2('4.1 Accesorios de telefono (100 unidades)');
p('Compra: USD 180. Flete origen: USD 35. Aereo: 22 lb x USD 6.20 = USD 136.40. Costo base puesto: USD 351.40. Costo unitario: USD 3.51.');
h2('4.2 Ropa casual (200 unidades)');
p('Compra: USD 840. Volumen: 7.5 ft3. Maritimo: 7.5 x USD 37 = USD 277.50. Costo base: USD 1117.50. Costo unitario: USD 5.59.');
h2('4.3 Herramienta manual (120 unidades)');
p('Compra: USD 816. Maritimo: 5.8 ft3 x USD 35 = USD 203. Costo base: USD 1019. Costo unitario: USD 8.49.');
h2('4.4 Iluminacion LED hogar (150 unidades)');
p('Compra: USD 465. Aereo: 48 lb x USD 6 = USD 288. Maritimo equivalente: 3.2 ft3 x USD 36 = USD 115.2. Diferencia a favor maritimo: USD 172.8.');
h2('4.5 Repuestos automotrices (90 kits)');
p('Compra: USD 855. Flete origen: USD 60. Aereo: 40 lb x USD 6.5 = USD 260. Costo base: USD 1175. Costo unitario: USD 13.06.');

h1('Capitulo 5. Proceso aduanero en Venezuela (cronologia de ejecucion)');
b('Dia -5 a 0: factura comercial, packing list y BL/AWB listos.');
b('Dia 0: arribo de carga en La Guaira o Maiquetia.');
b('Dia 1 a 3: declaracion y control documental.');
b('Dia 2 a 5: liquidacion y pago de tributos/cargos aplicables.');
b('Dia 3 a 7: levante, retiro y entrega final.');
p('Formato de costo final recomendado: mercancia + flete origen + seguro + flete internacional + cargos + tributos + transporte local + merma estimada.');

h1('Capitulo 6. Casos completos de negocio con trazabilidad numerica');
p('Caso A (piloto aereo): inversion USD 420, tiempo 12 dias, venta 88% en 21 dias. Caso B (lote maritimo): inversion USD 1,950, tiempo 31 dias, reduccion de costo unitario 22%. Caso C (incidencia de calidad): defecto 12%, disputa formal con evidencia, recuperacion parcial en credito y reposicion.');

h1('Capitulo 7. Checklists maestros de ejecucion');
b('Checklist plataforma: cuenta verificada, perfil completo, metodo seguro, RFQ y matriz proveedor.');
b('Checklist casillero: codigo correcto, prealerta, factura, peso volumetrico, seguro.');
b('Checklist cierre: comprobantes, apertura con evidencia, registro de incidencias y reporte semanal/mensual.');

h1('Apendice. Estructura recomendada de control interno');
p('Hoja 1: Proveedores. Hoja 2: Costos por SKU. Hoja 3: Tracking logistica. Hoja 4: Incidencias y reclamos. Hoja 5: Ventas semanales/mensuales.');

// Fill index
const totalPagesBeforeIndexFill = doc.bufferedPageRange().count;
doc.switchToPage(1);
doc.font('Helvetica-Bold').fontSize(19).fillColor('#111111').text('INDICE');
doc.moveDown(0.4);
doc.font('Times-Roman').fontSize(10.5).fillColor('#111111');
for (const item of toc) {
  ensureSpace(18);
  const right = String(item.page);
  const dots = '.'.repeat(Math.max(10, 88 - item.label.length - right.length));
  doc.text(`${item.label} ${dots} ${right}`);
}

addFooter();
doc.end();
console.log(outputPath);
