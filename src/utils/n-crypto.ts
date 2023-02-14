/* eslint-disable no-console */
import Crypto from 'crypto-js';
// 密钥是1234567890000000用jsfuck加密 网址:http://www.jsfuck.com 注意：eval Source 和 Run In Parent Scope不要打勾。否则会在IE上跑不通
// @ts-ignore
const httpKey = [+!+[]] + [!+[] + !+[]] + [!+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [+[]] + [+[]] + [+[]] + [+[]] + [+[]] + [+[]] + [+[]];


const key = Crypto.enc.Utf8.parse(httpKey);
const iv = Crypto.enc.Utf8.parse(httpKey);

export function encrypt(word: unknown): string | undefined {
  let srcs: Crypto.lib.WordArray | null = null;
  let encrypted: Crypto.lib.CipherParams | null = null;
  if (!word) {
    return '';
  }
  if (typeof word === 'string') {
    srcs = Crypto.enc.Utf8.parse(word);
  } else if (typeof word === 'object') {
    try {
      srcs = Crypto.enc.Utf8.parse(JSON.stringify(word));
    } catch (error) {
      srcs = null;
      console.log('JSON解析出错', error);
    }
  }
  if (srcs) {
    encrypted = Crypto.AES.encrypt(srcs, key, {
      iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });
  }

  return encrypted?.ciphertext.toString();
}

export function decrypt(word: string): string | undefined {
  const encryptedHexStr = Crypto.enc.Hex.parse(word);
  const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
  const decrypted = Crypto.AES.decrypt(srcs, key, {
    iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7,
  });
  const decryptedStr = decrypted.toString(Crypto.enc.Utf8);
  return decryptedStr.toString();
}

export default {};
