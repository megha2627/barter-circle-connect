// frontend/pages/index.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
   

      {/* Hero Section */}
      <section className="bg-green-900 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Barter Circle Connect
          </h1>
          <p className="text-lg mb-6">
            Exchange skills, goods, and services seamlessly within your trusted
            community.
          </p>
          <Link href="/signup">
            <button className="bg-yellow-500 text-green-900 px-6 py-3 rounded font-semibold hover:bg-yellow-400">
              Join Now - It's Free!
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">
          How Does Barter Circle Work?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white shadow-lg rounded-lg p-6">

            <h3 className="font-semibold text-xl mb-2">1. Sign Up</h3>
            <p>Create your profile and showcase your skills and services.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
          
            <h3 className="font-semibold text-xl mb-2">2. Explore Offers</h3>
            <p>Browse categories and discover what others are offering.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
           
            <h3 className="font-semibold text-xl mb-2">3. Barter & Connect</h3>
            <p>Match The skill You need and connect via their mail.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {[
            "Home Services",
            "Tutoring",
            "Gardening",
            "Handicrafts",
            "Fitness",
            "Art & Design",
          ].map((cat, i) => (
            <Link href="/category" key={i}>
              <div className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-600 cursor-pointer">
                {cat}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits of Barter System */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Barter Circle?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold text-xl mb-2">💰 Cost Saving</h3>
            <p>Get services without spending cash.</p>
          </div>
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold text-xl mb-2">
              🌱 Sustainable Living
            </h3>
            <p>Encourage recycling and sustainable exchanges.</p>
          </div>
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold text-xl mb-2">🤝 Build Connections</h3>
            <p>Strengthen community bonds while meeting your needs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Barter Journey Now!
        </h2>
        <Link href="/category">
          <button className="bg-yellow-500 text-green-900 px-6 py-3 rounded font-semibold hover:bg-yellow-400">
            Browse Categories
          </button>
        </Link>
      </section>

      
    </>
  );
}
