/**
 * Lottery — Enter the Celestial Sweepstakes.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

const TICKET_PRICE = 100;
const JACKPOT = 10000;

module.exports = {
    name: 'lottery',
    aliases: ['lotto', 'ticket', 'sweepstakes'],
    description: 'Purchase a celestial ticket and tempt fate',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'lottery');
        if (cd.onCooldown) {
            return reply(`🎰 *Celestial Draw*\n\nThe celestial draw is in progress. Wait *${formatTime(cd.remaining)}* until the next one.`);
        }

        const bal = economy.getBalance(sender);
        if (bal.wallet < TICKET_PRICE) {
            return reply(`❌ You require *${TICKET_PRICE} ${CURRENCY}* to enter the sweepstakes.\n\nYour wallet: *${bal.wallet.toLocaleString()}*`);
        }

        economy.removeWallet(sender, TICKET_PRICE);
        economy.setCooldown(sender, 'lottery', 7200000); // 2 hours

        const userNums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1).sort((a, b) => a - b);
        const winNums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1).sort((a, b) => a - b);
        const matches = userNums.filter(n => winNums.includes(n)).length;

        let prize = 0, result;
        if (matches === 6) { prize = JACKPOT; result = '🏆 JACKPOT! The heavens grant you 6/6 matches!'; }
        else if (matches === 5) { prize = 2000; result = `🥇 Amazing! You have 5/6 matches!`; }
        else if (matches === 4) { prize = 500; result = `🥈 Great! You have 4/6 matches!`; }
        else if (matches === 3) { prize = 150; result = `🥉 Nice! You have 3/6 matches!`; }
        else { result = `😔 Only ${matches}/6 matches — may fortune smile upon you next time!`; }

        if (prize > 0) economy.addWallet(sender, prize);
        const newBal = economy.getBalance(sender);

        reply(
            `🎟️ *Celestial Sweepstakes Results*\n\n` +
            `Your numbers : ${userNums.join(' - ')}\n` +
            `Winning numbers: ${winNums.join(' - ')}\n\n` +
            `${result}\n` +
            `${prize > 0 ? `${SYMBOL} Won: *${prize.toLocaleString()} ${CURRENCY}*!` : ''}\n\n` +
            `👛 Wallet: *${newBal.wallet.toLocaleString()}*`
        );
    }
};
