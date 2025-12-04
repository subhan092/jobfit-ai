import React, { useContext, useEffect } from 'react'
import BrowseComp from '../components/browse/BrowseComp'
import Navbar from '../components/ui/shared/Navbar'
import Footer from '../components/Footer'
import Looader from '../Looader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../redux/AsynThunk/Job_oprations'
import { SearchContext } from '../SearchContext/SearchContextProvider'

const Browse = () => {
  const {jobs , loading} =  useSelector((state)=>state.job)
   const dispatch = useDispatch()
     const{ searchKeyword} = useContext(SearchContext)
   
  useEffect(() => {
   dispatch(getAllJobs(searchKeyword))
  }, [searchKeyword])
  
  console.log("jobs in browse",jobs)
  return (
    <div>
      <Navbar/>
        {loading ? <Looader/> 
        :
        <BrowseComp jobs={jobs}/>
        }
        <Footer/>
    </div>
  )
}

export default Browse