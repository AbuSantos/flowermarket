"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";

interface CartItem extends Product {
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
        setIsLoaded(true);
    }, []);

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id: string) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (!isLoaded) {
        return <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950" />;
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        Shopping Cart
                    </h1>
                    <Link
                        href="/products"
                        className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {cart.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            Your cart is empty
                        </p>
                        <Link
                            href="/products"
                            className="mt-4 inline-block rounded-lg bg-pink-600 px-6 py-2 text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
                                >
                                    <div className="flex gap-4">
                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                {item.description}
                                            </p>

                                            {/* Bundle Details */}
                                            <div className="mt-3 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                <p>🌸 {item.flower.name}</p>
                                                <p>🍫 {item.chocolate.type}</p>
                                                <p>✨ {item.necklace.material} {item.necklace.style}</p>
                                            </div>

                                            {/* Price & Quantity */}
                                            <div className="mt-4 flex items-center justify-between">
                                                <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        className="rounded bg-zinc-200 px-2 py-1 text-sm dark:bg-zinc-700"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                        className="rounded bg-zinc-200 px-2 py-1 text-sm dark:bg-zinc-700"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="ml-4 text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <p>Tax (10%)</p>
                                    <p>${tax.toFixed(2)}</p>
                                </div>

                                <div className="border-t border-zinc-200 pt-4 dark:border-zinc-700">
                                    <div className="flex justify-between text-lg font-bold text-zinc-900 dark:text-white">
                                        <p>Total</p>
                                        <p>${total.toFixed(2)}</p>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full inline-block text-center rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600">
                                    Proceed to Checkout
                                </Link>

                                <button className="w-full rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
