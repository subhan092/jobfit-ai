import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Loader2, Mail, Pen, PenLine, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppliedJobs from "./AppliedJobs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading, setUserAuth } from "../../redux/reducers/authslice";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_END_POINT } from "../../endPoint";
import { looadUser } from "../../redux/AsynThunk/User_Auth";
import { fetchUserById } from "../../redux/AsynThunk/usersThunk";
import { useParams } from "react-router-dom";

const Profile = ({adminView=false}) => {
  // const skills = ["html", "css", "js", "reactjs"];
  const { user , Loading} = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  // ------------------admin profile----------------

  const { id } = useParams();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id]);

  const data = adminView ? userProfile  : user

  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const eventHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", JSON.stringify(input.skills)); // Convert array to JSON

  
    // File ko alag append karo
    if (input.file) {
      formData.append("file", input.file);
    }
  
    console.log("FormData Values:", [...formData]); // Debugging ke liye
  
    try {
      dispatch(setLoading(true));
  
      const response = await axios.post(
        `${USER_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        dispatch(looadUser(response.data.userData));
        toast.success(response.data.message);
        setOpen(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
  


  return (
    <div className={`${open ? "bg-gray-400" : null} relative w-full`}>
      <div
        className={`shadow-lg rounded-md  space-y-6  py-4 px-8 my-12 `}
      >
        <div className="flex justify-between pb-3">
          <div className="flex items-center  gap-6">
            <Avatar className="h-22 w-32">
              <AvatarImage src={data?.photo}></AvatarImage>
            </Avatar>
            <div className="flex flex-col justify-start gap-4">
              <h2 className="text-2xl font-bold">{data?.name}</h2>
              <p className="text-gray-600">
              {data?.profile?.bio}
              </p>
            </div>
          </div>
          <div className="flex">
           {adminView ? null :
             <button onClick={() => setOpen(!open)}>
             <PenLine size={40} />
           </button>
           }
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Mail size={25} />
            <p>{data?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={25} />
            <p>{data ? data?.phoneNumber :null}</p>
          </div>
        </div>
        {adminView ? null :
          <div className="space-y-2">
          <h2 className="text-xl font-bold">Skills</h2>
          {data?.profile?.skills?.length > 0 &&
  data?.profile?.skills?.map((item, index) => (
    <Badge key={index} className="bg-black m-4 text-white" variant="outline">
    {item}
    </Badge>
  ))}

        </div>
        }
        {adminView ? null :
        <div className="">
        <h2 className="text-xl font-bold">Resume</h2>
        <a
          href={data?.profile?.resume}
          target="_blank"
          className="text-purple-800 hover:underline cursor-context-menu"
        >
         Checkout Resume
        </a>
      </div>
        }
        
      </div>
      {open ? (
        <div className="w-[40rem] mx-auto bg-white shadow-lg rounded-md top-0 py-5 left-1/4 absolute my-4">
          <h2 className="text-2xl text-center font-bold">
            Update <span className="text-purple-700">Profile</span>
          </h2>
          <div className="grid gap-4 px-8 py-4">
            <form className="space-y-4" onSubmit={handleSubmit} method="post">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={eventHandler}
                type="text"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                value={input.email}
                onChange={eventHandler}
                type="text"
                id="email"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Label htmlFor="phone">Phone </Label>
              <Input
                name="phone"
                value={input.phone}
                onChange={eventHandler}
                type="text"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Label htmlFor="phone"> Skills </Label>
              <Input
                name="skills"
                value={input.skills}
                onChange={eventHandler}
                type="text"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Label htmlFor="bio"> Bio </Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={eventHandler}
                type="text"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Resume
              </label>
              <input
                className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                id="file_input"
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleFile}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 w-full text-white py-2 px-4 rounded-lg"
            >
              {Loading ? (
                <Loader2 className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                "Upadte"
              )}
            </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
