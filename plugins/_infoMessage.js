import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
const { default: WAMessageStubType} = await import('@whiskeysockets/baileys');

const lidCache = new Map();

const handler = m => m;

handler.before = async function (m, { conn, participants}) {
  if (!m.messageStubType ||!m.isGroup) return;

  const chat = global.db.data.chats[m.chat];
  const primaryBot = chat.primaryBot;
  if (primaryBot && conn.user.jid!== primaryBot) throw false;

  const stubType = m.messageStubType;
  const stubParam = m.messageStubParameters?.[0];
  const usuario = await resolveLidToRealJid(m.sender, conn, m.chat);
  const groupAdmins = participants.filter(p => p.admin);
  const mentioned = [usuario,...groupAdmins.map(v => v.id)];

  const rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
},
      externalAdReply: {
        title: '⸝⸝ ꒰ N O T I F Y　꒱  ⁞　ˎˊ˗',
        body: textbot,
        mediaUrl: null,
        description: null,
        previewType: 'PHOTO',
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
},
      mentionedJid: null
}
};

  const profilePic = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || 'https://files.catbox.moe/xr2m6u.jpg';

  const messages = {
    21: `🍃 ¡NUEVO NOMBRE!\n\n@${usuario.split('@')[0]} decidió cambiar el nombre.\n💌 Nuevo nombre: *${stubParam}*`,
    22: {
      image: { url: profilePic},
      caption: `🖼️ ¡Foto renovada!\n\n👀 Acción hecha por: @${usuario.split('@')[0]}`
},
    23: `🔗 ¡Enlace del grupo actualizado!\n\n✦ Gracias a: @${usuario.split('@')[0]}\nAhora todos pueden unirse 🍃`,
    25: `🔧 Configuración del grupo\n\n@${usuario.split('@')[0]} ha decidido que ${stubParam === 'on'? 'solo los admins 🍁': 'todos los miembros 🍒'} puedan modificar el grupo.`,
    26: `📚 Estado del grupo\n\nEl grupo ha sido ${stubParam === 'on'? '*cerrado* 🔒': '*abierto* 🔓'}.\n✦ Por: @${usuario.split('@')[0]}\n🌿 ${stubParam === 'on'? 'Solo admins pueden enviar mensajes': 'Todos pueden enviar mensajes'}`,
    29: `✨ ¡Admin nuevo!\n\n@${stubParam.split('@')[0]} ahora es admin.\n🖇️ Acción realizada por: @${usuario.split('@')[0]} 🌿`,
    30: `🌿 ¡Admin removido!\n\n@${stubParam.split('@')[0]} ya no es admin.\n🖇️ Acción realizada por: @${usuario.split('@')[0]} 💌`
};

  if (chat.detect) {
    switch (stubType) {
      case 21:
      case 23:
      case 25:
      case 26:
        rcanal.contextInfo.mentionedJid = mentioned;
        await this.sendMessage(m.chat, { text: messages[stubType],...rcanal}, { quoted: null});
        break;

      case 22:
        rcanal.contextInfo.mentionedJid = mentioned;
        await this.sendMessage(m.chat, {...messages[22],...rcanal}, { quoted: null});
        break;

      case 29:
      case 30:
        rcanal.contextInfo.mentionedJid = [usuario, stubParam,...groupAdmins.map(v => v.id)].filter(Boolean);
        await this.sendMessage(m.chat, { text: messages[stubType],...rcanal}, { quoted: null});
        break;

      default:
        break;
}
}
};

export default handler;

// 🔍 Resolver LID a JID real
async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
  const inputJid = lid.toString();
  if (!inputJid.endsWith('@lid') ||!groupChatId?.endsWith('@g.us')) {
  return inputJid.includes('@')? inputJid: `${inputJid}@s.whatsapp.net`;
}

  if (lidCache.has(inputJid)) return lidCache.get(inputJid);

  const lidToFind = inputJid.split('@')[0];
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const metadata = await conn?.groupMetadata(groupChatId);
      if (!metadata?.participants) throw new Error('No se obtuvieron participantes');

      for (const participant of metadata.participants) {
        try {
          if (!participant?.jid) continue;
          const contactDetails = await conn?.onWhatsApp(participant.jid);
          if (!contactDetails?.[0]?.lid) continue;

          const possibleLid = contactDetails[0].lid.split('@')[0];
          if (possibleLid === lidToFind) {
            lidCache.set(inputJid, participant.jid);
            return participant.jid;
}
} catch {
          continue;
}
}

      lidCache.set(inputJid, inputJid);
      return inputJid;
} catch {
      if (++attempts>= maxRetries) {
        lidCache.set(inputJid, inputJid);
        return inputJid;
}
      await new Promise(resolve => setTimeout(resolve, retryDelay));
}
}

  return inputJid;
}
