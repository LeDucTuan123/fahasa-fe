import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';

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
  return (
    <>
      <p className="text-2xl">Danh sách dụng cụ</p>
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
            {fetchDataTool.length > 0 &&
              fetchDataTool[0] &&
              fetchDataTool.map((item: any) => (
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
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onHandleEditTool({ ...item[0], category: { id: item[1] } })}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 bg-red-400 hover:underline"
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
      </div>
    </>
  );
}
