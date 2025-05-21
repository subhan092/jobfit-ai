import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Corusal = () => {
  const title = [
    "Frontend Developer",
    "Backend Developer",
    "SQA Enginner",
    "Graphic Designer",
    "Ai Enginner",
    "Data Scientist",
    "full Stack devleper",
    "Software Enginner"
  ]
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto'>
  <CarouselContent className='text-center space-x-8 mx-4'>
  {title && title.map((item,index)=>
     <CarouselItem
      className='basis-1/3 font-medium border-gray-400 border-[1px] shadow-lg rounded-full'
     key={index}>{item}</CarouselItem>
  )}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  </Carousel>

    </div>
  )
}

export default Corusal