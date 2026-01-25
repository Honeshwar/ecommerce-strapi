("use strict");
const Stripe = require("stripe");
/**
 * order controller
 */
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log("CLIENT_URL:", process.env.CLIENT_URL);

const stripe = new Stripe("sk_test_51NvFMgSFOJk2h94TuL1nn7tLTTvOiDuxajGkIiToGn8kY3rQt3ztILHvk015EB8e4I1jf0b1c5uYahbGAA1oxKQL00k2gjXbSq");

const CLIENT_URL = 'https://honeshwar-store.netlify.app';

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log("STRIPE_SECRET_KEY2:", process.env.STRIPE_SECRET_KEY);
    console.log("CLIENT_URL2:", process.env.CLIENT_URL);
    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
                // images: [
                //   process.env.CLIENT_URL+product.img
                // ],
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["IN", "US", "CA"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: CLIENT_URL + "?success=true",
        cancel_url: CLIENT_URL + "?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      console.log("order controller", error);
      ctx.response.status = 500;
      return { error };
    }
  },
}));
