/**
 * Riddle — Pose a Celestial Enigma
 * Usage: .riddle
 */

const celestialEnigmas = [
    { q: "I possess vast realms, yet contain no dwellings. I hold high peaks, yet foster no life. I contain deep waters, yet swim no creatures. What am I?", a: "A map" },
    { q: "I possess many keys, yet unlock no gates.", a: "A piano" },
    { q: "I possess a head and a tail, yet hold no physical form.", a: "A coin" },
    { q: "I gather moisture whilst I work to dry.", a: "A towel" },
    { q: "I traverse the entirety of the world, yet I am bound to a single corner.", a: "A stamp" },
    { q: "I possess hands, yet I cannot sound the strike of a palm.", a: "A clock" },
    { q: "I possess a long neck, yet I am devoid of a head.", a: "A bottle" },
    { q: "I hold countless stories within my walls, yet I am not a narrator.", a: "A library" },
    { q: "I ascend steadily, yet I never descend.", a: "Your age" },
    { q: "I possess a single eye, yet sight escapes me.", a: "A needle" },
    { q: "I possess countless teeth, yet I cannot rend or bite.", a: "A comb" },
    { q: "I am riddled with void, yet I remain the guardian of water.", a: "A sponge" },
    { q: "I am easily ensnared, yet I cannot be cast by hand.", a: "A cold" },
    { q: "I possess a thousand voices in silence, yet I never utter a sound.", a: "A book" },
    { q: "I flow forever onward, yet my feet never touch the earth.", a: "A river" }
];

module.exports = {
    name: 'riddle',
    aliases: ['puzzle', 'brain', 'enigma'],
    description: 'Pose a celestial enigma to test the mortal mind.',
    category: 'fun',
    async execute({ reply }) {
        const enigma = celestialEnigmas[Math.floor(Math.random() * celestialEnigmas.length)];
        
        // Store the answer in the module's state
        module.exports.lastAnswer = enigma.a;
        
        return reply(
            `🧩 *Celestial Enigma*\n\n` +
            `_${enigma.q}_\n\n` +
            `*Tip:* Contemplate the truth, then use the command *.answer* to unveil it.`
        );
    }
};
