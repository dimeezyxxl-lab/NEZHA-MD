/**
 * SetPrefix — Calibrate the Invocation Sigil
 * Usage: .setprefix <new prefix> | .setprefix null
 */

const config = require('../../config');

module.exports = {
    name: 'setprefix',
    aliases: ['prefix', 'changeprefix', 'sigil', 'invocation'],
    description: 'Calibrate the Invocation Sigil used to summon the Lotus Prince.',
    usage: '.setprefix <new prefix> | .setprefix null (no sigil)',
    category: 'owner',

    async execute({ reply, database, phoneNumber, args, prefix }) {
        if (!args || args.length === 0) {
            const currentPrefix = database.getPrefix(phoneNumber);
            const display =
                currentPrefix === null    ? '_(Unbound — No sigil required)_'
                : currentPrefix === undefined ? `\`${config.prefix || '.'}\` _(Default)_`
                : `\`${currentPrefix}\``;

            return reply(
                `╔══════════════════════════════╗\n` +
                `║   ⚙️  *INVOCATION SIGIL*        ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `Current Sigil: ${display}\n\n` +
                `*Ritual Usage:*\n` +
                `\`${prefix || config.prefix}setprefix !\`        → set to !\n` +
                `\`${prefix || config.prefix}setprefix /\`        → set to /\n` +
                `\`${prefix || config.prefix}setprefix ##\`       → set to ##\n` +
                `\`${prefix || config.prefix}setprefix null\`     → unbound mode\n\n` +
                `_Unbound mode: The Lotus Prince hears every utterance as a potential invocation._`
            );
        }

        const newPrefix = args[0].trim();

        if (newPrefix.toLowerCase() === 'null') {
            database.setPrefix(phoneNumber, null);
            return reply(
                `╔══════════════════════════════╗\n` +
                `║   ⚙️  *SIGIL SHATTERED*         ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `✅ *Unbound Mode Activated.*\n\n` +
                `The Lotus Prince shall now respond to invocations *without any sigil*.\n` +
                `Example: simply utter \`menu\`, \`ping\`, \`vv\`.\n\n` +
                `_To forge a new sigil, send:_ \`setprefix .\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        if (newPrefix.length > 5) {
            return reply(
                `❌ *The sigil is too complex.*\n\n` +
                `Please forge a sigil of *1–5 characters* max.\n` +
                `_Example: \`.\`, \`!\`, \`/\`, \`##\`_`
            );
        }

        database.setPrefix(phoneNumber, newPrefix);

        return reply(
            `╔══════════════════════════════╗\n` +
            `║   ⚙️  *SIGIL FORGED*            ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `✅ Invocation Sigil calibrated to: *${newPrefix}*\n\n` +
            `*New ritual examples:*\n` +
            `\`${newPrefix}menu\`     — Reveal the sanctuary\n` +
            `\`${newPrefix}ping\`     — Check divine resonance\n` +
            `\`${newPrefix}private\`  — Draw the veil\n\n` +
            `_To shatter the sigil entirely, send:_ \`${newPrefix}setprefix null\`\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
