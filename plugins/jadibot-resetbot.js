let handler = async (m, { conn}) => {
  const chatId = m.chat;
  const chatData = global.db.data.chats[chatId];

  if (['limpiar'].test(m.text)) {
    if (!global.conns || global.conns.length === 0) {
      return conn.reply(chatId, '🌿 No hay sesiones activas de subbots para eliminar.', m, global.rcanal);
}

    global.conns.map(bot => bot.ws.close());
    global.conns = [];

    return conn.reply(chatId, '🧹 Todas las sesiones de subbots han sido eliminadas correctamente.', m, global.rcanal);
}

  if (['restart'].test(m.text)) {
    if (!chatData?.primaryBot) {
      return conn.reply(chatId, '🌿 No hay ningún bot primario establecido en este grupo.', m, global.rcanal);
}

    chatData.primaryBot = null;

    return conn.reply(
      chatId,
      '🍃 Subbots restablecidos.\n\nAhora todos los bots válidos pueden volver a conectarse en este grupo.',
      m,
      global.rcanal
);
}
};

handler.command = ['limpiar', 'restart'];
handler.group = true;
handler.admin = true;

export default handler;.
