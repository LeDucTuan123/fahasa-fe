import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import { Box, Container } from '@mui/material'
import Footer from './footer'

export default function MainLayout() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: 1}}>

      <Header />
      
      <Box
        component='main'
        sx={{flexGrow: 1, pt: 12}}
      >
        <Container>

          <Outlet />
          
        </Container>

      </Box>

      <Footer />
    
    </Box>
  )
}
