const { CryptoHelper } = require("./cryptoHelper");

const {publicKey, privateKey} = CryptoHelper.createSha256Keys();
const plainText = "Selam"

test('Encyrpt SHA256 Test', () => {
    expect(
        CryptoHelper.decyprtSha256(CryptoHelper.encyrptSha256(plainText, publicKey), privateKey).toString()
    ).toBe(plainText);
});

