let handler = async (m, { conn}) => {
  const chatData = global.db.data.chats[m.chat];

  if (!chatData?.primaryBot) {
    return conn.reply(
      m.chat,
      '🌿 No hay ningún bot primario establecido en este grupo.',
      m,
      global.rcanal
);
}

  console.log(`[ResetBot] Restableciendo configuración en el grupo: ${m.chat}`);
  chatData.primaryBot = null;

  await conn.reply(
    m.chat,
    '🍃 Configuración restablecida.\n\nA partir de ahora, todos los bots válidos podrán responder en este grupo.',
    m,
    global.rcanal
);
};

handler.help = ['limpiar', 'restart']
handler.tags = ['serbot']
handler.command = ['limpiar', 'restart']
handler.group = true;
handler.rowner = true;

export default handler;
