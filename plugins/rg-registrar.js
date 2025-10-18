let handler = async (m, { conn, args, usedPrefix, command}) => {
  const input = args[0]

  if (command === 'reg') {
    if (!input ||!input.includes('.')) {
      return m.reply(`🌸 Usa el comando así:\n${usedPrefix + command} nombre.edad\nEjemplo:\n${usedPrefix + command} anonimo.17`)
}

    const [name, age] = input.split('.')
    if (!name || isNaN(age)) {
      return m.reply('⚠️ Asegúrate de escribir el nombre y la edad separados por un punto.\nEjemplo:.reg anonimo.17')
}

    global.db.data.users[m.sender] = {
...global.db.data.users[m.sender],
      registered: true,
      name,
      age: parseInt(age),
      regTime: +new Date()
}

    const imagen = 'https://cdn.yupra.my.id/yp/e0lrusaq.jpg'

    await conn.sendMessage(m.chat, {
      image: { url: imagen},
      caption: `✅ Registro exitoso: ${name}`,
      contextInfo: {
        externalAdReply: {
          title: 'Dev-fedexyz',
          body: 'Nagi-BotV1',
          thumbnailUrl: imagen,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}, { quoted: m})
}

  if (command === 'unreg') {
    const user = global.db.data.users[m.sender]
    if (!user.registered) return m.reply('❌ No estás registrado.')

    delete global.db.data.users[m.sender]

    await m.reply('🗑️ Registro eliminado correctamente.')
}
}

handler.command = ['reg', 'unreg']
handler.help = ['reg <nombre.edad>', 'unreg']
handler.tags = ['main']
handler.register = true

export default handler
