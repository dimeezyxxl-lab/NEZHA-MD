/**
 * Meme — Invoke Celestial Mirth
 * Usage: .meme
 */

const https = require('https');

function getMeme() {
    return new Promise((resolve, reject) => {
        https.get('https://meme-api.com/gimme', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const meme = JSON.parse(data);
                    resolve(meme);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

module.exports = {
    name: 'meme',
    aliases: ['memes', 'funnypic', 'mirth'],
    description: 'Invoke a moment of celestial mirth.',
    category: 'fun',
    async execute({ sock, msg, from, reply }) {
        try {
            const meme = await getMeme();
            
            await sock.sendMessage(from, {
                image: { url: meme.url },
                caption: `✨ *Celestial Mirth*\n\n_“${meme.title}”_\n\n👍 ${meme.ups} mortals amused\n🔗 r/${meme.subreddit}`
            }, { quoted: msg });
        } catch (err) {
            reply('❌ The celestial archives of humor are currently locked. Try again later.');
        }
    }
};
