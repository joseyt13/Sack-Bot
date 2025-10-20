import fs from 'fs';
import axios from 'axios';
import crypto from 'crypto';
import { fileTypeFromBuffer} from 'file-type';

const githubToken = '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';
const owner = 'El-brayan502';
const branch = 'main';

let repos = ['fedexyz1', 'fedexyz2', 'fedexyz3', 'fedexyz4'];

async function ensureRepoExists(repo) {
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
      if (!repos.includes(repo)) repos.push(repo);
} else {
      throw new Error(`Error al verificar o crear el repositorio: ${e.message}`);
}
}
}

function generateRepoName() {
  return `dat-${crypto.randomBytes(3).toString('hex')}`;
}

async function uploadFile(buffer) {
  const detected = await fileTypeFromBuffer(buffer);
  const ext = detected?.ext || 'bin';
  const code = crypto.randomBytes(3).toString('hex');
  const fileName = `${code}-${Date.now()}.${ext}`;
  const filePathGitHub = `uploads/${fileName}`;
  const base64Content = Buffer.from(buffer).toString('base64');

  let targetRepo = repos[Math.floor(Math.random() * repos.length)];

  try {
    await ensureRepoExists(targetRepo);
} catch {
    targetRepo = generateRepoName();
    await ensureRepoExists(targetRepo);
}

  await axios.put(
    `https://api.github.com/repos/${owner}/${targetRepo}/contents/${filePathGitHub}`,
    {
      message: `Upload file ${fileName}`,
      content: base64Content,
      branch
},
    {
      headers: { Authorization: `Bearer ${githubToken}`}
}
);

  return `https://raw.githubusercontent.com/${owner}/${targetRepo}/${branch}/${filePathGitHub}`;
}

const handler = async (m, { conn}) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || '';

    if (!mime) {
      return m.reply('⚠️ Por favor, responde a un archivo para subirlo a GitHub.');
}

    await m.reply('🍂 *_Subiendo archivo a GitHub..._*');

    const buffer = await q.download();
    const url = await uploadFile(buffer);

    await m.reply(`🌿 Archivo subido con éxito:\n${url}`);
} catch (e) {
    console.error('[GitHub Upload Error]', e);
    await m.reply(`❌ Ocurrió un error al subir el archivo:\n${e.message}`);
}
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['tourl', 'url'];

export default handler;
