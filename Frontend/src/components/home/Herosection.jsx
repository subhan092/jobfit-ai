import { HandPlatter, Search } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../SearchContext/SearchContextProvider'

const Herosection = () => {


  const {jobs} = useSelector((state)=>state.job)
  const{ setSearchKeyword } = useContext(SearchContext )
  const [searchTerm , setsearchTerm] = useState(null)
  const navigate = useNavigate()
  const HandleSearch = ()=>{
      navigate('/browse')
      setSearchKeyword(searchTerm)
  }
    return (
    <div className='w-full max-w-xl text-center mx-auto flex  flex-col gap-[2rem] justify-center my-12'>
        <div className="">
        <span className='text-[#FA3002] text-md  font-bold p-3 bg-gray-100 rounded-full '>No 1 job hunt platform</span>
        </div>
        <div className="space-y-4 ">
        <h2 className='text-5xl font-bold'> Seacrh , Apply & <br /> <span className='text-purple-800'>Get your Dream job</span> </h2>
        <p className='text-gray-700 text-[0.9rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus necessitatibus recusandae iste quam nesciunt deserunt atque eos a asperiores esse  consequatur dicta culpa odio illum?</p>
        </div>
        <div className=" relative">
            <input type="text"
            value={searchTerm}
            onChange={(e)=>setsearchTerm(e.target.value)}
            className='border-gray-400  focus:border-none outline-none w-full shadow-xl rounded-full focus:outline-none  focus:ring-2 focus:ring-purple-700   '
             />
             <div className="absolute end-0 top-0 rounded-r-full cursor-pointer p-2 bg-purple-700">
                <Search onClick={()=>HandleSearch()} className='text-white '/>
             </div>
        </div>
    </div>
  )
}

export default Herosection