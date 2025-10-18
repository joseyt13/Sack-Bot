let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];

    if (!chat || !chat.primaryBot) {
        return m.reply('《 ⚽ 》 No hay ningún bot primario establecido en este grupo.');
    }

    console.log(`[ResetBot] Reseteando configuración para el chat: ${m.chat}`);
    chat.primaryBot = null;

    await m.reply(`🌙 ¡Listo! Se ha restablecido la configuración.\n> A partir de ahora, todos los bots válidos responderán nuevamente en este grupo.`);
}

handler.customPrefix = /^(resetbot|resetprimario|botreset)$/i;
handler.command = new RegExp;

handler.group = true;
handler.admin = true;

export default handler;
