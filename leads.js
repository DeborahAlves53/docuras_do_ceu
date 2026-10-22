/* =========================================================
   GET /api/leads
   Lista todos os usuários cadastrados (via login Google) para
   o painel admin.html. Protegida por um header simples com a
   senha do admin (ADMIN_SECRET) — não é um sistema de conta,
   só evita deixar a lista de clientes pública.
========================================================= */
const { sql } = require("@vercel/postgres");
const { ensureUsersTable } = require("../lib/db");

module.exports = async (req, res) => {
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = req.headers["x-admin-secret"];

  if (!adminSecret) {
    res.status(500).json({ error: "ADMIN_SECRET não configurado no servidor." });
    return;
  }
  if (!provided || provided !== adminSecret) {
    res.status(401).json({ error: "Senha incorreta." });
    return;
  }

  try {
    await ensureUsersTable();
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS celular text;`;
    const { rows } = await sql`
      SELECT id, email, name, celular, idade, endereco, bolo_preferido, created_at
      FROM users
      ORDER BY created_at DESC;
    `;
    res.status(200).json({
      leads: rows.map((r) => ({
        id: r.id,
        email: r.email,
        nome: r.name,
        celular: r.celular,
        idade: r.idade,
        endereco: r.endereco,
        boloPreferido: r.bolo_preferido,
        criadoEm: r.created_at,
      })),
    });
  } catch (err) {
    console.error("leads error:", err);
    res.status(500).json({ error: "Erro ao carregar os cadastros." });
  }
};
