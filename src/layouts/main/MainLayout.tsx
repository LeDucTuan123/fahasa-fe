import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

export default function MainLayout() {
    return (
        <>
            <Header />

            <main className="bg-[#f0f0f0]">
                <div className=" lg:container w-full ml-auto mr-auto block box-border">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </>
    );
}
