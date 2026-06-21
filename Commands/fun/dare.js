/**
 * Dare — Accept a celestial trial
 * Usage: .dare
 */

const trials = [
    "Send a voice message chanting a mantra of your choosing!",
    "Change your display name to 'Servant of the Lotus' for the next hour.",
    "Share a reflection of your current surroundings with the group.",
    "Tag a fellow spirit and offer them a divine blessing or kind word.",
    "Perform 10 prostrations to demonstrate your physical discipline and report back.",
    "Share a glimpse of your most humble or candid moment from your gallery.",
    "Compose a brief, poetic tribute to this assembly.",
    "Update your status to 'Undergoing a celestial trial' for 30 minutes.",
    "Send a voice message speaking with the gravitas of a legendary warrior.",
    "Send a message to a loved one expressing your deepest affection right now."
];

module.exports = {
    name: 'dare',
    aliases: ['challenge', 'trial', 'ordeal'],
    description: 'Accept a random celestial trial.',
    category: 'fun',
    async execute({ reply }) {
        const trial = trials[Math.floor(Math.random() * trials.length)];
        
        reply(
            `🔥 *Celestial Trial*\n\n` +
            `The heavens decree: _${trial}_`
        );
    }
};
