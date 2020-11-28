//^^^^^^^^^^^^^^^^^^^^^^^^^^GIPHY PARTY^^^^^^^^^^^^^^^^^^^^^^^^^^^^
let img_count = 0;
//** process search button click */
$("#search-button").on("click", function (event) {
  event.preventDefault();
  const searchValue = $("#search-id").val();
  if (searchValue === "") {
    return;
  }
  getApiInfo(searchValue);
  $("#search-id").val("");
});
//** retrieve API info */
async function getApiInfo(searchTerm) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=cpSZg2jtGQQefXZI1WFEzEe249j2DJXU&q=${searchTerm}&limit=100&offset=0&rating=g&lang=en`;
  const result = await axios.get(url);
  console.log(result);
  displayGiphyData(result);
}
//** display image in DOM */
function displayGiphyData(giphyData) {
  imgNumber = Math.floor(Math.random() * giphyData.data.data.length + 1);
  try {
    let imgURL = giphyData.data.data[imgNumber].images.original.url;
    $("#gif-row").append(`<img src="${imgURL}" class="col-3 mb-3">`);
  } catch {
    console.log("CAUGHT ERROR");
    return;
  }
}
//** process remove images button */
$("#remove-button").on("click", function (event) {
  event.preventDefault();
  $("#gif-row").html(""); // remove all images on row
  img_count = 0;
});
