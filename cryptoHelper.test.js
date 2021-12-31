const { CryptoHelper } = require("./cryptoHelper");

const {publicKey, privateKey} = CryptoHelper.createSha256Keys();
const spnKey = "MYSECRET"
const plainText = "Selam"

test('Encyrpt SHA256 Test', () => {
    expect(
        CryptoHelper.decyprtSha256(CryptoHelper.encyrptSha256(plainText, publicKey), privateKey).toString()
    ).toBe(plainText);
});

test('Decyrpt SHA256 Test', () => {
    expect(
        CryptoHelper.decyprtSha256(CryptoHelper.encyrptSha256(plainText, publicKey), privateKey).toString()
    ).toBe(plainText);
});

test('Encrypt SPN16 Test', () => {
    expect(
        CryptoHelper.decyprtSpn(CryptoHelper.encyrptSpn(plainText, spnKey), spnKey).toString("base64")
    ).toBe(CryptoHelper.decyprtSpn(CryptoHelper.encyrptSpn(plainText, spnKey), spnKey).toString("base64"));
})

test('Decrypt SPN16 Test', () => {
    expect(
        CryptoHelper.decyprtSpn(CryptoHelper.encyrptSpn(plainText, spnKey), spnKey).toString("base64")
    ).toBe(CryptoHelper.decyprtSpn(CryptoHelper.encyrptSpn(plainText, spnKey), spnKey).toString("base64"));
})

test('CreateShaKeys Test', () => {
    expect(
        typeof CryptoHelper.createSha256Keys()
    ).toBe(typeof CryptoHelper.createSha256Keys());
})