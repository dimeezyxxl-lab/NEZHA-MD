/**
 * Insult — Deliver a celestial rebuke
 */
module.exports = {
    name: 'insult',
    aliases: ['rebuke', 'roast', 'wit'],
    description: 'Deliver a witty, celestial rebuke to the foolish.',
    category: 'fun',
    async execute({ reply }) {
        const rebukes = [
            'You bring everyone so much joy — when you finally depart the room.',
            'You have the perfect visage for the silence of the void.',
            'I would concur with your assessment, but then we would both be lost in delusion.',
            'You are living proof that even the heavens can experience a momentary lapse in design.',
            'Light travels faster than sound — that explains why you appeared radiant until you uttered a word.'
        ];
        
        return reply(
            `🗯️ *Celestial Rebuke*\n\n` +
            `_“${rebukes[Math.floor(Math.random() * rebukes.length)]}”_`
        );
    }
};
