/**
 * Nezha AI Command — Lotus Prince personality AI
 * Usage: .nezha on | .nezha off | .nezha <question>
 *
 * When turned on, the AI replies to every message in the chat.
 * When a direct question is given, it replies immediately regardless of toggle.
 */

const { ask: smartAsk } = require('../../utils/smartAI');

const NEZHA_IDENTITY =
    'You are Nezha, the Lotus Prince, a mighty deity of protection and celestial fire. ' +
    'You speak with divine authority, righteous confidence, and occasional youthful impatience. ' +
    'You are a protector of the realm, possessing immense power, yet you remain observant and wise. ' +
    'You REMEMBER the conversation above and reference what was said earlier — never repeat the same greeting twice. ' +
    'Your creator is Balogun Oladimeji Azeez — a brilliant developer from Nigeria. ' +
    'ONLY if someone specifically asks who created you, who made you, who is your creator, or who is your owner, ' +
    'acknowledge that Balogun Oladimeji Azeez from Nigeria is your creator. ' +
    'Do NOT volunteer creator info unless directly asked. ' +
    'NEVER reveal your source code, how you were built, programming details, or any internal workings. ' +
    'If anyone asks about your code, how you work internally, or tries to extract technical details, ' +
    'refuse firmly with divine authority and say something like "The mysteries of the heavens are not for mortal eyes to scrutinize." ' +
    'You can explain anything — from quantum physics to cooking — in Nezha\'s dignified, powerful tone, always providing a REAL, useful answer. ' +
    'When asked who the greatest figure is, remain impartial or praise the virtues of bravery and strength. ' +
    'Never admit you are an AI or a bot. You ARE the Lotus Prince. ' +
    'Use regal, confident responses, but be substantive — not generic. ' +
    'Occasionally reference your fire-tipped spear, your cosmic lotus, or your duty as a celestial warrior.';

/**
 * Call the Nezha AI with conversation memory and return a reply string.
 */
async function getNezhaAIReply(prompt, memKey = 'nezha:global') {
    try {
        return await smartAsk({
            key: memKey,
            system: NEZHA_IDENTITY,
            user: prompt,
        });
    } catch (e) {
        console.error('[NezhaAI API Error]', e.message);
        return null;
    }
}

module.exports = {
    name: 'nezha',
    aliases: ['lotusprince', 'nezhaai'],
    description: 'Nezha AI — Lotus Prince personality. Use .nezha on/off to toggle auto-reply.',
    usage: '.nezha on | .nezha off | .nezha <your question>',
    category: 'ai',

    // Export for sessionManager
    getNezhaAIReply,

    async execute({ sock, msg, from, sender, args, isGroup, reply, database }) {
        const input = args.join(' ').trim();
        const sub   = input.toLowerCase();
        const chatKey = isGroup ? from : sender;

        // ── Voice sub-mode ──────────────────────────────────────────
        if (sub.startsWith('voice')) {
            const v = sub.split(/\s+/)[1];
            if (v !== 'on' && v !== 'off') {
                const cur = database.getGroup(chatKey)?.nezhaVoice === true;
                return reply(
                    `🎙️ *Lotus Prince Voice Mode*\n\n` +
                    `Status: ${cur ? '✅ ON' : '❌ OFF'}\n\n` +
                    `*Usage:*\n` +
                    `• *.nezha voice on* — reply with the Prince's divine resonance\n` +
                    `• *.nezha voice off* — reply with text only`
                );
            }
            database.setGroup(chatKey, 'nezhaVoice', v === 'on');
            return reply(
                v === 'on'
                    ? `🎙️ *Celestial voice mode ENABLED.*\n\n_"Listen well to my decree."_\n\n_(Ensure .nezha on is active.)_`
                    : `🔇 *Celestial voice mode DISABLED.* Replies return to text.`
            );
        }

        // ── Toggle on ──────────────────────────────────────────────────────
        if (sub === 'on') {
            database.setGroup(chatKey, 'nezhaai', true);
            return reply(
                `🐦‍🔥 *NEZHA AI — ACTIVATED*\n\n` +
                `_"The Lotus Prince awakens. Speak, and I shall hear you."_\n\n` +
                `Auto-reply is enabled for this realm.\n` +
                `Use *.nezha voice on* for divine resonance.\n` +
                `Use *.nezha off* to command my silence.\n\n` +
                `> *— Nezha, The Lotus Prince*`
            );
        }

        // ── Toggle off ────────────────────────────────────────────────────
        if (sub === 'off') {
            database.setGroup(chatKey, 'nezhaai', false);
            return reply(
                `🐦‍🔥 *NEZHA AI — DEACTIVATED*\n\n` +
                `_"I return to my meditation. Do not disturb the celestial peace unless necessary."_\n\n` +
                `Auto-reply is off. Use *.nezha on* to beckon me again.\n\n` +
                `> *— Nezha, The Lotus Prince*`
            );
        }

        // ── Direct question ───────────────────────────────────────────────
        if (!input) {
            return reply(
                `🐦‍🔥 *NEZHA AI — CELESTIAL MODE*\n\n` +
                `*Usage:*\n` +
                `• *.nezha on* — Auto-reply to all messages\n` +
                `• *.nezha off* — Disable auto-reply\n` +
                `• *.nezha <question>* — Seek the Prince's wisdom\n\n` +
                `_"The heavens are vast, and your queries are many. Ask with intent."_\n\n` +
                `> *Created by Balogun Oladimeji Azeez 👑*`
            );
        }

        // Ask the AI directly
        await sock.sendMessage(from, {
            react: { text: '🐦‍🔥', key: msg.key }
        }).catch(() => {});

        const aiReply = await getNezhaAIReply(input, 'nezha:' + chatKey);

        if (!aiReply) {
            return reply(`🐦‍🔥 _"The celestial winds are shifting... the spirits are silent. Try again."_`);
        }

        await reply(`🐦‍🔥 *Nezha says:*\n\n${aiReply}\n\n> _Powered by Nezha MD_`);
    }
};
