import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import EditAddress from './EditAddress';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

interface ListAddressProps {
  changeToForm: () => void;
}

function ListAddress(props: ListAddressProps) {
  function addAddress() {
    props.changeToForm();
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  const user: any = useSelector((state: RootState) => state.user.userData);

  // Tạo danh sách các địa chỉ mặc định (isactive = true)
  const defaultAddresses = user.listAddress.filter((address: any) => address.isactive === true);

  // Tạo danh sách các địa chỉ không phải mặc định (isactive = false)
  const otherAddresses = user.listAddress.filter((address: any) => address.isactive === false);

  // Hàm để mở form chỉnh sửa
  function editAddress(id: string) {
    setIsEditing(true);
    setEditId(id);
    console.log(id);
  }

  // Hàm để đóng form chỉnh sửa và quay lại danh sách
  function closeEdit() {
    setIsEditing(false);
    setEditId(''); // Reset giá trị id khi đóng form
  }

  async function deleteAdress(id: string) {
    try {
      // Gửi yêu cầu POST đến API đăng ký
      const response = await axios.delete(`http://localhost:8080/api/v1/user/rest/address/delete/${id}`);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Xóa địa chỉ thành công');
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      // Xử lý lỗi nếu có
      toast.error(error.message);
    }
  }

  return (
    <>
      {/* Các phần code khác */}
      {isEditing ? (
        <EditAddress
          id={editId}
          changeToList={closeEdit}
        /> // Hiển thị form chỉnh sửa nếu isEditing === true
      ) : (
        <>
          <div className="px-5 py-4 shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className=" uppercase text-lg font-bold">Sổ địa chỉ</h1>
              {/* <button
                className="bg-[#C92127] text-white uppercase px-5 py-2 rounded-lg"
                onClick={addAddress}
              >
                Thêm địa chỉ mới
              </button> */}
            </div>

            <div className="bg-[#f8f8fc] mt-3">
              <button
                onClick={addAddress}
                className="border-dotted border-2 rounded-lg border-sky-200 w-full flex justify-center items-center py-4"
              >
                <div className="flex items-center text-xl text-[#1230b0]">
                  <Icon icon="iconamoon:sign-plus-fill" />
                  <span className="px-2">Thêm địa chỉ mới</span>
                </div>
              </button>
            </div>

            {/* Địa chỉ Mặc định */}
            {defaultAddresses.map((address: any) => (
              <div className="bg-[#f8f8fc] shadow-md rounded-lg mt-4">
                <div className="grid grid-cols-4 items-center py-4 px-3">
                  {/* Address */}
                  <div
                    className="w-full col-span-3"
                    key={address.id}
                  >
                    <div className="flex">
                      <div className="font-bold">
                        {address.lastname} {address.firstname}
                      </div>
                      <div className="bg-gray-200 rounded-lg mx-5">
                        <span className="px-2 text-indigo-600 uppercase font-medium">Mặc định</span>
                      </div>
                    </div>
                    <div className="mt-3 flex">
                      <div className="font-medium max-w-full">
                        <span className="">Địa chỉ:</span>
                      </div>
                      <div className="w-[550px]">
                        <p className="ml-1 text-gray-600 ">
                          {address.address}, {address.ward}, {address.district}, {address.city}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="font-medium">Số điện thoại: </div>
                      <span className="px-1 text-gray-600">{address.phone}</span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => editAddress(address.id)}
                      className="border-2 border-red-500 rounded-lg px-5 py-1"
                    >
                      <span className="text-red-600 text-lg font-medium">Chỉnh sửa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Địa chỉ khác */}
            <div className="overflow-y-auto h-[500px] my-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar_div scrollbar-track-slate-300">
              {otherAddresses.map((address: any, index: number) => (
                <div className="bg-[#f8f8fc] shadow-md rounded-lg mb-4">
                  <div className="grid grid-cols-4 items-center py-4 px-3">
                    {/* Address */}
                    <div
                      className="w-full col-span-3"
                      key={address.id}
                    >
                      <div className="font-bold">
                        {address.lastname} {address.firstname}
                      </div>
                      <div className="mt-3 flex">
                        <div className="font-medium max-w-full">
                          <span className="">Địa chỉ:</span>
                        </div>
                        <div className="w-[550px]">
                          <p className="ml-1 text-gray-600 ">
                            {address.address}, {address.ward}, {address.district}, {address.city}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <div className="font-medium">Số điện thoại: </div>
                        <span className="px-1 text-gray-600">{address.phone}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-2 ">
                      <div>
                        <button
                          onClick={() => editAddress(address.id)}
                          className="border-2 border-red-500 rounded-lg px-5 py-1"
                        >
                          <span className="text-red-600 text-lg font-medium">Chỉnh sửa</span>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => deleteAdress(address.id)}
                          className="border-2 border-gray-300 rounded-lg px-5 py-1"
                        >
                          <span className="text-lg font-medium">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ListAddress;
