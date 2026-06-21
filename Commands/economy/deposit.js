/**
 * Deposit — Secure your assets in the Celestial Vault.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'deposit',
    aliases: ['dep', 'store'],
    description: 'Deposit Celestial Credits into the vault',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const bal = economy.getBalance(sender);
        const amount = args[0] === 'all' ? bal.wallet : parseInt(args[0]);
        
        if (!amount || amount <= 0) {
            return reply(
                `❌ *Vault Access*\n\n` +
                `Usage: \`.deposit <amount>\` or \`.deposit all\`\n` +
                `Secure your wealth in the Lotus Prince’s vault.`
            );
        }
        
        const r = economy.deposit(sender, amount);
        
        if (!r.success) {
            return reply(`❌ A disturbance in the vault: ${r.reason}`);
        }
        
        reply(
            `🏦 *ASSETS SECURED!*\n\n` +
            `${SYMBOL} *${amount.toLocaleString()}* ${CURRENCY} → Celestial Vault\n\n` +
            `👛 Wallet: *${r.wallet.toLocaleString()}*\n` +
            `🏦 Vault: *${r.bank.toLocaleString()}*`
        );
    }
};
