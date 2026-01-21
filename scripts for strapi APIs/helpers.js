/**
 * convert live hosted file into blob file url
 * @param {string} url
 * @param {string} filename
 * @returns File
 */
export async function fileFromUrl(url, filename) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}
