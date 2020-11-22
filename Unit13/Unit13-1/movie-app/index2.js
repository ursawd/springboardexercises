//** set up / process submit button clicked, verify input */
$("#submit").on("click", function (event) {
  event.preventDefault();

  //** place for error messages */
  $("p").text("");

  //** save text box input values */
  const valTitle = $("#title").val();
  const valRating = $("#rating").val();

  //** clear input values from form */
  $("#title").val("");
  $("#rating").val("");

  //** title input must be 2 or greater characters */
  if (valTitle.length < 2) {
    console.log(valTitle.length);
    $("p").text("Two character minimum");
    return;
  }
  //** only rating of 0-10 allowed */
  if (!valRating || valRating > 10 || valRating < 0) {
    $("p").text("0-10 only");
    return;
  }
  //** stores input data in movieArray */
  processMovieEntryData(valTitle, valRating);
  //** display movieArray */
  processMovieEntrysDisplay();
});
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//** stores movie data in array */
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function processMovieEntryData(valTitle, valRating) {
  movieArray.push([valTitle, valRating, recCount]);
  recCount++;
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//** displays movie data array */
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function processMovieEntrysDisplay() {
  $(".movie-list").html("");
  movieArray.forEach((movie) => {
    const item = `<div id='${movie[2]}' class='list-item'><button>Delete</button><span>${movie[0]}</span><span>${movie[1]}</span></div>`;
    $(".movie-list").append(item);
  });
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//** event listener and delete of movie entry */
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
$(".movie-list").on("click", "button", function (event) {
  const delId = $(event.target).parent().attr("id");
  movieArray.splice(delId, 1);
  $(event.target).parent().remove();
});
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//**  add event listener for sort / process sort*/
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
$("#sorts").on("click", function (event) {
  sortOpt = event.target.selectedIndex;
  let indx1;
  //** sort array based on sortOpt / reverse for option1 and 3 */
  movieArray.sort(sortArray);
  if (sortOpt === 1 || sortOpt === 3) movieArray.reverse();

  function sortArray(a, b) {
    //** select title(0) or rating(1) */
    if (sortOpt === 0 || sortOpt === 1) {
      indx1 = 0;
    } else {
      indx1 = 1;
    }

    //** sort in accending order using indx for title or rating */
    if (a[indx1] === b[indx1]) {
      return 0;
    } else {
      return a[indx1] < b[indx1] ? -1 : 1;
    }
  }

  //** display movieArray on web page */
  processMovieEntrysDisplay();
});

//^^^^^^^^^^^^^^^^^^^^^^^^^^^Control^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const movieArray = [];
let sortOpt = 0;
let recCount = 0;
