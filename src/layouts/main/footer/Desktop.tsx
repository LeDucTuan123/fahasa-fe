import { Icon } from '@iconify/react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import useResponsive from 'src/hooks/useResponsive';

export default function Desktop() {
  const IsMup = useResponsive('up', 'md');

  return (
    <Stack display='flex' flexDirection={'column'}>

        {!IsMup &&
            <Stack alignItems={'center'} pt={4}>
                <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                width="301px"
                height="49px"
                style={{ objectFit: 'contain' }}
                alt="logo"
            />
            </Stack>
        }

      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        >
        <Stack
          sx={{
            width: '30%',
            // backgroundColor: 'gray',
            paddingBlock: '40px',
            paddingInline: '20px',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '40px',
              borderRight: (theme) => `1px solid ${theme.palette.grey[400]}`,
            }}
            spacing={3}
          >
            {IsMup && (
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                width="301px"
                height="49px"
                style={{ objectFit: 'contain' }}
                alt="logo"
              />
            )}

            <Typography variant="overline">
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành
              Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt
              NamFahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG
              hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất
              cả Hệ Thống Fahasa trên toàn quốc.
            </Typography>

            <Stack flexDirection="row" gap={2}>
              <Icon icon="ic:baseline-facebook" fontSize="39px" />
              <Icon icon="ri:instagram-fill" fontSize="39px" />
              <Icon icon="icon-park-solid:youtobe" fontSize="39px" />
              <Icon icon="mdi:gmail" fontSize="39px" />
              <Icon icon="mdi:gmail" fontSize="39px" />
            </Stack>

            <Stack flexDirection={'row'} gap={2}>
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                alt="ggplay"
                style={{
                  width: '120px',
                  objectFit: 'contain',
                }}
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                alt="appstore"
                style={{
                  width: '120px',
                  objectFit: 'contain',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: '70%',
            // backgroundColor: 'limegreen',
            paddingInline: '20px',
            paddingBlock: '40px',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={4}>
                <Typography variant="h6">DỊCH VỤ</Typography>

                <Stack spacing={3} pt={2}>
                  <Typography variant="subtitle2">
                    Điều khoản sử dụng
                  </Typography>
                  <Typography variant="subtitle2">
                    Chính sách bảo mật{' '}
                  </Typography>
                  <Typography variant="subtitle2">
                    Chính sách bảo mật thanh toán
                  </Typography>
                  <Typography variant="subtitle2">Giới thiệu Fahasa</Typography>
                  <Typography variant="subtitle2">
                    Hệ thống trung tâm - nhà sách
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h6">HỖ TRỢ</Typography>

                <Stack spacing={3} pt={2}>
                  <Typography variant="subtitle2">
                    Chính sách đổi - trả - hoàn tiền
                  </Typography>
                  <Typography variant="subtitle2">
                    Chính sách bảo hành - bồi hoàn
                  </Typography>
                  <Typography variant="subtitle2">
                    Chính sách vận chuyển
                  </Typography>
                  <Typography variant="subtitle2">
                    Chính sách khách sỉ
                  </Typography>
                  <Typography variant="subtitle2">
                    Phương thức thanh toán và xuất HĐ
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h6">TÀI KHOẢN CỦA TÔI</Typography>

                <Stack spacing={3} pt={2}>
                  <Typography variant="subtitle2">
                    Đăng nhập/Tạo mới tài khoản
                  </Typography>
                  <Typography variant="subtitle2">
                    Thay đổi địa chỉ khách hàng
                  </Typography>
                  <Typography variant="subtitle2">
                    Chi tiết tài khoản
                  </Typography>
                  <Typography variant="subtitle2">Lịch sử mua hàng</Typography>
                </Stack>
              </Grid>
              <Grid item lg={12}>
                <Stack>
                  <Typography variant="h6">LIÊN HỆ</Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { sm: 'column', md: 'row' },
                      gap: { sm: 3, md: 10 },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      alignItems="center"
                      display="flex"
                    >
                      <Icon icon="mdi:address-marker" fontSize={24} />
                      60-62 Lê Lợi, Q.1, TP. HCM
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      alignItems="center"
                      display="flex"
                    >
                      <Icon icon="material-symbols:mail" fontSize={24} />
                      cskh@fahasa.com.vn
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      alignItems="center"
                      display="flex"
                    >
                      <Icon icon="ic:baseline-phone" fontSize={24} />
                      1900636467
                    </Typography>
                  </Box>
                </Stack>

                {IsMup && (
                  <Stack
                    flexDirection={'row'}
                    width="100%"
                    flexWrap="wrap"
                    pt={2}
                    spacing={2}
                  >
                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"
                        alt="logo1"
                        style={{
                          width: '80%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"
                        alt="logo2"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"
                        alt="logo3"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_snappy1.png"
                        alt="logo4"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png"
                        alt="logo5"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                        alt="logo6"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"
                        alt="logo1"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                        alt="logo1"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                        alt="logo1"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>

                    <Stack alignItems={'center'} sx={{ width: '20%' }}>
                      <img
                        src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/logo_moca_120.jpg"
                        alt="logo1"
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'contain',
                        }}
                      />
                    </Stack>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
