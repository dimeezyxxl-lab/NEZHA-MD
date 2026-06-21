/**
 * Restart — Initiate Reincarnation Ritual
 * Usage: .restart
 */
const database = require('../../utils/database');

module.exports = {
    name: 'restart',
    aliases: ['reboot', 'reload', 'reincarnate', 'rebirth'],
    description: 'Initiate the Reincarnation Ritual (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ reply, sock }) {
        await reply(
            `🔄 *INITIATING REINCARNATION RITUAL*\n\n` +
            `_The Lotus Prince departs the mortal coil..._\n` +
            `_He shall emerge reborn in but a few moments._`
        );
        
        setTimeout(() => {
            console.log('[REINCARNATION] Lotus Prince triggered a rebirth.');
            process.exit(0); // Pterodactyl / PM2 will handle the return to the sanctuary
        }, 2000);
    }
};
