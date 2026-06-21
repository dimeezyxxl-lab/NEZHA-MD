/**
 * Public — Lift the Sanctuary Veil
 * Usage: .public
 */

module.exports = {
    name: 'public',
    aliases: ['everyone', 'unlock', 'reveal', 'public'],
    description: 'Lift the Sanctuary Veil — access granted to all seekers.',
    usage: '.public',
    category: 'owner',

    async execute({ reply, database, phoneNumber }) {
        if (!phoneNumber) {
            return reply('⚠️ _The connection is not yet stable; the veil cannot be lifted._');
        }

        if (!database.getSelfMode(phoneNumber)) {
            return reply(`🌍 *The Sanctuary is already revealed.* _Use *.private* to draw the veil._`);
        }

        database.setSelfMode(phoneNumber, false);
        
        reply(
            `🌍 *SANCTUARY VEIL LIFTED*\n\n` +
            `_The sanctuary is now revealed; all seekers may now approach the Lotus Prince._\n` +
            `_Use *.private* to draw the veil and restrict access._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
