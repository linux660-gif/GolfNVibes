import { Rating, RatingStar } from 'flowbite-react'
import { useState } from 'react';

export default function GNVRating(){
    const [value, setValue] = useState(0)
    const rating = [1,2,3,4,5]
    const handleOnClick = (rating:number) => {
      setValue(rating)

    }
    return (
      <Rating size='lg'>
        {rating.map((starValue) => (
            <RatingStar
             key={starValue}
             onClick= {() => (handleOnClick(starValue))}
             filled = {starValue <= value} 
             className='cursor-pointer transition-colors duration-150'
             />

        ))}
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {value} out of 5
        </p>
      </Rating>
    );
}