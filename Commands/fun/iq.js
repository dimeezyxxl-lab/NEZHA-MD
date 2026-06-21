/**
 * IQ — Measure a spirit’s celestial wisdom
 * Usage: .iq @user
 */
module.exports = {
    name: 'iq',
    aliases: ['wisdom', 'insight', 'intelligence'],
    description: 'Measure a spirit’s innate celestial wisdom.',
    category: 'fun',
    async execute({ args, reply, msg, sender }) {
        const targetJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender;
        const targetName = targetJid.split('@')[0];
        
        // Measuring the breadth of their cosmic insight
        const wisdom = Math.floor(Math.random() * 200);
        
        return reply(
            `🧠 *Celestial Wisdom Scan*\n\n` +
            `After consulting the Akashic records, the wisdom of @${targetName} is rated at: *${wisdom} IQ*.\n\n` +
            `_${wisdom > 150 ? 'A mind touched by the stars themselves.' : wisdom > 100 ? 'A soul of sharp clarity.' : 'A spirit still awakening to the truth.'}_`,
            { mentions: [targetJid] }
        );
    }
};
