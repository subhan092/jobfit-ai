import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Avatar, AvatarImage } from '../avatar'
import { LayoutDashboardIcon, LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
import { setUserAuth } from '../../../redux/reducers/authslice'
import { toast } from 'react-toastify'
import { USER_API_END_POINT } from '../../../utils/key'
import { USER_END_POINT } from '../../../endPoint'
import { logoutUser } from '../../../redux/AsynThunk/User_Auth'

// import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await dispatch(logoutUser()).unwrap();  
            toast.success(response.msg || "logout sucessfully");  
            navigate('/');  
        } catch (error) {
            toast.error(error.message || "Logout failed!");  
        }
    };
    
    
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-4xl font-bold'>Job<span className='text-purple-700'>Fit AI</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                               null
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/registor"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Registor</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                    <AvatarImage  src={user?.photo} />
                                        {/* <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" /> */}
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                {/* <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" /> */}
                                                <AvatarImage  src={user?.photo} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.name}</h4>
                                                {/* <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p> */}
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            
                                              {user && user.role === 'recruiter' ? (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <LayoutDashboardIcon />
                                                        <Button variant="link"> <Link to="/recruiter/dashboard">View Dashboard</Link></Button>
                                                    </div>)
                                                : user && user.role == 'admin'  ? (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LayoutDashboardIcon />
                                                    <Button variant="link"> <Link to="/admin/dashboard">Go to Dashboard</Link></Button>
                                                </div>)
                                                :
                                                (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/dashboard">View Profile</Link></Button>
                                                    </div>

                                              )}

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={()=>handleLogout()} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar