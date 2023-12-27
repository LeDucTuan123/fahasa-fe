import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import ListVoucher from './ListVoucher';

const formVoucher = {
  id: '',
  code: '',
  expdate: '',
  valuev: 0,
  condition: 0,
  active: false,
  quantity: 0,
};
export default function FormVoucher() {
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherEdit, setVoucherEdit] = useState(false);
  const [dataVoucher, setDataVoucher] = useState(formVoucher);
  const [fetchDataVoucher, setFetchDataVoucher] = useState<any[]>([]);
  const [validateFormError, setValidateFormError] = useState<any>(null);

  useEffect(() => {
    fetch
      .get(apiPaths.voucher)
      .then((res) => setFetchDataVoucher(res.data))
      .catch((err) => console.log(err.message));
  }, [fetchDataVoucher.length]);

  const addVoucher = () => {
    try {
      setTimeout(() => {
        fetch({
          method: 'POST',
          url: 'http://localhost:8080/rest/voucher',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            code: dataVoucher.code,
            expdate: dataVoucher.expdate,
            valuev: dataVoucher.valuev,
            condition: dataVoucher.condition,
            active: dataVoucher.active,
            quantity: dataVoucher.quantity,
          }),
        }).then(() => {});

        toast.success('Thêm thành công');

        setVoucherLoading(false);
        return setFetchDataVoucher((prev) => [
          //khi thêm thành công thì upexpdate lại state khỏi cần load lại page
          ...prev,
          {
            id: dataVoucher.id,
            code: dataVoucher.code,
            expdate: dataVoucher.expdate,
            valuev: dataVoucher.valuev,
            condition: dataVoucher.condition,
            active: dataVoucher.active,
            quantity: dataVoucher.quantity,
          },
        ]);
      }, 2000);
      setDataVoucher(formVoucher);
    } catch (error) {
      toast.error('Thêm voucher thất bại');
    }
  };

  //validate form
  const validateForm = () => {
    if (dataVoucher.code.length === 0) {
      return true;
    } else if (dataVoucher.expdate.length === 0) {
      return true;
    }
    if (dataVoucher.quantity === 0) {
      return true;
    } else if (dataVoucher.valuev === 0) {
      return true;
    } else if (dataVoucher.condition === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddVoucher = async (e: any) => {
    e.preventDefault();
    setValidateFormError(dataVoucher);
    if (validateForm()) {
      return;
    }
    setVoucherLoading(true);
    addVoucher();
  };

  const handleEditVoucher = (item: any) => {
    setDataVoucher((prev) => ({
      ...prev,
      id: item.id,
      code: item.code,
      expdate: item.expdate,
      valuev: item.valuev,
      condition: item.condition,
      active: item.active,
      quantity: item.quantity,
    }));
    setVoucherEdit(true);
  };

  const handleUpdateVoucher = (e: any) => {
    e.preventDefault();

    setValidateFormError(dataVoucher);
    if (validateForm()) {
      return;
    }
    setVoucherLoading(true);

    setTimeout(async () => {
      await fetch({
        method: 'PUT',
        url: `http://localhost:8080/rest/voucher/${dataVoucher.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          code: dataVoucher.code,
          expdate: dataVoucher.expdate,
          valuev: dataVoucher.valuev,
          condition: dataVoucher.condition,
          active: dataVoucher.active,
          quantity: dataVoucher.quantity,
        }),
      });

      setVoucherLoading(false);
      setVoucherEdit(false);
      toast.success('Update thành công');
      // return setfetchDataBook(fetdataUpexpdate);
      setFetchDataVoucher((prev) =>
        prev.map((item) =>
          item.id === dataVoucher.id
            ? {
                ...item,
                code: dataVoucher.code,
                expdate: dataVoucher.expdate,
                valuev: dataVoucher.valuev,
                condition: dataVoucher.condition,
                active: dataVoucher.active,
                quantity: dataVoucher.quantity,
              }
            : item,
        ),
      );
    }, 2000);
  };

  const handleResetForm = () => {
    setDataVoucher((prev) => ({
      ...prev,
      id: '',
      code: '',
      expdate: '',
      valuev: 0,
      condition: 0,
      quantity: 0,
    }));
  };

  return (
    <>
      <div className="w-full h-auto shadow-md p-5 border-[1px] rounded-xl">
        <div className="flex relative pb-5">
          <form className="w-full">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  value={dataVoucher.id}
                  className="hidden"
                />
                <input
                  type="text"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  maxLength={5}
                  value={dataVoucher.code}
                  onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, code: e.target.value }))}
                />

                {validateFormError && validateFormError.code.length === 0 && (
                  <div className="text-red-500 pt-3">Vui lòng thêm mã voucher</div>
                )}

                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mã Voucher
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="date"
                  name="floating_author"
                  id="floating_author"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={dataVoucher.expdate}
                  onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, expdate: e.target.value }))}
                />

                {validateFormError && validateFormError.expdate.length === 0 && (
                  <div className="text-red-500 pt-3">Vui lòng thêm ngày hết hạn voucher</div>
                )}

                <label
                  htmlFor="floating_author"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ngày hết hạn
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="floating_discount"
                  id="floating_discount"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={dataVoucher.valuev}
                  onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, valuev: e.target.value }))}
                />

                {validateFormError && validateFormError.valuev === 0 && (
                  <div className="text-red-500 pt-3">Giá trị voucher phải lớn hơn 0</div>
                )}

                <label
                  htmlFor="floating_discount"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Giá trị
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="floating_discount"
                  id="floating_discount"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={dataVoucher.quantity}
                  onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, quantity: e.target.value }))}
                />

                {validateFormError && validateFormError.quantity === 0 && (
                  <div className="text-red-500 pt-3">số lượng voucher phải lớn hơn 0</div>
                )}

                <label
                  htmlFor="floating_discount"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Số lượng
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="floating_discount"
                  className="pr-2 peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 "
                >
                  Active
                </label>
                <input
                  type="checkbox"
                  name="floating_discount"
                  id="floating_discount"
                  required
                  checked={dataVoucher.active}
                  onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, active: e.target.checked }))}
                />
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tình trạng
              </label>
              <textarea
                id="description"
                rows={4}
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
                value={dataVoucher.condition}
                onChange={(e: any) => setDataVoucher((prev) => ({ ...prev, condition: e.target.value }))}
              ></textarea>

              {validateFormError && validateFormError.condition === 0 && (
                <div className="text-red-500 pt-3">Điều kiện voucher phải lớn hơn 0</div>
              )}
            </div>
            {/* <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="file-upload"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Upload ảnh
            </label>
            <input
              type="file"
              id="file-upload"
              alt=""
              className="cursor-pointer"
            />
          </div> */}
            {/* <div className="flex gap-2">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tạo mới
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Xóa
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sửa
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
          </div> */}
            <div className="flex gap-2">
              <button
                // type="submit"
                disabled={voucherLoading ? true : false}
                className={
                  voucherEdit
                    ? 'bg-orange-300 text-white  hover:bg-orange-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    : ' bg-green-400 text-white  hover:bg-green-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-[96px] sm:w-auto px-5 py-2.5 text-center'
                }
                onClick={voucherEdit ? handleUpdateVoucher : handleAddVoucher}
              >
                {voucherLoading ? (
                  <Icon
                    icon={'mingcute:loading-fill'}
                    fontSize={24}
                    className="animate-spin"
                  />
                ) : voucherEdit ? (
                  'Sửa'
                ) : (
                  'Tạo mới'
                )}
              </button>
              {voucherEdit ? (
                <button
                  type="submit"
                  className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
                  onClick={() => setVoucherEdit(false)}
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
      <ListVoucher
        fetchDataVoucher={fetchDataVoucher}
        setFetchDataVoucher={setFetchDataVoucher}
        onHandleEditVoucher={handleEditVoucher}
      />
    </>
  );
}
