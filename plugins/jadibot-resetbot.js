let handler = async (m, { conn}) => {
  const chatData = global.db.data.chats[m.chat];

  if (!chatData?.primaryBot) {
    return m.reply('🌿 No hay ningún bot primario establecido en este grupo.');
}

  console.log(`[ResetBot] Restableciendo configuración en el grupo: ${m.chat}`);
  chatData.primaryBot = null;

  await m.reply(
    '🍃 Configuración restablecida.\n\nA partir de ahora, todos los bots válidos podrán responder en este grupo.'
);
};

handler.customPrefix = /^(resetbot|reset)$/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;

export default handler;
