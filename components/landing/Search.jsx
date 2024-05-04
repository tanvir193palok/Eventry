"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchparams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchparams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchparams.get("query")?.toString()}
      />
    </div>
  );
};

export default Search;
