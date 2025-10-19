import { createHash} from 'crypto';

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
const defaultProfile = 'https://cdn.yupra.my.id/yp/e0lrusaq.jpg';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  const whe = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  const perfil = await conn.profilePictureUrl(whe, 'image').catch(() => defaultProfile);

  if (command === 'unreg') {
    if (!user.registered) {
      return m.reply(`🍂 No estás registrado.\n\n🌿 Usa *${usedPrefix}reg nombre.edad* para registrarte.`);
}

    user.name = '';
    user.age = 0;
    user.regTime = 0;
    user.registered = false;

    return m.reply(`🍃 Registro eliminado correctamente.\n\n🌿 Puedes volver a registrarte con *${usedPrefix}reg nombre.edad*`);
}

  if (command === 'reg') {
    if (user.registered) {
      return m.reply(`🍂 Ya estás registrado.\n\n🌿 ¿Deseas volver a registrarte?\n🍃 Usa *${usedPrefix}unreg* para eliminar tu registro.`);
}

    if (!Reg.test(text)) {
      return m.reply(`🍂 Formato incorrecto.\n\n🌿 Usa: *${usedPrefix}reg nombre.edad*\n🍂 Ejemplo: *${usedPrefix}reg ${name2}.17*`);
}

    let [_, name, __, age] = text.match(Reg);
    if (!name ||!age) return m.reply('ꕥ El nombre y la edad no pueden estar vacíos.');
    if (name.length> 100) return m.reply('🍒 El nombre es demasiado largo.');
    age = parseInt(age);
    if (isNaN(age) || age < 5 || age> 1000) return m.reply('🍃 La edad ingresada no es válida.');

    user.name = name.trim();
    user.age = age;
    user.regTime = +new Date();
    user.registered = true;
    user.money += 600;
    user.estrellas += 10;
    user.exp += 245;
    user.joincount += 5;

    const sn = createHash('md5').update(m.sender).digest('hex');
    const regbot = `🍃 *Registro completado*\n\n🍂 Usa *#menu* para ver la lista de comandos.\n🍂 Gracias por usar el bot.`;

    await conn.sendMessage(m.chat, {
      text: regbot,
      contextInfo: {
        externalAdReply: {
          title: '🌿 Registro exitoso',
          body: `🍂 Hola, ${m.pushName || 'usuario'}!`,
          thumbnailUrl: perfil,
          mediaType: 1,
          renderLargerThumbnail: true,
},
},
}, { quoted: m});
}
};

handler.help = ['reg', 'unreg'];
handler.tags = ['info'];
handler.command = ['reg', 'unreg'];
handler.rowner = false;

export default handler;
