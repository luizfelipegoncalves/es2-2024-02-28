export type Children = {
  children: React.ReactNode;
};

export function Title(props: Children) {
  return (
    <h1 className=" text-3xl font-bold text-slate-900">{props.children}</h1>
  );
}

export function SubTitle(props: Children) {
  return (
    <h1 className=" text-xl font-bold text-slate-800">{props.children}</h1>
  );
}
