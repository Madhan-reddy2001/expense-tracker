"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { food_items } from "../data/food-data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery
    ? food_items
        .filter(
          (item) =>
            item.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.food_category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5) // Limit to top 5 results
    : [];

  const handleResultClick = (foodName: string) => {
    setSearchQuery(foodName);
    setIsSearchFocused(false);
    router.push("/");
  };

  return (
    <header className="app-header">
      <Link href="/" className="logo-box">
        <div className="logo-icon">
          <MdFastfood />
        </div>
        <div className="logo-text">
          Food<span>Dash</span>
        </div>
      </Link>

      <form
        className="search-bar"
        ref={searchRef}
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearchFocused(false);
          if (searchQuery) router.push("/");
        }}
      >
        <IoSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setSearchQuery("");
              setIsSearchFocused(true);
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {/* Search Dropdown */}
        {isSearchFocused && searchQuery && searchResults.length > 0 && (
          <div className="search-dropdown">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="search-dropdown-item"
                onClick={() => handleResultClick(item.food_name)}
              >
                <div className="search-dropdown-img">
                  <Image
                    src={item.food_image}
                    alt={item.food_name}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="search-dropdown-info">
                  <h4>{item.food_name}</h4>
                  <p className="search-dropdown-category">
                    {item.food_category.replace(/_/g, " ")}
                  </p>
                </div>
                <div className="search-dropdown-price">₹{item.price}</div>
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="header-actions">
        <Link
          href="/Login"
          className="icon-btn"
          aria-label="Expense Tracker"
          title="Expense Tracker"
        >
          <HiOutlineCurrencyDollar />
        </Link>
        <button
          className="icon-btn"
          aria-label="Cart"
          onClick={() => setIsCartOpen(true)}
        >
          <LuShoppingBag />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        <Link href="/Admin" className="btn-primary">
          Admin
        </Link>
      </div>
    </header>
  );
}
