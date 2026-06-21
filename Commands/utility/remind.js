/**
 * Remind — Initiate Chronos Vigil
 * Usage: .remind <duration> <message>
 */

const activeReminders = new Map();

module.exports = {
    name: 'remind',
    aliases: ['reminder', 'remindme', 'alarm', 'vigil'],
    description: 'Enlist the Lotus Prince to maintain a Chronos Vigil over your tasks.',
    category: 'utility',
    async execute({ sock, from, reply, args, sender }) {
        if (!args.length) {
            // ... (Listing logic remains the same, aesthetic frame updated)
            return reply(
                `╔══════════════════════════╗\n` +
                `║  ⏳ *CHRONOS VIGIL*       ║\n` +
                `╚══════════════════════════╝\n\n` +
                `The Lotus Prince stands watch over your intent.\n\n` +
                `🔧 *USAGE*\n` +
                `▸ .remind 30m Take medicine\n` +
                `▸ .remind list — View active vigils\n` +
                `▸ .remind clear — Dismiss all vigils\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        // ── List ──
        if (args[0].toLowerCase() === 'list') {
            const userReminders = [...activeReminders].filter(([_, r]) => r.sender === sender);
            
            if (!userReminders.length) return reply('📜 _The Lotus Prince holds no active vigils for you._');

            const list = userReminders.map(([_, r], i) => {
                const remaining = r.endTime - Date.now();
                const mins = Math.max(0, Math.ceil(remaining / 60000));
                return `${i + 1}. 📌 *${r.message}* — ⏳ ${mins}m remaining`;
            }).join('\n');

            return reply(`╔══ *ACTIVE CHRONOS VIGILS* ══╗\n\n${list}\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`);
        }

        // ── Clear ──
        if (args[0].toLowerCase() === 'clear') {
            let count = 0;
            for (const [id, r] of activeReminders) {
                if (r.sender === sender) { clearTimeout(r.timer); activeReminders.delete(id); count++; }
            }
            return reply(`🗑️ *Vigils Dismissed*\n\nCancelled *${count}* vigils. The Lotus Prince returns to silence.`);
        }

        // ── Parse duration ──
        const timeStr = args[0].toLowerCase();
        const match = timeStr.match(/^(\d+)(s|m|h|d)$/);
        if (!match) return reply('❌ _The time format is unknown to the Lotus Prince._');

        const value = parseInt(match[1]);
        const unit = match[2];
        const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
        const totalMs = value * multipliers[unit];

        const message = args.slice(1).join(' ') || 'Unspecified duty';
        const reminderId = `${sender}_${Date.now()}`;
        const endTime = Date.now() + totalMs;

        const timer = setTimeout(async () => {
            activeReminders.delete(reminderId);
            try {
                await sock.sendMessage(from, {
                    text: `🔔 *CHRONOS VIGIL ALERT*\n\n📌 *${message}*\n\n> _The time of your task has arrived. The Lotus Prince reminds you._`,
                    mentions: [sender]
                });
            } catch (_) {}
        }, totalMs);

        activeReminders.set(reminderId, { sender, from, message, endTime, timer });

        reply(`✅ *Chronos Vigil Established*\n\n📌 *${message}*\n🔔 Fires in: ${value} ${unit}\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`);
    }
};
