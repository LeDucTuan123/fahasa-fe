import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormPayment() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center pt-20 pb-20">
        <p
          onClick={() => navigate('/cart')}
          className="text-xl text-gray-500 flex justify-between underline-offset-4 cursor-pointer"
        >
          Back
        </p>
        <form className="border-[1px] shadow-xl w-[50%] p-5 ">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-1">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Họ
              </label>
              <input
                type="text"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-gray-500 outline-none"
                required
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-gray-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-1 ">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5  outline-none "
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-gray-500 outline-none"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols gap-2 pt-2">
            <label
              htmlFor="noidung"
              className="block text-sm font-medium text-gray-900 "
            >
              Nội dung
            </label>
            <textarea
              id="noidung"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 outline-none"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div className="flex items-start pt-2 mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
