import { Button, Stack } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom'
import { DetailProduct } from '../detailProduct';

export default function DetailProductView() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/')
    }

  return (
    <>
            <DetailProduct />

    </>
  )
}
