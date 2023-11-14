import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';

import { storage } from 'src/services/firebase/firebase';

import { ref, deleteObject } from 'firebase/storage';

interface Props {
  onHandleEditBook: (item: BookType) => void;
  fetchDataBook: BookType[];
  setFetchDataBook: React.Dispatch<React.SetStateAction<BookType[]>>;
}

export default function ListBook({ onHandleEditBook, fetchDataBook, setFetchDataBook }: Props) {
  const handleDeleteBook = async (item: BookType) => {
    // const desertRef = ref(storage.app.options.databaseURL, 'images/desert.jpg');
    // Delete the file
    // deleteObject(desertRef)
    //   .then(() => {
    //     // File deleted successfully
    //     console.log('delete image success');
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //     console.log(error.message);
    //   });
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
      await fetch.delete(`${apiPaths.book}/${item.id}`);

      const filteredPosts = fetchDataBook.filter((b: BookType) => b.id !== item.id);

      toast.success('Xóa thành công');
      return setFetchDataBook(filteredPosts);
    } catch (error) {
      toast.error('Xóa thất bại');
    }
  };
  return (
    <>
      <p className="text-2xl">Danh sách sách</p>
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
                Hình ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tên sách
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tác giả
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
                Miêu tả
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
            {fetchDataBook.length > 0 &&
              fetchDataBook.slice(240, fetchDataBook.length).map((item: BookType) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 max-w-[170px]">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-50 h-50 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 max-w-[170px] overflow-hidden text-ellipsis line-clamp-5">{item.title}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.author}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.price}</td>
                  <td className="px-6 py-4 max-w-[170px]">{item.discount}</td>
                  <td className="px-6 py-4 max-w-[170px] overflow-hidden text-ellipsis line-clamp-5">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 max-w-[170px] text-left ">
                    <div className="w-full flex gap-3">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onHandleEditBook(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 bg-red-400 hover:underline"
                        onClick={() => handleDeleteBook(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
