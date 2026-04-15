const fs = require('fs');
const PDFDocument = require('pdfkit');

const outputPath = 'C:/Users/rquevedo/Music/muebles/EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 48, bottom: 48, left: 48, right: 48 },
  bufferPages: true,
  info: {
    Title: 'EXPORTACION DESDE CHINA HACIA VENEZUELA: MANUAL PASO A PASO',
    Author: 'GlobalTrade Academy',
    Subject: 'Importacion y exportacion hacia Venezuela'
  }
});

doc.pipe(fs.createWriteStream(outputPath));

const toc = [];
let indexPageNumber = 2;

function pageNum() {
  return doc.bufferedPageRange().count;
}

function addFooterAllPages() {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i += 1) {
    doc.switchToPage(i);
    doc.font('Helvetica').fontSize(8).fillColor('#6b7280')
      .text(`Pagina ${i + 1}`, 0, 742, { align: 'center' });
  }
}

function title(text) {
  doc.font('Helvetica-Bold').fontSize(23).fillColor('#111827').text(text, { align: 'center' });
  doc.moveDown(0.5);
}

function chapter(text) {
  toc.push({ label: text, page: pageNum() });
  doc.moveDown(0.6);
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text(text);
  doc.moveDown(0.3);
}

function section(text) {
  doc.moveDown(0.25);
  doc.font('Helvetica-Bold').fontSize(12.5).fillColor('#1f2937').text(text);
  doc.moveDown(0.2);
}

function p(text) {
  doc.font('Helvetica').fontSize(10.2).fillColor('#111827').text(text, { align: 'justify', lineGap: 2 });
  doc.moveDown(0.18);
}

function bullet(text) {
  doc.font('Helvetica').fontSize(10.2).fillColor('#111827').text(`- ${text}`, { indent: 10, lineGap: 1.5 });
}

function warn(text) {
  const y = doc.y;
  const h = 34;
  doc.rect(doc.x, y, 515, h).lineWidth(1).stroke('#b91c1c');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#b91c1c').text(`ATENCION: ${text}`, doc.x + 8, y + 10, { width: 498 });
  doc.fillColor('#111827');
  doc.y = y + h + 6;
}

function miniTable(headers, rows) {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#111827');
  doc.text(headers.join(' | '));
  doc.font('Helvetica').fontSize(9.5);
  doc.text('-'.repeat(95));
  rows.forEach((r) => doc.text(r.join(' | '), { lineGap: 1 }));
  doc.moveDown(0.3);
}

// Cover

doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8fafc');
doc.fillColor('#111827');
doc.moveDown(5);
title('EXPORTACION DESDE CHINA HACIA VENEZUELA');
title('MANUAL PASO A PASO');
doc.moveDown(1);
p('Edicion extendida con registro en plataformas, seleccion de proveedores, casilleros, planes aereos/maritimos y casos numericos operativos para compradores venezolanos.');
doc.moveDown(0.8);
p('Este documento reemplaza y amplia el manual anterior. Incluye indice, procesos detallados por plataforma, matrices de evaluacion y ejemplos de costos por producto.');

// Index placeholder page

doc.addPage();
doc.font('Helvetica-Bold').fontSize(18).fillColor('#111827').text('INDICE');
doc.moveDown(0.6);
doc.font('Helvetica').fontSize(10).text('Seccion y numero de pagina');

// Content starts

doc.addPage();

chapter('Capitulo 1. Registro completo en plataformas de compra en China');
section('1.1 Alibaba: registro, verificacion y configuracion comercial');
p('Paso 1: Abrir https://www.alibaba.com y presionar Join Free. Paso 2: Registrar correo corporativo y numero con prefijo Venezuela. Paso 3: Confirmar correo y activar verificacion de telefono. Paso 4: Completar perfil de comprador con nombre legal, rubro, volumen estimado y metodo de pago. Paso 5: Activar dos factores de seguridad y centro de mensajes oficiales. Paso 6: Configurar moneda USD, direccion de facturacion y receptor principal.');
p('Paso 7: En Account Settings cargar datos fiscales (RIF o razon social) para mejorar soporte en disputas. Paso 8: En RFQ definir categoria, MOQ esperado, calidad, certificaciones y tiempo de entrega requerido. Paso 9: Guardar plantilla de terminos para comparar ofertas. Paso 10: Ejecutar primer pedido de prueba con Trade Assurance y pago parcial.');
warn('No aceptar mover pago fuera de Alibaba cuando el proveedor fue descubierto dentro de Alibaba.');

