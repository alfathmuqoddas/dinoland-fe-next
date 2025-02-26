"use client";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchForm = () => {
  const searchParams = useSearchParams();

  return (
    <Form action="/products" className="relative w-80 mx-auto">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full border bg-transparent rounded-md px-4 py-2 border-gray-600 focus:border-pink-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <Search className="h-4 text-white" />
      </div>
    </Form>
  );
};

export default SearchForm;
