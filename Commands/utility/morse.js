/**
 * Morse — Initiate Ancient Signal
 * Usage: .morse <encode/decode> <message/code>
 */

const MORSE = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
const RMORSE = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

module.exports = {
    name: 'morse',
    aliases: ['morsecode', 'ancient', 'signal'],
    description: 'Translate communication into the rhythmic Ancient Signal.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `📡 *Ancient Signal*\n\n` +
                `The Lotus Prince translates your intent into rhythmic pulses.\n\n` +
                `Usage:\n` +
                `• .morse encode [text]\n` +
                `• .morse decode [signal]\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const mode = args[0].toLowerCase();
        const input = args.slice(1).join(' ');
        
        if (mode === 'encode') {
            const result = input.toUpperCase().split('').map(c => c === ' ' ? '/' : (MORSE[c] || '?')).join(' ');
            return reply(
                `📡 *Ancient Signal Encoded*\n\n` +
                `Original: ${input}\n` +
                `Pulses: \`${result}\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } else if (mode === 'decode') {
            const result = input.split(' / ').map(word => word.split(' ').map(c => RMORSE[c] || '?').join('')).join(' ');
            return reply(
                `📡 *Ancient Signal Decoded*\n\n` +
                `Pulses: ${input}\n` +
                `Message: *${result}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        reply('❌ _The mode is unrecognized by the Lotus Prince. Use `encode` or `decode`._');
    }
};
