// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
const newsletterJid = '120363402097425674@newsletter';
const newsletterName = '⚽ ɴᴀɢɪʙᴏᴛ-ɪᴀ ᴄʜᴀɴɴᴇʟ ᴏꜰꜰɪᴄɪᴀʟ';
const packname = 'Created By ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ';

// Array de miniaturas
const iconos = [
      'https://qu.ax/kCFBu.jpeg',
      'https://qu.ax/oywhU.jpeg',
      'https://qu.ax/OqruN.jpeg',
      'https://qu.ax/EQNsz.jpeg', 
      'https://qu.ax/zKJLa.jpeg', 
      'https://qu.ax/jSfLz.jpg', 
      'https://qu.ax/vEYfK.jpg', 
      'https://qu.ax/vEYfK.jpg', 
      'https://qu.ax/cQVWG.jpg', 
      'https://qu.ax/aKHwP.jpg', 
      'https://qu.ax/jpdRe.jpg', 
      'https://qu.ax/DomyS.jpg', 
      'https://qu.ax/fwbjQ.jpg', 
      'https://qu.ax/gqMcL.jpg', 
      'https://qu.ax/oYaOd.jpg', 
      'https://qu.ax/krkFy.jpeg', 
];

// Función para obtener una aleatoria
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: '《👑》 ꜱᴏʟᴏ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴀ ꜰᴜɴᴄɪᴏ́ɴ.',
  owner: '《🧑‍💻》 ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇꜱ ᴘᴀʀᴀ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ʏ ᴘʀᴏɢʀᴀᴍᴀᴅᴏʀᴇꜱ.',
  mods: '《🛠️》 ꜱᴏʟᴏ ᴇʟ ᴇǫᴜɪᴘᴏ ᴅᴇ ᴅᴇꜱᴀʀʀᴏʟʟᴏ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.',
  premium: '《💎》 ꜰᴜɴᴄɪᴏ́ɴ ᴇxᴄʟᴜꜱɪᴠᴀ ᴘᴀʀᴀ ᴜꜱᴜᴀʀɪᴏꜱ ᴘʀᴇᴍɪᴜᴍ.\nᴜꜱᴀ:\n>.comprarpremium 2 dias',
  group: '《👥》 ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏʟᴏ ꜰᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏꜱ.',
  private: '《📩》 ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏʟᴏ ꜱᴇ ᴜꜱᴀ ᴇɴ ᴄʜᴀᴛꜱ ᴘʀɪᴠᴀᴅᴏꜱ.',
  admin: '《🛡️》 ꜱᴏʟᴏ ᴜɴ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴅᴏʀ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.',
  botAdmin: '《🔧》 ɴᴇᴄᴇꜱɪᴛᴏ ꜱᴇʀ ᴀᴅᴍɪɴ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ.',
  unreg: '《📋》 ɴᴏ ᴇꜱᴛᴀ́ꜱ ʀᴇɢɪꜱᴛʀᴀᴅᴏ.\nʀᴇɢɪ́ꜱᴛʀᴀᴛᴇ ᴄᴏɴ:\n/reg nombre.edad\nᴇᴊᴇᴍᴘʟᴏ:\n/reg anonimo.edad',
  restrict: '《🚫》 ᴇꜱᴛᴀ ꜰᴜɴᴄɪᴏ́ɴ ᴇꜱᴛᴀ́ ᴅᴇꜱᴀᴄᴛɪᴠᴀᴅᴀ ᴘᴏʀ ᴀʜᴏʀᴀ.'
}[type];
      
  if (msg) {
  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid,
      newsletterName,
      serverMessageId: -1
},
    externalAdReply: {
      title: packname,
      body: `I⚽ Hola, ${m.pushName}~! (≧∇≦)/`,
      thumbnailUrl: getRandomIcono(), 
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
}
};

  return conn.reply(m.chat, msg, m, { contextInfo}).then(_ => m.react('✖️'));
}

return true;
};

export default handler;
