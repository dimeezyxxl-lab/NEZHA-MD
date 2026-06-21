/**
 * setmenuimage — Owner replies to an image with .setmenuimage to set it
 * as the bot's persistent menu image. Saved to assets/menuthumb.jpg.
 * Once set, .menu sends that image (with caption + channel pill) instead
 * of the bundled video.
 */
'use strict';

const { downloadContentFromMessage } = require('@crysnovax/baileys');
const fs   = require('fs');
const path = require('path');

const IMAGE_PATH = path.resolve(__dirname, '..', '..', 'assets', 'menuthumb.jpg');

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const c of stream) chunks.push(c);
    return Buffer.concat(chunks);
}

module.exports = {
    name: 'setmenuimage',
    aliases: ['setmenuimg', 'menuimage', 'setmenu'],
    description: 'Reply to an image with .setmenuimage to set it as the menu image',
    category: 'admin',

    async execute({ sock, msg, from, reply, isOwner }) {
        if (!isOwner) return reply('🛡️ *Celestial Decree!*\n\n❌ Only the Supreme Master may alter the visual manifestations of the Lotus Prince.');

        const ctx     = msg.message?.extendedTextMessage?.contextInfo;
        const quoted  = ctx?.quotedMessage;
        const imgNode = quoted?.imageMessage
            || msg.message?.imageMessage    // user attached image with caption ".setmenuimage"
            || null;

        if (!imgNode) {
            return reply(
                '🖼️ *Set Celestial Manifestation*\n\n' +
                'Send (or reply to) an image with:\n' +
                '`.setmenuimage`\n\n' +
                'The Lotus Prince will adopt this new image as the permanent menu visual.\n\n' +
                'Use `.resetmenuimage` to purge it and return to the default manifestation.'
            );
        }

        try {
            const stream = await downloadContentFromMessage(imgNode, 'image');
            const buf    = await streamToBuffer(stream);
            if (!buf || buf.length < 100) throw new Error('empty image buffer');

            fs.mkdirSync(path.dirname(IMAGE_PATH), { recursive: true });
            fs.writeFileSync(IMAGE_PATH, buf);

            await sock.sendMessage(from, {
                image:   { url: IMAGE_PATH },
                caption:
                    '✅ *Celestial Manifestation Updated!*\n\n' +
                    `📦 Saved as \`assets/menuthumb.jpg\` (${(buf.length/1024).toFixed(1)} KB)\n` +
                    'The Lotus Prince will now manifest this image whenever `.menu` is invoked.',
            }, { quoted: msg });
        } catch (e) {
            console.error('[setmenuimage]', e.message);
            return reply('❌ A disturbance in the heavens: Failed to save the manifestation: ' + e.message);
        }
    }
};
