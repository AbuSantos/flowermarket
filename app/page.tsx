import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              🌸 PetalsandPearls
            </div>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600"
              >
                Shop Now
              </Link>
              <Link
                href="/cart"
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              Luxury Flower Bundles
            </h1>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-300">
              Every flower comes with premium chocolates and an elegant necklace.
              Perfect gifts for the people you love.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌸</span>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Fresh Flowers
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Hand-selected blooms arranged beautifully
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">🍫</span>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Premium Chocolates
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Artisan chocolate assortments included
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Elegant Necklace
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Matching jewelry to complete the gift
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/products"
              className="mt-10 inline-block rounded-lg bg-pink-600 px-8 py-4 text-lg font-semibold text-white hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900">
              <div className="flex h-full items-center justify-center">
                <div className="text-6xl">🌹🍫✨</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
            Featured Collections
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8">
            Each bundle includes a beautiful flower, gourmet chocolate, and an elegant necklace.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-zinc-900 px-6 py-3 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            View All Products
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-600 dark:text-zinc-400">
            © 2026 Flowermarket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
