import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-cache",
  });
  if (!res.ok) {
    // throw new Error("Gagal Fecthing Data");
    return res.json();
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td className="w-20">$ {product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
