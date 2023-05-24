"use client";

import { useRouter } from "next/navigation";

import { PaginationProps } from "@types";
import { updateSearchParams } from "@utils";

const Pagination = ({ pageNumber = 1, isNext }: PaginationProps) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + (type === "prev" ? -1 : 1)) * 10;

    // Update the "limit" search parameter in the URL with the new value
    const newPathname = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathname);
  };

  return (
    <div className='w-full flex justify-center items-center gap-5 mt-10'>
      <button
        disabled={pageNumber <= 1}
        className={`border-none outline-none px-4 py-2 rounded-md ${
          pageNumber <= 1 ? "bg-gray-200 text-white" : "bg-primary-purple-100"
        }`}
        onClick={() => {
          if (pageNumber > 1) {
            handleNavigation("prev");
          }
        }}
      >
        Prev
      </button>
      <p className='text-sm font-bold'>{pageNumber || 1}</p>
      <button
        disabled={isNext}
        className={`border-none outline-none px-4 py-2 rounded-md ${
          isNext ? "bg-gray-200 text-white" : "bg-primary-purple-100"
        }`}
        onClick={() => handleNavigation("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;