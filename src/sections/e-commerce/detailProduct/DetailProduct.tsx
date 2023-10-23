import { Icon } from '@iconify/react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useResponsive from 'src/hooks/useResponsive';
import { LatestBooks } from '../home';

export default function DetailProduct() {
  const IsmUp = useResponsive('up', 'md');

  const [counter, setCounter] = useState(1);

  return (
    <Stack display={'flex'} flexDirection={'column'} spacing={2} pt={4}>
      <Stack display={'flex'} flexDirection={'row'}>
        <Stack
          sx={{
            flexDirection: 'column',
            width: '40%',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              height: '400px',
            }}
            gap={2}
          >
            <Stack
              sx={{
                display: !IsmUp ? 'none' : 'block',
              }}
            >
              <Box
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '6px',
                  border: '1px solid white',
                  transitionDuration: '500ms',
                  ':hover': {
                    border: '1px solid red',
                    scale: 2,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '6px',
                  border: '1px solid white',
                  transitionDuration: '500ms',
                  ':hover': {
                    border: '1px solid red',
                    scale: 2,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '6px',
                  border: '1px solid white',
                  transitionDuration: '500ms',
                  ':hover': {
                    border: '1px solid red',
                    scale: 2,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '6px',
                  border: '1px solid white',
                  transitionDuration: '500ms',
                  ':hover': {
                    border: '1px solid red',
                    scale: 2,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '6px',
                  border: '1px solid white',
                  transitionDuration: '500ms',
                  ':hover': {
                    border: '1px solid red',
                    scale: 2,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="img1"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Stack>

            <Box
              sx={{
                width: '100%',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="img1"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Stack>
          <Stack
            pt={3}
            sx={{ flexDirection: IsmUp ? 'row' : 'column' }}
            justifyContent={'space-evenly'}
          >
            <Button variant="outlined" color="error" size="large">
              <Icon icon="mdi:cart" fontSize={24} />
              Thêm vào giỏ hàng
            </Button>
            <Button variant="contained" color="error" size="large">
              Mua ngay
            </Button>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: '60%',
          }}
          spacing={2}
        >
          <Typography variant="h5" pb="16px">
            Học Tốt Sinh Học 12
          </Typography>

          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ width: '60%' }}>
              <Typography variant="subtitle2">
                Nhà cung cấp:Dn Tư Nhân Thương Mại Toàn Phúc
              </Typography>
              <Typography variant="subtitle2">
                TNhà xuất bản:NXB Đà Nẵng
              </Typography>
            </Box>
            <Box sx={{ width: '40%' }}>
              <Typography variant="subtitle2">Tác giả: Võ Văn Chiến</Typography>
              <Typography variant="subtitle2">Hình thức bìa:Bìa Mềm</Typography>
            </Box>
          </Stack>

          <Stack flexDirection={'row'} alignItems="center" gap={2}>
            <Box
              sx={{
                fontSize: '2rem',
                fontWeight: '800',
                color: (theme) => theme.palette.error.dark,
              }}
            >
              100.000 đ
            </Box>
            <Box component="span" sx={{ textDecoration: 'line-through' }}>
              2000
            </Box>
            <Box
              component="div"
              sx={{
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                height: '30px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                px: 1,
                backgroundColor: (theme) => theme.palette.error.dark,
                color: (theme) => theme.palette.background.default
              }}
            >
              -50%
            </Box>
          </Stack>

          <Stack
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ maxWidth: '200px', minWidth: '150px', pr: 4 }}>
              <Typography variant="subtitle2">Thời gian giao hàng</Typography>
              <Typography variant="subtitle2">
                TNhà xuất bản:NXB Đà Nẵng
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Tác giả: Võ Văn Chiến</Typography>
              <Typography variant="subtitle2">Hình thức bìa:Bìa Mềm</Typography>
            </Box>
          </Stack>

          <Stack display={'flex'} flexDirection={'row'} alignItems="center">
            <Typography variant="body1" sx={{ width: '200px' }}>
              SỐ LƯỢNG:{' '}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                height: '35px',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #3333',
                borderRadius: '5px',
                px: 2,
              }}
            >
              <Icon
                icon="iconoir:minus"
                fontSize={24}
                onClick={() => counter !== 1 && setCounter(counter - 1)}
                style={{ cursor: 'pointer' }}
              />

              <input
                type="text"
                value={counter}
                style={{
                  width: '25px',
                  height: '90%',
                  outline: 'none',
                  border: 'none',
                  textAlign: 'center',
                }}
              />

              <Icon
                icon="bi:plus"
                fontSize={24}
                onClick={() => setCounter(counter + 1)}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <LatestBooks />

    </Stack>
  );
}
