import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {items.map((item) => (
          <Card key={item.product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 p-4 flex items-center justify-center bg-white">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="h-full object-contain"
                  />
                </div>
                <div className="flex-grow p-4">
                  <h3 className="font-medium mb-1">{item.product.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.product.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <span className="text-lg font-bold">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <span className="mx-2 text-gray-500">×</span>
                      <div className="flex items-center border rounded">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-auto flex gap-4">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Link to="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>

        <Card className="w-full md:w-80">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>
                  Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
