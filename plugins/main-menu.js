import fs from 'fs'

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  let nombre = await conn.getName(m.sender)

  let tags = {
  info: 'ᴍᴇɴᴜ ɪɴꜰᴏ',
  anime: 'ᴍᴇɴᴜ ᴀɴɪᴍᴇ',
  buscador: 'ᴍᴇɴᴜ ʙᴜꜱᴄᴀᴅᴏʀ',
  downloader: 'ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
  fun: 'ᴍᴇɴᴜ ꜰᴜɴ',
  grupo: 'ᴍᴇɴᴜ ɢʀᴜᴘᴏ',
  ai: 'ᴍᴇɴᴜ ᴀɪ',
  game: 'ᴍᴇɴᴜ ɢᴀᴍᴇ',
  serbot: 'ᴍᴇɴᴜ ᴊᴀᴅɪʙᴏᴛ',
  main: 'ᴍᴇɴᴜ ᴍᴀɪɴ',
  nable: 'ᴍᴇɴᴜ ᴏɴ / ᴏꜰꜰ',
  nsfw: 'ᴍᴇɴᴜ ɴꜱꜰᴡ',
  owner: 'ᴍᴇɴᴜ ᴏᴡɴᴇʀ',
  sticker: 'ᴍᴇɴᴜ ꜱᴛɪᴄᴋᴇʀ',
  tools: 'ᴍᴇɴᴜ ᴛᴏᴏʟꜱ',
  }

  let header = '*□ %category*'
  let body = '> ▪︎ %cmd'
  let footer = ''
  let after = `© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ`

  let user = global.db.data.users[m.sender]
  let premium = user.premium? '✅ Sí': '❌ No'
  let limite = user.limit || 0
  let totalreg = Object.keys(global.db.data.users).length
  let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
  let muptime = clockString(process.uptime())

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

  let infoUser = `
🍃 *_Hola, ${nombre} Soy Nagi-BotV1._*

*🌿 I N F O - U S E R*
> *Usuario:* ${nombre}
> *Premium:* ${premium}
> *Limite:* ${limite}

*🌿 I N F O - B O T*
> *Grupos:* ${groupsCount}
> *Activo:* ${muptime}
> *Usuarios:* ${totalreg}
> *Plataforma:* Ubuntu

*🍃 𝘾 𝙊 𝙈 𝘼 𝙉 𝘿 𝙊 𝙎*
`.trim()

  let commands = Object.values(global.plugins).filter(v => v.help && v.tags && v.command).map(v => {
    return {
      help: Array.isArray(v.help)? v.help: [v.help],
      tags: Array.isArray(v.tags)? v.tags: [v.tags],
      command: Array.isArray(v.command)? v.command: [v.command]
}
})

  let menu = []
  for (let tag in tags) {
    let comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.command.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n')
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer)
}
}

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after
  let imagen = 'https://files.catbox.moe/18qri6.jpg'

  await m.react('⚽')

  await conn.sendMessage(m.chat, {
    document: fs.readFileSync('./package.json'),
    fileName: '🍃 𝐍𝐚𝐠𝐢𝐁𝐨𝐭-𝐈𝐀 | 𝐌𝐞𝐧𝐮 🌿',
    mimetype: 'application/pdf',
    caption: finalMenu,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363405641626756@newsletter',
        newsletterName: '『 ☆ 𝑵𝒂𝒈𝒊𝑩𝒐𝒕-𝑰𝑨 |  𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍 ❀ 』'
},
      externalAdReply: {
        title: '© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ 🍂',
        body: '⌬ 𝑵𝒂𝒈𝒊𝑩𝒐𝒕-𝑰𝑨 🍃',
        thumbnailUrl: imagen,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  await delay(400)
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú']
handler.register = true

export default handler
