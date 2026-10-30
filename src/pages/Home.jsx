import React, { useEffect } from "react";
import Hero from "./Hero";
import Home_Section from "../components/Home_Section";
import useSEO from "../hooks/useSEO";

const Home = () => {
  useSEO(
    "Business Transformation & Technology Solutions",
    "Professional Edge Global delivers high-impact financial consulting, corporate operations coaching, and creative digital strategies to scale global enterprises."
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div>
      <Hero />
      <Home_Section />
    </div>
  );
};

export default Home;