import { Link } from 'src/components/Link';
import imgLogin from '../../../assets/image/login-page.jpg';
import { Icon } from '@iconify/react';

export default function Register() {
    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                {/* login container */}
                <div className="bg-gray-100 flex rounded-2xl shadaow-lg max-w-4xl p-5 flex-row-reverse">
                    {/* form */}
                    <div className="md:w-1/2 px-16">
                        <h2 className="font-bold text-2xl text-[#002d74] ">Đăng ký</h2>
                        <p className="text-sm mt-4 text-[#002d74]">Tạo cho mình một tài khoản nào!</p>

                        <form
                            action=""
                            className="flex flex-col gap-4"
                        >
                            <input
                                className="p-2 rounded-xl mt-8 border"
                                type="text"
                                name="email"
                                placeholder="Email"
                            />
                            <input
                                className="p-2 rounded-xl border"
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl w-full border"
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                />
                                <Icon
                                    icon="ph:eye-light"
                                    className="absolute top-1/2 text-gray-500 -translate-y-1/2 right-3"
                                />
                            </div>
                            <input
                                className="p-2 rounded-xl w-full border"
                                type="password"
                                name="confirmpassword"
                                placeholder="Nhập lại mật khẩu"
                            />
                            <button className="bg-[#002d74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                                Đăng ký
                            </button>
                        </form>

                        <p className="mt-5 text-sm border-b border-gray-400 py-4 cursor-pointer hover:text-[#547acc] duration-300">
                            Quên mật khẩu?
                        </p>

                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p>Bạn đã có tài khoản?</p>
                            <Link
                                to="/login"
                                className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </div>

                    {/* image */}
                    <div className="md:block hidden w-1/2">
                        <img
                            className="h-full rounded-2xl"
                            src={imgLogin}
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
