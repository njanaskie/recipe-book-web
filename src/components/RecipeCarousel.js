import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import Carousel from "react-multi-carousel";
import Slider from "react-slick";
import ingredientsReducer from '../reducers/ingredients';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
      }
    };

//     <div className='recipe-group__ingredient-group'>
//     {ingredients &&
//         ingredients.slice(0,6).map(ingredient =>
//             <div className='recipe-group__ingredient-item' key={ingredient}>
//                 <Label size='tiny'>
//                     {ingredient}
//                 </Label>
//             </div>
//         )
//     }
// </div>

const RecipeCarousel = ({ items, children }) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: items && items.length < 5 ? items.length : 5,
        slidesToScroll: items && items.length < 5 ? items.length : 5,
        className: "slider variable-width",
        variableWidth: true,
        rows: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    };

    return (
        // <Carousel
        // additionalTransfrom={0}
        // // autoPlaySpeed={3000}
        // // className=''
        // containerClass="carousel-container"
        // // customLeftArrow={<Icon name='chevron left' />}
        // // customRightArrow={<Icon name='chevron right' />}
        // // dotListClass=""
        // // draggable
        // // focusOnSelect={false}
        // // infinite
        // itemClass='carousel-item'
        // // keyBoardControl
        // // minimumTouchDrag={80}
        // // renderButtonGroupOutside={false}
        // // renderDotsOutside={false}
        // responsive={responsive}
        // // showDots={false}
        // sliderClass="carousel-slider"
        // slidesToSlide={1}
        // // swipeable
        // >
        <div className='custom-slider'>
            <Slider {...settings} >
                {children}
            </Slider>
        </div>
    )
};

export default RecipeCarousel;