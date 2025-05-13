//import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Leaf, RefreshCcw, Users, Shield, Map, Star } from "lucide-react";

const AboutSection = ({ title, children, icon }) => (
  <div className="mb-12 bg-white rounded-lg shadow-md p-8 border-l-4 border-green-600">
    <div className="flex items-center mb-4">
      <div className="mr-3 bg-green-100 p-3 rounded-full text-green-800">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-green-800">{title}</h2>
    </div>
    {children}
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:bg-green-100">
    <div className="bg-green-700 text-white p-3 rounded-full mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-green-800 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const About = () => {
  const features = [
    {
      icon: <RefreshCcw size={24} />,
      title: "Zero-Cost Trading",
      description:
        "Exchange goods and services without spending a single penny",
    },
    {
      icon: <Map size={24} />,
      title: "Location-Based Discovery",
      description:
        "Find barter opportunities in your neighborhood and community",
    },
    {
      icon: <Shield size={24} />,
      title: "Trust & Safety",
      description: "Our rating system ensures secure and reliable exchanges",
    },
    {
      icon: <Users size={24} />,
      title: "Digital Profiles",
      description: "Showcase your skills, items, and build your reputation",
    },
    {
      icon: <Star size={24} />,
      title: "Seamless Experience",
      description: "Enjoy our mobile and web-friendly platform from any device",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
     
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-green-900 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-800 p-4 rounded-full">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,16.5 c-0.83,0-1.5-0.67-1.5-1.5h3C13.5,15.83,12.83,16.5,12,16.5z M12,7.5c0.83,0,1.5,0.67,1.5,1.5h-3C10.5,8.17,11.17,7.5,12,7.5z M7.5,12c0-0.83,0.67-1.5,1.5-1.5v3C8.17,13.5,7.5,12.83,7.5,12z M16.5,12c0,0.83-0.67,1.5-1.5,1.5v-3 C15.83,10.5,16.5,11.17,16.5,12z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Barter Circle Connect
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Reviving the age-old practice of bartering for a modern,
              sustainable world
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <AboutSection title="Our Story" icon={<Leaf size={24} />}>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-green-800">
                Barter Circle Connect
              </span>{" "}
              is a modern digital platform designed to revive the age-old
              practice of bartering. We believe that everyone has something
              valuable to offer—and not everything needs to be exchanged with
              money.
            </p>
            <p className="text-lg text-gray-700">
              Our goal is to create a vibrant, trust-based community where
              people can exchange goods and services directly, reducing waste
              and building stronger local connections.
            </p>
          </AboutSection>

          <AboutSection title="Why Barter?" icon={<RefreshCcw size={24} />}>
            <p className="text-lg text-gray-700">
              In an increasingly monetized world, we often overlook the simple
              value of trade. Whether it's an extra chair, tutoring services,
              home-cooked meals, or graphic design skills—Barter Circle Connect
              lets you trade what you have for what you need, sustainably and
              affordably.
            </p>
          </AboutSection>

          <AboutSection title="Our Mission" icon={<Users size={24} />}>
            <p className="text-lg text-gray-700">
              We aim to promote sustainable living, reduce waste, and strengthen
              local communities. Barter Circle Connect encourages people to
              collaborate, save money, and reduce overconsumption while building
              a circular economy based on mutual need and trust.
            </p>
          </AboutSection>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              What Makes Us Unique
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-green-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Community Today
            </h2>
            <p className="text-lg mb-6 text-green-100">
              Be part of a future where value isn't measured by currency, but by
              connection and contribution.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="bg-white text-green-800 hover:bg-green-100 px-6 py-3 rounded-md font-semibold transition-colors duration-200">
                <Link href="/signup">Get Started</Link>
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 px-6 py-3 rounded-md font-semibold transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default About;
