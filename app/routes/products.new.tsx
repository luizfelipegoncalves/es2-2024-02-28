import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProductForm } from "~/components/product-form";
import { SubTitle } from "~/components/typography";
import { insertProduct, productPayloadSchema } from "~/db.server";

export async function action({ request }: LoaderFunctionArgs) {
  const values = Object.fromEntries(await request.formData());
  const product = productPayloadSchema.parse(values);
  await insertProduct(product);
  return redirect("/products");
}

export default function New() {
  return (
    <div className="grid gap-4">
      <SubTitle>Novo Produto</SubTitle>
      <ProductForm data={{}} />
    </div>
  );
}
