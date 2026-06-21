/**
 * Streak — Renew your Celestial Vow
 * Usage: .streak | .streak check
 */

const database = require('../../utils/database');

module.exports = {
    name: 'streak',
    aliases: ['checkin', 'daily_streak', 'vow'],
    description: 'Renew your daily Celestial Vow to build your standing in the sanctuary.',
    category: 'group',
    async execute({ reply, sender, from }) {
        const key = `streak_${from}_${sender}`;
        const data = database.getGroupData(from, key) || { streak: 0, lastCheckin: 0 };
        const now = Date.now();
        const oneDayMs = 86400000;
        const diff = now - data.lastCheckin;

        // Vow already renewed for today
        if (diff < oneDayMs) {
            const remaining = oneDayMs - diff;
            const h = Math.floor(remaining / 3600000), m = Math.floor((remaining % 3600000) / 60000);
            return reply(
                `⏰ *Celestial Vow already renewed.*\n\n` +
                `🔥 Current Standing: *${data.streak} day(s)*\n\n` +
                `Return in *${h}h ${m}m* to strengthen your vow further.`
            );
        }

        // Vow broken if missed too many cycles
        if (diff > oneDayMs * 2) data.streak = 0; 
        
        data.streak += 1;
        data.lastCheckin = now;
        database.setGroupData(from, key, data);
        
        const rank = data.streak >= 30 ? '🏆' : data.streak >= 14 ? '🥇' : data.streak >= 7 ? '🔥' : '✅';
        
        reply(
            `${rank} *Celestial Vow Renewed!*\n\n` +
            `@${sender.split('@')[0]}\n` +
            `🔥 Standing: *${data.streak} day(s)*\n\n` +
            `${data.streak >= 7 ? '🔥 Your devotion shines bright! Maintain this focus!' : 'Continue your daily devotion to the sanctuary.'}`,
            { mentions: [sender] }
        );
    }
};
