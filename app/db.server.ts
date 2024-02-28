import { createPool } from "mysql2";
import { z } from "zod";

export const pool = createPool({
  host: "mysql834.umbler.com",
  port: 41890,
  user: "alunopuc",
  password: "engenharia",
  database: "agenda",
});

export const productPayloadSchema = z.object({
  nome: z.string().max(50),
  // Yeah, we shouldn't use floating point numbers to store money,
  // but that's not on my control here.
  preco: z.string().transform((arg) => Number.parseInt(arg, 10)),
  estoque: z.string().transform((arg) => Number.parseInt(arg, 10)),
});

export const productSchema = z.object({
  codigo: z.number(),
  nome: z.string().max(50),
  // Yeah, we shouldn't use floating point numbers to store money,
  // but that's not on my control here.
  preco: z.number(),
  estoque: z.number(),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>;
export type Product = z.infer<typeof productSchema>;

export async function getAll() {
  const [data] = await pool.promise().query(`
        SELECT codigo, nome, preco, estoque FROM produto
        LIMIT 100;
    `);
  if (!Array.isArray(data)) throw "unreachable";
  return data.map(productSchema.parse);
}

export async function getOne(id: number) {
  const [data] = await pool.promise().query(
    `
        SELECT codigo, nome, preco, estoque FROM produto
        WHERE codigo = ?;
    `,
    [id],
  );
  if (!Array.isArray(data)) throw "unreachable";
  if (data.length === 0) return null;
  return productSchema.parse(data[0]);
}

export async function insertProduct(product: ProductPayload) {
  await pool.promise().query(
    `
      INSERT INTO produto (nome, preco, estoque)
      VALUES (?, ?, ?);
    `,
    [product.nome, product.preco, product.estoque],
  );
}

export async function updateProduct(product: Product) {
  await pool.promise().query(
    `
      UPDATE produto
      SET nome = ?, preco = ?, estoque = ?
      WHERE codigo = ?;
    `,
    [product.nome, product.preco, product.estoque, product.codigo],
  );
}

export async function deleteProduct(id: number): Promise<void> {
  await pool.promise().query(`DELETE FROM produto WHERE codigo = ?;`, [id]);
}
