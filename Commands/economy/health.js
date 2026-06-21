/**
 * Health — Celestial Status Card.
 * Mirrors the .bal flow: try the canvas render, fall back to plain text.
 */
const { health, SICKNESSES, OCCUPATIONS, DRUGS } = require('../../utils/healthManager');

let renderHealthCard = null;
try { ({ renderHealthCard } = require('../../utils/canvasRender')); } catch (_) {}

function bar(hp) {
    const filled = Math.round(hp / 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

module.exports = {
    name: 'health',
    aliases: ['hp', 'status', 'vitality'],
    description: 'Check your current vitality, ailments, and elixir stash',
    category: 'economy',

    async execute({ sock, msg, from, sender, reply }) {
        const u = health.getStatus(sender);
        const sick = u.sickness ? SICKNESSES[u.sickness] : null;
        const occ  = u.occupation ? OCCUPATIONS[u.occupation] : null;

        const drugList = Object.entries(u.drugs || {}).map(([id, q]) => ({
            id,
            name: DRUGS[id]?.name || id,
            qty: q,
        }));

        const drugText = drugList.length
            ? drugList.map(d => `   • ${d.name} ×${d.qty}`).join('\n')
            : '   _none_';

        const num = sender.split('@')[0].split(':')[0];
        const text =
            `🩺 *Vitality Report* — @${num}\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `❤️ Vitality: ${u.health}/100  [${bar(u.health)}]\n` +
            `🤒 Status    : ${sick ? `${sick.emoji} ${sick.name}` : '✅ Pure/Healthy'}\n` +
            `💼 Path      : ${occ ? occ.name : '_Seeking a path — set with .occupation_'}\n\n` +
            `💊 *Celestial Elixirs*\n${drugText}\n\n` +
            `_Use_ *.drugs* _to view & buy_, _use_ *.drugs use <drug>* _to consume._`;

        if (renderHealthCard) {
            try {
                const buf = await renderHealthCard({
                    name: num,
                    hp: u.health,
                    sickness: sick,
                    occupation: occ,
                    drugs: drugList,
                });
                await sock.sendMessage(from, {
                    image: buf,
                    caption: text,
                    mentions: [sender],
                }, { quoted: msg });
                return;
            } catch (e) {
                console.error('[health:render]', e.message);
            }
        }

        await sock.sendMessage(from, { text, mentions: [sender] }, { quoted: msg });
    },
};
