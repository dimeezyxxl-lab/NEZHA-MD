/**
 * Spell Command — Check common spelling of a word
 * Usage: .spell <word>
 */
const commonMistakes = {
    'recieve':'receive','occured':'occurred','seperate':'separate','definately':'definitely',
    'existance':'existence','independant':'independent','persue':'pursue','calender':'calendar',
    'beleive':'believe','freind':'friend','accomodate':'accommodate','aquire':'acquire',
    'arguement':'argument','concious':'conscious','enviroment':'environment','goverment':'government',
    'maintainance':'maintenance','neccessary':'necessary','occurence':'occurrence','priviledge':'privilege',
    'publically':'publicly','reccommend':'recommend','restarant':'restaurant','suprise':'surprise',
    'tommorrow':'tomorrow','untill':'until','wierd':'weird','writting':'writing',
};

module.exports = {
    name: 'spell',
    aliases: ['spellcheck', 'spelling'],
    description: 'Check the spelling of a word',
    category: 'ai',
    async execute({ reply, args }) {
        if (!args.length) return reply(
            '✏️ *Celestial Scribe: Spell Check*\n\n' +
            'Usage: .spell <word>\n' +
            'Example: .spell recieve'
        );
        
        const word = args[0].toLowerCase().trim();
        const correction = commonMistakes[word];
        
        if (correction) {
            return reply(
                `✏️ *Celestial Scribe*\n\n` +
                `❌ A distortion in the script: *${word}*\n` +
                `✅ The true form: *${correction}*`
            );
        }
        
        reply(
            `✏️ *Celestial Scribe*\n\n` +
            `✅ "*${word}*" is inscribed correctly in the celestial records!\n\n` +
            `_Note: Only common mortal misspellings are detected._`
        );
    }
};
