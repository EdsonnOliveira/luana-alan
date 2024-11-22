import styled from 'styled-components';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainContent = styled.main`
  padding-top: 80px;
`;

const ImageGrid = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
  }

  .slick-list {
    margin: 0 -10px;
  }

  .slick-prev, .slick-next {
    z-index: 1;
    &:before {
      color: #2A2E29;
    }
  }

  .slick-prev {
    left: 25px;
  }

  .slick-next {
    right: 25px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 800px;
  height: calc(100vh - 160px);
  overflow: hidden;
  
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .overlay {
      opacity: 1;
    }
  }
`;

export default function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000 * 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const images = [
    {
      src: '/gallery/Allan&Luana-12.jpg',
    },
    {
      src: '/gallery/Allan&Luana-27.jpg',
    },
    {
      src: '/gallery/Allan&Luana-31.jpg',
    },
    {
      src: '/gallery/Allan&Luana-48.jpg',
    },
    {
      src: '/gallery/Allan&Luana-49 4.jpg',
    },
    {
      src: '/gallery/Allan&Luana-49.jpg',
    },
    {
      src: '/gallery/Allan&Luana-51.jpg',
    },
    {
      src: '/gallery/Allan&Luana-53.jpg',
    },
    {
      src: '/gallery/Allan&Luana-55 2.jpg',
    },
    {
      src: '/gallery/Allan&Luana-62 2.jpg',
    },
    {
      src: '/gallery/Allan&Luana-62.jpg',
    },
    {
      src: '/gallery/Allan&Luana-63.jpg',
    },
    {
      src: '/gallery/Allan&Luana-68.jpg',
    },
    {
      src: '/gallery/Allan&Luana-70.jpg',
    },
    {
      src: '/gallery/Allan&Luana-72.jpg',
    },
    {
      src: '/gallery/Allan&Luana-73 2.jpg',
    },
    {
      src: '/gallery/Allan&Luana-78.jpg',
    },
    {
      src: '/gallery/Allan&Luana-79 2.jpg',
    },
    {
      src: '/gallery/Allan&Luana-79 3.jpg',
    },
  ];

  return (
    <>
      <Header />

      <MainContent>
        <ImageGrid {...settings}>
          {images.map((image, index) => (
            <ImageWrapper key={index}>
              <Image
                src={image.src}
                alt='Luana e Allan'
                layout="fill"
                objectFit="cover"
              />
            </ImageWrapper>
          ))}
        </ImageGrid>
      </MainContent>

      <Footer />
    </>
  );
}
