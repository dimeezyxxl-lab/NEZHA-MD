module.exports = {
    name: 'add',
    aliases: ['adduser'],
    description: 'Add a user to the group',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!args[0]) return reply('🚩 Usage: `.add 2348012345678`');

        const target = args[0].replace(/[^0-9]/g, '');
        if (target.length < 7) return reply('🌪️ The coordinates provided are invalid!');

        const targetJid = `${target}@s.whatsapp.net`;
        try {
            await sock.groupParticipantsUpdate(from, [targetJid], 'add');
            reply(`✨ *+${target}* has been summoned to the battlefield by the Lotus Prince!`);
        } catch (err) {
            reply(`🚫 A disturbance in the heavens! Failed to summon the target: ${err.message}`);
        }
    }
};
