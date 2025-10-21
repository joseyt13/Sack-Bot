
import { googleImage} from '@bochilteam/scraper'

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '🌿 Por favor, ingresa *el nombre o término* que deseas buscar.',
      m,
      global.rcanal
)
}

  await m.react(rwait)
  conn.reply(
    m.chat,
    '🌿 Descargando su imagen, espere por favor...',
    m,
    global.rcanal
)

  const res = await googleImage(text)
  const messages = [
    ['Imagen 1', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 3', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
    ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]
  ]

  await conn.sendCarousel(
    m.chat,
    `🖼️ Resultados de: *${text}*`,
    '🍂 Nagi - Buscador 🍃',
    null,
    messages,
    m
)
}

handler.help = ['imagen']
handler.tags = ['buscador']
handler.command = ['img', 'imagen']
handler.register = true

export default handler
