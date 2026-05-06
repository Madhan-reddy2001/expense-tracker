"use client";
import categories from "../data/banner";

interface BannerProps {
  activeCategory: string;
  onCategoryChange: (name: string) => void;
}

export default function Banner({
  activeCategory,
  onCategoryChange,
}: BannerProps) {
  return (
    <section className="categories-section">
      <h2>What are you craving?</h2>
      <div className="categories-grid">
        {categories.map((item) => (
          <div
            key={item.id}
            className={`category-card${activeCategory === item.name ? " active" : ""}`}
            onClick={() => onCategoryChange(item.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onCategoryChange(item.name);
            }}
          >
            <item.icon className="cat-icon" />
            <span className="cat-name">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
