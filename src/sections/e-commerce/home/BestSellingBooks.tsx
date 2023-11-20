import { Box, Grid, Paper, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookType } from 'src/types/book';

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
  books: Array<BookType>;
}

export default function BestSellingBooks({ books }: props) {
  const itemsPerPage = 10;
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const totalItems = books.length;

  const loadMore = () => {
    setDisplayedItems((prev) => prev + (totalItems - 150));
  }

  const showLess = () => {
    setDisplayedItems(itemsPerPage);
  }

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

        {books.slice(0, displayedItems).map((item: BookType) => {
          return (
            <div
              key={item.id}
              className="p-5 border-[1px] border-gray-300 shadow-md rounded-md relative"
            >
              <Link to={`/detailproduct/${item.id}`}>
                <img
                  src={item.images}
                  alt={'img'}
                  className="w-full max-h-[190px] object-cover"
                />
              </Link>
              <div className="pt-2 ">
                <p className="text-sm line-clamp-2 h-[40px]">{item.title}</p>
                <p className="text-lg font-semibold text-[#C92127] mt-2">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    item.price - (item.price * item.discount) / 100,
                  )}
                </p>
                <p className="text-sm text-[#888888] line-through">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                </p>
                <span className="absolute right-1 top-2 first-letter bg-[#F7941E] text-white font-semibold px-1 py-2 rounded-full">
                  {item.discount}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {displayedItems < (totalItems - 150) ? (
        <div className="text-center mt-4">
          <button className="text-[#d32f2f] font-semibold border-[2px] border-[#d32f2f] px-4 rounded-md py-2 active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white" onClick={loadMore}>
            Xem Thêm
          </button>
        </div>
      ) : (
        displayedItems > itemsPerPage && (
          <div className="text-center mt-4">
            <button className="text-[#d32f2f] font-semibold border-[2px] border-[#d32f2f] px-4 rounded-md py-2 active:bg-red-300 active:text-white duration-100 hover:bg-[#d32f2f] hover:text-white" onClick={showLess}>
              Thu gọn
            </button>
          </div>
        )
      )}
    </div>
  );
}
