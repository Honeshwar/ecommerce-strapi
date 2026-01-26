("use strict");
const Stripe = require("stripe");
/**
 * order controller
 */
const CLIENT_URL = process.env.CLIENT_URL;

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  
  async create(ctx) {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe key missing");
      }
  
      console.log("Stripe key exists:", process.env.STRIPE_SECRET_KEY);
      console.log("CLIENT_URL key exists:", process.env.CLIENT_URL);
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const CLIENT_URL = process.env.CLIENT_URL;
  
  
      const { products } = ctx.request.body;

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);
          
          if (!item) {
            throw new Error(`Product not found: ${product.id}`);
          }

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
