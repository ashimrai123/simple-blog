"use client";

import PostCard from "@/components/PostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

interface ClientPaginationProps {
  posts: Post[];
  postsPerPage: number;
}

const ClientPagination = ({ posts, postsPerPage }: ClientPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Total pages based on the number of posts and posts per page
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Calculate the slice of posts to display for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // Handle page switching, ensuring it's within valid bounds
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Render current page's posts */}
      <div className="grid gap-5 mt-5">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination controls */}
      <Pagination className="mt-6">
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${
                currentPage === 1 ? "opacity-50" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1} className="cursor-pointer">
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${
                currentPage === totalPages ? "opacity-50" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ClientPagination;
