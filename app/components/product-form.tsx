import { useId } from "react";
import { Product } from "~/db.server";

export type ProductFormProps = {
  data: Partial<Product>;
};

export function ProductForm(props: ProductFormProps) {
  return (
    <form method="POST" className="flex flex-col gap-4">
      <input type="hidden" name="_intent" value="product" />

      <FormControl
        type="text"
        name="nome"
        label="Nome do produto"
        defaultValue={props.data.nome}
      />
      <FormControl
        type="number"
        name="preco"
        label="Preço"
        defaultValue={props.data.preco}
      />
      <FormControl
        type="number"
        name="estoque"
        label="Estoque"
        defaultValue={props.data.estoque}
      />
      <div className="flex w-full justify-end">
        <button className="rounded-md bg-blue-500 px-3 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-blue-900">
          Salvar
        </button>
      </div>
    </form>
  );
}

type FormControlProps = {
  name: string;
  label: string;
  defaultValue?: string | number;
  type: HTMLInputElement["type"];
};

export function FormControl(props: FormControlProps) {
  const id = `${props.name}::${useId()}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-slate-700">
        {props.label}
      </label>
      <input
        name={props.name}
        id={id}
        type={props.type}
        required
        defaultValue={props.defaultValue}
        className="text-md flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 shadow-sm"
      />
    </div>
  );
}
