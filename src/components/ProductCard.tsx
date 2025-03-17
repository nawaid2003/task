import React from "react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4">
        <div className="h-48 flex items-center justify-center bg-white p-4 rounded-md mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-sm text-yellow-500 mr-1">★</span>
            <span className="text-sm">{product.rating.rate}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>
        <Badge variant="outline" className="mb-3">
          {product.category}
        </Badge>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addItem(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
