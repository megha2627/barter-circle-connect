import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Search,
  User,
  Leaf,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Category() {
 
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 6;

  useEffect(() => {
    async function fetchProfiles() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/category`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProfiles(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  // Filtered by skill offered
  const filteredProfiles = profiles.filter((profile) =>
    profile.skillsOffered.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-100 py-12 px-4 md:px-8">
      {/* Header with animated gradient text */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full p-1 animate-pulse">
            <div className="h-full w-full bg-white rounded-full flex items-center justify-center">
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-green-500 to-green-600 animate-pulse">
            Discover & Connect
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"></div>
        </h1>
        <p className="text-xl text-green-800 max-w-2xl mx-auto">
          Find people with the skills you need, and share your expertise with
          others
        </p>
      </div>

      {/* Search section with animation */}
      <div className="flex justify-center mb-16 relative">
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-yellow-500" />
          </div>
          <input
            type="text"
            placeholder="Search for a skill you need..."
            className="w-full p-5 pl-12 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 text-lg transition-all duration-300 border-2 border-yellow-200 group-hover:border-yellow-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white bg-opacity-60 rounded-3xl shadow-xl max-w-xl mx-auto border-2 border-yellow-200">
          <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-xl text-gray-700 mb-4">
            No profiles found offering "{searchTerm}".
          </p>
          <p className="text-green-600">
            Try searching for another skill or check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProfiles.map((profile, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-yellow-200 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102 border-t-4 border-yellow-400"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-yellow-200 to-green-200 p-3 rounded-full">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800">
                        {profile.username}
                      </h2>
                      <p className="text-gray-500">{profile.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-2xl border-l-4 border-green-400">
                    <h3 className="font-semibold text-lg text-green-600 mb-2 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Skills Offered:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skillsOffered.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium hover:bg-green-300 transition-colors cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-2xl border-l-4 border-yellow-400">
                    <h3 className="font-semibold text-lg text-yellow-700 mb-2 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Skills Needed:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skillsNeeded.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/*<div className="mt-8 flex justify-end">
                  <Link href={`/profile/${profile._id}`}>
                    <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 transform hover:scale-105">
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div> */}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-green-600 hover:bg-green-100"
                    }`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="flex mx-2 space-x-1">
                  {[...Array(totalPages).keys()].map((number) => {
                    const pageNumber = number + 1;
                    // Only show a limited number of pages
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={number}
                          onClick={() => paginate(pageNumber)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${currentPage === pageNumber
                              ? "bg-gradient-to-r from-yellow-400 to-green-400 text-white font-bold"
                              : "hover:bg-yellow-100 text-gray-700"
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) ||
                      (pageNumber === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={number} className="flex items-center">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-green-600 hover:bg-green-100"
                    }`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-20 text-center">
        <div className="mx-auto w-32 h-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full mb-4"></div>
        <p className="text-green-800 text-sm">
          Connect with skilled individuals in your community
        </p>
      </div>
    </div>
  );
}