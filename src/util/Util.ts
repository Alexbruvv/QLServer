export default {

    generateGameCode(): string {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let code = '';

        for (let i = 0; i < 8; i++) {
            code += digits[this.getRandInt(0, digits.length - 1)];
        }

        return code;
    },

    getRandInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};