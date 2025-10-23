// channel id - y nombre del bot
const newsletterJid = '120363405641626756@newsletter';
const newsletterName = '『 ⏤͟͟͞͞☆ 𝑵𝒂𝒈𝒊𝑩𝒐𝒕-𝑰𝑨 | 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍 ❀ 』';
const packname = '© 🄽🄰🄶🄸🄱🄾🅃‐🄼🄳';

// Iconos - Nagi
const iconos = [
  'https://files.catbox.moe/npum4p.jpg',
  'https://files.catbox.moe/18qri6.jpg',
  'https://files.catbox.moe/60z2ix.jpg',
];

const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: '🍂 *_ꜱᴏʟᴏ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴀ ꜰᴜɴᴄɪᴏ́ɴ._*',
  owner: '🍂 *_ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇꜱ ᴘᴀʀᴀ ᴇʟ ᴄʀᴇᴀᴅᴏʀ ʏ ᴘʀᴏɢʀᴀᴍᴀᴅᴏʀᴇꜱ._*',
  mods: '🍂 *_ꜱᴏʟᴏ ᴇʟ ᴇǫᴜɪᴘᴏ ᴅᴇ ᴅᴇꜱᴀʀʀᴏʟʟᴏ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ._*',
  premium: '🍂 *_ꜰᴜɴᴄɪᴏ́ɴ ᴇxᴄʟᴜꜱɪᴠᴀ ᴘᴀʀᴀ ᴜꜱᴜᴀʀɪᴏꜱ ᴘʀᴇᴍɪᴜᴍ._*\n*_ᴜꜱᴀ:_*\n*>.ᴄᴏᴍᴘʀᴀʀᴘʀᴇᴍɪᴜᴍ 2 ᴅɪᴀꜱ_*',
  group: '🍂 *_ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏʟᴏ ꜰᴜɴᴄɪᴏɴᴀ ᴇɴ ɢʀᴜᴘᴏꜱ._*',
  private: '🍂 *_ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏʟᴏ ꜱᴇ ᴜꜱᴀ ᴇɴ ᴄʜᴀᴛꜱ ᴘʀɪᴠᴀᴅᴏꜱ._*',
  admin: '🍂 *_ꜱᴏʟᴏ ᴜɴ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴅᴏʀ ᴘᴜᴇᴅᴇ ᴜꜱᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ._*',
  botAdmin: '🍂 *_ɴᴇᴄᴇꜱɪᴛᴏ ꜱᴇʀ ᴀᴅᴍɪɴ ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ._*',
  unreg: '🍂 *_ɴᴏ ᴇꜱᴛᴀ́ꜱ ʀᴇɢɪꜱᴛʀᴀᴅᴏ._*\n\n*_ʀᴇɢɪ́ꜱᴛʀᴀᴛᴇ ᴄᴏɴ:_*\n*_#ʀᴇɢ ɴᴏᴍʙʀᴇ.ᴇᴅᴀᴅ_*\n*_🌿 ᴇᴊᴇᴍᴘʟᴏ:_*\n*_#ʀᴇɢ ᴀɴᴏɴɪᴍᴏ.17_*',
  restrict: '🍂 *_ᴇꜱᴛᴀ ꜰᴜɴᴄɪᴏ́ɴ ᴇꜱᴛᴀ́ ᴅᴇꜱᴀᴄᴛɪᴠᴀᴅᴀ ᴘᴏʀ ᴀʜᴏʀᴀ._*'
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
        body: `🌿 Hola, ${m.pushName}!`,
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
