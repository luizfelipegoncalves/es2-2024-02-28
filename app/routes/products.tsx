import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Title } from "~/components/typography";
import { Product, getAll } from "~/db.server";

export async function loader() {
  const products = await getAll();
  return { products };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-5 md:p-10">
      <div className="mb-8 flex grow justify-between border-b border-b-slate-200 pb-4">
        <Title> Lista de Produtos</Title>
        <Link
          to="/products/new"
          className="text-md font-semibold text-blue-600 hover:underline"
        >
          (Novo)
        </Link>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="md:w-1/2">
          <ul className="grid gap-4">
            {data.products.map((product) => (
              <li key={product.codigo}>
                <ProductRow product={product} />
              </li>
            ))}
          </ul>
        </div>
        <div
          id="outlet-container"
          className="-order-1 w-full md:order-1 md:w-1/3"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ProductRow({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-sm border border-slate-100 px-4 py-3 shadow-md">
      <div className="flex w-full grow items-center justify-between">
        <Link
          className="text-md font-semibold text-blue-500 hover:underline"
          to={`/products/${product.codigo}`}
        >
          {product.nome || "Sem nome"}
        </Link>
        <samp className="text-xs text-slate-700">(x{product.estoque})</samp>
      </div>
      <div>
        <span className="text-xs text-slate-700">
          {fmt.format(product.preco)}
        </span>
      </div>
    </div>
  );
}

const fmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
