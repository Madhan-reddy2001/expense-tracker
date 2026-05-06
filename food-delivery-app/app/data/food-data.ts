import image1 from "@/public/assets/image1.avif";
import image2 from "@/public/assets/image2.avif";
import image3 from "@/public/assets/image3.avif";
import image4 from "@/public/assets/image4.avif";
import image5 from "@/public/assets/image5.avif";
import image6 from "@/public/assets/image6.avif";
import image7 from "@/public/assets/image7.avif";
import image8 from "@/public/assets/image8.avif";
import image9 from "@/public/assets/image9.avif";
import image10 from "@/public/assets/image10.avif";
import image11 from "@/public/assets/image11.avif";
import image12 from "@/public/assets/image12.avif";
import image13 from "@/public/assets/image13.avif";
import image14 from "@/public/assets/image14.webp";
import image15 from "@/public/assets/image15.avif";
import image16 from "@/public/assets/image16.avif";
import image17 from "@/public/assets/image17.avif";
import image18 from "@/public/assets/image18.avif";
import image19 from "@/public/assets/image19.avif";
import image20 from "@/public/assets/image20.avif";
import image21 from "@/public/assets/image21.avif";
import image22 from "@/public/assets/image22.avif";
import image23 from "@/public/assets/image23.avif";
import image24 from "@/public/assets/image24.avif";
import image25 from "@/public/assets/image25.avif";
import { StaticImageData } from "next/image";


export interface FoodTypes{
    id:number,
    food_name:string,
    food_category:string,
    food_type:string,
    food_quantity:number,
    food_image:StaticImageData,
    price:number
}

export const food_items:FoodTypes[]=[
      {"id": 1, "food_name": "Pancakes", "food_category": "breakfast", "food_type": "veg", "food_quantity": 1, "food_image": image1, "price": 499},
    {"id": 2, "food_name": "Chicken Soup", "food_category": "soups", "food_type": "non_veg", "food_quantity": 1, "food_image": image2, "price": 399},
    {"id": 3, "food_name": "Minestrone Soup", "food_category": "soups", "food_type": "veg", "food_quantity": 1, "food_image": image3, "price": 349},
    {"id": 4, "food_name": "Spaghetti Carbonara", "food_category": "pasta", "food_type": "non_veg", "food_quantity": 1, "food_image": image4, "price": 999},
    {"id": 5, "food_name": "Veg Alfredo Pasta", "food_category": "pasta", "food_type": "veg", "food_quantity": 1, "food_image": image5, "price": 899},
    {"id": 6, "food_name": "Chicken Alfredo Pasta", "food_category": "pasta", "food_type": "non_veg", "food_quantity": 1, "food_image": image6, "price": 1099},
    {"id": 7, "food_name": "Paneer Butter Masala", "food_category": "main_course", "food_type": "veg", "food_quantity": 1, "food_image": image7, "price": 799},
    {"id": 8, "food_name": "Chicken Biryani", "food_category": "main_course", "food_type": "non_veg", "food_quantity": 1, "food_image": image8, "price": 1199},
    {"id": 9, "food_name": "Margherita Pizza", "food_category": "pizza", "food_type": "veg", "food_quantity": 1, "food_image": image9, "price": 649},
    {"id": 10, "food_name": "Pepperoni Pizza", "food_category": "pizza", "food_type": "non_veg", "food_quantity": 1, "food_image": image10, "price": 749},
    {"id": 11, "food_name": "Veggie Burger", "food_category": "burger", "food_type": "veg", "food_quantity": 1, "food_image": image11, "price": 499},
    {"id": 12, "food_name": "Chicken Burger", "food_category": "burger", "food_type": "non_veg", "food_quantity": 1, "food_image": image12, "price": 599},
    {"id": 13, "food_name": "Tomato Soup", "food_category": "soups", "food_type": "veg", "food_quantity": 1, "food_image": image13, "price": 299},
    {"id": 14, "food_name": "Egg Sandwich", "food_category": "breakfast", "food_type": "non_veg", "food_quantity": 1, "food_image": image14, "price": 349},
    {"id": 15, "food_name": "Mushroom Soup", "food_category": "soups", "food_type": "veg", "food_quantity": 1, "food_image": image15, "price": 349},
    {"id": 16, "food_name": "Chicken Tikka Masala", "food_category": "main_course", "food_type": "non_veg", "food_quantity": 1, "food_image": image16, "price": 1199},
    {"id": 17, "food_name": "Cheese Omelette", "food_category": "breakfast", "food_type": "non_veg", "food_quantity": 1, "food_image": image17, "price": 399},
    {"id": 18, "food_name": "Fettuccine Alfredo", "food_category": "pasta", "food_type": "veg", "food_quantity": 1, "food_image": image18, "price": 949},
    {"id": 19, "food_name": "Garlic Bread", "food_category": "pizza", "food_type": "veg", "food_quantity": 1, "food_image": image19, "price": 299},
    {"id": 20, "food_name": "Fish and Chips", "food_category": "main_course", "food_type": "non_veg", "food_quantity": 1, "food_image": image20, "price": 1099},
    {"id": 21, "food_name": "Hash Browns", "food_category": "breakfast", "food_type": "veg", "food_quantity": 1, "food_image": image21, "price": 249},
    {"id": 22, "food_name": "Vegetable Soup", "food_category": "soups", "food_type": "veg", "food_quantity": 1, "food_image": image22, "price": 329},
    {"id": 23, "food_name": "Egg Fried Rice", "food_category": "main_course", "food_type": "non_veg", "food_quantity": 1, "food_image": image23, "price": 599},
    {"id": 24, "food_name": "Hawaiian Pizza", "food_category": "pizza", "food_type": "non_veg", "food_quantity": 1, "food_image": image24, "price": 799},
    {"id": 25, "food_name": "Pasta Primavera", "food_category": "pasta", "food_type": "veg", "food_quantity": 1, "food_image": image25, "price": 899}
]