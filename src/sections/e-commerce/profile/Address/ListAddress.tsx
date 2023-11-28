import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import EditAddress from './EditAddress';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        <div className="p-7 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-[#C92127] uppercase text-lg mt-5 font-bold">Sổ địa chỉ</h1>
            <button
              className="bg-[#C92127] text-white uppercase px-5 py-2 rounded"
              onClick={addAddress}
            >
              Thêm địa chỉ mới
            </button>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div className="pr-4">
              <h2 className="font-bold uppercase">Địa chỉ mặc định</h2>
              <ul className="mt-3">
                {defaultAddresses.map((address: any) => (
                  <div key={address.id}>
                    <h2 className="font-medium ">Địa chỉ thanh toán mặc định</h2>
                    <ul className="mt-3">
                      <li>
                        {address.firstname} {address.lastname}
                      </li>
                      <li>{address.phone}</li>

                      <li>{address.address}</li>

                      <li>
                        {address.ward}, {address.district}, {address.city}
                      </li>
                      <button
                        onClick={() => editAddress(address.id)}
                        className="text-[#C92127] hover:cursor-pointer hover:font-bold font-semibold mt-1 inline-block"
                      >
                        Thay đổi địa chỉ thanh toán
                      </button>
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold uppercase">Địa chỉ khác</h2>
              <ul className="mt-3">
                {otherAddresses.map((address: any, index: number) => (
                  <div key={address.id}>
                    <h2 className="font-bold uppercase">Địa chỉ {index + 1}</h2>
                    <ul className="mt-3">
                      <li>
                        {address.firstname} {address.lastname}
                      </li>
                      <li>{address.phone}</li>
                      <li>
                        {address.address}, {address.ward}, {address.district}, {address.city}
                      </li>
                      <li className="divide-x">
                        <button
                          onClick={() => editAddress(address.id)}
                          className="text-[#C92127] hover:cursor-pointer font-semibold mt-1 mr-3 hover:font-bold"
                        >
                          Sửa địa chỉ
                        </button>
                        <button
                          onClick={() => deleteAdress(address.id)}
                          className="text-[#646464] hover:cursor-pointer font-semibold mt-1 pl-3 hover:font-bold"
                        >
                          Xóa địa chỉ
                        </button>
                      </li>
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListAddress;
