
interface FilterProps {
  handlePriceFilter: (priceRange: string) => void;
  selectedPriceRange: string; // Thêm prop này
}

export default function Filter({ handlePriceFilter, selectedPriceRange }: FilterProps) {
  const handlePriceChange = (priceRange: string) => {
    handlePriceFilter(priceRange);
  };

  return (
    <div className="hidden sm:flex ">
      <div className="border-2 w-64 bg-slate-100">
        <div className="font-medium m-2">
          NHÓM SẢN PHẨM
          <div className="text-slate-400 ml-2 mt-1">Tất Cả Nhóm Sản Phẩm</div>
          <div className="font-medium ml-4 mt-1 text-amber-400">Sách tiếng Việt</div>
          <ol className="ml-6 mt-1 text-slate-400">
            <li>Thiếu Nhi</li>
            <li>Giáo Khoa - Tham Khảo</li>
            <li>Văn Học</li>
            <li>Tâm Lý - Kỹ Năng Sống</li>
            <li>Manga - Comic</li>
            <li>Sách Học Ngoại Ngữ</li>
            <li>Kinh Tế</li>
            <li>Khoa Học Kỹ Thuật</li>
          </ol>
        </div>
        <div className="font-medium m-2">
          GIÁ
          <ol className="ml-2 mt-1 text-slate-400">
            <li>
              <label>
                <input
                  type="radio"
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
        <div className="font-medium m-2">
          Danh mục
          <ol className="ml-2 mt-1 text-slate-400">
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
            <li>
              <label htmlFor="">
                <input type="text" name="" /> Văn học
              </label>
            </li>
          </ol>
        </div>
        <div className="font-medium m-2">
          ĐỘ TUỔI
          <ol className="ml-2 mt-1 text-slate-400">
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                0 - 6
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                15 - 18
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                1 - 6
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                15+
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                17+
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                3+
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                18+
              </a>
            </li>
          </ol>
        </div>
        <div className="font-medium m-2">
          NGÔN NGỮ
          <ol className="ml-2 mt-1 text-slate-400">
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Việt
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Song Ngữ Anh - Việt
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Anh
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Nhật
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Trung
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Đức
              </a>
            </li>
            <li>
              <a
                href=""
                className="bg-[url('https://cdn0.fahasa.com/skin/frontend/base/default/images/manapro_filtercheckboxes/ico_uncheck.png')] bg-no-repeat pl-5"
              >
                Tiếng Hàn
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
