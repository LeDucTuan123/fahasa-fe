import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'src/components/Link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log('Yêu cầu gửi đi:', JSON.stringify({ email }));

            if (response.ok) {
                console.log('Phản hồi từ server:', await response.json());
                setMessage('Mã OTP đã được gửi đến địa chỉ email của bạn.');
            } else {
                console.error('Lỗi khi khởi tạo đặt lại mật khẩu:', response.statusText);
                setMessage('Không thể gửi mã OTP. Vui lòng kiểm tra lại địa chỉ email của bạn.');
            }
        } catch (error) {
            console.error('Lỗi khi khởi tạo đặt lại mật khẩu:', error);
            setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage(data.message);
            } else {
                setMessage('Mã OTP không hợp lệ. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận OTP:', error);
            setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newpassword: newPassword }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage(data.message);
                navigate('/signin'); // Chuyển hướng đến trang đăng nhập sau khi thay đổi mật khẩu thành công.
            } else {
                console.error('Lỗi khi thay đổi mật khẩu:', data.message);
                setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Lỗi khi thay đổi mật khẩu:', error);
            setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadaow-lg max-w-4xl p-5">
                    <div className="md:w px-16">
                        <h2 className="font-bold text-2xl text-[#002d74]">Quên mật khẩu</h2>
                        <p className="text-sm mt-4 text-[#002d74]">
                            {message && <div className="text-red-500">{message}</div>}
                            {message.includes('gửi đến địa chỉ email') && (
                                <span>Nhập mã OTP đã được gửi đến email của bạn:</span>
                            )}
                            {message.includes('Mã OTP xác nhận thành công') && (
                                <span>Đã xác nhận mã OTP, nhập mật khẩu mới:</span>
                            )}
                            {!message && <span>Nhập địa chỉ email của bạn để đặt lại mật khẩu.</span>}
                        </p>

                        {(!message || message.includes('gửi đến địa chỉ email')) && (
                            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                                <input
                                    className="p-2 rounded-xl mt-8 border"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                >
                                    Gửi yêu cầu đặt lại mật khẩu
                                </button>
                            </form>
                        )}

                        {message.includes('Mã OTP xác nhận thành công') && (
                            <form onSubmit={handleChangePassword} className="flex flex-col gap-4 mt-8">
                                <input
                                    className="p-2 rounded-xl border"
                                    type="password"
                                    name="newpassword"
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                >
                                    Thay đổi mật khẩu
                                </button>
                            </form>
                        )}

                        {message.includes('gửi đến địa chỉ email') && (
                            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4 mt-8">
                                <input
                                    className="p-2 rounded-xl border"
                                    type="text"
                                    name="otp"
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                >
                                    Xác nhận OTP
                                </button>
                            </form>
                        )}

                        <Link to='/login'>
                            <p className="mt-5 text-sm border-b border-gray-400 py-4 cursor-pointer hover:text-[#547acc] duration-300">
                                Quay lại trang đăng nhập
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
