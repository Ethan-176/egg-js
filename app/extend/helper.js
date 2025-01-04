const $Interface = require("./interface.js");
const crypto = require("crypto");

// SHA256 加密算法
function sha256EncryptWithSalt(data) {
  if (!data) return "";
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex"); // 生成 64 字符长度的十六进制哈希值
}

module.exports = {
  ...$Interface,
  sha256EncryptWithSalt,
  
  Summation(...args) {
    // 如果第一个参数是数组，展开数组，否则直接使用参数
    const numbers = Array.isArray(args[0]) ? args[0] : args;
    
    // 使用 reduce 累加，过滤掉不是数字的值
    return parseFloat(
        numbers
        .reduce((sum, value) => {
          const num = Number(value); // 转换为数字
          if (!num || isNaN(num)) return sum;
          
          // 累加
          return sum + num;
        }, 0)
        .toFixed(2),
    );
  },

  checkJwtVerifyError(error) {
    if (
      String(error)?.match("JsonWebTokenError: invalid signature") ||
      String(error)?.match("TokenExpiredError: jwt expired") ||
      String(error)?.match("JsonWebTokenError: jwt malformed")
    ) {
      return true;
    }
  },

  encryptObject(liveObject) {
    const ALGORITHM = "aes-256-cbc";
    const HEX_KEY =
      "b0f6ab4f4ae69f78150b5ab2ee042ed140f0ce336540adcce9af70ab95e7854e" ||
      crypto.randomBytes(32).toString("hex");
    const KEY = Buffer.from(HEX_KEY, "hex");

    const iv = crypto.randomBytes(16); // 随机生成 iv
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(JSON.stringify(liveObject), "utf8", "base64");
    encrypted += cipher.final("base64");
    // 将 iv 和密文拼接在一起
    return `${iv.toString("base64")}:${encrypted}`;
  },

  decryptObject(密文) {
    const ALGORITHM = "aes-256-cbc";
    const HEX_KEY =
      "e61112e499fd0acaf694f715f7e90c3fab74bb104dacbca8675031df26ed04ce";
    const KEY = Buffer.from(HEX_KEY, "hex");

    const [iv, encrypted] = 密文.split(":"); // 分离 iv 和密文
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(iv, "base64"),
    );
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  },
};
