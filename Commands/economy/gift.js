/**
 * Gift — Offer a tribute to a fellow traveler.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'gift',
    aliases: ['give', 'send', 'offer'],
    description: 'Gift Celestial Credits to another traveler',
    category: 'economy',
    async execute({ reply, sender, args, msg }) {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned?.[0];
        
        if (!target) {
            return reply(
                `🎁 *Celestial Offering*\n\n` +
                `Usage: \`.gift @user <amount>\`\n` +
                `Example: \`.gift @friend 500\``
            );
        }
        
        if (target === sender) return reply('❌ You cannot offer a tribute to yourself, mortal.');
        
        const amount = parseInt(args.find(a => !isNaN(a)));
        if (!amount || amount < 1) return reply('❌ Please specify a valid amount to offer.\nExample: .gift @user 500');
        
        const bal = economy.getBalance(sender);
        if (bal.wallet < amount) {
            return reply(
                `❌ *Insufficient Offerings!*\n\n` +
                `Your wallet: *${bal.wallet.toLocaleString()}*\n` +
                `Required: *${amount.toLocaleString()}*`
            );
        }
        
        economy.removeWallet(sender, amount);
        economy.addWallet(target, amount);
        
        const newBal = economy.getBalance(sender);
        
        reply(
            `🎁 *Offering Sent!*\n\n` +
            `👤 From: @${sender.split('@')[0]}\n` +
            `🎯 To: @${target.split('@')[0]}\n` +
            `${SYMBOL} Amount: *${amount.toLocaleString()} ${CURRENCY}*\n\n` +
            `👛 Your new balance: *${newBal.wallet.toLocaleString()}*`,
            { mentions: [sender, target] }
        );
    }
};
