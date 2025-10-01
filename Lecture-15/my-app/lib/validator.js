export class Validator{
    static isNumeric(value){
        return /^\d+$/.test(value)
    }
    // static isEmail(value){
    //     return [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n].test(value)
    // }
}

