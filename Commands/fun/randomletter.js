/**
 * Letter — Invoke a Celestial Cipher
 * Usage: .randomletter
 */
module.exports = {
    name: 'randomletter',
    aliases: ['letter', 'cipher', 'rune'],
    description: 'Invoke a single celestial character from the universal cipher.',
    category: 'fun',
    async execute({ reply }) {
        const cipher = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        
        return reply(
            `🔤 *Celestial Cipher*\n\n` +
            `The winds of fate reveal the rune: *${cipher}*`
        );
    }
};
