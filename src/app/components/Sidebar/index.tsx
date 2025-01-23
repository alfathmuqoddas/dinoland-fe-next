"use client";
import { usePathname, useSearchParams } from "next/navigation";
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
    return updatedSearchParams.toString();
  };

  const isActive = (categoryId: string) => {
    return searchParams.get("categoryId") === categoryId ? "underline" : "";
  };

  return (
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
  );
};

export const SortBy = ({ items }: { items: string[] }) => {
  const searchParams = useSearchParams();

  const newParams = (item: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("sortBy", item);
    return updatedSearchParams.toString();
  };

  const isActive = (item: string) => {
    return searchParams.get("sortBy") === item ? "underline" : "";
  };

  return (
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
  );
};

export const SortOrder = ({ items }: { items: string[] }) => {
  const searchParams = useSearchParams();

  const newParams = (item: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("sortOrder", item);
    return updatedSearchParams.toString();
  };

  const isActive = (item: string) => {
    return searchParams.get("sortOrder") === item ? "underline" : "";
  };

  return (
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
  );
};
