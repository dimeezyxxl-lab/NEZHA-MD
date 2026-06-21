/**
 * Pay — Perform a celestial transfer of credits.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'pay',
    aliases: ['transfer', 'give', 'send'],
    description: 'Transfer celestial credits to another traveler',
    category: 'economy',
    async execute({ reply, sender, args, msg }) {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned?.[0];
        
        if (!target) {
            return reply(`❌ *Celestial Transfer*\n\nUsage: \`.pay @user <amount>\``);
        }
        
        if (target === sender) {
            return reply(`🤦 *Mirror Reflection:* You cannot transfer essence to yourself!`);
        }
        
        const amount = parseInt(args[1] || args[0]);
        if (!amount || amount <= 0) {
            return reply(`❌ *Specify Amount:* Please provide a valid sum to transfer.\nUsage: \`.pay @user 500\``);
        }
        
        const r = economy.transfer(sender, target, amount);
        if (!r.success) {
            return reply(`❌ *Transfer Denied*\n\n${r.reason}`);
        }
        
        reply(
            `💸 *CELESTIAL TRANSFER COMPLETE!*\n\n` +
            `${SYMBOL} *${amount.toLocaleString()} ${CURRENCY}*\n` +
            `📤 From: You → @${target.split('@')[0]}\n\n` +
            `👛 Your Remaining Essence: *${r.fromWallet.toLocaleString()}*`, 
            { mentions: [target] }
        );
    }
};
