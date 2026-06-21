/**
 * Kiss — Bestow a celestial blessing of affection
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'kiss',
    emoji: '💋',
    verb: 'bestows a celestial kiss upon',
    selfVerb: 'sends a celestial blessing of affection 💕',
    aliases: ['smooch', 'mwah', 'blessing'],
    fallbacks: [
        'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif'
    ],
    description: 'Bestow a celestial kiss of affection upon another spirit.'
});
