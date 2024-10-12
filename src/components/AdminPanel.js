import React, { useState } from "react";

const AdminPanel = ({ profiles, onProfileChange }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [jobProfile, setJobProfile] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddOrUpdateProfile = async () => {
    if (!name || !city || !jobProfile || !description || !image) {
      alert("Please fill in all fields and upload a profile picture.");
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      const imageUrl = URL.createObjectURL(image);

      const newProfile = {
        id: editId || profiles.length + 1,
        name,
        location: { lat: parseFloat(lat), lng: parseFloat(lon), city },
        jobProfile,
        description,
        image: imageUrl,
      };

      const updatedProfiles = editId
        ? profiles.map((profile) =>
            profile.id === editId ? newProfile : profile
          )
        : [...profiles, newProfile];

      onProfileChange(updatedProfiles);

      clearForm();
    } else {
      alert("City not found. Please try again.");
    }
  };

  const handleEditProfile = (profile) => {
    setEditId(profile.id);
    setName(profile.name);
    setCity(profile.location.city);
    setJobProfile(profile.jobProfile);
    setDescription(profile.description);
    setImage(null);
  };

  const handleDeleteProfile = (profileId) => {
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== profileId
    );
    onProfileChange(updatedProfiles);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const clearForm = () => {
    setName("");
    setCity("");
    setJobProfile("");
    setDescription("");
    setImage(null);
    setEditId(null);
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.jobProfile.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Admin Panel
      </h2>

      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 rounded-lg p-3 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        className="border border-gray-300 rounded-lg p-3 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Profile"
        className="border border-gray-300 rounded-lg p-3 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={jobProfile}
        onChange={(e) => setJobProfile(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border border-gray-300 rounded-lg p-3 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="border border-gray-300 rounded-lg p-3 mb-3 w-full focus:outline-none"
        onChange={handleImageChange}
      />

      <button
        onClick={handleAddOrUpdateProfile}
        className="w-full bg-blue-600 text-white rounded-lg p-3 font-semibold hover:bg-blue-700 transition duration-200"
      >
        {editId ? "Update Profile" : "Add Profile"}
      </button>

      <input
        type="text"
        placeholder="Search profiles..."
        className="border border-gray-300 rounded-lg p-3  mt-7 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h3 className="text-xl font-semibold mt-8 mb-4 text-center">
        Existing Profiles
      </h3>

      <ul className="space-y-4">
        {filteredProfiles.map((profile) => (
          <li
            key={profile.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div className="flex items-center">
              {profile.image && (
                <img
                  src={profile.image}
                  alt={`${profile.name}'s profile`}
                  className="w-12 h-12 object-cover rounded-full mr-3"
                />
              )}
              <span className="text-gray-700">
                {profile.name} ({profile.location.city})
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditProfile(profile)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProfile(profile.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
