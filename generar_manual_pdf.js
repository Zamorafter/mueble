const fs = require('fs');
const PDFDocument = require('pdfkit');

const outputPath = 'C:/Users/rquevedo/Music/muebles/EXPORTACION_DESDE_CHINA_HACIA_VENEZUELA_MANUAL_PASO_A_PASO.pdf';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  info: {
    Title: 'EXPORTACION DESDE CHINA HACIA VENEZUELA: MANUAL PASO A PASO',
    Author: 'Asistente Codex',
    Subject: 'Importaciones Venezuela'
  }
});

doc.pipe(fs.createWriteStream(outputPath));

function h1(t){doc.moveDown(0.4).font('Helvetica-Bold').fontSize(18).text(t);doc.moveDown(0.4);} 
function h2(t){doc.moveDown(0.2).font('Helvetica-Bold').fontSize(14).text(t);doc.moveDown(0.2);} 
function h3(t){doc.moveDown(0.1).font('Helvetica-Bold').fontSize(12).text(t);doc.moveDown(0.1);} 
function p(t){doc.font('Helvetica').fontSize(10.5).text(t,{align:'justify'});doc.moveDown(0.25);} 
function li(t){doc.font('Helvetica').fontSize(10.5).text('• ' + t,{indent:12,align:'justify'});} 
function warn(t){doc.moveDown(0.2);doc.rect(doc.x,doc.y,500,38).stroke('#b91c1c');doc.font('Helvetica-Bold').fillColor('#b91c1c').fontSize(10).text('[ADVERTENCIA] '+t,doc.x+8,doc.y+10,{width:484});doc.fillColor('black');doc.moveDown(2.2);} 

h1('EXPORTACION DESDE CHINA HACIA VENEZUELA: MANUAL PASO A PASO');
p('Guia tecnica y operativa orientada al contexto venezolano para reducir riesgos de estafa, mejorar decisiones de compra y ejecutar nacionalizacion con control documental.');

h2('Capitulo 1: Como identificar estafadores que dicen exportar y nunca lo hacen');
h3('1.1 Senales de alerta');
li('Precios irreales frente al mercado (25%-40% por debajo).');
li('Presion para pagar el mismo dia con excusas de urgencia.');
li('Cambio de cuenta bancaria de ultimo minuto.');
li('Negativa a videollamada real de fabrica o almacen.');
li('Pago fuera de plataforma con perdida de protecciones.');
doc.moveDown(0.3);
warn('Si no puedes verificar identidad legal, ubicacion fisica y cuenta bancaria consistente, no transfieras.');

h3('1.2 Metodos de pago peligrosos vs seguros');
p('Peligrosos: transferencias a cuentas personales, pagos por fuera de Alibaba/DHgate, remesas sin respaldo comercial.');
p('Mas seguros: Trade Assurance, carta de credito (LC) en montos altos, esquema 30/70 con inspeccion preembarque.');

h3('1.3 Como verificar un proveedor chino desde Venezuela');
li('Solicitar licencia comercial y validar nombre legal.');
li('Comprobar anos de operacion y reputacion en plataforma.');
li('Videollamada en tiempo real con evidencia de inventario.');
li('Comprar muestra antes del pedido grande.');
li('Contratar inspeccion preembarque en ordenes de valor.');

h3('1.4 Casos practicos de estafa comun en Venezuela');
p('Caso frecuente: falso agente de carga que solicita pago por "liberacion de contenedor" por WhatsApp. El numero de guia no existe o no corresponde, el cobro va a cuenta personal y luego desaparecen.');
warn('Nunca pagues cargos de aduana o liberacion sin validar en canal oficial del courier o agente autorizado.');

h3('1.5 Medidas preventivas paso a paso');
li('Cotizar con minimo 3 proveedores.');
li('Verificar documentos legales y cuenta bancaria.');
li('Exigir muestra y proforma detallada.');
li('Definir Incoterm y forma de pago protegida.');
li('Inspeccionar antes de embarque y documentar todo.');

doc.addPage();
h2('Capitulo 2: Como abrir un casillero en China para recibir productos y enviarlos a Venezuela');
h3('2.1 Que es un casillero virtual');
p('Es una direccion logistica asignada a tu codigo de cliente. Recibe compras y luego reexpide a Venezuela via aerea o maritima.');

h3('2.2 Registro desde Venezuela');
li('Completar formulario con cedula, telefono y direccion local.');
li('Recibir codigo de casillero y direccion de almacen.');
li('Prealertar tracking y adjuntar factura de compra.');
li('Elegir envio aereo o maritimo y pagar factura de flete.');

h3('2.3 Casilleros usados por importadores venezolanos');
p('Empresas conocidas en el mercado: Liberty Express, Zoom, MRW/aliados internacionales, Tealca y Akcesoria. Las tarifas cambian por peso/volumen, destino y tipo de carga.');
li('Akcesoria publica tarifas referenciales para Caracas y resto del pais, con salidas semanales.');
li('Tealca publica rangos aereo/maritimo y servicio de reempaque.');
li('Liberty Express y Zoom operan redes nacionales con rutas internacionales segun servicio.');
li('MRW en Venezuela mantiene cobertura nacional, y aliados internacionales cubren casillero segun plan contratado.');
warn('Antes de comprar, confirma por escrito: tarifa minima, peso volumetrico, recargos por electronica y cobertura en tu ciudad.');

