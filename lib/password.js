/* =========================================================
   lib/password.js
   Hash e verificação de senha com scrypt (módulo nativo do
   Node, "crypto") — não depende de instalar nenhum pacote
   novo. Guarda no banco uma string "salt:hash" por usuário.
========================================================= */
const { scrypt, randomBytes, timingSafeEqual } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);
const KEY_LEN = 64;

async function hashPassword(plain) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(plain, salt, KEY_LEN);
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(plain, stored) {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hashHex] = stored.split(":");
  const derived = await scryptAsync(plain, salt, KEY_LEN);
  const storedBuf = Buffer.from(hashHex, "hex");
  if (storedBuf.length !== derived.length) return false;
  return timingSafeEqual(storedBuf, derived);
}

module.exports = { hashPassword, verifyPassword };
