"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

type CartItem = Product & { quantity: number };

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"apple" | "steam" | "bitcoin">("apple");

    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");

    const [cardFront, setCardFront] = useState<File | null>(null);
    const [cardBack, setCardBack] = useState<File | null>(null);
    const [cardFrontPreview, setCardFrontPreview] = useState<string | null>(null);
    const [cardBackPreview, setCardBackPreview] = useState<string | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(saved);
        setIsLoaded(true);
    }, []);

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handlePay = async () => {
        if (cart.length === 0) return;
        if (!name || !email || !address) {
            alert("Please fill name, email, and address");
            return;
        }

        // Require uploaded images for Apple or Steam card payments
        if (paymentMethod === "apple" || paymentMethod === "steam") {
            if (!cardFront || !cardBack) {
                alert("Please upload front and back images of the card for verification.");
                return;
            }

            // if (paymentMethod === "apple") {
            //     if (!cardNumber || !cardExpiry || !cardCVC) {
            //         alert("Please enter card details for Apple Card");
            //         return;
            //     }
            // }
        }

        setIsProcessing(true);
        try {
            // Prepare form data with files
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("address", address);
            formData.append("paymentMethod", paymentMethod);
            formData.append("cart", JSON.stringify(cart));
            if (cardFront) formData.append("cardFront", cardFront);
            if (cardBack) formData.append("cardBack", cardBack);

            // Send to API
            const res = await fetch("/api/checkout", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                localStorage.setItem("cart", JSON.stringify([]));
                setCart([]);
            } else {
                alert("Failed to process order: " + data.error);
                setIsProcessing(false);
            }
        } catch (error) {
            alert("Error: " + (error as Error).message);
            setIsProcessing(false);
        }
    };

    if (!isLoaded) return null;

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
                <div className="max-w-xl rounded-lg bg-white p-8 text-center shadow-md dark:bg-zinc-900">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Payment Successful</h2>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-300">Thank you — your order is confirmed.</p>
                    <Link href="/products" className="mt-6 inline-block rounded-lg bg-pink-600 px-6 py-2 text-white hover:bg-pink-700">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-black dark:to-zinc-950">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Checkout</h1>
                    <Link href="/cart" className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400">← Back to Cart</Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Shipping & Contact</h2>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping address" className="col-span-2 w-full rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                            </div>
                        </div>

                        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Payment</h2>

                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <label className="inline-flex items-center gap-2">
                                        <input type="radio" name="payment" checked={paymentMethod === "apple"} onChange={() => setPaymentMethod("apple")} />
                                        <span>Apple Card</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input type="radio" name="payment" checked={paymentMethod === "steam"} onChange={() => setPaymentMethod("steam")} />
                                        <span>Steam Card</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input type="radio" name="payment" checked={paymentMethod === "bitcoin"} onChange={() => setPaymentMethod("bitcoin")} />
                                        <span>Bitcoin</span>
                                    </label>
                                </div>

                                <div className="space-y-3">
                                    {/* Card details for Apple (optional for Steam) */}
                                    {/* {paymentMethod === "apple" && (
                                        <>
                                            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card number" className="w-full rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                                            <div className="flex gap-3">
                                                <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className="flex-1 rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                                                <input value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} placeholder="CVC" className="w-28 rounded border border-zinc-200 px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                                            </div>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Apple Card payments are simulated locally.</p>
                                        </>
                                    )} */}

                                    {/* Upload front/back of card for Apple/Steam methods */}
                                    <div className="rounded border border-zinc-100 p-4 dark:border-zinc-700">
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Upload a photo of the front and back of the card for verification.</p>
                                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                                            <label className="flex cursor-pointer items-center gap-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const f = e.target.files && e.target.files[0];
                                                        setCardFront(f || null);
                                                        if (f) setCardFrontPreview(URL.createObjectURL(f));
                                                    }}
                                                />
                                                <div className="rounded bg-zinc-100 px-4 py-2 dark:bg-zinc-800">Upload Front</div>
                                                {cardFrontPreview && <img src={cardFrontPreview} alt="front" className="h-full w-full object-cover rounded" />}
                                            </label>

                                            <label className="flex cursor-pointer items-center gap-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const f = e.target.files && e.target.files[0];
                                                        setCardBack(f || null);
                                                        if (f) setCardBackPreview(URL.createObjectURL(f));
                                                    }}
                                                />
                                                <div className="rounded bg-zinc-100 px-4 py-2 dark:bg-zinc-800">Upload Back</div>
                                                {cardBackPreview && <img src={cardBackPreview} alt="back" className="h-full w-full object-cover rounded" />}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Bitcoin option: show QR and address when selected */}
                                {paymentMethod === "bitcoin" && (
                                    <div className="rounded border border-zinc-100 p-4 dark:border-zinc-700">
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Pay with Bitcoin by sending the exact amount to the address below (simulated).</p>
                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="h-28 w-28 rounded bg-zinc-100 flex items-center justify-center dark:bg-zinc-800">BTC QR</div>
                                            <div>
                                                <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">bc1qexampleaddressxyz...</p>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Amount: ${total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button onClick={handlePay} disabled={isProcessing} className="mt-4 w-full rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-60">
                                    {isProcessing ? "Processing…" : `Pay ${total.toFixed(2)}`}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-fit rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Order Summary</h2>

                        <div className="mt-4 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">IMG</div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{item.name}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-pink-600 dark:text-pink-400">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><p>Tax (10%)</p><p>${tax.toFixed(2)}</p></div>
                                <div className="flex justify-between text-lg font-bold text-zinc-900 dark:text-white mt-2"><p>Total</p><p>${total.toFixed(2)}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
