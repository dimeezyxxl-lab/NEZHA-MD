/**
 * EDice — Engage in a celestial dice challenge.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'edice',
    aliases: ['dicebet', 'rolldice'],
    description: 'Roll celestial dice against the bot',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const amount = args[0] === 'all' ? economy.getBalance(sender).wallet : parseInt(args[0]);
        
        if (!amount || amount <= 0) {
            return reply(`❌ *Celestial Challenge*\n\nUsage: \`.edice <amount>\`\n\n_Challenge the Lotus Prince to a roll of fate._`);
        }
        
        if (amount > economy.getBalance(sender).wallet) {
            return reply(`❌ Your treasury is insufficient to place this wager.`);
        }
        
        const yours = Math.floor(Math.random() * 6) + 1;
        const bot = Math.floor(Math.random() * 6) + 1;
        
        let result;
        if (yours > bot) {
            economy.addWallet(sender, amount);
            result = `🎉 *VICTORY!* The heavens favor your fortune.\n${SYMBOL} +*${amount.toLocaleString()} ${CURRENCY}*`;
        } else if (yours < bot) {
            economy.removeWallet(sender, amount);
            result = `💀 *DEFEAT!* Fate was not on your side today.\n${SYMBOL} -*${amount.toLocaleString()} ${CURRENCY}*`;
        } else {
            result = `🤝 *TIE!* The fates remain balanced.`;
        }
        
        reply(
            `🎲 *DICE OF FATE*\n\n` +
            `🧑 You rolled: *${yours}*\n` +
            `🤖 Lotus Prince rolled: *${bot}*\n\n` +
            `${result}\n\n` +
            `👛 Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`
        );
    }
};