section('1.2 Shein: registro para compras pequenas y reventa de prueba');
p('Paso 1: Abrir app o web oficial. Paso 2: Crear cuenta con correo dedicado para compras. Paso 3: Configurar direccion de entrega del casillero y codigo de cliente en Address Book. Paso 4: Activar notificaciones de tracking. Paso 5: Definir metodo de pago y revisar conversion de moneda. Paso 6: Crear listas por categoria para compras por lote.');
p('Buenas practicas: guardar captura de confirmacion, SKU, talla y color por cada orden. Si compras para reventa, usa lotes de prueba de 10 a 30 unidades por modelo antes de escalar.');

section('1.3 Made-in-China: registro orientado a productos industriales');
p('Paso 1: Crear cuenta buyer. Paso 2: Completar company profile y sector tecnico. Paso 3: Filtrar por Audited Suppliers y anos de operacion. Paso 4: Solicitar ficha tecnica y certificado. Paso 5: Pedir video de prueba funcional. Paso 6: Usar comparador de 3 a 5 fabricantes con la misma especificacion.');

section('1.4 DHgate, Global Sources y 1688: registro por objetivo');
p('DHgate: crear cuenta, activar proteccion de comprador, revisar score de tienda y tiempo de respuesta. Global Sources: registro de comprador profesional, contacto con suppliers verificados y solicitud de cotizacion formal. 1688: registro requiere manejo de idioma y flujo local; para compradores en Venezuela se recomienda agente de compras con direccion local en China o casillero especializado.');
p('En 1688, el registro operativo ideal incluye: cuenta del agente, metodo de pago local, consolidador en China, inspeccion fotometrica del lote y reempaque antes de salida internacional.');

chapter('Capitulo 2. Como identificar a los mejores proveedores dentro de cada app');
section('2.1 Matriz de evaluacion de proveedor (puntaje 100)');
miniTable(
  ['Criterio', 'Peso', 'Regla de aprobacion'],
  [
    ['Verificacion legal', '20', 'Licencia valida y consistente'],
    ['Historial comercial', '15', 'Minimo 2 anos activos'],
    ['Calidad de muestra', '20', 'Cumple especificacion'],
    ['Comunicacion y tiempos', '10', 'Responde en menos de 24h'],
    ['Terminos de pago', '15', 'Acepta esquema protegido'],
    ['Capacidad logistica', '10', 'Empaque y despacho formal'],
    ['Postventa y garantia', '10', 'Procedimiento documentado']
  ]
);
p('Regla practica: proveedor candidato debe superar 75/100 y no fallar en verificacion legal ni muestra tecnica.');

section('2.2 Filtros concretos por plataforma');
bullet('Alibaba: Verified, Trade Assurance, Response Rate alto, Transaction History, factory video real.');
bullet('Made-in-China: Audited Supplier, capacidad de linea, certificados del producto.');
bullet('DHgate: numero de ordenes, valoraciones recientes, evidencia de despacho.');
bullet('Global Sources: supplier profile completo, participacion en ferias y documentos de calidad.');
bullet('1688: proveedor con volumen interno alto, ratings estables y soporte del agente local.');

section('2.3 Preguntas de control antes de pagar');
bullet('Cual es el proceso exacto de QC antes de despacho?');
bullet('Que pasa si 5% del lote llega con defecto?');
bullet('Confirma la cuenta bancaria final del beneficiario legal.');
bullet('Cuanto tarda reposicion parcial?');
bullet('Puedes enviar packing list preliminar y peso volumetrico estimado?');
warn('Si un proveedor evita responder temas de garantia o cuenta bancaria, descartarlo.');

