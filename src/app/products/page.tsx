import React from "react";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Gagal Fecthing Data");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <div></div>;
}
