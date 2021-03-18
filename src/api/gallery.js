async function fetchData({ galleryID, page }) {
  const url = `gallery/:${galleryID}/?count=10&page=${page}`;
  const response = await fetch(url);

  return response.json().page;
}

export default {
  fetchData,
};
