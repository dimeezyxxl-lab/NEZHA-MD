/**
 * Caesar — Perform Celestial Encryption
 * Usage: .caesar encode <shift> <text> | .caesar decode <shift> <text>
 */

function caesarShift(text, shift, decode) {
    const s = decode ? (26 - shift % 26) : shift;
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
    });
}

module.exports = {
    name: 'caesar',
    aliases: ['cipher', 'celestial', 'shift'],
    description: 'Shift your words across the spectrum of the Celestial Encryption.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 3) {
            return reply(
                `🔐 *Celestial Encryption*\n\n` +
                `The Lotus Prince commands the shifting alphabet:\n\n` +
                `• .caesar encode <shift> <text>\n` +
                `• .caesar decode <shift> <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const mode = args[0].toLowerCase();
        const shift = parseInt(args[1]);
        
        if (isNaN(shift)) return reply('❌ _The shift factor must be a numeric value._');
        
        const text = args.slice(2).join(' ');
        const result = caesarShift(text, shift, mode === 'decode');
        
        reply(
            `🔐 *Celestial Encryption ${mode === 'encode' ? 'Applied' : 'Reversed'}*\n\n` +
            `• Shift Level: ${shift}\n` +
            `• Original: \`${text}\`\n` +
            `• Transformed: *${result}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
