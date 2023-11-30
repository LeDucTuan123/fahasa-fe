import Slider from 'react-slick';

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <div className="flex flex-row pt-2 h-[316px]">
      <div className="w-[70%] rounded-lg">
        <Slider
          {...settings}
          className="rounded-lg"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbanner1.jpg?alt=media&token=7bb6669f-7a51-4e18-ae37-9a91f12fc530&_gl=1*1btq0ff*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjM2MzIuNDcuMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbanner2.jpg?alt=media&token=bc894db1-b878-425a-8190-5ade8774652f&_gl=1*xw5olb*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjMwNzEuNjAuMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbanner3.jpg?alt=media&token=1af0cb40-d7de-438d-b16a-25f0c7a18bc0&_gl=1*1knuln9*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjMwODUuNDYuMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbanner4.jpg?alt=media&token=54636a0a-2eba-40fc-b7a4-6766cad26acb&_gl=1*17qya00*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjMwOTcuMzQuMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </Slider>
      </div>
      <div className="flex flex-col w-[29%] ml-2">
        <div className="h-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbannerright.jpg?alt=media&token=7c8c0426-0efe-4fad-8f60-6cefa60cb08b&_gl=1*7kua0i*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjI5NDQuNjAuMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg mb-2"
          />
        </div>

        <div className="h-[50%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/poly-java-6-5ef9e.appspot.com/o/imagesFahasa%2Fbanner%2Fbannerright1.jpg?alt=media&token=a84d6a7f-d0c6-4322-af37-9c7ebde0640c&_gl=1*cqaas4*_ga*MjkwMjk5NzA4LjE2OTU5NzU1NjA.*_ga_CW55HF8NVT*MTY5ODcyMjc0NS4zNS4xLjE2OTg3MjI5NzYuMjguMC4w"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg mt-4"
          />
        </div>
      </div>
    </div>
  );
}
