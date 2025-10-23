let archivoHandler = async (m, { conn, args}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '❌ Debes especificar el nombre del archivo.\n📦 Ejemplo: *.archivo config.js*', m)
}

  const fileName = args[0].trim()
  const filePath = path.join(ROOT, fileName)

  try {
    const stat = await fsp.stat(filePath)
    if (!stat.isFile()) throw new Error('No es un archivo válido.')

    const buffer = await fsp.readFile(filePath)
    const mimeType = 'application/octet-stream'
    const fancyQuoted = await makeFkontak()

    await conn.sendMessage(
      m.chat,
      { document: buffer, mimetype: mimeType, fileName},
      { quoted: fancyQuoted || m}
)
} catch (e) {
    await conn.reply(m.chat, `❌ No se pudo enviar el archivo: ${e?.message || e}`, m)
}
}

archivoHandler.help = ['archivo <nombre>']
archivoHandler.tags = ['owner']
archivoHandler.command = /^archivo$/i
archivoHandler.rowner = true

export default archivoHandler
