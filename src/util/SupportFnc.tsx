// chuyển đổi thành tiền việt
export function ConvertToVietNamDong(money: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

export function formatDateToDDMMYYYY(inputDate: string) {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return 'Ngày không hợp lệ';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateTime(inputDateTime: string) {
  const dateTime = new Date(inputDateTime);

  if (isNaN(dateTime.getTime())) {
    return 'Ngày giờ không hợp lệ';
  }

  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
