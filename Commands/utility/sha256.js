/**
 * Sha256 — Invoke Everlasting Wards
 * Usage: .sha256 <text>
 */

module.exports = {
    name: 'sha256',
    aliases: ['hash256', 'sha', 'wards'],
    description: 'Protect your data within the immutable Everlasting Wards.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('📜 _Present the message you wish the Lotus Prince to lock within the Everlasting Wards._');
        }
        
        try {
            // Locking the message essence into an immutable ward
            const out = require('crypto').createHash('sha256').update(text).digest('hex');
            
            return reply(
                `💠 *Everlasting Wards Manifested*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The Wards could not be forged; the Lotus Prince encountered a disruption in the flow._');
        }
    }
};
