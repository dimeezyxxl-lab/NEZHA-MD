/**
 * Translate — Manifest the Lingual Bridge
 * Usage: .translate <lang_code> <text>
 */

const https = require('https');

function translateText(text, targetLang) {
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    const translated = result[0].map(item => item[0]).join('');
                    const sourceLang = result[2];
                    resolve({ translated, sourceLang });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

module.exports = {
    name: 'translate',
    aliases: ['tr', 'trans', 'bridge'],
    description: 'Manifest a Lingual Bridge across any language frontier.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `🌐 *The Lingual Bridge*\n\n` +
                `The Lotus Prince awaits the destination and the decree to be translated.\n\n` +
                `Usage: .translate <lang_code> <text>\n` +
                `Example: .translate es Hello World\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const targetLang = args[0].toLowerCase();
        const text = args.slice(1).join(' ');

        try {
            const { translated, sourceLang } = await translateText(text, targetLang);
            
            reply(
                `🌐 *Lingual Bridge Manifested*\n\n` +
                `Original (${sourceLang}):\n_${text}_\n\n` +
                `Translated (${targetLang}):\n*${translated}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ _The Lingual Bridge could not be anchored; verify your language code and try again._');
        }
    }
};
