/**
 * Wiki Command — Search Wikipedia for a topic
 * Usage: .wiki <topic>
 */
const https = require('https');

function fetchWiki(query) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        https.get(url, { headers: { 'User-Agent': 'NEZHA-MD-Bot/1.0' } }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Parse error')); } });
        }).on('error', reject);
    });
}

module.exports = {
    name: 'wiki',
    aliases: ['wikipedia', 'search'],
    description: 'Search Wikipedia for a topic',
    category: 'ai',
    async execute({ reply, args }) {
        if (!args.length) return reply(
            '🔍 *Celestial Archives*\n\n' +
            'Usage: .wiki <topic>\n' +
            'Example: .wiki Lotus'
        );

        const query = args.join(' ');
        try {
            const data = await fetchWiki(query);
            if (data.type === 'disambiguation' || !data.extract) {
                return reply(`🔍 The archives reveal multiple paths for "*${query}*".\n\nBe more specific, mortal!`);
            }
            const summary = data.extract.slice(0, 800) + (data.extract.length > 800 ? '...' : '');
            
            reply(
                `📖 *${data.title}*\n\n` +
                `${summary}\n\n` +
                `🔗 ${data.content_urls?.desktop?.page || ''}\n\n` +
                `> _Archived in the Lotus Records_`
            );
        } catch (e) {
            reply(`❌ A disturbance in the heavens: Could not retrieve records for "*${query}*".\n\nTry different keywords.`);
        }
    }
};
