let handler = async (m, { conn, text}) => {
  if (!m.isGroup) {
    throw '🌿 Este comando solo puede usarse dentro de grupos.'
}

  if (!text ||!/^\d+$/.test(text)) {
    throw '🍂 Debes proporcionar el número del bot que deseas establecer como principal.🌿 Ejemplo: #setprimary 54911561787t8'
}

  const botJid = `${text}@s.whatsapp.net`
  const chatData = global.db.data.chats[m.chat] ||= {}

  if (chatData.primaryBot === botJid) {
    return conn.reply(
      m.chat,
      `@${text} ya está establecido como bot principal en este grupo.`,
      m,
      { mentions: [botJid]}
)
}

  chatData.primaryBot = botJid

  const confirmation = `🍃 Se ha establecido a *@${text}* como el único bot que responderá en este grupo.\n\n` +
    `A partir de ahora, todos los comandos serán ejecutados exclusivamente por él.\n\n` +
    `Nota: Si deseas que todos los bots vuelvan a responder, un administrador puede usar el comando \`resetbot\` (sin prefijo).`

  await conn.sendMessage(m.chat, {
    text: confirmation,
    mentions: [botJid]
}, { quoted: m})
}

handler.help = ['setprimary <número>']
handler.tags = ['owner', 'group']
handler.command = ['setprimary']
handler.admin = true
handler.group = true

export default handler
