$("#submit").on("click", function (event) {
  event.preventDefault();

  $("p").text("");

  const valTitle = $("#title").val();
  const valRating = $("#rating").val();

  $("#title").val("");
  $("#rating").val("");

  if (valTitle.length < 2) {
    console.log(valTitle.length);
    $("p").text("Two character minimum");
    return;
  }
  if (!valRating || valRating > 10 || valRating < 0) {
    $("p").text("0-10 only");
    return;
  }

  const item = `<div class='list-item'><button>Delete</button><span>${valTitle}</span><span>${valRating}</span></div>`;
  $(".movie-list").append(item);
});
$("movie-list").on("click", "button", function (event) {
  console.log("hi", event.target);
});
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
$(".movie-list").on("click", "button", function (event) {
  $(event.target).parent().remove();
});
$("#sort-warnings").on("click", "button", function (event) {
  const items = $(".list-item");
  console.log(items);
  const $eventTarget = $(event.target);
  if ($($eventTarget).attr("id") === "sortTA") {
    console.log("sortTA");
  }
  if ($($eventTarget).attr("id") === "sortTD") {
    console.log("sortTD");
  }
  if ($($eventTarget).attr("id") === "sortRA") {
    console.log("sortRA");
  }
  if ($($eventTarget).attr("id") === "sortRD") {
    console.log("sortRD");
  }
});
