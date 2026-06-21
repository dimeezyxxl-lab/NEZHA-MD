/**
 * Heist — Conduct a celestial infiltration for massive bounties.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

const HEIST_STORIES = [
    { location: '🏦 Heavenly Treasury', stages: ['You slip past the celestial sentinels...', 'You shatter the protective ward...', 'You seize the divine essence!'] },
    { location: '💎 Jade Palace', stages: ['You blend into the shadows...', 'You bypass the immortal laser grid...', 'You claim the sacred artifacts!'] },
    { location: '🏛️ Archive of Records', stages: ['You bewitch the guardian spirit...', 'You evade the cloud-cameras...', 'You liberate the forbidden scrolls!'] },
    { location: '🎰 Dragon’s Casino', stages: ['You trick the celestial dealer...', 'You infiltrate the inner sanctum...', 'You empty the dragon’s hoard!'] },
    { location: '🚂 The Star-Train', stages: ['You board the flying locomotive...', 'You overcome the armored guards...', 'You crack the cosmic cargo!'] },
];

module.exports = {
    name: 'heist',
    aliases: ['robbery', 'infiltrate'],
    description: 'Attempt a daring celestial infiltration for grand rewards',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const cd = economy.checkCooldown(sender, 'heist');
        if (cd.onCooldown) {
            return reply(`⏰ The celestial authorities are watching you. Lay low for *${formatTime(cd.remaining)}* before your next infiltration.`);
        }
        
        const amount = parseInt(args[0]);
        if (!amount || amount < 500) {
            return reply(
                `❌ *Infiltration Setup*\n\n` +
                `Usage: \`.heist <amount>\` (minimum 500)\n` +
                `_The higher your offering to prep, the greater the potential bounty!_`
            );
        }
        
        const bal = economy.getBalance(sender);
        if (amount > bal.wallet) {
            return reply(`❌ You lack the *${amount.toLocaleString()} ${CURRENCY}* required to fund this operation.`);
        }
        
        const story = HEIST_STORIES[Math.floor(Math.random() * HEIST_STORIES.length)];
        const successRate = Math.max(0.2, 0.6 - (amount / 50000));
        
        economy.setCooldown(sender, 'heist');
        
        let narrative = `🎬 *INFILTRATION: ${story.location}*\n\n`;
        story.stages.forEach((s, i) => { narrative += `${i + 1}. ${s}\n`; });
        
        if (Math.random() < successRate) {
            const multiplier = 1.5 + Math.random() * 2;
            const winnings = Math.floor(amount * multiplier);
            economy.addWallet(sender, winnings - amount);
            narrative += `\n✅ *INFILTRATION SUCCESSFUL!*\n\n💰 Bountiful Payout: *${winnings.toLocaleString()} ${CURRENCY}*\n📈 Profit: *${(winnings - amount).toLocaleString()} ${CURRENCY}*\n👛 Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`;
        } else {
            economy.removeWallet(sender, amount);
            narrative += `\n❌ *INFILTRATION FAILED!*\n\n🚨 The alarm is raised! You forfeited your *${amount.toLocaleString()} ${CURRENCY}* investment.\n👛 Wallet: *${economy.getBalance(sender).wallet.toLocaleString()}*`;
        }
        reply(narrative);
    }
};
