/**
 * Emoji — Manifest a Celestial Sigil
 * Usage: .randomemoji
 */
module.exports = {
    name: 'randomemoji',
    aliases: ['emoji', 'sigil', 'symbol'],
    description: 'Manifest a random celestial sigil to represent your current essence.',
    category: 'fun',
    async execute({ reply }) {
        const sigils = ["🔥", "💀", "👁️", "🌌", "⚡", "🪷", "✨", "🌙", "🗡️", "🐍", "🌸", "🌀", "☠️", "🦊", "🐺", "👑"];
        
        const pick = sigils[Math.floor(Math.random() * sigils.length)];
        
        return reply(
            `✨ *Celestial Sigil*\n\n` +
            `The heavens bestow upon you the essence of: *${pick}*`
        );
    }
};
