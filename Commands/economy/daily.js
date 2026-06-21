/**
 * Daily — Claim your daily celestial tribute.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'daily',
    aliases: ['claim', 'tribute'],
    description: 'Claim your daily Celestial tribute',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'daily');
        if (cd.onCooldown) {
            return reply(
                `⏰ *The heavens are silent.*\n\n` +
                `You have already claimed your daily tribute. Return in *${formatTime(cd.remaining)}* to receive more.`
            );
        }
        
        const amount = Math.floor(Math.random() * 1501) + 500;
        economy.addWallet(sender, amount);
        economy.setCooldown(sender, 'daily');
        
        const b = economy.getBalance(sender);
        
        reply(
            `🎁 *CELESTIAL TRIBUTE CLAIMED!*\n\n` +
            `${SYMBOL} You received *${amount.toLocaleString()} ${CURRENCY}* from the Lotus Prince!\n\n` +
            `👛 Wallet: *${b.wallet.toLocaleString()}*\n\n` +
            `_Return tomorrow to sustain your favor!_ 🔄`
        );
    }
};
