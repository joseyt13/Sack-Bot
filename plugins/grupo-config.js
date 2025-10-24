const handler = async (m, { conn, command, participants}) => {
  if (!m.isGroup) {
    return conn.reply(m.chat, 'Este comando solo funciona en grupos.', m);
}

  const isAdmin = participants.some(p => p.id === m.sender && p.admin);
  const botAdmin = participants.some(p => p.id === conn.user.jid && p.admin);

  if (!isAdmin) {
    return conn.reply(m.chat, 'Solo los administradores pueden usar este comando.', m);
}

  if (!botAdmin) {
    return conn.reply(m.chat, 'Necesito ser administrador para cambiar la configuración del grupo.', m);
}

  const isOpen = command === 'abrir';
  const action = isOpen? 'not_announcement': 'announcement';

  const estado = isOpen
? '🍃 El grupo ha sido abierto.\n\nAhora todos pueden mandar mensajes al grupo.'
: '🔒 El grupo ha sido cerrado.\n\nAhora solo los administradores pueden enviar mensajes al grupo.';

  await conn.groupSettingUpdate(m.chat, action);
  await conn.sendMessage(m.chat, { text: estado}, { quoted: m});

  await conn.sendMessage(m.chat, {
    text: '¿Qué deseas hacer?',
    footer: 'Configuración del grupo',
    buttons: [
      { buttonId: '.abrir', buttonText: { displayText: 'ᴀʙʀɪʀ ɢʀᴜᴘᴏ'}, type: 1},
      { buttonId: '.cerrar', buttonText: { displayText: 'ᴄᴇʀʀᴀʀ ɢʀᴜᴘᴏ'}, type: 1}
    ],
    headerType: 1
}, { quoted: m});
};

handler.help = ['abrir', 'cerrar'];
handler.tags = ['group'];
handler.command = ['abrir', 'cerrar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
