/**
 * Withdraw — Retrieve essence from your celestial vault.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'withdraw',
    aliases: ['with', 'retrieve'],
    description: 'Retrieve celestial credits from your vault to your pocket',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const bal = economy.getBalance(sender);
        const amount = args[0] === 'all' ? bal.bank : parseInt(args[0]);
        
        if (!amount || amount <= 0) {
            return reply(`❌ *Celestial Retrieval*\n\nUsage: \`.withdraw <amount>\` or \`.withdraw all\``);
        }
        
        const r = economy.withdraw(sender, amount);
        if (!r.success) {
            return reply(`❌ *Retrieval Denied:*\n${r.reason}`);
        }
        
        reply(
            `🏦 *RETRIEVAL SUCCESSFUL!*\n\n` +
            `${SYMBOL} *${amount.toLocaleString()}* ${CURRENCY} → Wallet\n\n` +
            `👛 Wallet: *${r.wallet.toLocaleString()}*\n` +
            `🏦 Vault: *${r.bank.toLocaleString()}*`
        );
    }
};
