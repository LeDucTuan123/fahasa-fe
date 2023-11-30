import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'src/components/Link';
import { RootState } from 'src/redux/store';

export default function SpinLucky() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const handleClick = () => {
    toast.warning('Vui lòng đăng nhập để vào vòng quay');
  };

  return (
    <>
      {isLogin ? (
        <Link to={'/spin/lucky'}>
          <div className="absolute w-12 h-12 rounded-tl-lg rounded-bl-lg shadow-2xl top-80 flex flex-row right-4 cursor-pointer transform  duration-300">
            <img
              src="https://download.cnet.com/a/img/resize/1b65a49bb75b093b421cd96028b904e8baf40010/catalog/2020/08/23/4d9687c8-8455-48da-90ef-78b1b67ca43b/imgingest-53862030222054649.png?auto=webp&fit=crop&width=64"
              alt="spin"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      ) : (
        <div
          className="absolute w-12 h-12 rounded-tl-lg rounded-bl-lg shadow-2xl top-80 flex flex-row right-4 cursor-pointer transform  duration-300"
          onClick={handleClick}
        >
          <img
            src="https://download.cnet.com/a/img/resize/1b65a49bb75b093b421cd96028b904e8baf40010/catalog/2020/08/23/4d9687c8-8455-48da-90ef-78b1b67ca43b/imgingest-53862030222054649.png?auto=webp&fit=crop&width=64"
            alt="spin"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}
