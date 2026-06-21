/**
 * Pokemon — Summon a Celestial Companion
 * Usage: .randompokemon
 */
module.exports = {
    name: 'randompokemon',
    aliases: ['pokemon', 'companion', 'mon'],
    description: 'Summon a random celestial companion to aid your journey.',
    category: 'fun',
    async execute({ reply }) {
        const companions = [
            "Pikachu", "Charizard", "Lucario", "Greninja", 
            "Gengar", "Mewtwo", "Eevee", "Snorlax", 
            "Garchomp", "Dragonite"
        ];
        
        const pick = companions[Math.floor(Math.random() * companions.length)];
        
        return reply(
            `🐾 *Celestial Companion*\n\n` +
            `The heavens have resonated, and this companion has appeared: *${pick}*`
        );
    }
};
