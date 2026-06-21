/**
 * ShortUrl — Invoke Thread Condenser
 * Usage: .shorturl <url>
 */

const https = require('https');

function shortenUrl(url) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
        https.get(apiUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

module.exports = {
    name: 'shorturl',
    aliases: ['shorten', 'tinyurl', 'condenser'],
    description: 'Weave long pathways into the Thread Condenser.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🔗 *Thread Condenser*\n\n` +
                `The Lotus Prince awaits the path you wish to condense.\n\n` +
                `Usage: .shorturl <long_url>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const url = args[0];
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return reply('❌ _The path provided is unstable. Ensure it begins with http:// or https://._');
        }

        try {
            const shortUrl = await shortenUrl(url);
            
            reply(
                `🔗 *Thread Condensed*\n\n` +
                `Original Path: ${url}\n` +
                `Condensed Path: *${shortUrl}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ _The threads could not be woven; the network is obscured from the Lotus Prince._');
        }
    }
};
