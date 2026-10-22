/* =========================================================
   GET /api/me
   Devolve os dados do usuário logado (lendo o cookie de
   sessão) e se o cadastro (idade/endereço/bolo) já está
   completo. 401 se não houver sessão válida.
========================================================= */
const { sql } = require("@vercel/postgres");
const { getSessionUserId } = require("../lib/auth");
const { ensureUsersTable } = require("../lib/db");

module.exports = async (req, res) => {
  try {
    const uid = await getSessionUserId(req);
    if (!uid) {
      res.status(401).json({ error: "Não autenticado." });
      return;
    }

    await ensureUsersTable();
    const { rows } = await sql`
      SELECT id, email, name, celular, idade, endereco, bolo_preferido
      FROM users WHERE id = ${uid};
    `;

    if (!rows.length) {
      res.status(401).json({ error: "Sessão inválida." });
      return;
    }

    const user = rows[0];
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
    console.error("me error:", err);
    res.status(500).json({ error: "Erro ao carregar sessão." });
  }
};
