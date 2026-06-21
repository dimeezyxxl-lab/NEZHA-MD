/**
 * Pat — Bestow a Celestial Blessing (Headpat)
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'pat',
    aliases: ['headpat', 'bless', 'comfort'],
    emoji: '✋',
    verb: 'bestows a celestial blessing upon the head of',
    selfVerb: 'is yearning for a celestial blessing',
    fallbacks: [
        'https://media.tenor.com/0r3HOgZ3rGoAAAAC/anime-pat.gif',
        'https://media.tenor.com/E2zaIRGsxhMAAAAC/anime-pat.gif'
    ],
    description: 'Bestow a gentle, celestial blessing upon another spirit.'
});
