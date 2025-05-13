import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MatchUsers = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const { userId } = router.query; // Extract userId from URL parameters

  useEffect(() => {
    if (userId) {
      fetchMatches(userId);
    }
  }, [userId]);

  const fetchMatches = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/match/${userId}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMatches(data.matches);
      }
    } catch (err) {
      setError("Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <p>Loading matches...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div>
          <h2 className="text-xl font-bold">Matching Users</h2>
          <div className="mt-4">
            {matches.length === 0 ? (
              <p>No matches found</p>
            ) : (
              <ul>
                {matches.map((match) => (
                  <li key={match._id} className="mb-4 p-4 border rounded-md">
                    <h3 className="text-lg font-medium">{match.name}</h3>
                    <p>
                      <strong>Skills Offered:</strong>{" "}
                      {match.skillsOffered.join(", ")}
                    </p>
                    <p>
                      <strong>Skills Needed:</strong>{" "}
                      {match.skillsNeeded.join(", ")}
                    </p>
                    <button
                      onClick={() => router.push(`/profile/${match._id}`)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
                    >
                      View Profile
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchUsers;
