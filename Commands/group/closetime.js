/**
 * CloseTime — Cast a Celestial Seal of Silence
 * Usage: .closetime <duration>
 */

module.exports = {
    name: 'closetime',
    aliases: ['ct', 'closeafter', 'gcclose', 'seal'],
    description: 'Cast a celestial seal to silence the sanctuary after a countdown.',
    category: 'group',
    async execute({ sock, from, reply, args, isGroup, isAdmin }) {
        if (!isGroup) return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        if (!isAdmin) return reply('⛔ *Restriction:* Only those with administrative authority may cast this seal.');

        if (!args.length) {
            return reply(
                `🔒 *Celestial Seal of Silence*\n\n` +
                `Usage: .closetime <duration>\n\n` +
                `Examples:\n` +
                `• .closetime 30s — 30 seconds\n` +
                `• .closetime 7m — 7 minutes\n` +
                `• .closetime 3h — 3 hours\n` +
                `• .closetime 2d — 2 days`
            );
        }

        const input = String(args[0]).toLowerCase();
        const match = input.match(/^(\d+)(s|m|h|d)$/);
        if (!match) {
            return reply('❌ *Invalid temporal parameter.* Use: 30s, 7m, 3h, or 2d');
        }

        const value = parseInt(match[1], 10);
        const unit = match[2];
        const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
        const unitNames = { s: 'second(s)', m: 'minute(s)', h: 'hour(s)', d: 'day(s)' };
        const totalMs = value * multipliers[unit];

        if (totalMs <= 0) return reply('❌ *Temporal drift:* Duration must be greater than zero.');
        if (totalMs > 30 * 86400000) return reply('❌ *Temporal limit exceeded:* Maximum duration is 30 days.');

        const startTime = Date.now();
        const endTime = startTime + totalMs;

        const formatRemaining = (ms) => {
            if (ms <= 0) return '00:00:00';
            const hrs = Math.floor(ms / 3600000);
            const mins = Math.floor((ms % 3600000) / 60000);
            const secs = Math.floor((ms % 60000) / 1000);
            return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
        };

        const makeBar = (pct) => {
            const total = 20;
            const filled = Math.max(0, Math.min(total, Math.round(pct * total)));
            return '▓'.repeat(filled) + '░'.repeat(total - filled);
        };

        const buildMsg = (remaining) => {
            const elapsed = totalMs - remaining;
            const pct = Math.min(Math.max(elapsed / totalMs, 0), 1);
            const bar = makeBar(pct);
            const pctText = Math.round(pct * 100);
            return (
                `🔒 *CELESTIAL SEAL OF SILENCE*\n\n` +
                `⏱️ Duration: *${value} ${unitNames[unit]}*\n\n` +
                `┌─────────────────────────┐\n` +
                `│  ${bar}  │\n` +
                `│        ${pctText}% towards silence        │\n` +
                `└─────────────────────────┘\n\n` +
                `⏳ Time until seal: *${formatRemaining(remaining)}*\n` +
                `🕐 Closes at: *${new Date(endTime).toLocaleTimeString()}*\n\n` +
                `_The sanctuary shall be sealed automatically..._`
            );
        };

        let key = null;
        try {
            const sent = await sock.sendMessage(from, { text: buildMsg(totalMs) });
            key = sent?.key || null;
        } catch (e) {}

        let interval;
        if (totalMs <= 60000) interval = 5000;
        else if (totalMs <= 600000) interval = 30000;
        else if (totalMs <= 3600000) interval = 60000;
        else interval = 300000;

        const editTimer = setInterval(async () => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) { clearInterval(editTimer); return; }
            if (!key) return;
            try {
                await sock.sendMessage(from, { text: buildMsg(remaining), edit: key });
            } catch (_) {}
        }, interval);

        setTimeout(async () => {
            clearInterval(editTimer);
            try {
                await sock.groupSettingUpdate(from, 'announcement');
                await sock.sendMessage(from, {
                    text: (
                        `🔒 *SANCTUARY SEALED*\n\n` +
                        `┌─────────────────────────┐\n` +
                        `│  ${'▓'.repeat(20)}  │\n` +
                        `│       100% sealed          │\n` +
                        `└─────────────────────────┘\n\n` +
                        `✅ The seal is complete. Group is now *closed*.\n` +
                        `Only those with administrative authority may speak.`
                    )
                });
            } catch (e) {
                await sock.sendMessage(from, {
                    text: `❌ *Seal casting failed:* Ensure the Oracle possesses administrative authority.`
                }).catch(() => {});
            }
        }, totalMs);
    }
};
