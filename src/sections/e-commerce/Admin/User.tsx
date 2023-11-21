import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Role } from './enums';


interface User {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}


export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/admin/users",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    if (result.status === 302) {
      setUsers(result.data)
    }
  };

  const handlePasswordChange = (index: number, newPassword: string) => {
    // Giới hạn số ký tự của password là 40
    if (newPassword.length <= 40) {
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index].password = newPassword;
        return updatedUsers;
      });
    }
  };

  const updateUserRole = async (userId: number, newRole: Role) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/admin/users/update/${userId}`, {
        role: newRole,
      });
      console.log('Vai trò đã được cập nhật thành công.');
    } catch (error) {
      console.error('Lỗi khi cập nhật vai trò:', error);
    }
  };

  const handleCheckboxChange = (index: number, newValue: boolean) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      const newRole = newValue ? 'ADMIN' : 'USER';
      updatedUsers[index].role = newRole as Role;
      updateUserRole(updatedUsers[index].id, newRole as Role);
      return updatedUsers;
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
  });


  return (
    <>
      <p className="text-xl pb-5 flex items-center gap-3">
        Quản lí người dùng{' '}
        <span>
          <Icon
            icon={'mdi:user'}
            fontSize={24}
          />
        </span>{' '}
      </p>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên, email, số điện thoại..."
        value={searchTerm}
        onChange={handleSearch}
        className="rounded-lg p-2 border border-gray-500 w-96"
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                Họ
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Mật khẩu
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Số điện thoại
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Địa chỉ
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Vai trò
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
            {filteredUsers.map((user, index) => (

              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
               hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row" key={index}
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 max-w-[170px]">{user.lastname}</td>
                <td className="px-6 py-4 max-w-[170px]">{user.firstname}</td>
                <td className="px-6 py-4 max-w-[170px]">
                  <input disabled className='rounded-lg w-36'
                    type='password'
                    value={user.password}
                    onChange={(e) => handlePasswordChange(index, e.target.value)}
                    maxLength={40}
                  />
                </td>
                <td className="px-6 py-4 max-w-[170px]">{user.email}</td>
                <td className="px-6 py-4 max-w-[170px]">{user.phone}</td>
                <td className="px-6 py-4 max-w-[170px]" >{user.address}</td>
                <td className="px-6 py-4 max-w-[170px]" >{user.role}</td>
                <td className="px-6 py-4 max-w-[170px] text-center">
                  <input
                    type="checkbox"
                    checked={user.role === 'ADMIN'}
                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
