/**
 * Beauty — Assess celestial radiance
 */
module.exports = {
    name: 'beauty',
    aliases: ['howpretty', 'radiance', 'glamour'],
    description: 'Measure the percentage of celestial radiance.',
    category: 'fun',
    async execute({ msg, sender, reply }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender || '').split('@')[0] || 'you';
        const percentage = Math.floor(Math.random() * 101);
        
        return reply(
            `✨ *Celestial Radiance Assessment*\n\n` +
            `The heavens reflect upon @${target}...\n` +
            `Your current radiance is *${percentage}%* today.`
        );
    }
};
