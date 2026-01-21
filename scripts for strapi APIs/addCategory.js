import { STRAPI_URL } from "./constants.js";
import { fileFromUrl } from "./helpers.js";

async function addCategory(category) {
  try {
    console.log(`Creating category: ${category.title}`);

    const formData = new FormData();

    // Attach banner image
    if (category.bannerImg) {
      const bannerFile = await fileFromUrl(category.bannerImg, "banner.jpg");
      formData.append("files.bannerImg", bannerFile);
    }

    // Category data
    formData.append(
      "data",
      JSON.stringify({
        title: category.title,
        // products: category.products,
        // sub_categories: category.sub_categories
      }),
    );

    const res = await fetch(`${STRAPI_URL}/api/categories`, {
      method: "POST",
      // headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      body: formData,
    });

    console.log(res.status)
    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log(`Category added: ${data.data.attributes.title}`);
  } catch (err) {
    console.error("Error adding category:", err.message);
  }
}

const categories = [
  {
    title: "Sales",
    bannerImg: "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // products: [8, 9],
    // sub_categories: [3, 5]
  },
  {
    title: "Women",
    bannerImg: "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // products: [2, 6, 10],
    // sub_categories: [1, 2, 5]
  },
  {
    title: "Men",
    bannerImg: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // products: [1, 3, 5],
    // sub_categories: [1, 3]
  },
  {
    title: "New Season",
    bannerImg: "https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // products: [4, 7],
    // sub_categories: [2, 4]
  },
  {
    title: "Accessories",
    bannerImg: "https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // products: [3, 8, 10],
    // sub_categories: [5]
  },
  {
    title: "Shoes",
    bannerImg: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  }
];

(async () => {
  for (const category of categories) {
    await addCategory(category);
  }
})();

const categId = {
  Sales: 1,
  Women: 2,
  Men: 3,
  "New Season": 4,
  "Accessories": 5,
  Shoes: 6
};
