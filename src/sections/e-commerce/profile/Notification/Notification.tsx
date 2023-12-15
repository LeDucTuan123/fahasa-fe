import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { formatDateTime } from 'src/util/SupportFnc';

export default function Notification() {
  const user: any = useSelector((state: RootState) => state.user.userData);

  const Notifications = [...user.notifications].sort((a: any, b: any) => {
    const dateA = new Date(a.notificationDate).getTime();
    const dateB = new Date(b.notificationDate).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex w-full px-5 flex-col">
      <div className="flex w-full h-20 items-center  border-b-2 border-solid border-gray-300">
        <p className="text-lg uppercase font-bold">Thông báo</p>
      </div>

      <div className="all-notify">
        <div className="overflow-y-auto h-[400px] my-3 mx-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar_div scrollbar-track-slate-300">
          <div className="px-2 border-t-2">
            {/*  */}
            {Notifications.map((notification: any, index: number) => (
              <div
                key={index}
                className="flex gap-4 items-center w-full px-4 py-3 border-b-2 hover:bg-slate-100"
              >
                <div className="icon">
                  <div
                    className={`py-3 px-3 flex items-center justify-center rounded-full ${
                      notification.typeNotify.id === 1 ? 'bg-[#ffe6ea]' : 'bg-[#fff1e3]'
                    }`}
                  >
                    <Icon
                      icon={
                        notification.typeNotify.id === 1 ? 'solar:notification-unread-lines-linear' : 'lucide:package'
                      }
                      fontSize={30}
                      className={
                        notification.typeNotify.id === 1 ? 'text-[#fd4085] px-1 py-1' : 'text-[#ff9f43] px-1 py-1'
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 w-full">
                  <div className="flex flex-col col-span-3">
                    <span className="font-semibold text-base truncate">{notification.title}</span>
                    <span className="font-medium text-sm text-slate-600">{notification.content}</span>
                  </div>
                  <div className="text-end text-slate-600 text-sm font-medium">
                    <span>{formatDateTime(notification.notificationDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
