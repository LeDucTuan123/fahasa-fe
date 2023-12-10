import React from 'react';
import Skeleton from 'react-loading-skeleton';

export function SkeletonProduct() {
  return (
    <div className="p-5  shadow-md rounded-md relative bg-white ">
      <Skeleton height="190px" />
      <div className="pt-2 ">
        <Skeleton
          height={'20px'}
          count={2}
        />

        <div className="flex flex-row justify-between items-center">
          <div>
            <Skeleton
              width={'80px'}
              className="mt-2"
            />

            <Skeleton width={'70px'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategory() {
  return (
    <div className="p-5 text-center">
      <div className="flex">
        <Skeleton
          width={'100px'}
          height={'100px'}
        />
      </div>

      <div className="pt-2 h-[40px]">
        <Skeleton width={'50px'} />
      </div>
    </div>
  );
}

export function SkeletonOrder() {
  return (
    <>
      <tr className="text-center py-3">
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
        <td>
          <Skeleton width={'70%'} />
        </td>
      </tr>
    </>
  );
}

export function SkeletonCart() {
  return (
    <>
      <div className="w-full h-[131px] rounded-md flex flex-row p-2 gap-4 px-3">
        <div className="flex justify-center items-center">
          <Skeleton
            width={'25px'}
            height={'25px'}
          />
        </div>
        <Skeleton
          width={'133px'}
          height={'100%'}
        />
        <div className="h-full flex flex-col justify-between w-[200px]">
          <Skeleton count={2} />
          <Skeleton width={'150px'} />
        </div>
        <div className=" flex items-center h-full justify-center gap-4">
          <Skeleton width={'150px'} />
          <Skeleton width={'150px'} />
          <Skeleton
            width={'20px'}
            height={'20px'}
          />
        </div>
      </div>
    </>
  );
}

export function SkeletonProfileUser() {
  return (
    <>
      <form className="mt-3">
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Họ:</label>
          <Skeleton
            width={'75%'}
            height={'38px'}
          />
        </div>
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Tên:</label>
          <Skeleton
            width={'75%'}
            height={'38px'}
          />
        </div>
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Số điện thoại:</label>
          <Skeleton
            width={'75%'}
            height={'38px'}
          />
        </div>
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Email:</label>
          <Skeleton
            width={'75%'}
            height={'38px'}
          />
        </div>
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Giới tính:</label>
          <Skeleton width={'25%'} />
        </div>
        <div className="py-3">
          <label className="mr-5 w-[180px] inline-block font-medium">Ngày sinh:</label>
          <Skeleton
            width={'75%'}
            height={'38px'}
          />
        </div>

        <div className="text-center mt-8">
          <button
            // Disable nút nếu không có sự thay đổi trong profile

            className="border py-2 px-14 text-white font-bold rounded-lg bg-gray-400"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </>
  );
}
