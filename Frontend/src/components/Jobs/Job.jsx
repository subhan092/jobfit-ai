import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Timer } from "lucide-react";
import { FaBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Job = ({ item, index }) => {
  function getDaysDifference(createdAt) {
    const createdDate = new Date(createdAt); // Convert to Date object
    const currentDate = new Date(); // Get current date

    // Calculate difference in milliseconds
    const diffInMs = currentDate - createdDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays === 0 ? "Today" : `${diffInDays} days ago`;
  }

  const {user} = useSelector((state)=>state.auth)
  return (
    <div
      key={index}
      className="bg-white  max-h-fit rounded-md border border-gray-300 shadow-xl px-6 py-4 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between mb-4">
        <button className="flex gap-1 items-center">
          <Timer></Timer> {getDaysDifference(item?.createdAt)}
        </button>
        <button>
          <Bookmark></Bookmark>
          {/* <FaBookmark size={22} /> */}
        </button>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <Link to={`/company/${item?.company?._id}`}>
            <Avatar className="border shadow-lg">
              <AvatarImage src={item.company?.logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link to="/login">
            <Avatar className="border shadow-lg">
              <AvatarFallback>Login</AvatarFallback>
            </Avatar>
          </Link>
        )}

        <div className="flex flex-col">
          <Link to={user ? `/company/${item?.company?._id}` : "/login"}>
            <h2 className="font-bold text-lg">
              {item.company?.name || "Login Required"}
            </h2>
          </Link>
          <h3 className="text-gray-500 text-sm">{item.country}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold pb-2 ">{item.title}</h2>
        <p className="text-gray-700">
  {item.description.split(" ").length > 20
    ? `${item.description.split(" ").slice(0, 12).join(" ")}............`
    : item.description}
</p>      </div>
      <div className="flex gap-4">
        <Badge>{item.position}</Badge>
        <Badge>{item.jobType}</Badge>
        <Badge>{item.salary}</Badge>
      </div>
      <div className="flex mt-2 gap-5">
        <Link to={`/job/${item?._id}`}>
          <Button variant="outline">Details</Button>
        </Link>
        <Button className="bg-purple-700 text-white hover:bg-purple-600">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
