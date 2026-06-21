/**
 * Birthday — Celebrate a Celestial Jubilee
 * Usage: .birthday @user | .birthday @user <age>
 */

module.exports = {
    name: 'birthday',
    aliases: ['bday', 'hbd', 'jubilee'],
    description: 'Celebrate a celestial jubilee for a member of the sanctuary.',
    category: 'group',
    async execute({ reply, args, msg, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const target = mentioned[0] || null;
        const age = args.find(a => !isNaN(a));
        const blessings = ['🎂', '🎉', '🎊', '🥳', '🎁', '🎈', '🎀', '✨', '🏵️'];
        const rand = () => blessings[Math.floor(Math.random() * blessings.length)];
        
        if (target) {
            reply(
                `${rand()}${rand()}${rand()} *CELESTIAL JUBILEE!* ${rand()}${rand()}${rand()}\n\n` +
                `🎉 We honor the birth of @${target.split('@')[0]}!${age ? `\n\n🎂 Completing their ${age}th cycle today!` : ''}\n\n` +
                `May the heavens grant you prosperity and light! 🌟\n\n` +
                `${rand()}${rand()}${rand()}`,
                { mentions: [target] }
            );
        } else {
            const name = args.join(' ') || 'a cherished soul';
            reply(
                `${rand()} *CELESTIAL JUBILEE: ${name.toUpperCase()}!* ${rand()}\n\n` +
                `🎉 May this new cycle be filled with divine joy and wisdom!\n\n` +
                `${rand()}${rand()}${rand()}`
            );
        }
    }
};
