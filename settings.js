import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 5491156178758

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['5491156178758', 'Dev-fedexy ࣪˖ ִֶָ⚽་༘', true],
  ['5491124918653', 'Dev-fedexy ☕', true],
  ['584264257867', 'Dev-fedexy 👻', true],
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['5491156178758']
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.nameqr = 'NagiBot-IA'
global.namebot = '☕ NagiBot-IA ♪*:⚽･ﾟ'
global.Rubysessions = 'NagiSessions'
global.jadi = 'NagiJadiBots' 
global.RubyJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⏤̛̣̣̣̣̣̣̣̣̣̣̣͟͟͞͞⏤͟͟͞͞🍭𝐑υׁׅ𝐛𝐲 𝐇ᨵׁׅׅ𝐬𝐡𝐢𝐧ᨵׁׅׅ ૮(˶ᵔᵕᵔ˶)ა'
global.botname = ' ࣪☀ ࣭𝗥𝘂𝗯𝘆 𝗛𝗼𝘀𝗵𝗶𝗻𝗼 𝗕𝗼𝘁࣪ 𝟹𝟹 ✿'
global.wm = '‧˚꒰🍷꒱ ፝͜⁞R͢ᴜʙʏ-H͢ᴼ꯭s፝֟ʜɪɴᴏ-𝘉𝘰𝘵-𝑴𝑫✰⃔⃝🦋'
global.author = 'Made By 𐔌Dioneibi-rip ͡꒱ ۫'
global.dev = '⌬ Modified by: Dioneibi-rip ⚙️💻 '
global.textbot = '⏤͟͞ू⃪ 𝑹𝒖𝒃𝒚-𝐻𝒐𝒔𝒉𝒊𝒏𝒐🌸⃝𖤐 • 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 ᴰⁱᵒⁿᵉⁱᵇⁱ⁻ʳⁱᵖ'
global.etiqueta = 'ˑ 𓈒 𐔌 Dᴇᴠ-ꜰᴇᴅᴇxʏᴢ  ͡꒱ ۫'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'Zenis'
global.banner = 'https://files.catbox.moe/b93cts.jpg'
global.avatar = 'https://qu.ax/RYjEw.jpeg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/Hgl5fQI7UhtEj6Cr6Rpo5w?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/K2CPrOTksiA36SW6k41yuR'
global.channel = 'https://whatsapp.com/channel/0029VakLbM76mYPPFL0IFI3P'
global.channel2 = 'https://whatsapp.com/channel/0029VakLbM76mYPPFL0IFI3P'
global.md = 'https://github.com/Dioneibi-rip/Ruby-Hoshino-Bot'
global.correo = 'dioneibipaselomendes@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VakLbM76mYPPFL0IFI3P';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363335626706839@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
