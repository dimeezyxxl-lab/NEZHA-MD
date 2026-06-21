/**
 * SS — Capture a Celestial Reflection
 * Usage: .ss <url>
 */

const API = 'https://apis.prexzyvilla.site/ssweb/webss?url=';

function normalizeUrl(input) {
    if (!input) return null;
    let u = input.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    try {
        const parsed = new URL(u);
        if (!parsed.hostname.includes('.')) return null;
        return parsed.toString();
    } catch { return null; }
}

module.exports = {
    name: 'ss',
    aliases: ['screenshot', 'webss', 'ssweb', 'reflect'],
    description: 'Capture a Celestial Reflection of a mortal digital domain.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        const target = normalizeUrl(args[0]);
        if (!target) {
            return reply('❓ *Celestial Reflection:* Provide a valid URL.\nExample: `.ss https://google.com`');
        }

        const apiUrl = API + encodeURIComponent(target);
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 45000);

        try {
            await reply(`📸 *Forging a Celestial Reflection of* ${target} ... please wait.`);
            const res = await fetch(apiUrl, { signal: ctrl.signal, headers: { 'User-Agent': 'NezhaMD/1.0' } });
            const ct = res.headers.get('content-type') || '';

            if (!res.ok) {
                return reply(`⚠️ *Reflection failed:* The ethereal link returned status ${res.status}.`);
            }

            if (ct.startsWith('image/')) {
                const buf = Buffer.from(await res.arrayBuffer());
                await sock.sendMessage(from, {
                    image: buf,
                    caption: `📸 *Celestial Reflection captured from:* ${target}`
                }, { quoted: msg });
                return;
            }

            if (ct.includes('application/json')) {
                const j = await res.json();
                if (j?.url && /^https?:\/\//.test(j.url)) {
                    await sock.sendMessage(from, {
                        image: { url: j.url },
                        caption: `📸 *Celestial Reflection captured from:* ${target}`
                    }, { quoted: msg });
                    return;
                }
                return reply(`⚠️ *Reflection disrupted:* ${j?.error || j?.message || 'unknown'}`);
            }

            return reply(`⚠️ *Reflection error:* The response type (${ct}) is not recognized by the heavens.`);
        } catch (err) {
            if (err.name === 'AbortError') {
                return reply('⏱️ *Reflection timed out:* The domain is distant or unreachable.');
            }
            return reply(`⚠️ *Reflection failed:* ${err.message}`);
        } finally {
            clearTimeout(timeout);
        }
    }
};
