/**
 * Login — Access the Celestial Nexus.
 */
const { loginLink, waNumber, SITE_URL } = require('../../utils/cloudEconomy');

module.exports = {
    name: 'login',
    aliases: ['link', 'website', 'site', 'nexus'],
    description: 'Obtain your personal link to the Celestial Nexus',
    category: 'economy',
    async execute({ reply, sender }) {
        const wa = waNumber(sender);
        reply(
            `🔗 *Nezha-MD — Celestial Nexus*\n\n` +
            `Access the web portal to synchronize your worldly status. ` +
            `Log in using your WhatsApp number *${wa}* to view your vault, ` +
            `your inventory of artifacts, and your celestial progress.\n\n` +
            `🌐 ${loginLink(wa)}\n\n` +
            `_Nexus: ${SITE_URL}_`
        );
    },
};
