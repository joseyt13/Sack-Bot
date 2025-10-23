import { rmSync, existsSync} from 'fs';
import ws from 'ws';

const formatUptime = (ms) => {
  if (!ms || ms < 1000) return 'Nuevo';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  return `${d? d + 'd, ': ''}${h % 24}h, ${m % 60}m, ${s % 60}s`;
};

const handler = async (m, { conn, command, usedPrefix}) => {
  const isDeleteBot = /^(deletebot|delcode)$/i.test(command);
  const isShowBots = /^bots$/i.test(command);

  try {
    if (isDeleteBot) {
      const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
      const uniqid = who.split('@')[0];
      const dirPath = `./${jadi}/${uniqid}`;

      if (!existsSync(dirPath)) {
        await conn.sendMessage(m.chat, {
          text: `🌿 No hay sesión activa para eliminar.\n\nUsa *${usedPrefix}qr* para crear una nueva.`,
}, { quoted: m});
        return;
}

      if (global.conn.user.jid!== conn.user.jid) {
        await conn.sendMessage(m.chat, {
          text: `🍂 Solo el bot principal puede ejecutar este comando.\n\nContacto: wa.me/${global.conn.user.jid.split('@')[0]}`,
}, { quoted: m});
        return;
}

      rmSync(dirPath, { recursive: true, force: true});
      await conn.sendMessage(m.chat, {
        text: `🍃 Sesión eliminada correctamente.`,
}, { quoted: m});
}

    if (isShowBots) {
      const activeBots = global.conns.filter(c => c.user && c.ws.socket && c.ws.socket.readyState!== ws.CLOSED);

      const list = activeBots.map((bot, i) => {
        const uptime = bot.uptime? formatUptime(Date.now() - bot.uptime): 'Desconocido';
        const number = bot.user.jid.split('@')[0];
        const name = bot.user.name || 'Sin Nombre';
        return `╭─ SUB-BOT ${i + 1}
│• Usuario: ${name}
│• Número: wa.me/${number}
│• Activo: ${uptime}
╰────────────`;
}).join('\n\n');

      const msg = `*🤖 SUB-BOTS ACTIVOS*\n\n🔌 Conectados: ${activeBots.length}\n\n${activeBots.length? list: 'No hay sub-bots activos.'}`;

      const interactiveButtons = [
        {
          name: "cta_command",
          buttonParamsJson: JSON.stringify({
            display_text: "ꜱᴇʀ ꜱᴜʙ-ʙᴏᴛ",
            command: ".code"
})
}
      ];

      await conn.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/60z2ix.jpg"},
        caption: msg,
        footer: "🌿 NagiBot-IA | Panel de SubBots",
        interactiveButtons,
        mentions: conn.parseMention(msg)
}, { quoted: m});
}
} catch (e) {
    await m.reply('❌ Ocurrió un error inesperado.');
    console.error(e);
}
};

handler.tags = ['serbot'];
handler.help = ['deletebot', 'delcode', 'bots'];
handler.command = ['deletebot', 'delcode', 'bots'];
handler.register = true;

export default handler;
