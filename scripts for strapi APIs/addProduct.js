import { STRAPI_TOKEN, STRAPI_URL } from "./constants.js";
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
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
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
    desc: "This classic white t-shirt is crafted from premium soft cotton fabric that feels gentle on the skin and stays comfortable all day long. Designed with a regular fit, it offers a clean and timeless look that works well for casual outings, office wear, or layering under jackets. The breathable material ensures proper airflow, making it ideal for warm weather. Easy to maintain and durable, this t-shirt retains its shape and color even after multiple washes, making it a reliable wardrobe essential.",
    price: 999,
    oldPrice: 1299,
    isNew: true,
    type: "trending",
    categories: [3],
    sub_categories: [1],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704702039/indian_man_simple_white_tee_studio_portrait_de169cdc72.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853222/medium_tshirt_8726716_1280_7f7de55683.jpg"
    ]
  },
  {
    title: "Denim Jacket",
    desc: "This blue washed denim jacket is designed for a modern slim fit that enhances your overall style. Made from high-quality denim, it provides warmth without feeling bulky, making it suitable for mild winters and cool evenings. The versatile design allows it to pair effortlessly with t-shirts, shirts, or hoodies. Durable stitching and strong buttons ensure long-lasting wear. Whether you’re heading out for a casual meetup or a weekend trip, this jacket adds a rugged yet stylish touch.",
    price: 2499,
    oldPrice: 2999,
    isNew: false,
    type: "trending",
    categories: [2],
    sub_categories: [2],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853868/blue_2566082_1280_ddacd2694f.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853846/people_2589566_1280_0950d1d4e2.jpg"
    ]
  },
  {
    title: "Leather Handbag",
    desc: "This premium brown leather handbag is crafted with attention to detail and superior quality materials. Its spacious interior allows you to carry daily essentials like wallet, phone, makeup, and keys with ease. The sturdy handles provide a comfortable grip, while the elegant finish adds a touch of sophistication to any outfit. Suitable for office, shopping, or casual outings, this handbag combines functionality with timeless style. The durable leather ensures long-term use while maintaining its refined appearance.",
    price: 3499,
    oldPrice: 3999,
    isNew: true,
    type: "featured",
    categories: [5],
    sub_categories: [5],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854328/ai_generated_8571263_1280_c9ef287031.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854327/handbag_8310851_1280_cae97a2488.jpg"
    ]
  },
  {
    title: "Running Sneakers",
    desc: "These running sneakers are designed for comfort, performance, and everyday use. Featuring a lightweight build and breathable upper material, they keep your feet cool during long walks or workouts. The cushioned sole provides excellent shock absorption, reducing strain on your feet and joints. With a strong grip outsole, these sneakers offer stability on different surfaces. Ideal for running, gym sessions, or casual wear, they combine sporty functionality with a sleek and modern design.",
    price: 2999,
    oldPrice: 3499,
    isNew: true,
    type: "normal",
    categories: [4],
    sub_categories: [4],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700928/medium_omar_prestwich_j_LE_Gurep_Dco_unsplash_d1877a6164.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700921/joseph_barrientos_4q_Sb_F_Wh_H_Ks_unsplash_54608ea19c.jpg"
    ]
  },
  {
    title: "Formal Pants",
    desc: "These black slim-fit formal pants are tailored to deliver a sharp and professional appearance. Made from high-quality fabric, they provide comfort throughout long working hours while maintaining a structured look. The slim-fit design enhances your silhouette without restricting movement. Suitable for office wear, business meetings, or formal occasions, these trousers pair well with shirts, blazers, and formal shoes. Durable stitching and premium material ensure long-lasting wear and a polished finish every time.",
    price: 1999,
    oldPrice: 2499,
    isNew: false,
    type: "trending",
    categories: [3],
    sub_categories: [3],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700917/large_portrait_happy_smiling_young_businessman_brown_suit_isolated_white_wall_326271be61.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700928/large_portrait_happy_smiling_young_businessman_blue_suit_isolated_white_wall_79a92f80c3.jpg"
    ]
  },
  {
    title: "Printed Maxi Dress",
    desc: "This printed maxi dress is designed to deliver comfort and effortless style during warm seasons. Made from soft, breathable fabric, it flows naturally and feels light on the skin. The floral print adds a fresh and elegant touch, making it suitable for casual outings, vacations, or daytime events. Its relaxed fit ensures ease of movement while still offering a flattering silhouette. Pair it with sandals or heels for a complete and graceful summer look.",
    price: 2299,
    oldPrice: 2699,
    isNew: true,
    type: "trending",
    categories: [2],
    sub_categories: [1]
  },
  {
    title: "Denim Overcoat",
    desc: "This warm denim overcoat is crafted for both comfort and style during cooler weather. The thick denim fabric provides insulation while remaining breathable for extended wear. Its structured design adds a bold and fashionable layer to your outfit, making it suitable for casual and semi-formal occasions. Easy to pair with jeans, trousers, or boots, this overcoat enhances your seasonal wardrobe. Durable construction ensures it remains a reliable outerwear choice for years.",
    price: 3999,
    oldPrice: 4499,
    isNew: false,
    type: "trending",
    categories: [4],
    sub_categories: [2],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853868/blue_2566082_1280_ddacd2694f.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757853846/people_2589566_1280_0950d1d4e2.jpg"
    ]
  },
  {
    title: "Casual Backpack",
    desc: "This casual backpack is designed for daily use, offering both durability and convenience. Made from strong canvas material, it can easily handle books, gadgets, and travel essentials. The spacious compartments help keep your belongings organized, while the adjustable straps ensure a comfortable fit. Ideal for college, office, or short trips, this backpack combines practicality with a modern look. Its sturdy build makes it a dependable choice for everyday carry.",
    price: 1599,
    oldPrice: 1899,
    isNew: true,
    type: "featured",
    categories: [1],
    sub_categories: [5],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757855700/woman_7405691_1280_87db98ca47.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757855699/medium_man_8192663_1280_93e8a33159.jpg"
    ]
  },
  {
    title: "Sports Sneakers",
    desc: "These sports sneakers are built for performance, comfort, and durability. Designed with a cushioned sole and high-grip outsole, they provide excellent support during workouts and outdoor activities. The breathable upper material keeps your feet cool and reduces moisture buildup. Lightweight construction ensures ease of movement, making them suitable for sports, running, or casual wear. With a stylish design and reliable functionality, these sneakers are a great addition to an active lifestyle.",
    price: 2799,
    oldPrice: 3199,
    isNew: true,
    type: "normal",
    categories: [6],
    sub_categories: [4],
    images: [
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854044/medium_nike_5020612_1280_1537819935.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1757854045/small_shoes_3780166_1280_6c7735a6b2.jpg"
    ]
  },
  {
    title: "Oversized Graphic T-Shirt",
    desc: "This oversized graphic t-shirt is designed for everyday comfort and modern street style. Made from breathable cotton fabric, it feels soft on the skin and allows free movement throughout the day. The relaxed fit gives it a trendy look that pairs perfectly with jeans or joggers. Durable stitching ensures long-lasting wear, while the bold graphic print adds a fashionable edge. Ideal for casual outings, travel, or lounging, this t-shirt is a versatile addition to your wardrobe.",
    price: 1199,
    oldPrice: 1499,
    isNew: true,
    type: "trending",
    categories: [3], // Men
    sub_categories: [1], // T-Shirts
    images: [
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_fashion_7539134_1920_9c87fab1e0.jpg?updatedAt=2026-01-26T07%3A47%3A07.131Z",
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_woman_7508618_1920_2c00bef7e3.jpg?updatedAt=2026-01-26T07%3A47%3A06.971Z"
    ]
  },
  {
    title: "Women’s Cropped Denim Jacket",
    desc: "This cropped denim jacket is crafted to deliver both comfort and contemporary style. Made from premium denim fabric, it provides durability while remaining lightweight enough for everyday wear. The cropped length enhances modern outfits and pairs well with dresses or high-waist jeans. Designed for versatility, it can be styled casually or layered for cooler evenings. Strong buttons and quality stitching ensure long-term use, making it a must-have outerwear piece for fashion-forward women.",
    price: 2699,
    oldPrice: 3199,
    isNew: true,
    type: "featured",
    categories: [2], // Women
    sub_categories: [2], // Jackets
    images: [
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_denim_jacket_6240820_1920_747af15b12.jpg?updatedAt=2026-01-26T07%3A47%3A07.187Z",
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_denim_jacket_6240825_1920_93723baa1a.jpg?updatedAt=2026-01-26T07%3A47%3A07.413Z"
    ]
  },
  {
    title: "Slim Fit Chino Pants",
    desc: "These slim fit chino pants are designed to provide a sharp yet comfortable look for everyday wear. Made with breathable fabric, they allow ease of movement while maintaining a clean silhouette. Perfect for office, casual meetings, or evening outings, these pants pair effortlessly with shirts and t-shirts. The modern cut enhances your appearance without feeling restrictive. Durable material and quality stitching ensure long-lasting performance and a polished look throughout the day.",
    price: 1899,
    oldPrice: 2299,
    isNew: false,
    type: "normal",
    categories: [3], // Men
    sub_categories: [3], // Pants
    images: [
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_man_7518890_1920_40519a35f1.jpg?updatedAt=2026-01-26T08%3A55%3A28.926Z",
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_man_5987532_1920_ca8d87b4c2.jpg?updatedAt=2026-01-26T07%3A47%3A07.466Z"
    ]
  },
  {
    title: "Lightweight Running Sneakers",
    desc: "These lightweight running sneakers are built for performance and comfort. The breathable upper material keeps your feet cool during long workouts, while the cushioned sole absorbs impact effectively. Designed for runners and active lifestyles, they offer excellent grip and stability on various surfaces. The modern design makes them suitable for casual wear as well. Whether you’re jogging, training, or walking daily, these sneakers provide reliable support and durability.",
    price: 2899,
    oldPrice: 3399,
    isNew: true,
    type: "trending",
    categories: [6], // Shoes
    sub_categories: [4], // Sneakers
    images:[
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700928/medium_omar_prestwich_j_LE_Gurep_Dco_unsplash_d1877a6164.jpg",
      "https://res.cloudinary.com/drct1kgjv/image/upload/v1704700921/joseph_barrientos_4q_Sb_F_Wh_H_Ks_unsplash_54608ea19c.jpg"
    ]
  },
  {
    title: "Minimal Leather Sling Bag",
    desc: "This minimal leather sling bag is designed for everyday convenience and modern style. Crafted from high-quality leather, it offers durability with a sleek and elegant finish. The compact yet spacious interior easily fits essentials like phone, wallet, and keys. Adjustable straps ensure comfortable carrying throughout the day. Ideal for travel, shopping, or casual outings, this sling bag blends functionality with a clean and sophisticated look.",
    price: 2199,
    oldPrice: 2599,
    isNew: false,
    type: "featured",
    categories: [5], // Accessories
    sub_categories: [5], // Bags
    images: [
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_girl_2201009_1920_5c0640a02a.jpg?updatedAt=2026-01-26T07%3A47%3A07.292Z",
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_girl_7867737_1920_5b31c1c6ed.jpg?updatedAt=2026-01-26T07%3A47%3A07.224Z"
    ]
  },
  {
    title: "Seasonal Casual Sneakers",
    desc: "These seasonal casual sneakers are designed for everyday comfort with a stylish edge. The soft inner lining ensures all-day comfort, while the sturdy sole provides excellent grip and balance. Lightweight construction makes them easy to wear for long hours. Suitable for casual outings, travel, and daily use, these sneakers pair effortlessly with jeans and casual wear. Built with durable materials, they are a reliable footwear choice for the new season.",
    price: 2599,
    oldPrice: 2999,
    isNew: true,
    type: "normal",
    categories: [4], // New Season
    sub_categories: [4], // Sneakers
    images: [
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_autumn_9963762_1920_303fa44880.jpg?updatedAt=2026-01-26T07%3A47%3A07.132Z",
      "https://diplomatic-approval-acb31df751.media.strapiapp.com/thumbnail_man_5582507_1920_7d9d11507a.jpg?updatedAt=2026-01-26T07%3A47%3A07.475Z"
    ]
  }
];


(async () => {
  for (let product of products) {
    await addProduct(product);
  }
})();
