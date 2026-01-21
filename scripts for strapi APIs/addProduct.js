import { STRAPI_URL } from "./constants.js";
import { fileFromUrl } from "./helpers.js";

// add product func
async function addProduct(product) {
  try {
    console.log(`Uploading product: ${product.title}`);

    const formData = new FormData();

    // Attach images directly
    if (product.images?.length) {
      const imgFile = await fileFromUrl(product.images[0], "img.jpg");
      formData.append("files.img", imgFile);

      if (product.images[1]) {
        const img2File = await fileFromUrl(product.images[1], "img2.jpg");
        formData.append("files.img2", img2File);
      }
    }

    // Product data
    formData.append(
      "data",
      JSON.stringify({
        title: product.title,
        desc: product.desc,
        price: product.price,
        oldPrice: product.oldPrice,
        isNew: product.isNew,
        type: product.type,
        categories: product.categories,
        sub_categories: product.sub_categories,
      }),
    );

    const res = await fetch(`${STRAPI_URL}/api/products`, {
      method: "POST",
      // headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      body: formData,
    });

    console.log({status: res.status});
    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log(`Added product: ${data.data.attributes.title}`);
  } catch (err) {
    console.error("Error adding product:", err.message);
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
    type: "trending",
    categories: [3], // Men
    sub_categories: [1], // T-Shirts,
    images:[
      
    ]
  },
  {
    title: "Denim Jacket",
    desc: "Blue washed slim fit denim jacket",
    price: 2499,
    oldPrice: 2999,
    isNew: false,
    type: "trending",
    categories: [2], // Women
    sub_categories: [2], // Jackets
  },
  {
    title: "Leather Handbag",
    desc: "Brown premium leather handbag",
    price: 3499,
    oldPrice: 3999,
    isNew: true,
    type: "featured",
    categories: [5], // Accessories
    sub_categories: [5], // Bags
  },
  {
    title: "Running Sneakers",
    desc: "Lightweight breathable sneakers",
    price: 2999,
    oldPrice: 3499,
    isNew: true,
    type: "normal",
    categories: [4], // New Season
    sub_categories: [4], // Sneakers
  },
  {
    title: "Formal Pants",
    desc: "Black slim-fit trousers",
    price: 1999,
    oldPrice: 2499,
    isNew: false,
    type: "trending",
    categories: [3], // Men
    sub_categories: [3], // Pants
  },
  {
    title: "Printed Maxi Dress",
    desc: "Floral summer maxi dress",
    price: 2299,
    oldPrice: 2699,
    isNew: true,
    type: "trending",
    categories: [2], // Women
    sub_categories: [1], // T-Shirts
  },
  {
    title: "Wool Overcoat",
    desc: "Grey winter overcoat",
    price: 3999,
    oldPrice: 4499,
    isNew: false,
    type: "trending",
    categories: [4], // New Season
    sub_categories: [2], // Jackets
  },
  {
    title: "Casual Backpack",
    desc: "Durable canvas backpack",
    price: 1599,
    oldPrice: 1899,
    isNew: true,
    type: "featured",
    categories: [7], // Sales
    sub_categories: [5], // Bags
  },
  {
    title: "Sports Sneakers",
    desc: "High grip sports shoes",
    price: 2799,
    oldPrice: 3199,
    isNew: true,
    type: "normal",
    categories: [6], // Shoes
    sub_categories: [4], // Sneakers
  },
  {
    title: "Evening Clutch",
    desc: "Elegant black party clutch",
    price: 1899,
    oldPrice: 2199,
    isNew: false,
    type: "featured",
    categories: [2], // Women
    sub_categories: [5], // Bags
  },
];

// (async () => {
  for (let product of products) {
    await addProduct(product);
  }
// })();