chapter('Capitulo 3. Registro en casilleros y planes maritimos/aereos');
section('3.1 Paso a paso comun de alta de casillero desde Venezuela');
p('Paso 1: Registro en portal del courier. Paso 2: Cargar cedula, telefono, correo y direccion local. Paso 3: Recibir codigo de casillero. Paso 4: Configurar direccion en tiendas. Paso 5: Prealertar tracking y factura. Paso 6: Elegir plan aereo o maritimo por urgencia y volumen. Paso 7: Pagar flete y seguimiento hasta entrega.');

section('3.2 Registro detallado por empresa');
p('Liberty Express: crear usuario, seleccionar pais destino Venezuela, verificar identidad, recibir direccion de recepcion y codigo cliente. Zoom: alta en casillero internacional, validacion de datos y prealerta. MRW/aliado internacional: registro y vinculacion de receptor local. Tealca: alta en portal de casillero USA y datos de entrega local. Akcesoria: registro, asignacion de sucursal de entrega y seleccion de modalidad.');

section('3.3 Planes aereos y maritimos (referenciales operativos)');
miniTable(
  ['Empresa', 'Aereo ref', 'Maritimo ref', 'Uso ideal'],
  [
    ['Akcesoria', 'USD 5.99-7.99/lb', 'USD 36-39/ft3', 'Urgente ligero vs volumen'],
    ['Tealca', 'USD 5.50-7.00/lb', 'USD 36-40/ft3', 'Balance tiempo/costo'],
    ['MRW aliado', 'USD 5.49-6.99/lb', 'USD 32.99-35.99/ft3', 'Ecommerce y consolidado'],
    ['Liberty/Zoom', 'Segun cotizador', 'Segun ruta', 'Cobertura local y retiros']
  ]
);
p('Regla de decision: aereo para mercancia urgente o liviana de alto margen. Maritimo para volumen y costo por unidad bajo.');

section('3.4 Caso numerico de consolidacion');
p('Caso A sin consolidar: 4 paquetes sueltos con minimo facturable aereo. Costo total aproximado USD 120. Caso B consolidado: un solo despacho con mismo contenido, costo aproximado USD 78. Ahorro: USD 42 (35%).');

chapter('Capitulo 4. Paso a paso de exportacion/importacion por producto con numeros');
section('4.1 Producto 1: Accesorios de telefono (100 unidades)');
p('Compra: USD 1.80 por unidad, total fabrica USD 180. Flete China->casillero: USD 35. Aereo a Venezuela: 22 lb facturables x USD 6.20 = USD 136.40. Costo puesto local antes de tributos: USD 351.40. Costo unitario estimado: USD 3.51. Precio de venta sugerido: USD 6.50 a USD 8.00 segun canal.');
p('Secuencia operativa: cotizar -> muestra -> orden -> packing list -> prealerta casillero -> aereo -> recepcion -> control de calidad local -> venta.');

section('4.2 Producto 2: Ropa casual (200 unidades mixtas)');
p('Compra: USD 4.20 promedio, total USD 840. Volumen 7.5 ft3. Maritimo referencial: 7.5 x USD 37 = USD 277.50. Costo base: USD 1117.50. Costo unitario: USD 5.59. Si venta promedio USD 11.50, margen bruto aproximado por unidad: USD 5.91 antes de gastos internos.');

section('4.3 Producto 3: Herramienta manual (120 unidades)');
p('Compra: USD 6.80, total USD 816. Peso 96 lb, aereo no conviene. Maritimo 5.8 ft3 x USD 35 = USD 203. Total logistica base USD 1019. Costo unitario USD 8.49. Venta sugerida USD 13.90 - 16.00.');

section('4.4 Producto 4: Iluminacion LED hogar (150 unidades)');
p('Compra: USD 3.10, total USD 465. Peso volumetrico 48 lb. Aereo: 48 x 6.0 = USD 288. Maritimo equivalente: 3.2 ft3 x 36 = USD 115.2. Comparacion: maritimo reduce costo en USD 172.8 pero tarda mas.');

section('4.5 Producto 5: Repuestos automotrices pequenos (90 kits)');
p('Compra: USD 9.50, total USD 855. Flete origen USD 60. Aereo 40 lb x USD 6.5 = USD 260. Total base USD 1175. Costo por kit USD 13.06. Si venta promedio USD 21, margen bruto estimado USD 7.94.');
warn('Los numeros son ejemplos operativos de referencia para planificacion, deben validarse con cotizacion actual antes de pagar.');

