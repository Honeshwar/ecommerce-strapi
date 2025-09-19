// 🔑 Strapi API URL & Token
const STRAPI_URL = "https://honshwar-ecommerce-store.onrender.com";

// Helper: upload image from URL to Strapi
async function uploadImageFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);

    // Convert to Buffer (Node 18+)
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const formData = new FormData();
    formData.append("files", buffer, {
      filename: url.split("/").pop() || "image.jpg",
      contentType: response.headers.get("content-type") || "image/jpeg",
    });

    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: formData,
    });

    const data = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(JSON.stringify(data));
    return data[0].id;
  } catch (err) {
    console.error("❌ Error uploading image:", err.message);
    return null;
  }
}

// Add one product with multiple images
async function addProduct(product) {
  try {
    console.log(`📦 Uploading product: ${product.name}`);

    // Upload images
    // const uploadedImgIds = [];
    // for (let url of product.images) {
    //   const id = await uploadImageFromUrl(url);
    //   if (id) uploadedImgIds.push(id);
    // }

    // Create product
    const res = await fetch(`${STRAPI_URL}/api/products`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: product,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));

    console.log(`✅ Added product: ${data.data?.attributes?.title}`);
  } catch (err) {
    console.error("❌ Error adding product:", err.message);
  }
}

// Example product list
const products = [
  {
    title: "Classic White T-Shirt",
    desc: "Soft cotton regular fit tee",
    price: 999,
    oldPrice: 1299,
    isNew: true,
    type: "clothing",
    categories: [3], // Men
    sub_categories: [1], // T-Shirts
  },
  {
    title: "Denim Jacket",
    desc: "Blue washed slim fit denim jacket",
    price: 2499,
    oldPrice: 2999,
    isNew: false,
    type: "clothing",
    categories: [2], // Women
    sub_categories: [2], // Jackets
  },
  {
    title: "Leather Handbag",
    desc: "Brown premium leather handbag",
    price: 3499,
    oldPrice: 3999,
    isNew: true,
    type: "accessory",
    categories: [5], // Accessories & Shoes
    sub_categories: [5], // Bags
  },
  {
    title: "Running Sneakers",
    desc: "Lightweight breathable sneakers",
    price: 2999,
    oldPrice: 3499,
    isNew: true,
    type: "shoes",
    categories: [4], // New Season
    sub_categories: [4], // Sneakers
  },
  {
    title: "Formal Pants",
    desc: "Black slim-fit trousers",
    price: 1999,
    oldPrice: 2499,
    isNew: false,
    type: "clothing",
    categories: [3], // Men
    sub_categories: [3], // Pants
  },
  {
    title: "Printed Maxi Dress",
    desc: "Floral summer maxi dress",
    price: 2299,
    oldPrice: 2699,
    isNew: true,
    type: "clothing",
    categories: [2], // Women
    sub_categories: [1], // T-Shirts
  },
  {
    title: "Wool Overcoat",
    desc: "Grey winter overcoat",
    price: 3999,
    oldPrice: 4499,
    isNew: false,
    type: "clothing",
    categories: [4], // New Season
    sub_categories: [2], // Jackets
  },
  {
    title: "Casual Backpack",
    desc: "Durable canvas backpack",
    price: 1599,
    oldPrice: 1899,
    isNew: true,
    type: "accessory",
    categories: [7], // Sales
    sub_categories: [5], // Bags
  },
  {
    title: "Sports Sneakers",
    desc: "High grip sports shoes",
    price: 2799,
    oldPrice: 3199,
    isNew: true,
    type: "shoes",
    categories: [3], // Men
    sub_categories: [4], // Sneakers
  },
  {
    title: "Evening Clutch",
    desc: "Elegant black party clutch",
    price: 1899,
    oldPrice: 2199,
    isNew: false,
    type: "accessory",
    categories: [2], // Women
    sub_categories: [5], // Bags
  },
];

(async () => {
  for (let product of products) {
    await addProduct(product);
  }
})();
