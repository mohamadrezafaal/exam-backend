const CCrypto = require('crypto-js');

export class EncryptionHelper {

    private secretKey: string = "bc47bf31bbcf7253843252673196538be0de0493967ed2a1c7a3e423e9861b19";

    constructor() {}

    getSecretKey() {
        return this.secretKey;
    }

    generateSecretKey() {
        const keySize = 32; // 256 bits
        return CCrypto.lib.WordArray.random(keySize).toString();
    }

    encryptSHA256(data, secretKey) {
        const secretKeyWordArray = CCrypto.enc.Utf8.parse(secretKey);
        const encrypted = CCrypto.AES.encrypt(data, secretKeyWordArray, {
            mode: CCrypto.mode.CBC,
            padding: CCrypto.pad.Pkcs7,
            iv: CCrypto.lib.WordArray.create([0]),
        });
        return encrypted.toString();
    }

    decryptSHA256(data, secretKey) {
        const secretKeyWordArray = CCrypto.enc.Utf8.parse(secretKey);
        const encrypted = CCrypto.AES.decrypt(data, secretKeyWordArray, {
            mode: CCrypto.mode.CBC,
            padding: CCrypto.pad.Pkcs7,
            iv: CCrypto.lib.WordArray.create([0]),
        });
        return encrypted.toString(CCrypto.enc.Utf8);
    }
}
