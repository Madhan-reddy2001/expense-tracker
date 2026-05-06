import Image, { StaticImageData } from "next/image";

interface CardProps {
  image: StaticImageData;
  name: string;
  price: number;
}

export default function Cards({ image, name, price }: CardProps) {
  return (
    <div className="food-card">
      <div className="food-card-image">
        <Image
          src={image}
          alt={name}
          fill
          sizes="280px"
          style={{ objectFit: "cover" }}
          placeholder="blur"
        />
      </div>
      <div className="food-card-body">
        <div className="food-card-name">{name}</div>
        <div className="food-card-footer">
          <div className="food-price">
            <span>₹</span>
            {price}
          </div>
          <button className="add-btn" aria-label={`Add ${name}`}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
