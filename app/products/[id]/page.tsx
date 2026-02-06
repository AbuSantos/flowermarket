"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, products, type Product } from "@/lib/products";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (params?.id) {
            const foundProduct = getProductById(params.id as string);
            setProduct(foundProduct);
            setIsLoading(false);
        }
    }, [params?.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Product not found
                    </h1>
                    <Link
                        href="/products"
                        className="mt-4 inline-block text-pink-600 hover:text-pink-700 dark:text-pink-400"
                    >
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find(
            (item: { id: string }) => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Navigation */}
                <Link
                    href="/products"
                    className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                >
                    ← Back to Products
                </Link>

                {/* Product Content */}
                <div className="mt-8 grid gap-12 lg:grid-cols-2">
                    {/* Image */}
                    <div className="flex items-center justify-center">
                        <div className="aspect-square w-full max-w-md overflow-hidden rounded-lg bg-linear-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="mt-8">
                            <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                                ${product.price}
                            </p>
                        </div>

                        {/* Bundle Details */}
                        <div className="mt-8 space-y-6 rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    🌸 Flower
                                </h3>
                                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                                    <span className="font-medium">{product.flower.name}</span> -{" "}
                                    {product.flower.color}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    🍫 Chocolate
                                </h3>
                                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                                    <span className="font-medium">{product.chocolate.type}</span> -{" "}
                                    {product.chocolate.flavor} flavor
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    ✨ Necklace
                                </h3>
                                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                                    <span className="font-medium">{product.necklace.material}</span> -{" "}
                                    {product.necklace.style}
                                </p>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-zinc-900 dark:text-white">
                                    Quantity:
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="rounded bg-zinc-200 px-3 py-1 dark:bg-zinc-700"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center text-zinc-900 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="rounded bg-zinc-200 px-3 py-1 dark:bg-zinc-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-2 justify-between">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-[65%] rounded-lg px-6 py-3 text-lg font-semibold text-white transition-all ${addedToCart
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600"
                                        }`}
                                >
                                    {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                                </button>
                                {/* { */}

                                <Link
                                    href="/cart"
                                    className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600 flex items-center"
                                >
                                    <FiShoppingCart className="mr-2 h-6 w-6" aria-hidden="true" />
                                    <span>View Cart</span>
                                </Link>
                                {/* } */}

                            </div>


                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                        Other Bundles
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {products
                            .filter((p) => p.id !== product.id)
                            .slice(0, 3)
                            .map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.id}`}
                                    className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                                >
                                    <div className="aspect-square overflow-hidden bg-linear-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900">
                                        <div className="flex h-full items-center justify-center">
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="mt-2 text-lg font-bold text-pink-600 dark:text-pink-400">
                                            ${relatedProduct.price}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
