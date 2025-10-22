import fetch from 'node-fetch'

const handler = async (m, { text, conn, args, usedPrefix, command}) => {
  const emoji = '📩'
  const errorEmoji = '❌'
  const warning = '⚠️'
  const success = '✅'
  const loading = '⏳'

  if (!args[0]) {
    return conn.reply(
      m.chat,
      '🍃 *_Ingresa un url de facebook._*',
      m,
      global.rcanal
)
}

  try {
    await m.react(loading)

    const apiUrl = `https://ruby-core.vercel.app/api/download/facebook?url=${encodeURIComponent(args[0])}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status ||!json.download) {
      await m.react(warning)
      return conn.reply(
        m.chat,
        `${errorEmoji} No se pudo obtener el video. Verifica el enlace por favor.`,
        m,
        global.rcanal
)
}

    const { title, description, siteName} = json.metadata
    const videoUrl = json.download

    const caption = `
📺 Título: ${title || 'Sin título'}
📝 Descripción: ${description || 'Sin descripción'}
🌐 Origen: ${siteName || 'Facebook'}

> *_✅ Tu video está listo para descargar._*
`.trim()

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl},
        caption,
        fileName: 'facebook_video.mp4',
        mimetype: 'video/mp4',
        contextInfo: {
          externalAdReply: {
            title: '𝑵𝒂𝒈𝒊𝑩𝒐𝒕-𝑰𝑨',
            body: 'Nagi - Descargas',
            mediaType: 1,
            renderLargerThumbnail: true
}
}
},
      { quoted: m, m, global.rcanal}
)

    await m.react(success)
} catch (e) {
    console.error(e)
    await m.react(warning)
    return conn.reply(
      m.chat,
      `${warning} Ocurrió un error al procesar el video.`,
      m,
      global.rcanal
)
}
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true
handler.register = true

export default handler
