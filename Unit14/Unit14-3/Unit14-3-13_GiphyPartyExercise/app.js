//^^^^^^^^^^^^^^^^^^^^^^^^^^GIPHY PARTY^^^^^^^^^^^^^^^^^^^^^^^^^^^^
let img_count = 0;
//** process search button click */
$("#search-button").on("click", function (event) {
  event.preventDefault();
  const searchValue = $("#search-id").val();
  getApiInfo(searchValue);
});
//** retrieve API info */
async function getApiInfo(searchTerm) {
  imgNumber = Math.floor(Math.random() * 100) + 1;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=cpSZg2jtGQQefXZI1WFEzEe249j2DJXU&q=${searchTerm}&limit=100&offset=${imgNumber}&rating=g&lang=en`;

  const result = await axios.get(url);

  displayGiphyData(result);
}
//** display image in DOM */
function displayGiphyData(giphyData) {
  let imgURL = giphyData.data.data[1].images.original.url;
  $("#gif-row").append(`<img src="${imgURL}" class="col-4 mb-2">`);
}
//** process remove images button */
$("#remove-button").on("click", function (event) {
  event.preventDefault();
  $("#gif-row").html("");
  img_count = 0;
});
