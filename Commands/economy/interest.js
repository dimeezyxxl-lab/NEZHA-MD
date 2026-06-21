/**
 * Interest — Collect dividends from your celestial investments.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'interest',
    aliases: ['bankinterest', 'dividends'],
    description: 'Collect 2% interest on your celestial vault balance',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'interest');
        if (cd.onCooldown) {
            return reply(
                `⏰ *Vault Equilibrium*\n\n` +
                `The celestial interest has not yet matured. Return in *${formatTime(cd.remaining)}*.`
            );
        }
        
        const r = economy.collectInterest(sender);
        if (!r.success) {
            return reply(
                `❌ *Vault Empty*\n\n` +
                `${r.reason}\n\n` +
                `Secure some ${CURRENCY} in your vault first using \`.deposit\`!`
            );
        }
        
        economy.setCooldown(sender, 'interest');
        
        reply(
            `🏦 *CELESTIAL DIVIDENDS COLLECTED!*\n\n` +
            `📈 +*${r.interest.toLocaleString()} ${CURRENCY}* (2% growth)\n` +
            `🏦 Vault Balance: *${r.bank.toLocaleString()}*\n\n` +
            `_The vault shall bear fruit again in 12 hours!_ ⏰`
        );
    }
};
