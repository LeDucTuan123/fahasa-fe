import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from 'src/redux/store';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

interface Props {
  onMouse: () => void;
  onLeave: () => void;
}

const Notify = ({ onMouse, onLeave }: Props) => {
  const user: any = useSelector((state: RootState) => state.user.userData);

  const Notifications = [...user.notifications].sort((a: any, b: any) => {
    const dateA = new Date(a.notificationDate).getTime();
    const dateB = new Date(b.notificationDate).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <div
        onMouseEnter={() => onMouse()}
        onMouseLeave={() => onLeave()}
        className="absolute right-0 top-[38px] pt-8 w-[350px] z-10"
      >
        <div className="rounded-lg shadow-lg items-center">
          <div className="px-4 py-2 font-semibold text-lg text-center text-gray-700 rounded-t-lg bg-gray-50">
            Thông báo
          </div>
          {Notifications.length < 1 ? (
            <div className="divide-y divide-gray-100 bg-white flex justify-center items-center">
              <div className="py-4 text-slate-400 text-center">
                <span>Không có thông báo</span>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 bg-white overflow-y-auto h-[360px] scrollbar-thin scrollbar-thumb-rounded-lg scrollbar_div">
              {/* Hiển thị danh sách thông báo nếu có */}
              {Notifications.map((notification: any, index: number) => (
                <a
                  key={index}
                  className="flex items-center px-4 py-3"
                >
                  <div className="icon">
                    <div
                      className={`py-2 px-2 flex items-center justify-center rounded-full ${
                        notification.typeNotify.id === 1 ? 'bg-[#ffe6ea]' : 'bg-[#fff1e3]'
                      }`}
                    >
                      <Icon
                        icon={
                          notification.typeNotify.id === 1 ? 'solar:notification-unread-lines-linear' : 'lucide:package'
                        }
                        fontSize={20}
                        className={notification.typeNotify.id === 1 ? 'text-[#fd4085]' : 'text-[#ff9f43]'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-[260px] ml-4">
                    <span className="font-medium text-base truncate">{notification.title}</span>
                    <div className="font-normal text-sm text-slate-600 truncate">{notification.content}</div>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50">
            <Link to={'/member/notification'}>
              <div className="inline-flex items-center cursor-pointer font-medium text-slate-500 hover:text-slate-800">
                <Icon icon="majesticons:eye-line" />
                <span className="px-2">Xem tất cả</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notify;
