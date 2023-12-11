import React, { useEffect } from 'react';
import './Pagination.css';

export const resetPagination = () => {
  // Logic reset của bạn ở đây
};

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  resetPagination: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  resetPagination,
}) => {
  const pages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Trong useEffect của Pagination
  useEffect(() => {
    // Gọi hàm reset khi totalPosts thay đổi và currentPage nằm ngoài khoảng trang có sẵn
    if (currentPage > pages && currentPage <= totalPosts) {
      resetPagination(); // Chuyển resetPagination vào đây nếu muốn gọi reset chỉ khi điều kiện đúng
      setCurrentPage(pages);
    }

    // Nếu muốn reset trang mỗi khi totalPosts thay đổi
    // resetPagination(); // Chuyển resetPagination vào đây nếu muốn gọi reset mỗi khi totalPosts thay đổi
  }, [totalPosts, currentPage, pages, setCurrentPage, resetPagination]);

  return (
    <div className='pagination'>
      {Array.from({ length: pages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={index + 1 === currentPage ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;