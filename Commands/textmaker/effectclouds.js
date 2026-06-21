/**
 * EffectClouds — Manifest Celestial Vapor
 * Usage: .effectclouds <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'effectclouds',
        aliases: ['celestialvapor', 'clouds', 'vapor'],
        ephotoUrl: 'https://en.ephoto360.com/online-cloud-text-effect-generator-739.html',
        label: 'Celestial Vapor',
        emoji: '☁️',
    }),
    description: 'Manifest your words within the Celestial Vapor of the high heavens.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
