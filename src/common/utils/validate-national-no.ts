const regExp: RegExp = /^(1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10})$/

export function ValidateNationalNo(value: string): boolean {
    if (value &&
        value.length === 10 &&
        !regExp.test(value)
    ) {
        const c: number = parseInt(value.charAt(9));
        let n: number = 0;

        for (let i: number = 0; i <= 8; i++)
            n += parseInt(value.charAt(i)) * (10 - i)

        const r: number = n - parseInt(String(n / 11)) * 11;
        return (r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r);
    } else return false;

}