/**
 * Clap — Invoke Lotus Applause
 * Usage: .clap <text>
 */

module.exports = {
    name: 'clap',
    aliases: ['applause', 'emphasize', 'lotusclap'],
    description: 'Punctuate your declaration with the rhythm of Lotus Applause.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the declaration you wish the Lotus Prince to punctuate._');
        
        try {
            // Invoking the rhythmic strike
            const out = text.split(/\s+/).join(' 👏 ');
            
            return reply(
                `👏 *Lotus Applause*\n\n` +
                `${out} 👏\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The rhythm could not be synchronized. The essence is fragmented._');
        }
    }
};
