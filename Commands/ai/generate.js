/**
 * .generate <prompt> — image fetcher / AI generator
 *
 * Order of providers (first success wins):
 *   1. Unsplash (PRIMARY)  — high-quality real photos matching the prompt
 *   2. prexzyvilla DALL·E  — AI image fallback
 *   3. prexzyvilla Realistic — AI image fallback
 *
 * Aliases: .gen, .img
 */
const axios = require('axios');

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY ||
    'e306xjYAc9h7E2BhXf8gACkiykLBTg23KDIad9bqeTk';

const DALLE     = 'https://apis.prexzyvilla.site/ai/dalle';
const REALISTIC = 'https://apis.prexzyvilla.site/ai/realistic';

async function fetchFromUnsplash(prompt) {
    try {
        const { data } = await axios.get('https://api.unsplash.com/photos/random', {
            params: { query: prompt, orientation: 'squarish', count: 1 },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            timeout: 30000,
        });
        const item = Array.isArray(data) ? data[0] : data;
        const url  = item?.urls?.regular || item?.urls?.full || item?.urls?.small;
        if (!url) return null;
        return { url, credit: item?.user?.name ? `Photo by ${item.user.name} on Unsplash` : 'Unsplash' };
    } catch (e) {
        console.error('[generate] Unsplash failed:', e.message);
        return null;
    }
}

async function fetchFromPrexzyvilla(endpoint, prompt) {
    try {
        const { data } = await axios.get(endpoint, { params: { prompt }, timeout: 60000 });
        if (!data || data.status !== true) return null;
        const arr = data.image_url || data.images || data.result;
        if (Array.isArray(arr) && arr.length) {
            const first = arr[0];
            const url = first?.image?.url || first?.url || (typeof first === 'string' ? first : null);
            if (url) return { url, credit: null };
        }
        if (typeof data.result === 'string') return { url: data.result, credit: null };
        if (typeof data.url === 'string')    return { url: data.url, credit: null };
        return null;
    } catch (e) {
        console.error(`[generate] ${endpoint} failed:`, e.message);
        return null;
    }
}

async function downloadImage(url) {
    try {
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 60000 });
        const buf = Buffer.from(res.data);
        if (!buf || buf.length < 1024) return null;
        return buf;
    } catch (e) {
        console.error('[generate] download failed:', e.message);
        return null;
    }
}

module.exports = {
    name: 'generate',
    aliases: ['gen', 'img'],
    description: 'Fetch / generate an image from text (.generate <prompt>)',
    category: 'ai',

    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `🎨 *Celestial Image Forge*\n\n` +
                `Usage: .generate <description>\n` +
                `Example: .generate a celestial fire dragon`
            );
        }

        const prompt = args.join(' ').trim();
        await reply('🎨 *Manifesting vision...* the Lotus Prince is working.');

        let result = await fetchFromUnsplash(prompt);
        let modelUsed = 'Unsplash';

        if (!result) {
            result = await fetchFromPrexzyvilla(DALLE, prompt);
            if (result) modelUsed = 'DALL·E 3 XL';
        }
        if (!result) {
            result = await fetchFromPrexzyvilla(REALISTIC, prompt);
            if (result) modelUsed = 'Realistic';
        }

        if (!result) {
            return reply('❌ The heavens are silent: All image providers failed. Please try a different vision.');
        }

        const buf = await downloadImage(result.url);
        if (!buf) {
            return reply('❌ A disturbance in the heavens: Image could not be downloaded.');
        }

        const creditLine = result.credit ? `\nCredit: ${result.credit}` : '';
        try {
            await sock.sendMessage(from, {
                image: buf,
                caption: `🎨 *Celestial Vision*\n\nPrompt: ${prompt}\nSource: ${modelUsed}${creditLine}\n\n> Manifested by Nezha MD`,
            }, { quoted: msg });
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    },
};
