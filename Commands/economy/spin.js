/**
 * Spin — Turn the Wheel of Celestial Fortune.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'spin',
    aliases: ['wheel', 'spinwheel', 'fortune'],
    description: 'Spin the Wheel of Celestial Fortune for divine rewards',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'spin');
        if (cd.onCooldown) {
            return reply(`🎡 *Wheel of Fortune*\n\nThe celestial wheel is still recharging. Return in *${formatTime(cd.remaining)}*!`);
        }
        
        const segments = [
            { emoji: '💥', label: 'Vanishment (Bankrupt!)', coins: 0, type: 'lose' },
            { emoji: '⭐', label: '50 Credits', coins: 50 },
            { emoji: '💰', label: '200 Credits', coins: 200 },
            { emoji: '🎁', label: '500 Credits', coins: 500 },
            { emoji: '💎', label: '1,000 Credits!', coins: 1000 },
            { emoji: '🔥', label: '100 Credits', coins: 100 },
            { emoji: '🌟', label: '2,500 Credits!', coins: 2500 },
            { emoji: '😢', label: '10 Credits', coins: 10 },
        ];
        
        const result = segments[Math.floor(Math.random() * segments.length)];
        economy.setCooldown(sender, 'spin', 14400000); // 4 hours
        
        if (result.coins > 0) economy.addWallet(sender, result.coins);
        const bal = economy.getBalance(sender);
        
        reply(
            `🎡 *Wheel of Celestial Fortune*\n\n` +
            `${result.emoji} You landed on: *${result.label}*\n` +
            `${result.coins > 0 ? `${SYMBOL} +${result.coins.toLocaleString()} ${CURRENCY}` : '💸 The heavens grant nothing this time!'}\n\n` +
            `👛 Wallet: *${bal.wallet.toLocaleString()}*\n\n` +
            `_The wheel shifts... Spin again in 4 hours!_`
        );
    }
};
