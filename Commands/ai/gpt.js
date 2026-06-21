/**
 * GPT Command — Chat with AI
 * Usage: .gpt <question>
 */

const https = require('https');

function callGPT(prompt) {
    return new Promise((resolve, reject) => {
        const url = `https://apis.prexzyvilla.site/ai/gpt?prompt=${encodeURIComponent(prompt)}`;
        https.get(url, { timeout: 30000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json.response || json.result || json.message || json.text || data);
                } catch (e) {
                    resolve(data);
                }
            });
        }).on('error', reject);
    });
}

module.exports = {
    name: 'gpt',
    aliases: ['ai', 'chatgpt', 'askai'],
    description: 'Chat with GPT AI',
    category: 'ai',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🐦‍🔥 *Lotus Prince AI Interface*\n\n` +
                `Usage: .gpt <your inquiry>\n` +
                `Example: .gpt Explain the celestial order`
            );
        }

        const prompt = args.join(' ');
        
        try {
            await reply('🔥 *Consulting the celestial wisdom...*');
            const response = await callGPT(prompt);
            
            reply(
                `🐦‍🔥 *Celestial Wisdom*\n\n` +
                `Query: ${prompt}\n\n` +
                `Response: ${response}`
            );
        } catch (err) {
            reply('❌ A disturbance in the heavens: The AI service is currently unreachable.');
        }
    }
};
