/**
 * ChatbotAPI — Invoke Celestial Conduit Calibration
 * Usage: .chatbotapi groq|openai <key> | status | reset
 */
const fs    = require('fs');
const path  = require('path');
const axios = require('axios');

const SMART_AI_PATH = path.join(__dirname, '..', '..', 'utils', 'smartAI.js');

const PROVIDERS = {
    groq: {
        url: 'https://api.groq.com/openai/v1/chat/completions',
        models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'],
        prefix: 'gsk_',
        testModel: 'llama-3.1-8b-instant',
    },
    openai: {
        url: 'https://api.openai.com/v1/chat/completions',
        models: ['gpt-4o-mini', 'gpt-3.5-turbo'],
        prefix: 'sk-',
        testModel: 'gpt-4o-mini',
    },
};

const DEFAULT_BLOCK =
`// ===== BEGIN AI CONFIG (managed by .chatbotapi) =====
const AI_PROVIDER = 'groq';
const AI_API_KEY  = process.env.GROQ_API_KEY || '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';
const AI_URL      = 'https://api.groq.com/openai/v1/chat/completions';
const AI_MODELS   = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
// ===== END AI CONFIG =====`;

function mask(key) {
    if (!key || key.length < 8) return '****';
    return key.slice(0, 4) + '****' + key.slice(-4);
}

async function testKey(provider, key) {
    const cfg = PROVIDERS[provider];
    try {
        const { status, data } = await axios.post(cfg.url, {
            model: cfg.testModel,
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 5,
        }, {
            timeout: 15000,
            headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
            validateStatus: () => true,
        });
        if (status >= 200 && status < 300) return { ok: true };
        return { ok: false, error: data?.error?.message || `HTTP ${status}` };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

function buildBlock(provider, key) {
    const cfg = PROVIDERS[provider];
    const modelsLiteral = '[' + cfg.models.map(m => `'${m}'`).join(', ') + ']';
    return `// ===== BEGIN AI CONFIG (managed by .chatbotapi) =====
const AI_PROVIDER = '${provider}';
const AI_API_KEY  = '${key.replace(/'/g, "\\'")}';
const AI_URL      = '${cfg.url}';
const AI_MODELS   = ${modelsLiteral};
// ===== END AI CONFIG =====`;
}

function writeBlock(newBlock) {
    const src = fs.readFileSync(SMART_AI_PATH, 'utf8');
    const re  = /\/\/ ===== BEGIN AI CONFIG[\s\S]*?\/\/ ===== END AI CONFIG =====/;
    if (!re.test(src)) throw new Error('AI CONFIG markers not found in utils/smartAI.js');
    fs.writeFileSync(SMART_AI_PATH, src.replace(re, newBlock));
    try { delete require.cache[require.resolve(SMART_AI_PATH)]; } catch (_) {}
}

function readCurrent() {
    try {
        const src = fs.readFileSync(SMART_AI_PATH, 'utf8');
        const provider = (src.match(/AI_PROVIDER\s*=\s*'([^']+)'/) || [])[1] || 'unknown';
        const key      = (src.match(/AI_API_KEY\s*=\s*(?:process\.env\.[A-Z_]+\s*\|\|\s*)?'([^']+)'/) || [])[1] || '';
        return { provider, key };
    } catch {
        return { provider: 'unknown', key: '' };
    }
}

module.exports = {
    name: 'chatbotapi',
    aliases: ['setchatbotapi', 'chatapi', 'conduit', 'calibrate'],
    description: 'Calibrate the celestial conduits of the AI.',
    usage: '.chatbotapi groq|openai <key> | status | reset',
    category: 'owner',

    async execute({ reply, args }) {
        const sub = (args[0] || '').toLowerCase();

        if (!sub || sub === 'status' || sub === 'help') {
            const cur = readCurrent();
            return reply(
                '🔑 *CELESTIAL CONDUIT STATUS*\n\n' +
                `Active Provider: *${cur.provider.toUpperCase()}*\n` +
                `Current Key:    \`${mask(cur.key)}\`\n\n' +
                '*Ritual Usage:*\n' +
                '• `.chatbotapi groq <key>`   — Calibrate for Groq\n' +
                '• `.chatbotapi openai <key>` — Calibrate for OpenAI\n' +
                '• `.chatbotapi status`       — Inspect conduit\n' +
                '• `.chatbotapi reset`        — Restore default conduit\n\n' +
                '_Use this when the divine resonance weakens due to key expiration._'
            );
        }

        if (sub === 'reset') {
            try {
                writeBlock(DEFAULT_BLOCK);
                return reply('🔄 *CONDUIT RESET TO DIVINE DEFAULT*');
            } catch (e) {
                return reply(`❌ *Calibration failure:* ${e.message}`);
            }
        }

        if (sub === 'groq' || sub === 'openai') {
            const provider = sub;
            const key = (args[1] || '').trim();
            if (!key) return reply(`❌ _Ritual missing key:_ \`.chatbotapi ${provider} <key>\``);

            const cfg = PROVIDERS[provider];
            if (!key.startsWith(cfg.prefix)) {
                return reply(`❌ _The key lacks the divine signature of ${provider.toUpperCase()} (must start with \`${cfg.prefix}\`)._`);
            }
            if (key.length < 20) return reply('❌ _This key is too fragile to sustain the connection._');

            await reply(`🔍 *Validating connection to ${provider.toUpperCase()}...*`);

            const test = await testKey(provider, key);
            if (!test.ok) return reply(`❌ *Connection rejected by ${provider.toUpperCase()}:*\n_${test.error}_`);

            try {
                writeBlock(buildBlock(provider, key));
            } catch (e) {
                return reply(`❌ *Failed to anchor key:* ${e.message}`);
            }

            return reply(
                '✅ *CELESTIAL CONDUIT CALIBRATED!*\n\n' +
                `New Provider: *${provider.toUpperCase()}*\n` +
                `Key Signature: \`${mask(key)}\`\n\n' +
                '🤖 The Lotus Prince’s conduit is now flowing with renewed divinity.\n\n' +
                '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
            );
        }

        return reply('❌ _Unknown ritual._ Try `.chatbotapi status`.');
    },
};
