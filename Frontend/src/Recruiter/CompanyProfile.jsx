import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  Globe, 
  MapPin, 
  PenLine, 
  Loader2, 
  Building2, 
  Users, 
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Instagram
} from 'lucide-react';
import { fetchCompanybyId } from '../redux/AsynThunk/Company';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Company_API_END_POINT } from '../utils/key';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { company } = useSelector((state) => state.company);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [input, setInput] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    file: null,
    email: '',
    phone: '',
    foundedYear: '',
    employeeCount: '',
    socialLinks: {
      linkedin: '',
      instagram: ''
    }
  });
  const [loading,setLoading] = useState(false)
  const {user} = useSelector((state)=>state.auth)
   
  useEffect(() => {
    dispatch(fetchCompanybyId(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (company) {
      setInput({
        name: company.name || '',
        description: company.description || '',
        location: company.location || '',
        website: company.website || '',
        file: company.logo || null,
        email: company.email || '',
        phone: company.phone || '',
        foundedYear: company.foundedYear || '',
        employeeCount: company.employeeCount || '',
        socialLinks: company.socialLinks || {
          linkedin: '',
          instagram: ''
        }
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInput(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setInput(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setInput(prev => ({ ...prev, file: file }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("comp logo",input.file)
    const formData = new FormData();

    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('location', input.location);
    formData.append('website', input.website);
    formData.append('email', input.email);
    formData.append('phone', input.phone);
    formData.append('foundedYear', input.foundedYear);
    formData.append('employeeCount', input.employeeCount);
  

    if (input.file) {
      formData.append('file', input.file);
    }
  
 
    formData.append('socialLinks', JSON.stringify(input.socialLinks));
  
    try {
      setLoading(true)
        const response = await axios.put(
         `${Company_API_END_POINT}/update/${id}`,
         formData,
         {
           headers: {
             "Content-Type": "multipart/form-data",
           },
           withCredentials: true,
         }
       );
        if (response.data.success) {
               toast.success(response.data.message);
               setEditMode(false)
               setLoading(false)
             }
   
     } catch (error) {
        toast.error(error.response?.data?.message);
       
     }
     finally{
      setLoading(false)
     }
  };
  

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'team', label: 'Team' },
    { id: 'jobs', label: 'Jobs' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Company Header */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out opacity-100 translate-y-0">
        {/* Cover Image */}
        <div className="h-60 bg-gradient-to-r from-violet-500 to-indigo-500 relative">
          <div className="absolute -bottom-16 left-8 transition-all duration-300 ease-in-out">
            <div className="h-32 w-32 rounded-xl bg-white dark:bg-gray-700 p-2 shadow-lg">
              <img
                src={company?.logo || 'https://via.placeholder.com/128'}
                alt={company?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {
          user && user?.role != "recruiter" ?  null
           :
           <button
            onClick={() => setEditMode(!editMode)}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <PenLine className="w-5 h-5 text-white" /> 
      
          </button>
          }
        </div>

        {/* Company Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {company?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {company?.description}
              </p>
            </div>
            <div className="flex gap-4">
              {company?.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-900 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-all duration-300 hover:shadow-lg">
              <Users className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Employees</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {company?.employeeCount || '---'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-all duration-300 hover:shadow-lg">
              <Calendar className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Founded</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {company?.foundedYear || '---'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-all duration-300 hover:shadow-lg">
              <MapPin className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Location</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {company?.location || '---'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-all duration-300 hover:shadow-lg">
              <Building2 className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Industry</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {company?.industry || '---'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                    ${activeTab === tab.id
                      ? 'border-violet-500 text-violet-600 dark:text-violet-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'overview' && (
              <div className="space-y-8 transition-opacity duration-300 ease-in-out">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {company?.description || 'No description available.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {company?.email || 'Not available'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {company?.phone || 'Not available'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                  <div className="flex gap-4">
                    {company?.socialLinks?.linkedin && (
                      <a
                        href={company.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {company?.socialLinks?.instagram && (
                      <a
                        href={company.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="text-center py-12 text-gray-500">
                Team information coming soon...
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="text-center py-12 text-gray-500">
                Job listings coming soon...
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="text-center py-12 text-gray-500">
                Company gallery coming soon...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-in-out transform scale-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Company Profile</h2>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={input.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Founded Year</label>
                    <input
                      type="text"
                      name="foundedYear"
                      value={input.foundedYear}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company Logo</label>
                  <input
                    type="file"
                    name='file'
                    accept="image/*"
                    onChange={handleFile}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={input.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(input.socialLinks).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium mb-2 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        name={`socialLinks.${platform}`}
                        value={url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;