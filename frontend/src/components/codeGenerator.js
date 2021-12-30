export default function GenerateCode(digits) {
    var code = ""
    for (var i=0; i<digits; i++) {
        const determiner = Math.random()
        if (determiner >= 0.5) {
            const alphabet = "abcdefghijklmnopqrstuvwxyz"
            code += alphabet[Math.floor(Math.random() * alphabet.length)]
        } else {
            code += Math.floor((Math.random()*10)).toString()
        }
    }
    return code
}