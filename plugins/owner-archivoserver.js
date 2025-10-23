import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath} from 'url'
import AdmZip from 'adm-zip'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const TEMP = path.join(ROOT, 'temp')

// 🖼 Mini-thumbnail para mensaje de archivo
async function makeFkontak() {
  try {
    const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')
    const thumb = Buffer.from(await res.arrayBuffer())
    return {
      key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Archivo'},
      message: { locationMessage: { name: 'Archivo solicitado', jpegThumbnail: thumb}},
      participant: '0@s.whatsapp.net'
}
} catch {
    return undefined
}
}

let archivoHandler = async (m, { conn, args}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '❌ Debes especificar el nombre del archivo.\n📦 Ejemplo: *.archivo config.js*', m)
}

  const requestedFile = args[0].trim()
  const zipPath = path.join(TEMP, 'bot-backup.zip') // Puedes ajustar el nombre si usas otro

  try {
    const stat = await fsp.stat(zipPath)
    if (!stat.isFile()) throw new Error('No se encontró el archivo ZIP.')

    const zip = new AdmZip(zipPath)
    const entry = zip.getEntry(requestedFile)

    if (!entry) throw new Error(`Archivo "${requestedFile}" no encontrado en el ZIP.`)

    const buffer = entry.getData()
    const mimeType = 'application/octet-stream'
    const fancyQuoted = await makeFkontak()

    await conn.sendMessage(
      m.chat,
      { document: buffer, mimetype: mimeType, fileName: requestedFile},
      { quoted: fancyQuoted || m}
)
} catch (e) {
    await conn.reply(m.chat, `❌ No se pudo extraer el archivo: ${e?.message || e}`, m)
}
}

archivoHandler.help = ['archivo <nombre>']
archivoHandler.tags = ['owner']
archivoHandler.command = ['archivo <nombre>']
archivoHandler.rowner = true

export default archivoHandler
