/**
 * Edit Image Command
 * Usage: .editimage <prompt>  (reply to an image or static sticker)
 */

const axios = require('axios');
const FormData = require('form-data');
const { downloadMediaMessage } = require('@crysnovax/baileys');
const sharp = require('sharp');

// Optional sticker -> png helper
let webp2png = null;
try {
  ({ webp2png } = require('../../utils/webp2mp4'));
} catch (_) {}

// ─── Provider 1: Pollinations img2img ────────────────────────────────────────
async function tryPollinationsImg2Img(imageBuffer, prompt) {
  try {
    const form = new FormData();
    form.append('image', imageBuffer, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });
    form.append('prompt', prompt);
    form.append('strength', '0.7');

    const response = await axios.post(
      'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt),
      null,
      {
        params: {
          model: 'flux',
          width: 1024,
          height: 1024,
          nologo: true,
          enhance: true,
          seed: Math.floor(Math.random() * 999999),
        },
        responseType: 'arraybuffer',
        timeout: 90000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    if (response.data && response.data.byteLength > 1024) {
      return Buffer.from(response.data);
    }
    return null;
  } catch (err) {
    console.error('[editimage] Pollinations img2img failed:', err.message);
    return null;
  }
}

// ─── Provider 2: Pollinations text2img ──────────────────────────────────────
async function tryPollinationsText2Img(prompt) {
  try {
    const enhancedPrompt = `${prompt}, high quality, detailed, 4k`;
    const response = await axios.get(
      'https://image.pollinations.ai/prompt/' + encodeURIComponent(enhancedPrompt),
      {
        params: {
          model: 'flux',
          width: 1024,
          height: 1024,
          nologo: true,
          enhance: true,
          seed: Math.floor(Math.random() * 999999),
        },
        responseType: 'arraybuffer',
        timeout: 90000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    if (response.data && response.data.byteLength > 1024) {
      return Buffer.from(response.data);
    }
    return null;
  } catch (err) {
    console.error('[editimage] Pollinations text2img failed:', err.message);
    return null;
  }
}

// ─── Provider 3: prexzyvilla DALL·E ──────────────────────────────────────────
async function tryDalle(prompt) {
  try {
    const { data } = await axios.get('https://apis.prexzyvilla.site/ai/dalle', {
      params: { prompt },
      timeout: 60000,
    });
    if (!data || data.status !== true) return null;

    const arr = data.image_url || data.images || data.result;
    let url = null;
    if (Array.isArray(arr) && arr.length) {
      const first = arr[0];
      url = first?.image?.url || first?.url || (typeof first === 'string' ? first : null);
    }
    url = url || (typeof data.result === 'string' ? data.result : null) || (typeof data.url === 'string' ? data.url : null);
    if (!url) return null;

    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 60000 });
    const buf = Buffer.from(res.data);
    if (!buf || buf.length < 1024) return null;
    return buf;
  } catch (err) {
    console.error('[editimage] DALL·E fallback failed:', err.message);
    return null;
  }
}

// ─── Main Command ─────────────────────────────────────────────────────────────
module.exports = {
  name: 'editimage',
  aliases: ['gptimage', 'gptimg', 'aiimage', 'vision', 'gi', 'ei'],
  category: 'ai',
  description: 'Edit an image using AI with a text prompt',
  usage: '.editimage <prompt> (reply to image/sticker)',

  async execute({ sock, msg, args, from, reply, prefix }) {
    const px = prefix || '.';
    try {
      const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
      if (!ctxInfo?.quotedMessage) {
        return await reply(
          '📷 *Celestial Image Forge*\n\n' +
          'Reply to an image or static sticker with a prompt to modify it.\n\n' +
          `Usage: ${px}editimage <your prompt>\n\n` +
          `Example: ${px}editimage transform this into a celestial fire scene`
        );
      }

      const prompt = (args || []).join(' ').trim();
      if (!prompt) {
        return await reply(
          '❌ Please provide a celestial prompt!\n\n' +
          `Usage: ${px}editimage <your prompt>`
        );
      }

      const quotedMsg = ctxInfo.quotedMessage;
      const isImage = !!quotedMsg.imageMessage;
      const isSticker = !!quotedMsg.stickerMessage;

      if (!isImage && !isSticker) {
        return await reply('❌ The Lotus Prince requires an image or sticker to manifest changes.');
      }

      await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } }).catch(() => {});

      // Download media
      const targetMessage = {
        key: { remoteJid: from, id: ctxInfo.stanzaId, participant: ctxInfo.participant },
        message: ctxInfo.quotedMessage,
      };

      const mediaBuffer = await downloadMediaMessage(targetMessage, 'buffer', {}, { logger: undefined, reuploadRequest: sock.updateMediaMessage });
      if (!mediaBuffer) return await reply('❌ A disturbance in the heavens: Could not download the visual.');

      let imageBuffer = mediaBuffer;
      if (isSticker) {
        const isAnimated = quotedMsg.stickerMessage?.isAnimated || quotedMsg.stickerMessage?.mimetype?.includes('animated');
        if (isAnimated) return await reply('❌ Animated stickers are too chaotic for this ritual.');
        try {
          imageBuffer = webp2png ? await webp2png(mediaBuffer) : await sharp(mediaBuffer).png().toBuffer();
        } catch (err) {
          return await reply('❌ Failed to convert sticker to celestial form.');
        }
      }

      let finalImageBuffer = imageBuffer;
      try {
        const meta = await sharp(imageBuffer).metadata();
        if (meta.format !== 'jpeg' && meta.format !== 'jpg') {
          finalImageBuffer = await sharp(imageBuffer).jpeg({ quality: 90 }).toBuffer();
        }
      } catch (err) {}

      let resultBuffer = await tryPollinationsImg2Img(finalImageBuffer, prompt) || 
                         await tryPollinationsText2Img(prompt) || 
                         await tryDalle(prompt);
      
      if (!resultBuffer || resultBuffer.length === 0) {
        await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }).catch(() => {});
        return await reply('❌ The heavens are silent: All visual providers are currently unavailable.');
      }

      await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }).catch(() => {});
      await sock.sendMessage(from, {
          image: resultBuffer,
          caption: `✨ *Celestial Transformation*\n\n📝 Prompt: ${prompt}\n\n> ✨ Manifested by Nezha MD`,
      }, { quoted: msg });

    } catch (error) {
      console.error('Error in editimage command:', error);
      return await reply(`❌ A disturbance in the heavens: ${error.message}`);
    }
  },
};
