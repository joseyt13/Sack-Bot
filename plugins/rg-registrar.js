let handler = async (m, { conn, args, usedPrefix, command}) => {
  let name = args[0]
  if (!name) return m.reply(`🌸 Usa el comando así:\n${usedPrefix + command} nombre\nEjemplo:\n${usedPrefix + command} fede`)

  conn.tempReg = conn.tempReg || {}
  conn.tempReg[m.sender] = { name}

  let imagen = 'https://cdn.yupra.my.id/yp/e0lrusaq.jpg'

  const edades = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
  const sections = [{
    title: 'Selecciona tu edad',
    rows: edades.map(age => ({
      title: `Edad ${age}`,
      rowId: `${usedPrefix}edad ${age}`
}))
}]

  const listMessage = {
    text: `✨ Hola ${name}, ahora elige tu edad para completar el registro.`,
    footer: 'Nagi-BotV1 ▪︎ Registro',
    title: '🌿 Registro de usuario',
    buttonText: 'Seleccionar edad',
    sections,
    contextInfo: {
      externalAdReply: {
        title: 'Nagi-BotV1',
        thumbnailUrl: imagen,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}

  await conn.sendMessage(m.chat, listMessage, { quoted: m})
}

handler.command = ['reg']
handler.help = ['reg <nombre>']
handler.tags = ['main']
handler.register = true

export default handler
```

---

*✅ `rg-edad.js` (complemento para completar el registro)*

```js
let handler = async (m, { conn, args}) => {
  let edad = args[0]
  if (!edad || isNaN(edad)) return m.reply('🌿 Por favor, elige una edad válida.')

  let temp = conn.tempReg?.[m.sender]
  if (!temp) return m.reply('🌸 Primero usa el comando.reg seguido de tu nombre.')

  global.db.data.users[m.sender] = {
...global.db.data.users[m.sender],
    registered: true,
    name: temp.name,
    age: parseInt(edad),
    regTime: +new Date()
}

  delete conn.tempReg[m.sender]

  await m.reply(`✅ Registro realizado con éxito!\n👤 Nombre: ${temp.name}\n🎂 Edad: ${edad}`)
}

handler.command = ['edad']
handler.help = ['edad <número>']
handler.tags = ['main']
handler.register = false

export default handler