chapter('Capitulo 5. Aduana y nacionalizacion en Venezuela con flujo detallado');
section('5.1 Documentos y control cronologico');
bullet('Dia -5 a 0: confirmar factura comercial final, packing list y documento de transporte (BL o AWB).');
bullet('Dia 0: arribo a La Guaira o Maiquetia.');
bullet('Dia 1-3: declaracion, revision documental y canal de reconocimiento.');
bullet('Dia 2-5: liquidacion y pago de tributos/cargos aplicables.');
bullet('Dia 3-7: levante, retiro y despacho local.');

section('5.2 Formato de calculo de costo final');
p('Costo final = Mercancia + Flete origen + Seguro + Flete internacional + cargos operativos + tributos aplicables + transporte local + merma estimada.');
p('Se recomienda usar hoja de costos por SKU con tres escenarios: conservador, medio y agresivo para fijar precio de venta y proteger flujo de caja.');

chapter('Capitulo 6. Casos completos con trazabilidad numerica');
section('Caso completo A: compra pequena para validar mercado');
p('Objetivo: probar demanda sin sobrestock. SKU: accesorios de telefono. Inversion total: USD 420. Tiempo total: 12 dias por aereo. Unidades vendidas en 21 dias: 88%. Resultado: margen bruto total aproximado USD 290. Decision: escalar a 300 unidades en segundo ciclo.');

section('Caso completo B: lote maritimo para reducir costo unitario');
p('SKU: ropa y hogar. Inversion total: USD 1,950. Tiempo total: 31 dias por maritimo. Costo unitario promedio cae 22% frente al aereo. Riesgo principal: rotacion lenta. Mitigacion: separar 20% del lote para preventa en redes antes de arribo.');

section('Caso completo C: error por proveedor no apto y recuperacion');
p('Situacion: lote con defecto 12%. Accion: abrir disputa con evidencia (video, fotos por lote, inspeccion recibo). Resultado: nota de credito del 8% y reposicion parcial en siguiente orden. Leccion: inspeccion de preembarque obligatoria para rubros sensibles.');

chapter('Capitulo 7. Checklists maestros y plantillas');
section('7.1 Checklist de registro en plataformas (resumen)');
bullet('Cuenta verificada con correo y telefono.');
bullet('Perfil comercial completo.');
bullet('Metodo de pago seguro activo.');
bullet('Plantilla RFQ y matriz de proveedores creada.');
bullet('Politicas de devolucion y disputa documentadas.');

section('7.2 Checklist de casillero y despacho');
bullet('Codigo de cliente y direccion correctos en cada orden.');
bullet('Prealerta y factura cargadas en sistema.');
bullet('Validacion peso real vs volumetrico.');
bullet('Seguro contratado para valor alto.');
bullet('Plan aereo/maritimo elegido con criterio de margen.');

section('7.3 Checklist de cierre de compra');
bullet('Comprobante de pago archivado.');
bullet('Evidencia de entrega y apertura de bultos.');
bullet('Registro de incidencias por proveedor.');
bullet('Actualizacion de tablero semanal y mensual de ventas.');

chapter('Apendice. URLs oficiales y estructura sugerida de control interno');
p('Plataformas: Alibaba, Shein, Made-in-China, DHgate, Global Sources, 1688. Casilleros/couriers: Liberty Express, Zoom, MRW/aliado, Tealca, Akcesoria.');
p('Control interno sugerido: hoja de proveedores, hoja de costos por SKU, hoja de tracking, hoja de incidencias, hoja de ventas semanales/mensuales.');
p('Este manual fue preparado para uso operativo y actualizacion continua.');

// Build index page content
const range = doc.bufferedPageRange();
doc.switchToPage(1);
doc.font('Helvetica-Bold').fontSize(18).fillColor('#111827').text('INDICE');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10).fillColor('#111827');
toc.forEach((item) => {
  const left = item.label;
  const right = String(item.page);
  const dots = '.'.repeat(Math.max(3, 90 - left.length - right.length));
  doc.text(`${left} ${dots} ${right}`);
});

addFooterAllPages();
doc.end();
console.log(outputPath);
