/**
 * Shorten — Manifest a Celestial Bridge
 * Usage: .shorten <url>
 */

module.exports = {
    name: 'shorten',
    aliases: ['shorten', 'bridge', 'tiny'],
    description: 'Manifest a Celestial Bridge to shorten long URLs.',
    category: 'general',
    async execute({ args, reply }) {
        const u = args[0];
        
        if (!u || !/^https?:\/\//.test(u)) {
            return reply('❌ *Invalid destination.* Please provide a valid URL (e.g., `.shorten https://nezha-md.com`).');
        }
        
        try {
            const r = await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(u));
            const t = await r.text();
            
            if (!/^https?:\/\//.test(t)) {
                throw new Error('The celestial path could not be forged.');
            }
            
            return reply(
                `🔗 *Celestial Bridge*\n\n` +
                `Your path has been condensed:\n${t}`
            );
        } catch (e) {
            return reply(`❌ *Manifestation failed:* _${e.message}_`);
        }
    }
};
