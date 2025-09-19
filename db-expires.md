# what to do when db expire

1. new db create
2. update environment variables of eccomerce stapi prod
3. login admin panel, and add products one by one (email: first_main and pass: KKrB0fapPH4)

4. first create categories:

```
🗂 Categories (5): see db expire assets folder for images
note: update id in category_grid_box Links
Sales

Men

Women

New Season

Accessories & Shoes
```

5. add sub categories:

```
🗂 SubCategories (5)

T-Shirts

Jackets

Pants

Sneakers

Bags
```

6. see image above

```
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



can also use script db-expire.js , it not add images or manual entry
```

6. make all api public and provide it find, findOne , create access to public or authenticated
