/**
 * Slap — Deliver Celestial Discipline
 * Usage: .slap [@user]
 */

const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'slap', 
    emoji: '👋', 
    verb: 'delivers celestial discipline upon', 
    selfVerb: 'is overcome by the urge for self-discipline',
    aliases: ['hit', 'smack', 'discipline'],
    fallbacks: [
        'https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif',
        'https://media.giphy.com/media/xT0BKiwiVJq5B0XhHG/giphy.gif'
    ],
    description: 'Manifest a reaction GIF to deliver swift celestial discipline.'
});
