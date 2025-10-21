import { createHash} from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin}) => {
  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = command.toLowerCase();
  let isAll = false;
  let isEnable = chat[type] || false;

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false;
} else {
    const estado = isEnable? '🍃 Activado': '🍒 Desactivado';
    return conn.reply(m.chat, `□ Un administrador puede activar o desactivar el *${command}* utilizando:\n\n> 🍃  *${usedPrefix}${command} on* para activar.\n> 🍃 *${usedPrefix}${command} off* para desactivar.\n\n✧ Estado actual » *${estado}*`, m);
}

  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        global.dfail('group', m, conn);
        throw false;
}
      if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
}
      chat.welcome = isEnable;
      break;

    case 'antiprivado':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
}
      bot.antiPrivate = isEnable;
      break;

    case 'antispam':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
}
      bot.antiSpam = isEnable;
      break;

    case 'antisubbots':
      if (!m.isGroup) {
        global.dfail('group', m, conn);
        throw false;
}
      if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
}
      chat.antiBot2 = isEnable;
      break;

    case 'nsfw':
      if (!m.isGroup) {
        global.dfail('group', m, conn);
        throw false;
}
      if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
}
      chat.nsfw = isEnable;
      break;

    default:
      return conn.reply(m.chat, '⚠️ Comando no reconocido.', m);
}

  conn.reply(m.chat, `🌿 La función *${type}* se *${isEnable? 'activó': 'desactivó'}* ${isAll? 'para el bot completo': 'en este chat'}`, m);
};

handler.help = ['welcome', 'antiprivado', 'antispam', 'antisubbots', 'nsfw'];
handler.tags = ['nable'];
handler.command = ['welcome', 'antiprivado', 'antispam', 'antisubbots', 'nsfw'];

export default handler;
