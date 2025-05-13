import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../components/UserContext";
import {
  User,
  Edit2,
  Save,
  X,
  PlusCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    skillsOffered: [],
    skillsNeeded: [],
  });
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillNeeded, setNewSkillNeeded] = useState("");
  const [savingChanges, setSavingChanges] = useState(false);
  const [success, setSuccess] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // Fetch user data
  useEffect(() => {
    if (!user) return;
    if (userId) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:5000/api/user/${userId}`);
          const data = await res.json();
          if (res.ok) {
            setUserData(data);
            setForm({
              bio: data.bio || "",
              skillsOffered: data.skillsOffered || [],
              skillsNeeded: data.skillsNeeded || [],
            });
          } else {
            setError(data.error || "Failed to fetch user data");
          }
        } catch (err) {
          setError("Server error. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (type) => {
    if (type === "offered" && newSkillOffered.trim()) {
      setForm((prev) => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()],
      }));
      setNewSkillOffered("");
    } else if (type === "needed" && newSkillNeeded.trim()) {
      setForm((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, newSkillNeeded.trim()],
      }));
      setNewSkillNeeded("");
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    if (!user?.token) {
      setError("Session expired. Please login again.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    setSavingChanges(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            bio: form.bio,
            skillsOffered: form.skillsOffered,
            skillsNeeded: form.skillsNeeded,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUserData(data.updatedUser);
        setEditing(false);
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess(null);
          router.push("/");
        }, 1500);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Update error. Try again.");
    } finally {
      setSavingChanges(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-green-50">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl flex flex-col items-center">
            <Loader size={48} className="text-green-700 animate-spin mb-4" />
            <p className="text-green-800 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow flex items-start justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-green-100">
            <div className="bg-green-100 text-green-800 p-6 rounded-full mb-4">
              <User size={48} />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              {userData?.name || "User"}'s Profile
            </h1>
            <p className="text-gray-600 mb-2">
              {userData?.email || "user@example.com"}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Member since{" "}
              {new Date(userData?.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>

          {/* Success message */}
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 flex items-start rounded">
              <div className="mr-3 bg-green-100 text-green-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-green-800 font-medium">{success}</p>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-500 hover:text-green-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-start rounded">
              <AlertCircle size={20} className="text-red-500 mr-3" />
              <div className="flex-grow">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {editing ? (
            <div className="space-y-6">
              {/* Bio Section */}
              <div className="bg-green-50 p-6 rounded-lg">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Tell us about yourself, your interests, and what you're looking for on Barter Circle"
                />
              </div>

              {/* Skills Offered Section */}
              <div className="bg-green-50 p-6 rounded-lg">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Skills You Can Offer
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    placeholder="Type a skill and press Add"
                    className="flex-grow p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    onKeyDown={(e) => e.key === "Enter" && addSkill("offered")}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill("offered")}
                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                  >
                    <PlusCircle size={18} className="mr-1" /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.skillsOffered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill("skillsOffered", skill)}
                        className="text-green-700 hover:text-green-900 ml-1 focus:outline-none"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {form.skillsOffered.length === 0 && (
                    <span className="text-gray-500 text-sm italic">
                      No skills added yet
                    </span>
                  )}
                </div>
              </div>

              {/* Skills Needed Section */}
              <div className="bg-green-50 p-6 rounded-lg">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Skills You Need
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkillNeeded}
                    onChange={(e) => setNewSkillNeeded(e.target.value)}
                    placeholder="Type a skill and press Add"
                    className="flex-grow p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    onKeyDown={(e) => e.key === "Enter" && addSkill("needed")}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill("needed")}
                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                  >
                    <PlusCircle size={18} className="mr-1" /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.skillsNeeded.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill("skillsNeeded", skill)}
                        className="text-green-700 hover:text-green-900 ml-1 focus:outline-none"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {form.skillsNeeded.length === 0 && (
                    <span className="text-gray-500 text-sm italic">
                      No skills added yet
                    </span>
                  )}
                </div>
              </div>

              {/* Save / Cancel Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  disabled={savingChanges}
                  className={`bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-md transition-colors duration-200 flex items-center ${
                    savingChanges ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {savingChanges ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition-colors duration-200 flex items-center"
                  disabled={savingChanges}
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Bio Display */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <div className="mr-2 bg-green-100 text-green-800 p-1 rounded-full">
                    <User size={18} />
                  </div>
                  Bio
                </h2>
                <p className="text-gray-700">
                  {userData?.bio ||
                    "No bio added yet. Click 'Edit Profile' to add one."}
                </p>
              </div>

              {/* Skills Offered Display */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-3">
                  Skills Offered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {userData?.skillsOffered?.length > 0 ? (
                    userData.skillsOffered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600 italic">
                      No skills offered yet
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Needed Display */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-3">
                  Skills Needed
                </h2>
                <div className="flex flex-wrap gap-2">
                  {userData?.skillsNeeded?.length > 0 ? (
                    userData.skillsNeeded.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600 italic">No skills needed yet</p>
                  )}
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center"
                >
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
