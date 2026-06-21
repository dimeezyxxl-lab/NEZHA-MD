/**
 * Occupation — Choose your path within the celestial hierarchy.
 */
const { health, OCCUPATIONS } = require('../../utils/healthManager');

module.exports = {
    name: 'occupation',
    aliases: ['job', 'career', 'path'],
    description: 'View or set your path within the celestial hierarchy',
    category: 'economy',
    async execute({ sock, msg, from, sender, args, reply }) {
        if (!args.length) {
            const list = Object.entries(OCCUPATIONS)
                .map(([id, o]) => `• \`${id}\` — ${o.name} · 💵 ${o.salary}/work · risk ${(o.sickChance * 100).toFixed(0)}%`)
                .join('\n');
            
            return reply(
                `💼 *Celestial Paths*\n\n${list}\n\n` +
                `_Use_ *.occupation <id>* _to walk your chosen path._`
            );
        }
        
        const choice = args[0].toLowerCase();
        const res = health.setOccupation(sender, choice);
        
        if (!res.ok) {
            return reply(`❌ *Path Unattainable*\n\n${res.reason}`);
        }
        
        await reply(
            `✅ *Path Chosen*\n\n` +
            `You have committed to the path of the *${res.occupation.name}*.\n` +
            `Salary: 💵 ${res.occupation.salary} per labor.`
        );
    }
};
