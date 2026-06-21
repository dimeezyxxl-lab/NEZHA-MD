/**
 * Answer — Reveal the secret of the celestial riddle.
 * Usage: .answer
 */

module.exports = {
    name: 'answer',
    aliases: ['reveal', 'solve', 'secret'],
    description: 'Reveal the answer to the current celestial riddle',
    category: 'fun',
    async execute({ reply }) {
        const lastRiddle = require('./riddle');
        
        if (lastRiddle.lastAnswer) {
            reply(
                `🧩 *Celestial Revelation*\n\n` +
                `The hidden truth is revealed: *${lastRiddle.lastAnswer}*`
            );
            delete lastRiddle.lastAnswer;
        } else {
            reply('❌ *Silent Heavens:* No riddle is currently active. Use `.riddle` to initiate a challenge!');
        }
    }
};
