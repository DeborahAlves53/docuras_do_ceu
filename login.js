/* =========================================================
   POST /api/login
   Login com e-mail e senha para quem já tem conta.
========================================================= */
const { sql } = require("@vercel/postgres");
const { createSessionToken, setSessionCookie } = require("../lib/auth");
const { ensureUsersTable } = require("../lib/db");
const { verifyPassword } = require("../lib/password");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const { email, senha } = req.body || {};
  const emailNorm = String(email || "").trim().toLowerCase();

  if (!emailNorm || !senha) {
    res.status(400).json({ error: "Preencha e-mail e senha." });
    return;
  }

  try {
    await ensureUsersTable();

    const { rows } = await sql`
      SELECT id, email, password_hash, name, celular, idade, endereco, bolo_preferido
      FROM users WHERE email = ${emailNorm};
    `;

    if (!rows.length) {
      res.status(401).json({ error: "E-mail ou senha incorretos." });
      return;
    }

    const user = rows[0];
    const ok = await verifyPassword(String(senha), user.password_hash);
    if (!ok) {
      res.status(401).json({ error: "E-mail ou senha incorretos." });
      return;
    }

    const token = await createSessionToken(user.id);
    setSessionCookie(res, token);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        celular: user.celular,
        idade: user.idade,
        endereco: user.endereco,
        boloPreferido: user.bolo_preferido,
      },
      profileComplete: Boolean(user.idade && user.endereco && user.bolo_preferido),
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "Erro ao entrar. Tente novamente." });
  }
};
