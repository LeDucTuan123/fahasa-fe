interface ListAddressProps {
  changeToForm: () => void;
}

function ListAddress(props: ListAddressProps) {
  function addAddress() {
    props.changeToForm();
  }
  return (
    <>
      <div className="p-7 shadow-lg">
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
          <div>
            <h2 className="font-bold uppercase ">Địa chỉ mặc định</h2>
            <ul className="mt-3">
              <li>Phạm Phương</li>
              <li>Số nhà nè</li>
              <li>Phường Bến Thành, Quận 1, Hồ Chí Minh, Việt Nam</li>
              <li>Tel: 0921413754</li>
              <li className="text-[#C92127] hover:cursor-pointer hover:font-bold font-semibold mt-1 inline-block">
                Thay đổi địa chỉ thanh toán
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold uppercase">Địa chỉ khác</h2>
            <ul className="mt-3">
              <li>Phạm Phương</li>
              <li>Số nhà nè</li>
              <li>Phường Bến Thành, Quận 1, Hồ Chí Minh, Việt Nam</li>
              <li>Tel: 0921413754</li>
              <li className="divide-x">
                <span className="text-[#C92127] hover:cursor-pointer font-semibold mt-1 mr-3 hover:font-bold">
                  Sửa địa chỉ
                </span>
                <span className="text-[#646464] hover:cursor-pointer font-semibold mt-1 pl-3 hover:font-bold">
                  Xóa địa chỉ
                </span>
              </li>
            </ul>
            <ul className="mt-3">
              <li>Phạm Phương</li>
              <li>Số nhà nè</li>
              <li>Phường Bến Thành, Quận 1, Hồ Chí Minh, Việt Nam</li>
              <li>Tel: 0921413754</li>
              <li className="divide-x">
                <span className="text-[#C92127] hover:cursor-pointer font-semibold mt-1 mr-3 hover:font-bold">
                  Sửa địa chỉ
                </span>
                <span className="text-[#646464] hover:cursor-pointer font-semibold mt-1 pl-3 hover:font-bold">
                  Xóa địa chỉ
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListAddress;
