import { Icon } from '@iconify/react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import useResponsive from 'src/hooks/useResponsive';
import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Footer() {
  const IsMup = useResponsive('up', 'sm');

  return (
    <Stack
      width="100%"
      sx={{
        backgroundColor: 'Highlight',
        marginTop: '80px',
      }}
    >
      <Container>{IsMup ? <Desktop /> : <Mobile />}</Container>

      <Divider />

      <Container>
        <Stack spacing={2.5} alignItems="center" py={3}>
          <Typography variant="caption">
            Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và
            Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi
            lần thứ 10, ngày 20/05/2022.
          </Typography>
          <Typography variant="overline" color={'gray'}>
            ---OoOoOoO---
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
