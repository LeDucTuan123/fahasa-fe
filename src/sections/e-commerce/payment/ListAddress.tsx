interface ListAddressProps {
  listAddress: any[];
  changeToForm: () => void;
  addressId: number;
  changeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ListAddress({ listAddress, changeToForm, addressId, changeAddress }: ListAddressProps) {
  return (
    <div className="bg-white p-5 mt-4">
      <h3 className="uppercase font-bold text-[14px] border-b-2 pb-2">Địa chỉ giao hàng</h3>
      <div className="mt-3">
        {listAddress &&
          listAddress.map((item: any) => {
            return (
              <div className="flex justify-between mt-3">
                <label>
                  <input
                    type="radio"
                    className="h-[20px] w-[20px]"
                    value={item.id}
                    checked={item.id === addressId}
                    onChange={(e) => changeAddress(e)}
                  />{' '}
                  {item.lastname} {item.firstname} | {item.address}, {item.ward}, {item.district}, {item.city} |{' '}
                  {item.phone}
                </label>
              </div>
            );
          })}
      </div>
      <div
        className="mt-3 inline-flex hover:cursor-pointer"
        onClick={() => changeToForm()}
      >
        <img
          src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_add_circle_red.svg?q=10327"
          alt="img"
          className="h-[20px] w-[20px]"
        />{' '}
        <span className="ms-1">Giao hàng đến địa chỉ khác</span>
      </div>
    </div>
  );
}

export default ListAddress;
