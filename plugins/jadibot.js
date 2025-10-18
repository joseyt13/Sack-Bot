import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises} from "fs";
const fs = {...fsPromises, existsSync};
import path, { join} from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
  const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isPauseBot = /^(stop|pausarai|pausarbot)$/i.test(command);
  const isShowBots = /^(bots|sockets|socket)$/i.test(command);

  const reportError = async (e) => {
    await m.reply(`⚠️ Error inesperado.`)
    console.error(e);
};

  switch (true) {
    case isDeleteSession: {
      const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
      const uniqid = who.split('@')[0];
      const dirPath = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(dirPath)) {
        await conn.sendMessage(m.chat, {
          text: `🚫 *Sin sesión activa*\n\nUsa *${usedPrefix}qr* para crear una.\n\n¿Tienes ID?\nUsa *${usedPrefix}code* \`\`\`(ID)\`\`\``,
          buttons: [{ buttonId: `${usedPrefix}code`, buttonText: { displayText: '𝐂ᴏᴘɪᴀʀ 𝐂ᴏᴅᴇ'}, type: 1}],
}, { quoted: m});
        return;
}

      if (global.conn.user.jid!== conn.user.jid) {
        await conn.sendMessage(m.chat, {
          text: `💬 Solo el *Bot Principal* puede usar este comando.\n\n🔗 https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}`,
}, { quoted: m});
        return;
}

      await conn.sendMessage(m.chat, { text: `🗑️ Sesión eliminada.`}, { quoted: m});

      try {
        fs.rmdir(`./${jadi}/${uniqid}`, { recursive: true, force: true});
        await conn.sendMessage(m.chat, { text: `✅ Limpieza completa.`}, { quoted: m});
} catch (e) {
        reportError(e);
}
      break;
}

    case isPauseBot: {
      if (global.conn.user.jid == conn.user.jid) {
        conn.reply(m.chat, `🚫 No puedes pausar el bot principal.`, m);
} else {
        await conn.reply(m.chat, `🔕 *${botname} pausado.*`, m);
        conn.ws.close();
}
      break;
}

    case isShowBots: {
      const users = [...new Set(global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState!== ws.CLOSED))];

      const formatUptime = (ms) => {
        if (!ms || ms < 1000) return 'Nuevo';
        let s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60), d = Math.floor(h / 24);
        return `${d? d + 'd, ': ''}${h % 24}h, ${m % 60}m, ${s % 60}s`;
};

      const lista = users.map((v, i) => {
        const uptime = v.uptime? formatUptime(Date.now() - v.uptime): 'Desconocido';
        const numero = v.user.jid.split('@')[0];
        const nombre = v.user.name || 'Sin Nombre';
        return `╭─ 🤖 *SUB-BOT ${i + 1}*
│• *Usuario:* ${nombre}
│• *Número:* wa.me/${numero}
│• *Activo:* ${uptime}
╰────────────`;
}).join('\n\n');

      const msg = `*SUB-BOTS ACTIVOS* ⚙️\n\nConectados: ${users.length}\n\n${users.length? lista: '💤 No hay Sub-Bots activos.'}`;

      await _envio.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/65rdkc.jpg'},
        caption: msg,
        mentions: _envio.parseMention(msg)
}, { quoted: m});

      break;
}
}
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = [
  'deletesesion', 'deletebot', 'deletesession', 'deletesesaion',
  'stop', 'pausarai', 'pausarbot',
  'bots', 'sockets', 'socket'
];

export default handler;
