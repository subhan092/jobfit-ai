import React from 'react'
import Job from '../Jobs/Job'

const BrowseComp = ({jobs}) => {
  
  return (
    <div className='w-full px-12 mx-auto space-y-4 my-12'>
       <h2 className='text-2xl  font-bold pb-6'>Search Results({jobs.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {
            jobs.map((item,index)=>(
              <Job item={item} index={index}/>
            ))
          }
        </div>
    </div>
  )
}

export default BrowseComp
