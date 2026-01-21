import { fileFromUrl } from "./helpers";

const STRAPI_URL = "https://leading-victory-83e60c8805.strapiapp.com";

const formData = new FormData();
// Attach image
const file = await fileFromUrl("https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600", "newfile");
formData.append("files", file);

const res = await fetch(`${STRAPI_URL}/api/upload`, {
  method: "POST",
  // headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  body: formData,
});

const data = await res.json();

if (!res.ok) {
  throw new Error(JSON.stringify(data));
}else{
  console.log("successfully uploaded file", data);
}