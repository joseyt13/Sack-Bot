import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

/*/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/*/

global.botNumber = '' //Ejemplo: 5491156178758

// Owner  y names bot

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['5491156178758', 'Dev-fedexy ࣪🍂', true],
  ['5491124918653', 'Dev-fedexy ☕', true],
  ['', '', false]
];


global.mods = []
global.suittag = ['5491156178758']
global.prems = []

// Sistemas- y más

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.nameqr = 'NagiBot-MD 🍂'
global.namebot = '☕ NagiBot-IA 🌿'
global.Nagisessions = 'NagiSessions'
global.jadi = 'NagiJadiBots' 
global.NagiJadibts = true

// Nombre bot - Y más

global.packname = 'Nagi-BotV1  🌿'
global.botname = '⚽ Nagi - Bot 🍂'
global.wm = 'NagiBot - MD ⚽'
global.author = '© Made By dev-fedexyz'
global.dev = '⌬ powered by Dev-fedexyz 🌿'
global.textbot = 'Nagi-Bot • Made by Dev-fedexyz 🍂'
global.etiqueta = 'Dev-fedexyz'

// Money - banners

global.moneda = 'NagiCoins'
global.banner = 'https://files.catbox.moe/9393.jpg'
global.avatar = 'https://qu.ax/030303jjpeg'

// Contacto  - y canales

global.gp1 = 'https://chat.whatsapp.com/BeFAyDGgDIR7e1kEkdFs8d?mode=wwt'
global.comunidad1 = 'https://chat.whatsapp.com/BeFAyDGgDIR7e1kEkdFs8d?mode=wwt'
global.channel = 'https://whatsapp.com/channel/0029Vb6jsun6buMJfw17lS1Y'
global.channel2 = 'https://whatsapp.com/channel/0029Vb6jsun6buMJfw17lS1Y'
global.md = 'https://github.com/dev-fedexyz13'
global.correo = 'fedelanyt20@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb6jsun6buMJfw17lS1Y';

// catálogos- y channel id

global.catalogo = fs.readFileSync('./src/catalogo.jpg');

global.estilo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
...(false? { remoteJid: '5219992095479-1625305606@g.us'}: {})
},
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: packname, // Nombre del paquete o mensaje principal
      orderTitle: 'Bang',
      thumbnail: global.catalogo,
      sellerJid: '0@s.whatsapp.net'
}
}
};

global.ch = {
  ch1: '120363405641626756@newsletter'
};

// y esto es el final xd

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
