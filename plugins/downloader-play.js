import fetch from "node-fetch";
import yts from "yt-search";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\\?v=|embed\\/))([a-zA-Z0-9_-]{11})/;

const packname = '© Created by Dev-fedexyz';

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, '🌿 Debes escribir el *nombre o link* del video/audio para descargar.', m);
}

    await conn.sendMessage(m.chat, { react: { text: "🔎", key: m.key}});

    const videoIdMatch = text.match(youtubeRegexID);
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text;
    let results = await yts(searchQuery);

    let video = videoIdMatch
? results.all.find(v => v.videoId === videoIdMatch[1]) || results.videos.find(v => v.videoId === videoIdMatch[1])
: results.videos?.[0];

    if (!video) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
      return m.reply("⚠️ No encontré resultados. Intenta con otro nombre o link.");
}

    const { title, thumbnail, timestamp, views, ago, url, author} = video;
    const formattedViews = formatViews(views);
    const channel = author?.name || "Desconocido";

    const info = `
📥 *Descarga en curso...*

🎬 *Título:* ${title}
📺 *Canal:* ${channel}
⏱️ *Duración:* ${timestamp}
👁️ *Vistas:* ${formattedViews}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}
`.trim();

    const thumb = (await conn.getFile(thumbnail))?.data;
    await conn.reply(m.chat, info, m, {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: packname,
          mediaType: 1,
          thumbnail: thumb,
          renderLargerThumbnail: true,
          mediaUrl: url,
          sourceUrl: url
}
}
});

    // Audio
    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      const res = await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data?.status ||!data?.download?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
        return m.reply("🌿 No se pudo descargar el audio. Intenta más tarde.");
}

      await conn.sendMessage(m.chat, {
        audio: { url: data.download.url},
        fileName: `${data.metadata?.title || "audio"}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false
}, { quoted: m});

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}});
}

    // Video
    else if (["play2", "ytmp4", "mp4"].includes(command)) {
      const res = await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp4?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data?.status ||!data?.download?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
        return m.reply("🚫 No se pudo descargar el video. Intenta más tarde.");
}

      await conn.sendMessage(m.chat, {
        video: { url: data.download.url},
        fileName: `${data.metadata?.title || "video"}.mp4`,
        caption: title,
        mimetype: "video/mp4"
}, { quoted: m});

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}});
}

    else {
      return m.reply("📌 Comando no válido. Usa.play,.yta,.ytv, etc.");
}

} catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
    return m.reply(`⚠️ Error inesperado:\n${error}`);
}
};

handler.command = handler.help = ["play", "ytmp3", "play2", "ytmp4", "playaudio", "mp4"];
handler.tags = ["descargas"];

export default handler;

function formatViews(views) {
  if (!views) return "No disponible";
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k`;
  return views.toString();
}
