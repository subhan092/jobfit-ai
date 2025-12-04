import { Clock } from 'lucide-react'
import React from 'react'

const PendingApproval = () => {
  return (
    <div className='bg-gray-50 w-full flex min-h-screen justify-center items-center'>
        <div className="space-y-3 flex flex-col items-center ">
            <Clock size={50} color='blue' className='text-blue-500 ' />
            <h2 className='text-red-600 font-medium text-2xl'>Please wait for Admin Approval</h2>
        </div>
    </div>
  )
}

export default PendingApproval