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

  return `${day}-${month}-${year}`;
}
