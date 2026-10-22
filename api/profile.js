/* =========================================================
   POST /api/profile
   Completa o cadastro do usuário já logado via Google:
   idade, endereço e bolo preferido (os campos que o Google
   não fornece). Exige sessão válida.
========================================================= */
const { sql } = require("@vercel/postgres");
const { getSessionUserId } = require("../lib/auth");
const { ensureUsersTable } = require("../lib/db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const uid = await getSessionUserId(req);
  if (!uid) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  const { idade, endereco, boloPreferido } = req.body || {};
  const idadeNum = parseInt(idade, 10);

  if (!idadeNum || idadeNum < 1 || idadeNum > 120 || !endereco || String(endereco).trim().length < 5 || !boloPreferido) {
    res.status(400).json({ error: "Preencha idade, endereço e bolo preferido corretamente." });
    return;
  }

  try {
    await ensureUsersTable();
    const { rows } = await sql`
      UPDATE users
      SET idade = ${idadeNum}, endereco = ${String(endereco).trim()}, bolo_preferido = ${boloPreferido}, updated_at = now()
      WHERE id = ${uid}
      RETURNING id, email, name, idade, endereco, bolo_preferido;
    `;

    const user = rows[0];
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        idade: user.idade,
        endereco: user.endereco,
        boloPreferido: user.bolo_preferido,
      },
      profileComplete: true,
    });
  } catch (err) {
    console.error("profile error:", err);
    res.status(500).json({ error: "Erro ao salvar o cadastro." });
  }
};
