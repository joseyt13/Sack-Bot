import { sticker} from '../lib/sticker.js';

let handler = async (message, { conn, usedPrefix, command}) => {
  const rcanal = message.chat;

  if (!message.quoted ||!message.quoted.fileSha256) {
    return conn.reply(rcanal, '🌿 Debes responder a una imagen para convertirla en sticker.', message);
}

  const mime = message.quoted.mimetype || '';
  if (!/image\/(jpe?g|png|webp)/.test(mime)) {
    return conn.reply(rcanal, '⚠️ El archivo debe ser una imagen válida (jpg, png, webp).', message);
}

  conn.reply(rcanal, '*🍃 _Creando su sticker, espere..._*', message, rcanal);

  try {
    const nombre = message.pushName || 'usuario';
    const botname = global.botname || 'Bot';
    const fecha = new Date().toLocaleDateString('es-AR');
    const tiempo = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit'});

    global.packsticker = [
      '°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°',
      `🌿 Usuario: ${nombre}`,
      `🍂 Bot: ${botname}`,
      `🍃 Fecha: ${fecha}`,
      `🍒 Hora: ${tiempo}`
    ].join('\n');

    const media = await message.quoted.download();
    const stickerBuffer = await sticker(media, false, {
      packname: global.packsticker,
      author: botname
});

    await conn.sendFile(rcanal, stickerBuffer, 'sticker.webp', '', message, { asSticker: true});
} catch (error) {
    console.error(error);
    conn.reply(rcanal, '❌ Ocurrió un error al crear el sticker.', message);
}
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = ['sticker', 's'];
handler.register = true;

export default handler;
