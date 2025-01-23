"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  description: string;
};

export const Category = ({ items }: { items: Category[] }) => {
  const searchParams = useSearchParams();

  const newParams = (categoryId: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("categoryId", categoryId);
    updatedSearchParams.delete("q");
    return updatedSearchParams.toString();
  };

  const isActive = (categoryId: string) => {
    return searchParams.get("categoryId") == categoryId ? "underline" : "";
  };

  return (
    <section>
      <h3 className="text-xl font-bold">Categories :</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`products?${newParams(item.id)}`}
              className={`hover:underline underline-offset-4 ${isActive(
                item.id
              )}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const SortBy = ({ items }: { items: string[] }) => {
  const searchParams = useSearchParams();

  const newParams = (item: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("sortBy", item);
    updatedSearchParams.delete("q");
    return updatedSearchParams.toString();
  };

  const isActive = (item: string) => {
    return searchParams.get("sortBy") === item ? "underline" : "";
  };

  return (
    <section>
      <h3 className="text-xl font-bold">Sort By :</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={`products?${newParams(item)}`}
              className={`hover:underline underline-offset-4 ${isActive(item)}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const SortOrder = ({ items }: { items: string[] }) => {
  const searchParams = useSearchParams();

  const newParams = (item: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("sortOrder", item);
    updatedSearchParams.delete("q");
    return updatedSearchParams.toString();
  };

  const isActive = (item: string) => {
    return searchParams.get("sortOrder") === item ? "underline" : "";
  };

  return (
    <section>
      <h3 className="text-xl font-bold">Sort Order :</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={`products?${newParams(item)}`}
              className={`hover:underline underline-offset-4 ${isActive(item)}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
