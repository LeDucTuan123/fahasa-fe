import { Box, Grid, Paper, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const category = [
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
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
    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    price: 200.0,
  },
  {
    title: 'Sách tâm lý',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 200.0,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  border: '1px solid #3333',
  height: '200px',
  cursor: 'pointer',
}));

interface props {
  books: any;
}

export default function BestSellingBooks({ books }: props) {
  return (
    <div className="w-full pt-5">
      <p className="text-xl py-5">Sách bán chạy</p>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {/* {category.map((pr, index) => (
          <div
            key={index}
            className="p-5 border-[1px] border-gray-300 shadow-md rounded-md"
          >
            <Link to="/detailproduct">
              <img
                src={pr.image}
                alt={pr.title}
                className="w-full h-[140px] object-cover"
              />
            </Link>
            <div className="pt-2">
              <p className="text-sm">{pr.title}</p>
              <p className="text-sm">{pr.price}</p>
            </div>
          </div>
        ))} */}

        {books.map((item: any) => {
          return (
            <div
              key={item.id}
              className="p-5 border-[1px] border-gray-300 shadow-md rounded-md"
            >
              <Link to="/detailproduct">
                <img
                  src={item.images}
                  alt={'img'}
                  className="w-full h-[140px] object-cover"
                />
              </Link>
              <div className="pt-2">
                <p className="text-sm">{item.title}</p>
                <p className="text-sm">{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
