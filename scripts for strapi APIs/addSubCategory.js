import { STRAPI_TOKEN, STRAPI_URL } from "./constants.js";

async function addSubCategory(subCategory) {
  try {
    console.log(`Creating sub-category: ${subCategory.title}`);

    const res = await fetch(`${STRAPI_URL}/api/sub-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          title: subCategory.title,
          //   products: subCategory.products,
          categories: subCategory.categories
        },
      }),
    });

    console.log(res.status)

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log(`Sub-category added: ${data.data.attributes.title}`);
  } catch (err) {
    console.error("Error adding sub-category:", err.message);
  }
}

const subCategories = [
  {
    title: "T-Shirts",
    // products: [1, 6],
    categories: [1, 2]
  },
  {
    title: "Jackets",
    // products: [2, 7],
    categories: [2, 4]
  },
  {
    title: "Pants",
    // products: [5],
    categories: [1]
  },
  {
    title: "Sneakers",
    // products: [4, 9],
    categories: [1, 4]
  },
  {
    title: "Bags",
    // products: [3, 8, 10],
    categories: [3, 5]
  },
];

(async () => {
  for (const subCategory of subCategories) {
    await addSubCategory(subCategory);
  }
})();

const subCategId = {
  "T-Shirts": 1,
  Jackets: 2,
  Pants: 3,
  Sneakers: 4,
  Bags: 5,
};
