/**
 * Fact — Reveal a celestial truth
 * Usage: .fact
 */

const celestialTruths = [
    "Honey never spoils. Even after millennia, it retains its golden purity.",
    "A day on Venus spans longer than its entire orbit around the sun.",
    "The octopus, a creature of the depths, possesses three hearts and flows with azure blood.",
    "Botanically, bananas are berries, while strawberries exist outside that classification.",
    "The swiftest conflict in human history concluded in a mere 38 minutes.",
    "A gathering of flamingos is known as a 'flamboyance,' a title of true radiance.",
    "The potential configurations of a chess game exceed the total number of atoms in the known universe.",
    "Under specific conditions, heated water descends to ice more rapidly than cold; a phenomenon known as the Mpemba effect.",
    "Sharks roamed the deep waters long before the first trees took root on land.",
    "The human mind radiates twenty watts of power, a spark capable of illuminating the darkness."
];

module.exports = {
    name: 'fact',
    aliases: ['facts', 'funfact', 'truth', 'wisdom'],
    description: 'Reveal a random celestial truth from the archives.',
    category: 'fun',
    async execute({ reply }) {
        const fact = celestialTruths[Math.floor(Math.random() * celestialTruths.length)];
        
        reply(
            `📜 *Celestial Truths*\n\n` +
            `_“${fact}”_`
        );
    }
};
