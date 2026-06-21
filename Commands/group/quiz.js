/**
 * Quiz — Initiate the Celestial Trial of Wisdom
 * Usage: .quiz
 */

const questions = [
    { q:'What is the capital of France?', a:'paris', hint:'It starts with P' },
    { q:'How many continents are there on Earth?', a:'7', hint:'Single digit number' },
    { q:'What planet is closest to the Sun?', a:'mercury', hint:'Starts with M' },
    { q:'Who wrote Romeo and Juliet?', a:'shakespeare', hint:'Famous English playwright' },
    { q:'What is 15 × 15?', a:'225', hint:'Between 200 and 250' },
    { q:'What gas makes up most of Earth\'s atmosphere?', a:'nitrogen', hint:'It\'s not oxygen!' },
    { q:'In which country is the Amazon Rainforest mostly located?', a:'brazil', hint:'Largest country in South America' },
    { q:'What is the chemical symbol for Gold?', a:'au', hint:'Two letters, not GD' },
    { q:'How many sides does an octagon have?', a:'8', hint:'Think "octo"' },
    { q:'What is the largest planet in our solar system?', a:'jupiter', hint:'Named after a Roman god' },
];

module.exports = {
    name: 'quiz',
    aliases: ['groupquiz', 'startquiz', 'trial'],
    description: 'Initiate a Celestial Trial of Wisdom.',
    category: 'group',
    async execute({ sock, from, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        
        const q = questions[Math.floor(Math.random() * questions.length)];
        module.exports.currentAnswer = q.a;
        module.exports.currentGroup = from;
        
        await reply(
            `🧠 *CELESTIAL TRIAL OF WISDOM*\n\n` +
            `❓ ${q.q}\n\n` +
            `💡 Essence of truth: ${q.hint}\n\n` +
            `_The first disciple to manifest the correct truth shall be honored. You have 60 seconds._`
        );
        
        setTimeout(async () => {
            if (module.exports.currentAnswer) {
                module.exports.currentAnswer = null;
                try { 
                    await sock.sendMessage(from, { 
                        text: `⏰ *The celestial sands have run out!*\n\nThe hidden truth was: *${q.a.toUpperCase()}*\n\nMay your wisdom flourish in the next trial! 🎯` 
                    }); 
                }
                catch {}
            }
        }, 60000);
    }
};
