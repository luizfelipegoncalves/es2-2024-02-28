import { redirect } from "@remix-run/node";

export const loader = async () => {
    throw redirect("/products", 302);
};