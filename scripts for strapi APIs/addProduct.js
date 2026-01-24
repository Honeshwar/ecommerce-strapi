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
  // {
  //   title: "Classic White T-Shirt",
  //   desc: "Soft cotton regular fit tee",
  //   price: 999,
  //   oldPrice: 1299,
  //   isNew: true,
  //   type: "trending",
  //   categories: [3], // Men
  //   sub_categories: [1], // T-Shirts,
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704702039/indian_man_simple_white_tee_studio_portrait_de169cdc72.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853222/medium_tshirt_8726716_1280_7f7de55683.jpg"
  //   ]
  // },
  // {
  //   title: "Denim Jacket",
  //   desc: "Blue washed slim fit denim jacket",
  //   price: 2499,
  //   oldPrice: 2999,
  //   isNew: false,
  //   type: "trending",
  //   categories: [2], // Women
  //   sub_categories: [2], // Jackets
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853868/blue_2566082_1280_ddacd2694f.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853846/people_2589566_1280_0950d1d4e2.jpg"
  //   ]
  // },
  // {
  //   title: "Leather Handbag",
  //   desc: "Brown premium leather handbag",
  //   price: 3499,
  //   oldPrice: 3999,
  //   isNew: true,
  //   type: "featured",
  //   categories: [5], // Accessories
  //   sub_categories: [5], // Bags
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854328/ai_generated_8571263_1280_c9ef287031.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854327/handbag_8310851_1280_cae97a2488.jpg"
  //   ]
  // },
  // {
  //   title: "Running Sneakers",
  //   desc: "Lightweight breathable sneakers",
  //   price: 2999,
  //   oldPrice: 3499,
  //   isNew: true,
  //   type: "normal",
  //   categories: [4], // New Season
  //   sub_categories: [4], // Sneakers
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700928/medium_omar_prestwich_j_LE_Gurep_Dco_unsplash_d1877a6164.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700921/joseph_barrientos_4q_Sb_F_Wh_H_Ks_unsplash_54608ea19c.jpg"
  //   ]
  // },
  // {
  //   title: "Formal Pants",
  //   desc: "Black slim-fit trousers",
  //   price: 1999,
  //   oldPrice: 2499,
  //   isNew: false,
  //   type: "trending",
  //   categories: [3], // Men
  //   sub_categories: [3], // Pants
  //   images: [
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700917/large_portrait_happy_smiling_young_businessman_brown_suit_isolated_white_wall_326271be61.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700928/large_portrait_happy_smiling_young_businessman_blue_suit_isolated_white_wall_79a92f80c3.jpg"
  //   ]
  // },
  // {
  //   title: "Printed Maxi Dress",
  //   desc: "Floral summer maxi dress",
  //   price: 2299,
  //   oldPrice: 2699,
  //   isNew: true,
  //   type: "trending",
  //   categories: [2], // Women
  //   sub_categories: [1], // T-Shirts

  // },
  // {
  //   title: "Denim Overcoat",
  //   desc: "Warm denim overcoat",
  //   price: 3999,
  //   oldPrice: 4499,
  //   isNew: false,
  //   type: "trending",
  //   categories: [4], // New Season
  //   sub_categories: [2], // Jackets
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853868/blue_2566082_1280_ddacd2694f.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853846/people_2589566_1280_0950d1d4e2.jpg"
  //   ]
  // },
  {
    title: "Casual Backpack",
    desc: "Durable canvas backpack",
    price: 1599,
    oldPrice: 1899,
    isNew: true,
    type: "featured",
    categories: [1], // Sales
    sub_categories: [5], // Bags
    images:[
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757855700/woman_7405691_1280_87db98ca47.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757855699/medium_man_8192663_1280_93e8a33159.jpg"
    ]
  },
  // {
  //   title: "Sports Sneakers",
  //   desc: "High grip sports shoes",
  //   price: 2799,
  //   oldPrice: 3199,
  //   isNew: true,
  //   type: "normal",
  //   categories: [6], // Shoes
  //   sub_categories: [4], // Sneakers
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854044/medium_nike_5020612_1280_1537819935.jpg",
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854045/small_shoes_3780166_1280_6c7735a6b2.jpg"
  //   ]
  // },
  // {
  //   title: "Evening Clutch",
  //   desc: "Elegant black party clutch",
  //   price: 1899,
  //   oldPrice: 2199,
  //   isNew: false,
  //   type: "featured",
  //   categories: [2], // Women
  //   sub_categories: [5], // Bags
  //   images:[
  //     "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700912/large_full_shot_woman_online_fashion_shopping_c93442f396.jpg",
  //     ""
  //   ]
  // },
];

// (async () => {
  for (let product of products) {
    await addProduct(product);
  }
// })();
