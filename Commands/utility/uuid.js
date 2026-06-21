/**
 * Uuid — Invoke Signature of the Unbound (Multiple)
 * Usage: .uuid [count]
 */

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    name: 'uuid',
    aliases: ['uid', 'generateid', 'signatures'],
    description: 'Manifest a collection of unique Signatures of the Unbound.',
    category: 'utility',
    async execute({ reply, args }) {
        const count = Math.min(parseInt(args[0]) || 1, 10);
        const ids = Array.from({ length: count }, generateUUID);
        
        reply(
            `🆔 *Signature of the Unbound*\n\n` +
            `The Lotus Prince has plucked these unique seals from the void:\n\n` +
            `\`\`\`\n${ids.join('\n')}\n\`\`\`\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
