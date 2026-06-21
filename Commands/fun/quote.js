/**
 * Quote — Receive a Celestial Proverb
 * Usage: .quote
 */

const celestialProverbs = [
    { text: "The path to greatness is forged by passion and divine resolve.", author: "The Lotus Prince" },
    { text: "Within the heart of every struggle lies the seed of celestial opportunity.", author: "Celestial Archivist" },
    { text: "Speed matters little; the spirit that never falters shall reach the horizon.", author: "Sage of the Heavens" },
    { text: "Existence unfolds while mortal minds are occupied with ephemeral designs.", author: "Cosmic Observer" },
    { text: "Destiny belongs to those who perceive the brilliance in their own dreams.", author: "Seer of Light" },
    { text: "Triumph is fleeting, and defeat is but a lesson — courage is the eternal flame.", author: "Celestial Guardian" },
    { text: "Cease the hollow chatter; action is the true language of the soul.", author: "Master of Deeds" },
    { text: "Do not measure your time by the turning of the gears; mirror the stars and persist.", author: "Watcher of Eons" }
];

module.exports = {
    name: 'quote',
    aliases: ['quotes', 'inspire', 'proverb', 'wisdom'],
    description: 'Receive an inspirational celestial proverb.',
    category: 'fun',
    async execute({ reply }) {
        const q = celestialProverbs[Math.floor(Math.random() * celestialProverbs.length)];
        
        return reply(
            `💬 *Celestial Proverb*\n\n` +
            `_"${q.text}"_\n\n` +
            `— *${q.author}*`
        );
    }
};
