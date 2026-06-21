/**
 * Oracle — Celestial AI assistant for GROUPS (Nezha-md)
 * 
 * Usage:
 *   .oracle on                           — enable in this group
 *   .oracle off                          — disable in this group
 *   .oracle voice on|off                 — toggle voice replies
 *   .oracle train <persona description>  — set a custom persona for THIS group
 *   .oracle reset                        — reset persona to default
 *   .oracle status                       — show current state
 */

module.exports = {
    name: 'oracle',
    aliases: ['chatbot', 'grouporacle', 'goracle'],
    description: 'Celestial AI assistant for groups (only responds to tags or replies).',
    usage: '.oracle on|off|voice on|off|train <persona>|reset|status',
    category: 'general',
    adminOnly: true,

    async execute({ reply, args, database, from, isGroup }) {
        if (!isGroup) return reply('👥 *This command governs group sanctuaries.* Use `.oracle` for group interactions.');

        const a0 = (args[0] || '').toLowerCase();
        const a1 = (args[1] || '').toLowerCase();

        const current  = database.getChatbot(from);
        const voiceOn  = database.getChatbotVoice(from);
        const persona  = database.getChatbotPersona(from);

        // ── TRAIN ────────────────────────────────────────────────────────────
        if (a0 === 'train') {
            const personaText = args.slice(1).join(' ').trim();
            if (!personaText) {
                return reply(
                    `🧠 *Train the Celestial Oracle*\n\n` +
                    `Current persona: ${persona ? '\n_' + persona + '_' : '(Nezha-md Default)'}\n\n` +
                    `Usage:\n\`.oracle train You are a stoic, wise protector of the realm.\``
                );
            }
            if (personaText.length > 1000) return reply('❌ Persona exceeds the divine capacity (max 1000 chars).');
            database.setChatbotPersona(from, personaText);
            return reply(`✅ *Celestial persona recalibrated for this domain.*\n\n🧠 _${personaText}_`);
        }

        if (a0 === 'reset') {
            database.setChatbotPersona(from, null);
            return reply('🔄 *Oracle persona returned to the default Lotus state.*');
        }

        // ── VOICE ────────────────────────────────────────────────────────────
        if (a0 === 'voice') {
            if (a1 !== 'on' && a1 !== 'off') {
                return reply(
                    `🎙️ *Celestial Echoes*\n\nStatus: ${voiceOn ? '✅ ON' : '❌ OFF'}\n\n` +
                    `Usage:\n• \`.oracle voice on\`\n• \`.oracle voice off\``
                );
            }
            database.setChatbotVoice(from, a1 === 'on');
            return reply(a1 === 'on'
                ? '🎙️ *Divine vocalizations ENABLED.*'
                : '🔇 *Divine vocalizations silenced — text only.*');
        }

        if (a0 === 'status' || !a0) {
            return reply(
                `🏵️ *Group Oracle — Nezha-md AI*\n\n` +
                `Status:  ${current ? '✅ ACTIVE' : '❌ OFF'}\n` +
                `Voice:   ${voiceOn ? '🎙️ ON' : '🔇 OFF'}\n` +
                `Persona: ${persona ? '🧠 Custom' : '🏵️ Nezha-md Default'}\n\n` +
                `*Behavior:* I manifest only when *@tagged* or *replied to* — preserving the peace of the sanctuary.\n` +
                `*Creation:* Invoke _"generate image of..."_ to manifest visions into reality.\n\n` +
                `*Usage:*\n` +
                `• \`.oracle on\` / \`.oracle off\`\n` +
                `• \`.oracle voice on\` / \`.oracle voice off\`\n` +
                `• \`.oracle train <persona>\`\n` +
                `• \`.oracle reset\``
            );
        }

        if (!['on', 'off'].includes(a0)) {
            return reply('❓ The Oracle does not recognize that command. Try `.oracle status`.');
        }

        if (a0 === 'on' && current)  return reply('🏵️ The Oracle is already *active* in this domain.');
        if (a0 === 'off' && !current) return reply('🏵️ The Oracle is already *dormant* in this domain.');

        database.setChatbot(from, a0 === 'on');

        return reply(a0 === 'on'
            ? `✅ *Celestial Oracle ENABLED!*\n\n🏵️ Nezha-md will observe and reply when *tagged* or *replied to*.\nTry: \`.oracle train\` to define the personality of this domain.`
            : `❌ *Celestial Oracle DORMANT.*`);
    }
};
