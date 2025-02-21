"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Edit() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const { name, description, price } = product;
  return (
    <>
      {product ? (
        <>
          <div>{name}</div>
          <div>{description}</div>
          <div>{price}</div>
        </>
      ) : (
        <>No Product exist</>
      )}
    </>
  );
}
