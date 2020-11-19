import React from 'react';
import { Label } from 'semantic-ui-react'
import Carousel from "react-multi-carousel";

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

const RecipeIngredientsCarousel = ({ ingredients }) => (
    <Carousel
    // additionalTransfrom={0}
    // autoPlaySpeed={3000}
    className=''
    containerClass="container-with-dots"
    // dotListClass=""
    // draggable
    // focusOnSelect={false}
    // infinite
    itemClass='recipe-group__ingredient-item'
    // keyBoardControl
    // minimumTouchDrag={80}
    // renderButtonGroupOutside={false}
    // renderDotsOutside={false}
    responsive={responsive}
    // showDots={false}
    // sliderClass=""
    slidesToSlide={1}
    // swipeable
    >
        {ingredients &&
            ingredients.map(ingredient =>
                <Label size='tiny' key={ingredient}>
                    {ingredient}
                </Label>
            )
        }
    </Carousel>
);

export default RecipeIngredientsCarousel;