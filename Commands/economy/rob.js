/**
 * Rob — Attempt a celestial heist against a fellow traveler.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'rob',
    aliases: ['steal', 'heist'],
    description: 'Attempt to perform a celestial heist on another user',
    category: 'economy',
    async execute({ reply, sender, args, msg }) {
        const cd = economy.checkCooldown(sender, 'rob');
        if (cd.onCooldown) {
            return reply(`⏰ *Celestial Vigilance*\n\nThe authorities are watching. Return in *${formatTime(cd.remaining)}* to attempt another heist.`);
        }
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned?.[0];
        if (!target) {
            return reply(`❌ *Celestial Heist*\n\nUsage: \`.rob @user\`\n\nMention a traveler to attempt to liberate their essence!`);
        }
        
        if (target === sender) {
            return reply(`🤦 *Reflection:* You cannot steal from yourself, mortal.`);
        }
        
        const targetBal = economy.getBalance(target);
        if (targetBal.wallet < 100) {
            return reply(`😅 *Too Poor:* That person has nothing worth stealing. They only have *${targetBal.wallet.toLocaleString()}* in their wallet.`);
        }
        
        if (economy.hasActiveEffect(target, 'shield')) {
            economy.setCooldown(sender, 'rob');
            return reply(`🛡️ *DIVINE PROTECTION!*\n\nThat user is protected by a Celestial Shield! Your heist failed immediately.`);
        }
        
        let successRate = 0.4;
        if (economy.hasActiveEffect(sender, 'robbermask')) successRate += 0.2;
        
        economy.setCooldown(sender, 'rob');
        
        if (Math.random() < successRate) {
            const maxSteal = Math.min(Math.floor(targetBal.wallet * 0.4), 5000);
            const stolen = Math.floor(Math.random() * maxSteal) + 100;
            
            economy.removeWallet(target, stolen);
            economy.addWallet(sender, stolen);
            
            reply(
                `🔫 *CELESTIAL HEIST SUCCESSFUL!*\n\n` +
                `😈 You successfully liberated *${stolen.toLocaleString()} ${CURRENCY}* from @${target.split('@')[0]}!\n\n` +
                `👛 Your Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`, 
                { mentions: [target] }
            );
        } else {
            const fine = Math.floor(Math.random() * 500) + 200;
            economy.removeWallet(sender, fine);
            
            reply(
                `🚔 *HEIST FAILED!*\n\n` +
                `👮 You were caught by the celestial guard while targeting @${target.split('@')[0]}!\n` +
                `You paid a penalty fine of *${fine.toLocaleString()} ${CURRENCY}*.\n\n` +
                `👛 Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`, 
                { mentions: [target] }
            );
        }
    }
};