h3('2.4 Consolidacion y ahorro');
li('Agrupar paquetes para evitar minimos repetidos.');
li('Reducir volumen con reempaque profesional.');
li('Enviar urgente por aereo y resto por maritimo.');

h3('2.5 Seguimiento y seguros');
li('Guardar tracking de tienda, tracking de casillero y tracking final en Venezuela.');
li('Contratar seguro en cargas de alto valor.');
li('Grabar video de apertura del paquete al recibir.');

doc.addPage();
h2('Capitulo 3: Plataformas confiables para comprar en China (6 obligatorias)');
h3('3.1 Alibaba');
p('URL: https://www.alibaba.com | Uso ideal: B2B mayorista, MOQ negociable, Trade Assurance.');
h3('3.2 Shein');
p('URL: https://www.shein.com | Uso ideal: retail moda en pequenas cantidades.');
h3('3.3 Made-in-China');
p('URL: https://www.made-in-china.com | Uso ideal: productos industriales y comparacion de fabricas.');
h3('3.4 DHgate');
p('URL: https://www.dhgate.com | Uso ideal: lotes pequenos y pruebas de mercado.');
h3('3.5 Global Sources');
p('URL: https://www.globalsources.com | Uso ideal: electronica y proveedores orientados a exportacion.');
h3('3.6 1688.com');
p('URL: https://www.1688.com | Uso ideal: precios de mercado interno chino, normalmente requiere agente de compras.');
warn('No uses una sola plataforma como criterio de confianza. Siempre valida proveedor, muestras y condiciones de pago.');

doc.addPage();
h2('Capitulo 4: Proceso de nacionalizacion en aduana venezolana (SENIAT)');
h3('4.1 Documentos obligatorios');
li('Factura comercial (con apoyo en espanol si viene en ingles/chino).');
li('Packing list.');
li('Conocimiento de embarque BL o AWB.');
li('RIF del importador y soportes adicionales segun rubro.');

h3('4.2 Calculo tributario operativo');
li('Base CIF = mercancia + seguro + flete internacional.');
li('Arancel = porcentaje segun partida arancelaria.');
li('IVA importacion = 16% sobre (CIF + arancel), salvo exoneracion vigente aplicable.');
li('IGTF depende de modalidad de pago y condicion fiscal del contribuyente.');

h3('4.3 Limite personal (referencia operativa)');
p('En el ecosistema courier se usa como referencia de bajo valor el umbral de 100 USD en ciertos escenarios, pero no garantiza liberacion automatica ni ausencia de revision.');

h3('4.4 Cuando contratar agente de aduanas');
li('Carga comercial, electronica sensible, volumen alto o permisos especiales.');
li('Cuando necesitas clasificacion arancelaria precisa y control de tiempos.');

h3('4.5 Flujo paso a paso (La Guaira o Maiquetia)');
li('Arribo y notificacion.');
li('Revision documental y clasificacion arancelaria.');
li('Declaracion y canal de reconocimiento.');
li('Liquidacion/pago de tributos y servicios.');
li('Levante, retiro y entrega final.');
warn('El costo mas caro suele ser la demora por expediente incompleto, no el flete inicial.');

doc.addPage();
h2('Capitulo 5: Checklist definitivo para evitar estafas (Venezuela)');
const checks = [
'Cotice con minimo 3 proveedores comparables.',
'Valide licencia comercial del proveedor.',
'Verifique coincidencia entre razon social y cuenta bancaria.',
'Realice videollamada operativa real.',
'Compre muestra antes de escalar.',
'Defina Incoterm por escrito.',
'Evite pago 100% adelantado en primera orden.',
'Use metodo de pago con proteccion.',
'Confirme restricciones del courier para su rubro.',
'Prealerte tracking y factura.',
'Compare costo aereo vs maritimo.',
'Verifique peso real y volumetrico.',
'Asegure carga de alto valor.',
'Prepare documentos para aduana antes del arribo.',
'Defina partida arancelaria con criterio tecnico.',
'Confirme si requiere permisos especiales.',
'Valide cargos solo por canales oficiales.',
'No entregue pagos por WhatsApp sin factura.',
'Reciba con video de apertura.',
'Cierre con acta interna de conformidad/incidencias.'
];
checks.forEach((c,i)=>doc.font('Helvetica').fontSize(10.5).text(`${i+1}. ${c}`));

doc.moveDown();
h2('Apendices');
h3('Glosario breve');
p('Incoterms, FOB, CIF, BL, AWB, MOQ, CIF aduanero, peso volumetrico, consolidacion, RIF y SENIAT.');
h3('Modelo de factura comercial editable');
p('Incluye datos del exportador/importador, detalle de mercancia, Incoterm, valor CIF y declaracion firmada.');
h3('Directorio referencial de agentes de carga');
p('Para uso de plantilla: Andina Cargo Brokers, La Guaira Trade Logistics, Maiquetia Air Freight Partners, RIF & Aduana Consultores, Delta Customs & Cargo (nombres de ejemplo).');
h3('FAQ Venezuela');
p('Que hacer si el paquete queda retenido, si puedes traer electronicos y como reducir riesgo de hurto con seguro y evidencia documental.');

doc.moveDown(1);
p('Para convertir este manual en un PDF estilo libro, copia todo el texto a Google Docs, aplica formato (interlineado 1.5, margenes normales, fuente Arial 11) y luego selecciona Archivo -> Descargar -> PDF. Para un acabado profesional, anade un encabezado con el titulo y numeros de pagina.');

doc.end();
console.log(outputPath);
