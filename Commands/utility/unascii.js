/**
 * Unascii — Invoke Script of the Ancient Decipherment
 * Usage: .unascii <numbers>
 */

module.exports = {
    name: 'unascii',
    aliases: ['decode', 'unscript', 'decipher'],
    description: 'Decipher numerical sequences into the living tongue.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `📜 *Script of the Ancient Decipherment*\n\n` +
                `The Lotus Prince awaits the numerical sequence to be deciphered.\n\n` +
                `Usage: .unascii <numbers separated by spaces>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            // Deciphering the numerical sequence back into coherent text
            const out = text.split(/\s+/).map(n => String.fromCharCode(+n)).join('');
            
            return reply(
                `📜 *Decipherment Complete*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The script is corrupted; the Lotus Prince could not decipher these numbers._');
        }
    }
};
