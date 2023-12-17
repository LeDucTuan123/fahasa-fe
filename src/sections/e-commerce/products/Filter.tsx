import { NavLink } from 'react-router-dom';
import { setCategory, setCatelvId, setId, setParentCategory } from 'src/redux/slice/commonSlice';
import { useAppDispatch } from 'src/redux/store';
import { CategoryType } from 'src/types';

interface FilterProps {
  handlePriceFilter: (priceRange: string) => void;
  selectedPriceRange: string; // Thêm prop này
  subCategory: CategoryType[];
  // currentCategory: number | undefined;
  onHandleOnchangeCate: (id: number) => void;
}

export default function Filter({
  handlePriceFilter,
  selectedPriceRange,
  subCategory,
  onHandleOnchangeCate,
}: FilterProps) {
  const dispatch = useAppDispatch();
  const handlePriceChange = (priceRange: string) => {
    handlePriceFilter(priceRange);
  };

  const handelOnClickCate3 = (e: CategoryType) => {
    if (e.parent.parent.id === 1 || e.parent.parent.id === 2) {
      dispatch(setCategory('book'));
    } else if (e.parent.parent.id === 3) {
      dispatch(setCategory('schooltool'));
    }
    dispatch(setCatelvId(e.level));
    dispatch(setId(e.id));
    dispatch(setParentCategory(e.parent.parent.categoryname));
  };

  return (
    <div className="hidden sm:flex ">
      <div className="border-2 w-64 bg-slate-100 space-y-3">
        <div className="font-medium m-2">
          GIÁ
          <ol className="ml-2 mt-1 text-slate-400">
            <li>
              <label>
                <input
                  type="radio"
                  id="price-all"
                  name="price"
                  value="0-150000000"
                  onChange={() => handlePriceChange('0-150000000')}
                  checked={selectedPriceRange === '0-150000000'}
                />{' '}
                Tất cả
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="0-150000"
                  onChange={() => handlePriceChange('0-150000')}
                  checked={selectedPriceRange === '0-150000'}
                />{' '}
                0đ - 150,000đ
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="150000-300000"
                  onChange={() => handlePriceChange('150000-300000')}
                  checked={selectedPriceRange === '150000-300000'}
                />{' '}
                150,000đ - 300,000đ
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="300000-500000"
                  onChange={() => handlePriceChange('300000-500000')}
                  checked={selectedPriceRange === '300000-500000'}
                />{' '}
                300,000đ - 500,000đ
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="500000-700000"
                  onChange={() => handlePriceChange('500000-700000')}
                  checked={selectedPriceRange === '500000-700000'}
                />{' '}
                500,000đ - 700,000đ
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="700000-150000000"
                  onChange={() => handlePriceChange('700000-150000000')}
                  checked={selectedPriceRange === '700000-150000000'}
                />{' '}
                700,000đ - Trở lên
              </label>
            </li>
          </ol>
        </div>

        <div className="font-medium h-[500px] overflow-y-scroll border-b-2 border-t-2">
          {subCategory
            .filter((item) => item.level === 3)
            .map((item) => {
              const updatedUrl = item.categoryname.replace(/\s/g, '-');
              const updatedUrl1 = item.parent.categoryname.replace(/\s/g, '-');
              const updatedUrl2 = item.parent.parent.categoryname.replace(/\s/g, '-');
              return (
                <NavLink
                  key={item.id}
                  to={`/category/${updatedUrl2}/${updatedUrl1}/${updatedUrl}`}
                  className={({ isActive }) => (isActive ? ' text-[#7367F0]' : ' text-[#94a3B8]')}
                  onClick={() => handelOnClickCate3(item)}
                >
                  <p className="flex cursor-pointer items-center w-full p-1 text-base text-[#94a3B8] transition duration-75 rounded-lg group hover:text-[#7367F0]">
                    <span>{item.categoryname}</span>
                  </p>
                </NavLink>
              );
            })}
        </div>
        {/* <div className="font-medium m-2">
          Danh mục
          <ol className="ml-2 mt-1 text-slate-400">
            {subCategory
              .filter((item) => item.level === 2)
              .map((cate) => (
                <li>
                  <label htmlFor={cate.categoryname}>
                    <input
                      type="radio"
                      id={cate.categoryname}
                      name="filtercate "
                      value={cate.id}
                      onChange={() => onHandleOnchangeCate(cate.id)}
                    />{' '}
                    {cate.categoryname}
                  </label>
                </li>
              ))}
          </ol>
        </div> */}
      </div>
    </div>
  );
}
