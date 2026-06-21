/**
 * Slots — Spin the Celestial Slot Machine.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

const REELS = ['🍒', '🍋', '💎', '7️⃣', '🍀', '🔔', '⭐', '🍉'];
const PAYOUTS = { '💎💎💎': 10, '7️⃣7️⃣7️⃣': 7, '🍀🍀🍀': 5, '🔔🔔🔔': 4, '⭐⭐⭐': 3, '🍒🍒🍒': 3, '🍋🍋🍋': 2, '🍉🍉🍉': 2 };

module.exports = {
    name: 'slots',
    aliases: ['slot', 'slotmachine', 'celestial-reels'],
    description: 'Spin the celestial slot machine for a chance at divine rewards',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const bal = economy.getBalance(sender);
        const amount = args[0] === 'all' ? bal.wallet : parseInt(args[0]);
        
        if (!amount || amount <= 0) {
            return reply(`❌ *Celestial Reels*\n\nUsage: \`.slots <amount>\`\nExample: \`.slots 500\``);
        }
        
        if (amount > bal.wallet) {
            return reply(`❌ *Insufficient Essence:* You only have *${bal.wallet.toLocaleString()} ${CURRENCY}*!`);
        }
        
        const r = [
            REELS[Math.floor(Math.random() * REELS.length)], 
            REELS[Math.floor(Math.random() * REELS.length)], 
            REELS[Math.floor(Math.random() * REELS.length)]
        ];
        
        const combo = r.join('');
        const multiplier = PAYOUTS[combo] || 0;
        
        let result;
        if (multiplier > 0) {
            const winnings = amount * multiplier;
            economy.addWallet(sender, winnings - amount);
            result = `🎰 *CELESTIAL REELS* 🎰\n\n╔═══════════╗\n║  ${r[0]} ║ ${r[1]} ║ ${r[2]}  ║\n╚═══════════╝\n\n🎉 *DIVINE JACKPOT!* x${multiplier}!\nYou won *${winnings.toLocaleString()} ${CURRENCY}*! ${SYMBOL}`;
        } else if (r[0] === r[1] || r[1] === r[2]) {
            const partial = Math.floor(amount * 0.5);
            economy.removeWallet(sender, amount - partial);
            result = `🎰 *CELESTIAL REELS* 🎰\n\n╔═══════════╗\n║  ${r[0]} ║ ${r[1]} ║ ${r[2]}  ║\n╚═══════════╝\n\n😐 *Close!* Two symbols align.\nYou recovered *${partial.toLocaleString()} ${CURRENCY}*`;
        } else {
            economy.removeWallet(sender, amount);
            result = `🎰 *CELESTIAL REELS* 🎰\n\n╔═══════════╗\n║  ${r[0]} ║ ${r[1]} ║ ${r[2]}  ║\n╚═══════════╝\n\n💀 *No alignment found.*\nYou lost *${amount.toLocaleString()} ${CURRENCY}*`;
        }
        
        reply(`${result}\n\n👛 Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`);
    }
};
