import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import fetch from 'src/services/axios/Axios';

export default function Category() {
  const [categoryWithImage, setCategoryWithImage] = useState([]);
  useEffect(() => {
    fetch('/rest/category')
      .then((res) => {
        let arr = res.data.filter((item: any) => {
          return item.images !== null;
        });
        setCategoryWithImage(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="w-full mt-10 bg-white">
      <div className="flex w-full items-center px-5 gap-3 py-3 font-semibold">
        <Icon
          icon={'iconamoon:category-thin'}
          className="text-3xl text-red-400 font-bold"
        />
        <p className="text-xl">Danh mục sản phẩm</p>
      </div>

      {/* <div className="sm:flex hidden"> */}
      {/* grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 */}
      <div className=" w-full">
        <Slider {...settings}>
          {categoryWithImage.map((item: any) => (
            <div
              key={item.id}
              className="p-5 text-center"
            >
              <div className="flex">
                <img
                  src={item.images}
                  alt={item.categoryname}
                  className="w-[100px] h-[100px] object-cover m-auto"
                />
              </div>

              <div className="pt-2 h-[40px]">
                <p className="text-sm">{item.categoryname}</p>
              </div>
            </div>
          ))}
        </Slider>
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
