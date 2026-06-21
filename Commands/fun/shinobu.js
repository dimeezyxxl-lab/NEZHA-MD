/**
 * Shinobu — Invoke a Celestial Shinobu Reaction
 * Usage: .shinobu [@user]
 */

const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'shinobu', 
    emoji: '🌸', 
    verb: 'bestows Shinobu’s celestial grace upon', 
    selfVerb: 'is currently bathed in Shinobu’s ethereal radiance',
    title: 'CELESTIAL SHINOBU',
    fallbacks: [
        'https://media.tenor.com/V8N1cBNkBfsAAAAC/shinobu-shinobu-oshino.gif'
    ],
    description: 'Manifest a Shinobu reaction GIF to grace the chat with elegance.'
});
