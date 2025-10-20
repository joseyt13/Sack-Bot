let handler = async (m, { conn}) => {
  if (!m.isGroup) throw '🌿 Este comando solo puede usarse en grupos.';
  if (!global.owner.includes(m.sender)) throw '🍂 Solo el propietario del bot puede usar este comando.';

  const groupMetadata = await conn.groupMetadata(m.chat);
  const namebog = groupMetadata.subject;

  await conn.sendMessage(m.chat, {
    text: `*_🍃 Adiós, el bot se despide del grupo *${namebog}*..._*`,
});

  await conn.groupLeave(m.chat);
};

handler.command = ['salir'];
handler.tags = ['owner'];
handler.help = ['salir'];
handler.rowner = true;

export default handler;
