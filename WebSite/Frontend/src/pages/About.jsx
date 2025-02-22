<<<<<<< HEAD
import React, { useEffect } from "react";  // ✅ Import useEffect
import "../styles/About.css";
import bobImage from "../assets/History.jpg";
import charlieImage from "../assets/History.jpg";
import dianaImage from "../assets/History.jpg";
import ethanImage from "../assets/History.jpg";
import historyImage from "../assets/History.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  { name: "Randilu Lindapitiya", role: "Project Manager", imageUrl: historyImage },
  { name: "Viraj Bandara", role: "Lead Developer", imageUrl: bobImage },
  { name: "Manjitha Abeysinghe", role: "AI Specialist", imageUrl: charlieImage },
  { name: "Chathurika Bandaranayake", role: "Frontend Developer", imageUrl: dianaImage },
  { name: "Niluka Kaluwelgoda", role: "Backend Developer", imageUrl: ethanImage },
];

const About = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight, // Scroll to bottom
        behavior:"smooth",
      });
    }, 2000); // Small delay to ensure elements load first
  }, []);

  return (
    <>
      <div className="about-us">
        <Header />
        <section className="section">
          <h1>Revolutionizing Home Design with Team Apexa's AI-Powered Planning System</h1>
          <p>
            Imagine a world where anyone can effortlessly design their dream home without 
            the complexities of architectural knowledge or the high costs associated with 
            professional services. This vision is now a reality with Team Apexa’s groundbreaking 
            “Automated House Planning and Visualization System.”
          </p>
        </section>
        <section className="section">
          <h2>Simplifying Home Design for Everyone</h2>
          <p>
            Traditionally, designing a house required hiring CAD (Computer-Aided Drafting) 
            professionals, a process that is both expensive and time-consuming. Our innovative 
            web application transforms this landscape, making home design accessible to everyone. 
            By simply uploading an image of the land where you plan to build, and specifying 
            the desired number of rooms along with other key details, our system will 
            automatically generate a customized house floor plan.
          </p>
        </section>
        <section className="section">
          <h2>Efficiency Meets Affordability</h2>
          <p>
            Our automated approach eliminates the need for extensive back-and-forth interactions 
            with architects and designers, significantly reducing the time and cost involved in 
            creating a house plan. The system intelligently tailors the design to the specific 
            characteristics of the provided land, ensuring that the final plan aligns perfectly 
            with your vision and requirements.
          </p>
        </section>
        <section className="section">
          <h2>Empowering Homeowners and Developers</h2>
          <p>
            With our solution, homeowners and property developers no longer need to have an in-depth 
            understanding of architecture. This opens up the possibility of custom home design to a 
            wider audience, allowing individuals to create personalized living spaces efficiently 
            and cost-effectively. Our system is a game-changer in the real estate industry, addressing 
            the need for innovative, personalized, and efficient house planning solutions.
          </p>
        </section>
        <section className="section">
          <h2>A New Era in Real Estate</h2>
          <p>
            Team Apexa’s Automated House Planning and Visualization System is a step forward 
            in the real estate industry, offering a solution that meets the demands of our evolving 
            urban landscape. It empowers users to bring their unique preferences and requirements to 
            life, creating harmonious living spaces that truly feel like home.
          </p>
        </section>
        <section className="section">
          <h2>Our Team</h2>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.imageUrl} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
=======
import React, { useEffect } from "react";  // ✅ Import useEffect
import "../styles/About.css";
import bobImage from "../assets/History.jpg";
import charlieImage from "../assets/History.jpg";
import dianaImage from "../assets/History.jpg";
import ethanImage from "../assets/History.jpg";
import historyImage from "../assets/History.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  { name: "Randilu Lindapitiya", role: "Project Manager", imageUrl: historyImage },
  { name: "Viraj Bandara", role: "Lead Developer", imageUrl: bobImage },
  { name: "Manjitha Abeysinghe", role: "AI Specialist", imageUrl: charlieImage },
  { name: "Chathurika Bandaranayake", role: "Frontend Developer", imageUrl: dianaImage },
  { name: "Niluka Kaluwelgoda", role: "Backend Developer", imageUrl: ethanImage },
];

const About = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight, // Scroll to bottom
        behavior:"smooth",
      });
    }, 2000); // Small delay to ensure elements load first
  }, []);

  return (
    <>
      <div className="about-us">
        <Header />
        <section className="section">
          <h1>Revolutionizing Home Design with Team Apexa's AI-Powered Planning System</h1>
          <p>
            Imagine a world where anyone can effortlessly design their dream home without 
            the complexities of architectural knowledge or the high costs associated with 
            professional services. This vision is now a reality with Team Apexa’s groundbreaking 
            “Automated House Planning and Visualization System.”
          </p>
        </section>
        <section className="section">
          <h2>Simplifying Home Design for Everyone</h2>
          <p>
            Traditionally, designing a house required hiring CAD (Computer-Aided Drafting) 
            professionals, a process that is both expensive and time-consuming. Our innovative 
            web application transforms this landscape, making home design accessible to everyone. 
            By simply uploading an image of the land where you plan to build, and specifying 
            the desired number of rooms along with other key details, our system will 
            automatically generate a customized house floor plan.
          </p>
        </section>
        <section className="section">
          <h2>Efficiency Meets Affordability</h2>
          <p>
            Our automated approach eliminates the need for extensive back-and-forth interactions 
            with architects and designers, significantly reducing the time and cost involved in 
            creating a house plan. The system intelligently tailors the design to the specific 
            characteristics of the provided land, ensuring that the final plan aligns perfectly 
            with your vision and requirements.
          </p>
        </section>
        <section className="section">
          <h2>Empowering Homeowners and Developers</h2>
          <p>
            With our solution, homeowners and property developers no longer need to have an in-depth 
            understanding of architecture. This opens up the possibility of custom home design to a 
            wider audience, allowing individuals to create personalized living spaces efficiently 
            and cost-effectively. Our system is a game-changer in the real estate industry, addressing 
            the need for innovative, personalized, and efficient house planning solutions.
          </p>
        </section>
        <section className="section">
          <h2>A New Era in Real Estate</h2>
          <p>
            Team Apexa’s Automated House Planning and Visualization System is a step forward 
            in the real estate industry, offering a solution that meets the demands of our evolving 
            urban landscape. It empowers users to bring their unique preferences and requirements to 
            life, creating harmonious living spaces that truly feel like home.
          </p>
        </section>
        <section className="section">
          <h2>Our Team</h2>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.imageUrl} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
