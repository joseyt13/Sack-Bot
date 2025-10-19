import { exec} from 'child_process';

const newsletterJid = '120363402097425674@newsletter';
const newsletterName = '🍂 NagiBot-IA Channel Official 🌿';
const packname = '© Created by Dev-fedexyz';
const redes = 'https://dev-fedexz.vercel.app';

const iconos = [
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
  'https://cdn.yupra.my.id/yp/e0lrusaq.jpg',
];

const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

const comandoActualizacion = 'find src -type f | xargs git update-index --assume-unchanged && git pull';

const handler = async (m, { conn, rcanal}) => {
  m.reply('⚽ Actualizando la bot...', m, rcanal);

  exec(comandoActualizacion, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error al ejecutar el comando:', err);
      conn.reply(m.chat, `🌙 Error: No se pudo realizar la actualización.\n🔧 Detalles: ${err.message}`, m, rcanal);
      return;
}

    if (stderr) {
      console.warn('⚠️ Advertencia durante la actualización:', stderr);
}

    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1,
},
      externalAdReply: {
        title: packname,
        body: `🌿 Hola, ${m.pushName || 'usuario'}!`,
        thumbnailUrl: getRandomIcono(),
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false,
},
};

    const mensaje = stdout.includes('Already up to date.')
? '⚽ La bot ya está actualizada.'
: `🍃 Actualización realizada con éxito.\n\n${stdout}`;

    conn.sendMessage(m.chat, { text: mensaje, contextInfo}, { quoted: m}, rcanal);
});
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;
