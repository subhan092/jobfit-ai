import React, { useContext, useEffect } from 'react'
import FilterCard from '../components/Jobs/FilterCard'
import Job from '../components/Jobs/Job'
import Navbar from '../components/ui/shared/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../redux/AsynThunk/Job_oprations';
import Looader from '../Looader';
import { SearchContext } from '../SearchContext/SearchContextProvider';

const Jobs = () => {
  const dispatch = useDispatch()
const{ searchKeyword} = useContext(SearchContext)
  useEffect(() => {
    dispatch(getAllJobs(searchKeyword))
  }, [dispatch,searchKeyword])
  
 const {jobs , loading} =  useSelector((state)=>state.job)
  return (
    <>
        <Navbar/>
      {loading ? <Looader/>
      :
      <div className='w-full px-12 mx-auto flex gap-4 my-12'>
       <div className="w-[15%]">
        <FilterCard/>
       </div>
       <div className="w-[85%] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 overflow-y-auto h-screen">
       {jobs.length < 0 ? "no jobs found" : jobs?.map((item, index) => (
    <Job item={item} index={index} key={index} />
))}
       </div>
    </div>
      }
    <Footer/>
    </>
  )
}

export default Jobs
