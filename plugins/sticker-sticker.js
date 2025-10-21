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
    const botname = global.botname || 'NagiBot';

    global.packsticker = '🌿 NagiBot-IA by Dev-fedexyz 🍃';

    const vcard1 = `BEGIN:VCARD\nVERSION:3.0\nFN:${botname}\nORG:NagiBot\nTEL;type=CELL;type=VOICE;waid=0:0\nEND:VCARD`;

    const qkontak = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
},
      message: {
        contactMessage: {
          displayName: "𝑵𝒂𝒈𝒊𝑩𝒐𝒕 - 𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒔 🍃",
          vcard: vcard1
}
}
};

    const media = await message.quoted.download();
    const stickerBuffer = await sticker(media, false, {
      packname: global.packsticker,
      author: botname
});

    await conn.sendFile(rcanal, stickerBuffer, 'sticker.webp', '', qkontak, { asSticker: true});
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
