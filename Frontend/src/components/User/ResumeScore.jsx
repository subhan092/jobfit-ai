import React from 'react'
import { useSelector } from 'react-redux';


const ResumeScore = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='flex flex-col mx-8 gap-y-4 my-6'>
        <div className="flex flex-col gap-4 ">
        <label htmlFor="">Enter job description</label>
        <textarea 
  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-700 focus:outline-none" 
  rows="5"
></textarea>
        </div>
        <div className="flex flex-col  gap-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload your Resume
              </label>
              <input
                className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                id="file_input"
                type="file"
                name="file"
              />
            </div>
            <div className="space-y-4 shadow-lg shadow-purple-700 rounded-md pl-2 py-8 ">
                <h2 className='text-2xl font-bold  '>Resume<span className='text-purple-700 pl-2'>Score</span></h2>
                  <p className='text-purple-700 font-semibold '>0.89%</p>
            </div>

            <iframe
  src={user?.profile.resume} // ✅ Correct Cloudinary PDF URL
  width="100%"
  height="600px"
  style={{ border: "none" }}
></iframe>
    </div>
  )
}

export default ResumeScore