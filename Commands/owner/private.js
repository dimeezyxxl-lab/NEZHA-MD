/**
 * Private — Draw the Sanctuary Veil
 * Usage: .private
 */

module.exports = {
    name: 'private',
    aliases: ['selfmode', 'lock', 'veil', 'private'],
    description: 'Draw the Sanctuary Veil — access restricted to the Lotus Prince.',
    usage: '.private',
    category: 'owner',

    async execute({ reply, database, phoneNumber }) {
        if (!phoneNumber) {
            return reply('⚠️ _The connection is not yet stable; the veil cannot be cast._');
        }

        if (database.getSelfMode(phoneNumber)) {
            return reply(`🔒 *The Sanctuary is already veiled.* _Use *.public* to reveal it to others._`);
        }

        database.setSelfMode(phoneNumber, true);

        reply(
            `🔒 *SANCTUARY VEIL DRAWN*\n\n` +
            `_Access is now restricted exclusively to the Lotus Prince._\n` +
            `_Use *.public* to lift the veil and allow all to enter._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
