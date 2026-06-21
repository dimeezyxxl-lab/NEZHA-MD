/**
 * Capitalize — Invoke Divine Proclamation
 * Usage: .capitalize <text>
 */

module.exports = {
    name: 'capitalize',
    aliases: ['proclaim', 'upper', 'shout'],
    description: 'Elevate your words to the authority of a Divine Proclamation.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to proclaim._');
        
        try {
            // Elevating the text to its highest form
            const out = text.toUpperCase();
            
            return reply(
                `📢 *Divine Proclamation*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The proclamation could not be issued. The essence is unstable._');
        }
    }
};
