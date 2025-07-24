import React, { useState } from "react";
import axios from "axios";

const ProfileEdit = ({ userId, currentProfile }) => {
  const [bio, setBio] = useState(currentProfile?.bio || "");
  const [skillsOffered, setSkillsOffered] = useState(
    currentProfile?.skillsOffered || []
  );
  const [skillsNeeded, setSkillsNeeded] = useState(
    currentProfile?.skillsNeeded || []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage
      const response = await axios.put(
        `/api/profile/${userId}`,
        {
          bio,
          skillsOffered,
          skillsNeeded,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Profile updated:", response.data);
      // Handle success, e.g., redirect to the profile page or show a success message
    } catch (err) {
      console.error("Error updating profile:", err);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <div>
        <label>Skills Offered:</label>
        <input
          type="text"
          value={skillsOffered.join(", ")}
          onChange={(e) => setSkillsOffered(e.target.value.split(", "))}
        />
      </div>
      <div>
        <label>Skills Needed:</label>
        <input
          type="text"
          value={skillsNeeded.join(", ")}
          onChange={(e) => setSkillsNeeded(e.target.value.split(", "))}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileEdit;
