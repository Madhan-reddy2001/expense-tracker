"use client";
import { useState } from "react";
import Banner from "./homecomponents/banner";
import HomeCards from "./homecomponents/cardshome";
import { useSearch } from "./context/SearchContext";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("all");
  const { searchQuery } = useSearch();

  return (
    <>
      <section className="hero-section">
        <h1>
          Delicious Food,
          <br />
          <span>Delivered Fast</span>
        </h1>
        <p>
          Discover the best meals from top restaurants. Fresh ingredients,
          amazing flavors, right to your doorstep.
        </p>
      </section>

      <Banner
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <HomeCards
        activeCategory={activeCategory}
        activeType={activeType}
        onTypeChange={setActiveType}
        searchQuery={searchQuery}
      />
    </>
  );
}
