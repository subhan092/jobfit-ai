import React, { useContext, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'
import { getAllJobs } from '../../redux/AsynThunk/Job_oprations'
import { SearchContext } from '../../SearchContext/SearchContextProvider'

const FilterCard = () => {

    const { searchKeyword, setSearchKeyword } = useContext(SearchContext)

    const handleSearch = (v) => {
        setSearchKeyword(v)
    
    }


    const filters = [
        { key: "type", value: ["Full-time", "Part-time", "Contract", "Internship"] },
        { key: "location", value: ["Remote", "New York", "San Francisco", "Los Angeles"] },
        { key: "industry", value: ["Software", "Finance", "Healthcare", "Education"] },
        { key: "salary", value: ["50000-70000", "70000-100000", "100000-150000"] },
        { key: "jobTitle", value: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer", "AI Engineer"] }
    ]

    return (
        <div className='border border-gray-400 rounded-lg pl-2'>
            <h2 className='font-bold text-2xl'>Filter Jobs</h2>
            <hr className='mt-4' />
            <RadioGroup value={searchKeyword} onValueChange={handleSearch}>
                {filters.map((item, index) => (
                    <div key={index} className="mt-4">
                        <h2 className='font-bold pb-2'>{item.key}</h2>
                        {item.value.map((v, i) => (
                            <div key={i} className="flex gap-2 items-center py-2">
                                <RadioGroupItem id={v} value={v} />  {/* ✅ Fixed id issue */}
                                <Label htmlFor={v}>{v}</Label>
                            </div>
                        ))}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard
