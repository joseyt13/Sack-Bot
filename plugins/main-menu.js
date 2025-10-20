import fs from 'fs'

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  let nombre = await conn.getName(m.sender)

  let tags = {
    info: '𝙈𝙚𝙣𝙪 𝙄𝙣𝙛𝙤',
    anime: '𝙈𝙚𝙣𝙪 𝘼𝙣𝙞𝙢𝙚',
    buscador: '𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙘𝙖𝙙𝙤𝙧',
    downloader: '𝙈𝙚𝙣𝙪 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙧',
    fun: '𝙈𝙚𝙣𝙪 𝙁𝙪𝙣',
    grupo: '𝙈𝙚𝙣𝙪 𝙂𝙧𝙪𝙥𝙤',
    ai: '𝙈𝙚𝙣𝙪 𝘼𝙄',
    game: '𝙈𝙚𝙣𝙪 𝙂𝙖𝙢𝙚',
    serbot: '𝙈𝙚𝙣𝙪 𝙅𝙖𝙙𝙞𝘽𝙤𝙩',
    main: '𝙈𝙚𝙣𝙪 𝙈𝙖𝙞𝙣',
    nable: '𝙈𝙚𝙣𝙪 𝙊𝙣 / 𝙊𝙛𝙛',
    nsfw: '𝙈𝙚𝙣𝙪 𝙉𝙎𝙁𝙒',
    owner: '𝙈𝙚𝙣𝙪 𝙊𝙬𝙣𝙚𝙧',
    sticker: '𝙈𝙚𝙣𝙪 𝙎𝙩𝙞𝙘𝙠𝙚𝙧',
    tools: '𝙈𝙚𝙣𝙪 𝙏𝙤𝙤𝙡𝙨',
}

  let header = '*□ %category*'
  let body = '> ▪︎ %cmd'
  let footer = ''
  let after = `𝐂𝐨𝐩𝐲𝐫𝐢𝐠𝐡𝐭 © 𝐝𝐞𝐯-𝐟𝐞𝐝𝐞𝐱𝐲𝐳 𝟐𝟎𝟐𝟓`

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
    fileName: '🌿 𝐍𝐚𝐠𝐢𝐁𝐨𝐭-𝐈𝐀',
    mimetype: 'application/pdf',
    caption: finalMenu,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363402097425674@newsletter',
        newsletterName: '𝐍𝐚𝐠𝐢𝐁𝐨𝐭-𝐈𝐀'
},
      externalAdReply: {
        title: '© Made By Dev-fedexyz 🌿',
        body: '⌬ NagiBot - IA 🍃',
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
