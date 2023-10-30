import useResponsive from 'src/hooks/useResponsive';
import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Footer() {
  const IsMup = useResponsive('up', 'sm');

  return (
    <div className="w-full bg-blue-300">
      <div className=" sticky px-[1/3] min-h-20 py-4 top-0 z-[20] flex w-full items-center justify-between border-gray-500">
        <div className="px-6 max-w-[1200px] w-full ml-auto mr-auto block box-border">
          {IsMup ? <Desktop /> : <Mobile />}

          <hr />

          <div className="block text-center py-6 ">
            <p className="text-sm">
              Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày
              20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.
            </p>
            <p
              className="text-sm pt-4"
              color={'gray'}
            >
              ---OoOoOoO---
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
