import React from 'react';
import Logo from '../../../assets/image/404.jpg';

export default function Error() {
  const backHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      {/* <div className="text-2xl text-blue-300">Error404</div> */}
      <div className="min-h-screen mb-4">
        <div className="relative h-[800px] w-full flex justify-center items-center bg-[#50b5ed]">
          <img
            src={Logo}
            alt=""
            className="h-[100%]"
          />
          <div className="absolute bottom-[150px] ">
            <button
              onClick={backHome}
              className="bg-white text-xl rounded-2xl px-10 py-2 text-slate-600 font-bold"
            >
              Trang Chủ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
