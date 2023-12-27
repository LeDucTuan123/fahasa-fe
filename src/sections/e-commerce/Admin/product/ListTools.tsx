import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { storage } from 'src/services/firebase/firebase';

import { deleteObject, ref } from 'firebase/storage';
import { ToolType } from 'src/types/tool';

interface Props {
  onHandleEditTool: (item: ToolType) => void;
  fetchDataTool: ToolType[];
  setFetchDataTool: React.Dispatch<React.SetStateAction<ToolType[]>>;
}

export default function ListTools({ onHandleEditTool, fetchDataTool, setFetchDataTool }: Props) {
  const handleDeleteTool = async (item: ToolType) => {
    try {
      if (item.images) {
        const urlImage = ref(storage, item.images);
        const desertRef = ref(storage, urlImage.fullPath);

        // Delete the file
        await deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            return toast.error('Xóa ảnh thất bại, vui lòng thử lại');
          });
      }
      await fetch.delete(`${apiPaths.school}/${item.id}`);

      const filteredPosts = fetchDataTool.filter((t: any) => t[0].id !== item.id);
      console.log(filteredPosts);
      toast.success('Xóa thành công');
      return setFetchDataTool(filteredPosts);
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const filteredTools = fetchDataTool.filter((tool: any) =>
    tool[0].title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredTools.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItem = filteredTools.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="flex justify-between">
        <p className="text-2xl font-bold ">Danh sách</p>
        <div className="flex items-center justify-end">
          <input
            type="text"
            placeholder="Search by tool name"
            className="border p-2"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-[1px] rounded-xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-[15px]">
              <th
                scope="col"
                className="px-6 py-3"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tên dụng cụ
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Thương hiệu
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Hình ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Giá
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Giảm giá
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleItem.length > 0 &&
              visibleItem[0] &&
              visibleItem.map((item: any) => (
                <tr
                  key={item[0].id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item[0].id}
                  </th>
                  <td className="px-6 py-4 max-w-[170px]">{item[0].title}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item[0].brand}</td>
                  <td className="px-6 py-4 max-w-[170px]">
                    <img
                      src={item[0].images}
                      alt={item[0].title}
                      className="w-50 h-50 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 max-w-[170px]">{item[0].price}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item[0].discount}</td>
                  <td className="px-6 py-4 max-w-[170px] text-left">
                    <div className="w-full flex gap-3">
                      <button
                        className="bg-orange-300 text-white hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => onHandleEditTool({ ...item[0], category: { id: item[1] } })}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-orange-300 text-white hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => handleDeleteTool(item[0])}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Previous
          </button>
          <span className="mx-2 my-2 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
