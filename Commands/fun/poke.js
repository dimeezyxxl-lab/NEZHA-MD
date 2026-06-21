/**
 * Poke — Deliver a Celestial Nudge
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = {
    ...makeAnimeReaction({
        name: 'poke',
        emoji: '👉',
        verb: 'delivers a celestial nudge to',
        selfVerb: 'is playfully nudging the void',
        fallbacks: [
            'https://media.tenor.com/p_VLTHe5DCQAAAAC/anime-poke.gif',
            'https://media.tenor.com/H_8evidqyl4AAAAC/anime-poke.gif'
        ],
        description: 'Deliver a playful, celestial nudge to another spirit.'
    }),
    aliases: ['poke', 'nudge', 'touch']
};
