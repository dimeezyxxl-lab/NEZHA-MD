/**
 * Roman — Transmute into Ancient Script
 * Usage: .roman <number/roman>
 */

function toRoman(num) {
    const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    vals.forEach((v, i) => { while (num >= v) { result += syms[i]; num -= v; } });
    return result;
}

function fromRoman(str) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        const cur = map[str[i]], next = map[str[i + 1]];
        result += (next > cur) ? -cur : cur;
    }
    return result;
}

module.exports = {
    name: 'roman',
    aliases: ['romannum', 'ancient', 'imperial'],
    description: 'Transmute numbers into the Ancient Script of Rome.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🏛️ *Ancient Script*\n\n` +
                `The Lotus Prince translates your digits into the symbols of old.\n\n` +
                `Usage:\n` +
                `• .roman 2026\n` +
                `• .roman MMXXVI\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const input = args[0].toUpperCase();

        if (/^[IVXLCDM]+$/.test(input)) {
            const num = fromRoman(input);
            return reply(
                `🏛️ *Ancient Script Deciphered*\n\n` +
                `Symbol: ${input}\n` +
                `Value: *${num}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const num = parseInt(input);
        if (isNaN(num) || num < 1 || num > 3999) {
            return reply('❌ _The script is illegible; provide a value between 1 and 3999._');
        }

        reply(
            `🏛️ *Ancient Script Manifested*\n\n` +
            `Value: ${num}\n` +
            `Symbol: *${toRoman(num)}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
