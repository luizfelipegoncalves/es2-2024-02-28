import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductForm } from "~/components/product-form";
import { SubTitle } from "~/components/typography";
import {
  deleteProduct,
  getOne,
  productPayloadSchema,
  updateProduct,
} from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number.parseInt(params.id || "-1", 10);
  const product = await getOne(id);
  if (!product) {
    throw redirect("/products");
  }
  return { product };
}

export async function action({ params, request }: LoaderFunctionArgs) {
  const id = Number.parseInt(params.id || "-1", 10);
  const values = Object.fromEntries(await request.formData());
  if (typeof values._intent !== "string") throw "unexpected";

  console.log(values);
  switch (values._intent) {
    case "product": {
      const product = productPayloadSchema.parse(values);
      await updateProduct(
        Object.assign(product, {
          codigo: id,
        }),
      );
      break;
    }
    case "delete": {
      await deleteProduct(id);
      break;
    }
  }
  return redirect("/products");
}

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="grid gap-4">
      <div className="flex w-full justify-between border-b border-slate-200 pb-3">
        <SubTitle>Ver Produto</SubTitle>
        <form method="POST">
          <input type="hidden" name="_intent" value="delete" />
          <button
            type="submit"
            className="font-semibold text-red-600 hover:underline"
          >
            (Excluir)
          </button>
        </form>
      </div>
      <ProductForm data={product} />
    </div>
  );
}
