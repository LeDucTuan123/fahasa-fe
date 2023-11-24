import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';

export default function Myvoucher() {
  const [dataVoucher, setDataVoucher] = useState([]);

  const user: any = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const res = await fetch.get(`${apiPaths.myvoucher}/success/${user.id}`);
        setDataVoucher(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVoucher();
  }, [user.id]);

  return (
    <div className="flex w-full gap-3 pl-4 flex-col">
      <div className="flex w-full h-20 items-center  border-b-2 border-solid border-gray-300">
        <p className="text-2xl">Ví voucher</p>
      </div>
      <p className="text-xl">Voucher sở hữu: {dataVoucher.length}</p>

      <div className="flex w-full gap-5  flex-wrap">
        {dataVoucher.map((item: any) => (
          <div className="p-2 border-[1px] w-[48%] h-[100px] border-solid flex flex-row gap-2">
            <div className="w-35%">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShAHdfWlJ-7EKCsn3I7plpcCWXfhB6s8dDg&usqp=CAU"
                alt="gift"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="h-full flex items-center">
              <ul>
                <li className="text-ellipsis line-clamp-1">Tên: {item[0].title}</li>
                <li>Mã: {item[0].code}</li>
                <li>Ngày hết hạn: {item[0].expdate}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
