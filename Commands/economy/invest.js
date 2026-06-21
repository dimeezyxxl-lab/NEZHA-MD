/**
 * Invest — Commit your credits to the Celestial Ventures.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'invest',
    aliases: ['investment', 'stocks', 'venture'],
    description: 'Commit your credits for celestial returns',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const cd = economy.checkCooldown(sender, 'invest');
        if (cd.onCooldown) {
            return reply(`📈 *Investment Matures*\n\nYour celestial venture is still growing. Return in *${formatTime(cd.remaining)}*!`);
        }
        
        if (!args.length || isNaN(args[0])) {
            return reply(
                `📈 *Celestial Ventures*\n\n` +
                `Usage: \`.invest <amount>\`\n\n` +
                `Invest your credits for a chance at 1.5x–3x returns!\n` +
                `Risk: 20% chance of a market dip causing a 30% loss.\n\n` +
                `Cooldown: 6 hours per venture.`
            );
        }
        
        const amount = parseInt(args[0]);
        if (amount < 100) return reply(`❌ Minimum investment is *100 ${CURRENCY}*.`);
        
        const bal = economy.getBalance(sender);
        if (bal.wallet < amount) {
            return reply(
                `❌ *Insufficient Capital!*\n\n` +
                `Wallet: *${bal.wallet.toLocaleString()}*\n` +
                `Required: *${amount.toLocaleString()}*`
            );
        }
        
        economy.removeWallet(sender, amount);
        economy.setCooldown(sender, 'invest', 21600000); // 6 hours
        
        const roll = Math.random();
        let multiplier, outcome;
        
        if (roll < 0.2) { 
            multiplier = 0.7; 
            outcome = `📉 *Celestial Market Dip!* Lost 30%.`; 
        } else if (roll < 0.5) { 
            multiplier = 1.5; 
            outcome = `📈 *Steady Astral Growth!* 1.5x return.`; 
        } else if (roll < 0.8) { 
            multiplier = 2.0; 
            outcome = `🚀 *Divine Returns!* 2x profit!`; 
        } else { 
            multiplier = 3.0; 
            outcome = `💎 *Jackpot Venture!* 3x return!`; 
        }
        
        const returns = Math.floor(amount * multiplier);
        const profit = returns - amount;
        economy.addWallet(sender, returns);
        
        const newBal = economy.getBalance(sender);
        
        reply(
            `📊 *Celestial Venture Results*\n\n` +
            `${outcome}\n\n` +
            `💵 Committed: *${amount.toLocaleString()} ${CURRENCY}*\n` +
            `${profit >= 0 ? '✅' : '❌'} ${profit >= 0 ? 'Gain' : 'Loss'}: *${Math.abs(profit).toLocaleString()} ${CURRENCY}*\n` +
            `💰 Returned: *${returns.toLocaleString()} ${CURRENCY}*\n\n` +
            `👛 Wallet: *${newBal.wallet.toLocaleString()}*\n` +
            `_Your next venture awaits in 6 hours!_`
        );
    }
};
