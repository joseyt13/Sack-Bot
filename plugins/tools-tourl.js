import axios from 'axios';
import crypto from 'crypto';
import { fileTypeFromBuffer} from 'file-type';

const githubToken = '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';
const owner = 'dev-fedexyz13';
const branch = 'main';
const repo = 'nagi-uploads'; // Puedes cambiar el nombre del repositorio

async function ensureRepoExists() {
  try {
    await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${githubToken}`}
});
} catch (e) {
    if (e.response?.status === 404) {
      await axios.post(`https://api.github.com/user/repos`,
        { name: repo, private: false},
        { headers: { Authorization: `Bearer ${githubToken}`}}
);
} else {
      throw new Error(`Error al verificar el repositorio: ${e.message}`);
}
}
}

async function uploadFile(buffer) {
  const detected = await fileTypeFromBuffer(buffer);
  const ext = detected?.ext || 'bin';
  const fileName = `${crypto.randomBytes(4).toString('hex')}.${ext}`;
  const filePath = `uploads/${fileName}`;
  const base64Content = Buffer.from(buffer).toString('base64');

  await ensureRepoExists();

  await axios.put(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      message: `Upload ${fileName}`,
      content: base64Content,
      branch
},
    {
      headers: { Authorization: `Bearer ${githubToken}`}
}
);

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

const handler = async (m, { conn}) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime) return m.reply('⚠️ Responde a un archivo para subirlo.');

    await m.reply('🍂 Subiendo archivo a GitHub...');

    const buffer = await q.download();
    const url = await uploadFile(buffer);

    await m.reply(`🌿 Archivo subido con éxito:\n${url}`);
} catch (e) {
    console.error('[GitHub Upload Error]', e);
    await m.reply(`❌ Error al subir el archivo:\n${e.message}`);
}
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['tourl', 'url'];

export default handler;
