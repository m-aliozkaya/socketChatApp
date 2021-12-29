const crypto = require("crypto");
const { SPN16 } = require("./spn16");

class CryptoHelper {
  static createKeys() {
    let keys = this.createSha256Keys();
    keys.spnKey = "mySecret";
    return keys;
  }

  static encyrptSha256(data, publicKey) {
    return crypto
      .publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(data)
      )
  }

  static decyprtSha256(data, privateKey) {
    return crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },data)
  }

  static encyrptSpn(data, key) {
    return SPN16.Messageencrypt(data, key)
  }

  static decyprtSpn(data, key) {
    return SPN16.Messagedecrypt(data, key)
  }
  
  static createSha256Keys() {
    return crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048, //for secure hashing length of a hashfunction
    });
  }

}

module.exports.CryptoHelper = CryptoHelper;
