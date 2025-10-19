import { exec} from 'child_process';

const newsletterJid = '120363402097425674@newsletter';
const newsletterName = '🍂 NagiBot-IA Channel Official 🌿';
const packname = '© Created by Dev-fedexyz';

// Iconos - Nagi
const iconos = [
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
];

function getRandomIcono() {
  return iconos[Math.floor(Math.random() * iconos.length)];
}

let handler = async (m, { conn}) => {
  m.reply(`⚽ Actualizando la bot...`);

  const comando = 'find src -type f | xargs git update-index --assume-unchanged && git pull';

  exec(comando, (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `🌙 Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
      return;
}

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
}

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

    if (stdout.includes('Already up to date.')) {
      conn.sendMessage(m.chat, { text: `⚽ La bot ya está actualizada.`, contextInfo}, { quoted: m});
} else {
      conn.sendMessage(m.chat, { text: `🍃 Actualización realizada con éxito.\n\n${stdout}`, contextInfo}, { quoted: m});
}
});
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;
