import fs from 'fs'

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  let taguser = '@' + m.sender.split('@')[0]

  // 🏷️ Categorías
  let tags = {
  'info': '𝙈𝙚𝙣𝙪 𝙄𝙣𝙛𝙤',
  'anime': '𝙈𝙚𝙣𝙪 𝘼𝙣𝙞𝙢𝙚',
  'buscador': '𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙘𝙖𝙙𝙤𝙧',
  'downloader': '𝙈𝙚𝙣𝙪 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙧',
  'fun': '𝙈𝙚𝙣𝙪 𝙁𝙪𝙣',
  'grupo': '𝙈𝙚𝙣𝙪 𝙂𝙧𝙪𝙥𝙤',
  'ai': '𝙈𝙚𝙣𝙪 𝘼𝙄',
  'game': '𝙈𝙚𝙣𝙪 𝙂𝙖𝙢𝙚',
  'jadibot': '𝙈𝙚𝙣𝙪 𝙅𝙖𝙙𝙞𝘽𝙤𝙩',
  'main': '𝙈𝙚𝙣𝙪 𝙈𝙖𝙞𝙣',
  'nable': '𝙈𝙚𝙣𝙪 𝙊𝙣 / 𝙊𝙛𝙛',
  'nsfw': '𝙈𝙚𝙣𝙪 𝙉𝙎𝙁𝙒',
  'owner': '𝙈𝙚𝙣𝙪 𝙊𝙬𝙣𝙚𝙧',
  'sticker': '𝙈𝙚𝙣𝙪 𝙎𝙩𝙞𝙘𝙠𝙚𝙧',
  'tools': '𝙈𝙚𝙣𝙪 𝙏𝙤𝙤𝙡𝙨',
}

  // 📑 Estilos
  let header = '*- %category*'
  let body = '│ > %cmd'
  let footer = '└––'
  let after = `🌿 Nagi-BotV1'

  // 📊 Datos del usuario/bot
  let user = global.db.data.users[m.sender]
  let nombre = await conn.getName(m.sender)
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
🌸 ʜᴏʟᴀ, ${nombre}
ꜱᴏʏ Nagi-BotV1, ʟɪꜱᴛᴀ ᴘᴀʀᴀ ᴀʏᴜᴅᴀʀᴛᴇ

*乂 ɪɴꜰᴏ ᴅᴇʟ ᴜꜱᴜᴀʀɪᴏ*
> > ᴇꜱᴛᴀᴅᴏ: ᴜꜱᴜᴀʀɪᴏ
> > ᴘʀᴇᴍɪᴜᴍ: ${premium}
> > ʟíᴍɪᴛᴇ: ${limite}

*乂 ɪɴꜰᴏ ᴅᴇʟ ʙᴏᴛ*
> > *Grupos:* ${groupsCount}
> > *Activo:* ${muptime}
> > *Usuarios:* ${totalreg}
> > *Plataforma:* ʟɪɴᴜx

*📩 ᴄᴏɴᴛᴀᴄᴛᴏ ʏ ᴄʀᴇᴅɪᴛᴏꜱ*
◦ ᴄʀᴇᴀᴅᴏʀ: Dev-fedexyz
◦ ɢɪᴛʜᴜʙ: github.com/Dev-fedexyz13
◦ ᴄᴏɴᴛᴀᴄᴛᴏ: wa.me/5491156178748
`.trim()

  // 📜 Lista de comandos organizados
  let commands = Object.values(global.plugins).filter(v => v.help && v.tags).map(v => {
    return {
      help: Array.isArray(v.help)? v.help: [v.help],
      tags: Array.isArray(v.tags)? v.tags: [v.tags]
}
})

  let menu = []
  for (let tag in tags) {
    let comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.help.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n')
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer)
}
}

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after

  // 🎴 Imagen portada e icono
  let imagen = 'https://cdn.yupra.my.id/yp/8b6org82.jpg'
  let icono = 'https://cdn.yupra.my.id/yp/e0lrusaq.jpg'
  let redes = 'https://github.com/Dev-fedexyz13'
  let dev = 'Contacto: wa.me/5491156178748'

  await m.react('⚽')

  await conn.sendMessage(m.chat, {
    image: { url: imagen},
    caption: finalMenu,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363402097425674@newsletter',
        newsletterName: 'Nagi-BotV1 ▪︎ Dev-fedexyz',
        serverMessageId: -1,
},
      externalAdReply: {
        title: 'Nagi-BotV1',
        body: dev,
        thumbnailUrl: icono,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})
}

handler.help = ['menu']
handler.register = true
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler
