import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListNotification from './ListNotification';

const formNotification = {
  id: '',
  title: '',
  content: '',
  notificationDate: '',
  userEmail: '',
  idUsers: '',
};
export default function FormNotification() {
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationEdit, setNotificationEdit] = useState(false);
  const [dataNotification, setDataNotification] = useState(formNotification);
  const [fetchDataNotification, setFetchDataNotification] = useState<any[]>([]);

  console.log(dataNotification.idUsers);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/notifications')
      .then((res) => setFetchDataNotification(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addNotification = () => {
    try {
      axios
        .post(
          'http://localhost:8080/api/v1/notifications/create/all-users',
          {
            title: dataNotification.title,
            content: dataNotification.content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(() => {
          toast.success('Thêm thành công');
          setNotificationLoading(false);
          setFetchDataNotification((prev) => [
            ...prev,
            {
              id: dataNotification.id,
              title: dataNotification.title,
              content: dataNotification.content,
              notificationDate: dataNotification.notificationDate,
              userEmail: dataNotification.userEmail,
            },
          ]);
        })
        .catch(() => {
          toast.error('Thêm thất bại');
        });

      setDataNotification(formNotification);
    } catch (error) {
      toast.error('Thêm thất bại');
    }
  };

  const addNotificationUser = (idUsers: string) => {
    try {
      axios
        .post(
          `http://localhost:8080/api/v1/notifications/create/${idUsers}`,
          {
            title: dataNotification.title,
            content: dataNotification.content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(() => {
          toast.success('Thêm thành công');
          setNotificationLoading(false);
          setFetchDataNotification((prev) => [
            ...prev,
            {
              id: dataNotification.id,
              title: dataNotification.title,
              content: dataNotification.content,
              notificationDate: dataNotification.notificationDate,
              userEmail: dataNotification.userEmail,
              idUsers: dataNotification.idUsers,
            },
          ]);
        })
        .catch(() => {
          toast.error('Thêm thất bại');
        });

      setDataNotification(formNotification);
    } catch (error) {
      toast.error('Thêm thất bại');
    }
  };

  const handleAddNotification = async (e: any) => {
    e.preventDefault();
    setNotificationLoading(true);
    // Kiểm tra giá trị select là 'all' hay không
    if (dataNotification.idUsers === 'all') {
      addNotification();
    } else {
      // Ngược lại, nếu giá trị select không phải 'all', gọi hàm addNotificationUser với giá trị idUsers tương ứng
      addNotificationUser(dataNotification.idUsers);
    }
  };

  const handleEditNotification = (item: any) => {
    setDataNotification((prev) => ({
      ...prev,
      id: item.id,
      title: item.title,
      content: item.content,
      idUsers: item.idUsers,
    }));
    setNotificationEdit(true);
  };

  const handleUpdateNotification = (e: any) => {
    setNotificationLoading(true);
    e.preventDefault();
    setTimeout(async () => {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/notifications/update/${dataNotification.id}`,
          {
            title: dataNotification.title,
            content: dataNotification.content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        setNotificationLoading(false);
        setNotificationEdit(false);
        toast.success('Update thành công');
        setFetchDataNotification((prev) =>
          prev.map((item) =>
            item.id === dataNotification.id
              ? {
                  ...item,
                  title: dataNotification.title,
                  content: dataNotification.content,
                }
              : item,
          ),
        );
      } catch (error) {
        toast.error('Update thất bại');
      }
    }, 2000);
  };

  const handleResetForm = () => {
    setDataNotification((prev) => ({
      ...prev,
      id: '',
      title: '',
      content: '',
      idUsers: '',
    }));
  };

  return (
    <>
      <div className="w-full h-auto shadow-lg p-5 border-[1px] rounded-xl">
        <div className="flex relative pb-5">
          <form className="w-full">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                {/* <input
                  type="text"
                  value={dataNotification.id}
                  className="hidden"
                /> */}
                <input
                  type="text"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={dataNotification.title}
                  onChange={(e: any) => setDataNotification((prev) => ({ ...prev, title: e.target.value }))}
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tiêu đề
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <select
                  value={dataNotification.idUsers}
                  onChange={(e) => setDataNotification((prev) => ({ ...prev, idUsers: e.target.value }))}
                >
                  <option value="">Chọn người dùng</option>
                  <option value="all">Tất cả</option>
                  {fetchDataNotification
                    .reduce((uniqueOptions: any[], option: any) => {
                      // Kiểm tra xem giá trị đã tồn tại trong danh sách chưa
                      const isOptionExist = uniqueOptions.find((item) => item.idUsers === option.idUsers);
                      // Nếu chưa tồn tại, thêm vào danh sách
                      if (!isOptionExist) {
                        uniqueOptions.push(option);
                      }
                      return uniqueOptions;
                    }, [])
                    .map((option: any, index: number) => (
                      <option
                        key={index}
                        value={option.idUsers}
                      >
                        {option.userEmail}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nội dung
              </label>
              <textarea
                id="description"
                rows={4}
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập nội dung..."
                value={dataNotification.content}
                onChange={(e: any) => setDataNotification((prev) => ({ ...prev, content: e.target.value }))}
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                // type="submit"
                disabled={notificationLoading ? true : false}
                className={
                  notificationEdit
                    ? 'bg-orange-300 text-white  hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    : ' bg-green-400 text-white  hover:bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-[96px] sm:w-auto px-5 py-2.5 text-center'
                }
                onClick={notificationEdit ? handleUpdateNotification : handleAddNotification}
              >
                {notificationLoading ? (
                  <Icon
                    icon={'mingcute:loading-fill'}
                    fontSize={24}
                    className="animate-spin"
                  />
                ) : notificationEdit ? (
                  'Sửa'
                ) : (
                  'Tạo mới'
                )}
              </button>
              {notificationEdit ? (
                <button
                  type="submit"
                  className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
                  onClick={() => setNotificationEdit(false)}
                >
                  Cancel
                </button>
              ) : (
                <>
                  {/* <button
                    type="submit"
                    className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Xóa
                  </button> */}
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    onClick={handleResetForm}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <ListNotification
        fetchDataNotification={fetchDataNotification}
        setFetchDataNotification={setFetchDataNotification}
        onHandleEditNotification={handleEditNotification}
      />
    </>
  );
}
