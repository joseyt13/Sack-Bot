import { execSync} from 'child_process';

const newsletterJid = '120363402097425674@newsletter';
const newsletterName = '🍂 NagiBot-IA Channel Official 🌿';
const packname = '© Created by Dev-fedexyz';
const redes = 'https://dev-fedexz.vercel.app';

const iconos = [
  'https://files.catbox.moe/npum4p.jpg',
  'https://files.catbox.moe/npum4p.jpg',
  'https://files.catbox.moe/18qri6.jpg',
];

function getRandomIcono() {
  return iconos[Math.floor(Math.random() * iconos.length)];
}

export async function before(m) {
  if (!m.text ||!global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => {
      const cmds = Array.isArray(plugin.command)? plugin.command: [plugin.command];
      return cmds.includes(cmd);
});
};

  if (!command) return;

  if (validCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender];
    if (!user.commands) user.commands = 0;
    user.commands += 1;

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
}
};

    m.contextInfo = contextInfo;
} else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`🌿 El comando *${comando}* no está disponible.`);
}
}
