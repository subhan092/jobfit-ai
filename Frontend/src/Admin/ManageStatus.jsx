import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingRecruiters, updateRecruiterStatus } from "../redux/AsynThunk/usersThunk";


const ManageRecruiterStatus = () => {
  const dispatch = useDispatch();

  const { recruiters, loading } = useSelector((state) => state.recruiter);
  useEffect(() => {
    dispatch(fetchPendingRecruiters());
  }, [dispatch]);

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateRecruiterStatus({ userId, status: newStatus })).then(() => {
      dispatch(fetchPendingRecruiters()); // refresh list
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Recruiter Requests</h2>

      {loading && <p>Loading...</p>}

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {recruiters?.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.RecruiterStatus}</td>

              <td className="border p-2 text-center">
                <select
                  className="border px-2 py-1 rounded"
                  value={user.RecruiterStatus}
                  onChange={(e) =>
                    handleStatusChange(user._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {recruiters?.length === 0 && !loading && (
        <p className="text-gray-600 mt-4">No pending requests found.</p>
      )}
    </div>
  );
};

export default ManageRecruiterStatus;
