import { Box, Grid, Paper, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import useResponsive from 'src/hooks/useResponsive';

const category = [
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   // ...theme.typography.body2,
//   // padding: theme.spacing(2),
//   color: theme.palette.text.secondary,
//   // border: "1px solid #3333",
//   // height: "200px",
//   cursor: 'pointer',
//   textAlign: 'center',
// }));

export default function Category() {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   pauseOnHover: true,
  //   centerMode: true,
  //   cssEase: 'linear',
  // };

  return (
    <div className="w-full pt-5">
      <p className="text-xl py-5">Danh mục sản phẩm</p>

      {/* <div className="sm:flex hidden"> */}
      <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 w-full">
        {category.map((pr, index) => (
          <div
            key={index}
            className="p-5 border-[1px] border-gray-300 shadow-md rounded-md"
          >
            <img
              src={pr.image}
              alt={pr.title}
              className="w-full h-[140px] object-cover"
            />
            <div className="pt-2">
              <p className="text-sm">{pr.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* mobile */}
      {/* <Slider {...settings}>
        {category.map((pr, index) => (
          <div
            key={index}
            className="py-2 border-[2px] border-x-white"
          >
            <img
              src={pr.image}
              alt={pr.title}
              className="w-full h-[140px] object-cover"
            />
            <p className="text-md self-center">{pr.title}</p>
          </div>
        ))}
      </Slider> */}
    </div>
  );
}
