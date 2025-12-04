import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
// import { setSingleCompany } from "../redux/reducers/companySlice";
import { Loader2 } from "lucide-react";
import { JOB_API_END_POINT } from "../utils/key";
import { fetchCompanies } from "../redux/AsynThunk/Company";

const Job_Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [salary, setSalary] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [position, setPosition] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleRegistor = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("salary", salary);
    formData.append("experienceLevel", experienceLevel);
    formData.append("location", location);
    formData.append("jobType", jobType);
    formData.append("position", position);
    formData.append("companyId", selectedCompany);

    requirements.forEach((req, index) => {
      formData.append(`requirements[${index}]`, req);
    });
    console.log("Form Data:", {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      selectedCompany,
    });

    console.log(formData.get("companyId"));

    try {
      const response = await axios.post(`${JOB_API_END_POINT}/post`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response) {
        toast.success(response.data.message || "Job posted sucessfully");
        setDescription("");
        setTitle("");
        setJobType("");
        setRequirements("");
        setSalary("");
        setExperienceLevel("");
        setPosition("");
        setLocation("");
        setSelectedCompany("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-center mb-8 p-6 bg-white shadow-lg rounded-lg">
      <form className="w-full space-y-4" onSubmit={handleRegistor}>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Post New Job
        </h2>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input-field h-24"
        />

        {Array.isArray(requirements) &&
          requirements.map((req, index) => (
            <div className="flex items-center">
              <input
                key={index}
                type="text"
                placeholder="Requirement"
                value={req}
                onChange={(e) => {
                  const newReqs = [...requirements];
                  newReqs[index] = e.target.value;
                  setRequirements(newReqs);
                }}
                className="input-field"
              />
              <button
                type="button"
                onClick={() => setRequirements([...requirements, ""])}
                className="bg-purple-700 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          ))}

        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Experience Level (Years)"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          required
          className="input-field"
        />
        <p className="font-bold">Select Company:</p>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="input-field"
          disabled={loading} // Disable when loading
        >
          {loading ? (
            <option>Loading...</option>
          ) : companies && companies.length > 0 ? (
            <>
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </>
          ) : (
            <option>No companies found</option>
          )}
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="input-field"
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="input-field"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>

        <input
          type="number"
          placeholder="Number of Positions"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="input-field"
        />

        <button
          type="submit"
          className="bg-purple-600 w-full text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 mx-auto animate-spin" />
          ) : (
            "Post job"
          )}
        </button>
      </form>

      <style>{`
                .input-field {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    outline: none;
                    transition: border 0.3s ease;
                }
                .input-field:focus {
                    border-color: #7e22ce;
                    box-shadow: 0 0 5px rgba(126, 34, 206, 0.5);
                }
            `}</style>
    </div>
  );
};

export default Job_Post;
