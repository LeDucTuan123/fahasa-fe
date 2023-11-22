import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetch from 'src/services/axios/Axios';
import { ConvertToVietNamDong } from 'src/util/SupportFnc';

function PaymentSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentMomoStatus = params.get('resultCode');
    const paymentVnStatus = params.get('vnp_TransactionStatus');
    console.log(paymentVnStatus);
    // Xử lý trạng thái thanh toán momo và hiển thị thông báo
    console.log(paymentMomoStatus);
    if (paymentMomoStatus === '0') {
      alert('Thanh toán thành công!');
      fetch
        .patch(`/rest/order/payment/success/${id}`)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    } else if (paymentMomoStatus === '1006') {
      alert('Thanh toán không thành công.');
    }

    // Xử lý thanh toán vnpay và hiển thị thông báo
    if (paymentVnStatus === '00') {
      alert('Thanh toán thành công');
      fetch
        .patch(`/rest/order/payment/success/${id}`)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    } else if (paymentVnStatus === '02') {
      alert('Than toán không thành công');
    }

    fetch
      .get(`/rest/orderdetail/success/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <>
      <div className="w-full flex-col pt-10">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fsuccess-icon.png?alt=media&token=63a8ca51-478d-4f61-b514-a198d4d4f713"
          alt="img"
          className="h-[80px] m-auto"
        />
        <h2 className="text-center font-bold text-2xl text-[#333333]">Đặt hàng thành công</h2>
        <p className="text-center font-semibold text-lg text-[#a8a8a8]">Mã đơn hàng: {id}</p>

        <div className="flex mt-5">
          <table className="m-auto w-full divide-y divide-solid divide-black">
            <thead>
              <tr className="">
                <th className="">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-black">
              {products &&
                products.map((item: any) => {
                  return (
                    <tr>
                      <td className="flex">
                        <img
                          src={item[0].images}
                          alt={item[0].title}
                          className="h-[70px] m-auto"
                        />
                      </td>
                      <td className="text-center">{item[0].title}</td>
                      <td className="text-center">{item[1]}</td>
                      <td className="text-center">{ConvertToVietNamDong(item[2] * item[1])}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-center">Cảm ơn bạn đã mua hàng ở cửa hàng chúng tôi</p>
        <p className="font-semibold text-center">Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng này</p>
        <Button
          className="m-auto mt-3"
          onClick={() => navigate('/')}
        >
          Trở về trang chủ
        </Button>
      </div>
    </>
  );
}

export default PaymentSuccess;
