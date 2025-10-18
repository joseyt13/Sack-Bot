let handler = async (m, { conn, args, usedPrefix, command}) => {
  let name = args[0]
  if (!name) return m.reply(`🍃 Usa el comando así:\n${usedPrefix + command} nombre\nEjemplo:\n${usedPrefix + command} fede`)

  // Guardar nombre temporalmente
  conn.tempReg = conn.tempReg || {}
  conn.tempReg[m.sender] = { name}

  // Imagen decorativa
  let imagen = 'https://cdn.yupra.my.id/yp/e0lrusaq.jpg'

  // Botones de edad
  const edades = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
  const buttons = edades.map(age => ({
    buttonId: `${usedPrefix}edad ${age}`,
    buttonText: { displayText: age},
    type: 1
}))

  const buttonMessage = {
    image: { url: imagen},
    caption: `✨ Hola ${name}, ahora elige tu edad para completar el registro.`,
    footer: 'Nagi-BotV1 ▪︎ Registro',
    buttons,
    headerType: 4
}

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m})
}

handler.command = ['reg']
handler.help = ['reg <nombre>']
handler.tags = ['main']
handler.register = true

export default handler
