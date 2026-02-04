import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                        Petals & Pearls
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
                        Beautiful flower bundles with premium chocolate and jewelry
                    </p>
                </div>

                {/* Navigation */}
                <div className="mb-8 flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                    >
                        ← Back to Home
                    </Link>
                    <Link
                        href="/cart"
                        className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600"
                    >
                        View Cart
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                        >
                            <div className="aspect-square overflow-hidden bg-linear-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900">
                                <div className="flex h-full items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="group-hover:scale-105 h-full w-full object-cover transition-transform"
                                    />
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                    {product.name}
                                </h2>
                                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Bundle Preview */}
                                <div className="mt-4 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    <p>🌸 {product.flower.name} ({product.flower.color})</p>
                                    <p>🍫 {product.chocolate.type}</p>
                                    <p>✨ {product.necklace.material} Necklace</p>
                                </div>

                                {/* Price */}
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                                        ${product.price}
                                    </span>
                                    <button className="rounded-lg bg-pink-100 px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
