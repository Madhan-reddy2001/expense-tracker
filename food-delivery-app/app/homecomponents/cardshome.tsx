"use client";
import Image from "next/image";
import { food_items } from "../data/food-data";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";

interface HomeCardsProps {
  activeCategory: string;
  activeType: string;
  onTypeChange: (type: string) => void;
  searchQuery: string;
}

export default function HomeCards({
  activeCategory,
  activeType,
  onTypeChange,
  searchQuery,
}: HomeCardsProps) {
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    return food_items.filter((item) => {
      const catMatch =
        activeCategory === "All" ||
        item.food_category.toLowerCase() ===
          activeCategory.toLowerCase().replace(/\s+/g, "_");
      const typeMatch =
        activeType === "all" || item.food_type === activeType;
      const searchMatch =
        !searchQuery ||
        item.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.food_category.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && typeMatch && searchMatch;
    });
  }, [activeCategory, activeType, searchQuery]);

  const handleAdd = (food: (typeof food_items)[0]) => {
    addItem({
      id: food.id,
      food_name: food.food_name,
      food_category: food.food_category,
      food_type: food.food_type,
      food_image: food.food_image,
      price: food.price,
    });
  };

  return (
    <section className="food-section">
      <div className="food-section-header">
        <h2>
          {searchQuery
            ? `Results for "${searchQuery}"`
            : activeCategory === "All"
              ? "All Dishes"
              : activeCategory}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="filter-pills">
            {["all", "veg", "non_veg"].map((type) => (
              <button
                key={type}
                className={`filter-pill${activeType === type ? " active" : ""}`}
                onClick={() => onTypeChange(type)}
              >
                {type === "all"
                  ? "All"
                  : type === "veg"
                    ? "🟢 Veg"
                    : "🔴 Non-Veg"}
              </button>
            ))}
          </div>
          <span className="food-count">{filtered.length} items</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🍽️</p>
          <p style={{ fontWeight: 600 }}>No dishes found</p>
          <p style={{ fontSize: "0.9rem" }}>
            Try changing the category or filter
          </p>
        </div>
      ) : (
        <div className="food-grid">
          {filtered.map((food) => (
            <div key={food.id} className="food-card">
              <div className="food-card-image">
                <Image
                  src={food.food_image}
                  alt={food.food_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                />
                <span
                  className={`food-badge ${food.food_type === "veg" ? "veg" : "non-veg"}`}
                >
                  {food.food_type === "veg" ? "Veg" : "Non-Veg"}
                </span>
              </div>
              <div className="food-card-body">
                <div className="food-card-category">
                  {food.food_category.replace(/_/g, " ")}
                </div>
                <div className="food-card-name">{food.food_name}</div>
                <div className="food-card-footer">
                  <div className="food-price">
                    <span>₹</span>
                    {food.price}
                  </div>
                  <button
                    className="add-btn"
                    aria-label={`Add ${food.food_name}`}
                    onClick={() => handleAdd(food)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
