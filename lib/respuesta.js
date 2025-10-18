// channel id - y nombre del bot
const newsletterJid = '120363402097425674@newsletter';
const newsletterName = '🍂 NagiBot-IA Channel Official 🌿';
const packname = '© Created by Dev-fedexyz';

// Iconos - Nagi
const iconos = [
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
];

const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

const handler = (type, conn, m, comando) => {
  const msg = {
    rowner: '🍂 *_Solo el creador puede usar esta función._*',
    owner: '🍂 *_Este comando es para el creador y programadores._*',
    mods: '🍂 *_Solo el equipo de desarrollo puede usar este comando._*',
    premium: '🍂 Función exclusiva para usuarios Premium.\nUsa:\n>.comprarpremium 2 dias._*',
    group: '🍂 *_Este comando solo funciona en grupos._*',
    private: '🍂 *_Este comando solo se usa en chats privados._*',
    admin: '《🍂 *_Solo un administrador puede usar este comando._*',
    botAdmin: '🍂 */Necesito ser admin para ejecutar este comando._*',
    unreg: '🍂 *_No estás registrado._*\n*_Regístrate con:_*\n*_#Reg nombre.edad_*\n*_🌿 Ejemplo:\n#reg anonimo.17_*',
    restrict: '🍂 *_Esta función está desactivada por ahora._*'
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
