import { Stack } from '@mui/material';
import React from 'react';

export default function Banner() {
  return (
    <Stack display="flex" flexDirection="row" pt={2} sx={{ height: '200px' }}>
      <Stack width="70%">
        <img
          src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Banner"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Stack>
      <Stack display="flex" flexDirection="column" width="30%">
        <Stack height="100px">
          <img
            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Banner"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
          />
        </Stack>
        <Stack height="50%">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Banner"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
