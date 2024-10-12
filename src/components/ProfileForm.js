import React, { useState, useEffect } from "react";

const ProfileForm = ({ profile, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setDescription(profile.description);
      setCity(profile.location.city);
      setLat(profile.location.lat);
      setLng(profile.location.lng);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      id: profile ? profile.id : Date.now(),
      name,
      description,
      location: {
        city,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    };
    onSave(newProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        className="border p-2 rounded w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        className="border p-2 rounded w-full"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        className="border p-2 rounded w-full"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {profile ? "Update Profile" : "Add Profile"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
