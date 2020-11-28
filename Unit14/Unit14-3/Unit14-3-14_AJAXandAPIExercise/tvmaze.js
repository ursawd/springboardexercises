/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
//** called by search button event listener */
async function searchShows(query) {
  const shows = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${query}`
  );
  let imgUrl = ""; //will contain image for show or placeholder image
  let showArr = []; //will contain array of selected info from returned API data
  //**  loop through API data and check for empty image field*/
  for (let i = 0; i < shows.data.length; i++) {
    if (shows.data[i].show.image === null) {
      imgUrl = "https://tinyurl.com/tv-missing";
    } else {
      imgUrl = shows.data[i].show.image.medium;
    }
    // add to array containing object containing selected API data
    showArr.push({
      id: shows.data[i].show.id,
      name: shows.data[i].show.name,
      summary: shows.data[i].show.summary,
      image: imgUrl,
    });
  }
  return showArr;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  //** create card(s) of show data in DOM */
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-outline-primary w-100" id="episodes">Episodes</button>
            </div>
         </div>
       </div>
      `
    );
    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const episodes = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  let episodesArr = [];
  $("#episodes-list").html("");
  for (let i = 0; i < episodes.data.length; i++) {
    episodesArr.push({
      id: episodes.data[i].id,
      name: episodes.data[i].name,
      season: episodes.data[i].season,
      number: episodes.data[i].number,
    });
  }
  populateEpisodes(episodesArr);
}
function populateEpisodes(episodesArr) {
  for (let episode of episodesArr) {
    $("#episodes-list").append(
      `<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>`
    );
  }
}
//** event listener for episodes button */
$("#shows-list").on("click", function (event) {
  const showId = event.target.closest(".Show").dataset.showId;
  $("#episodes-area").css("display", "block");
  getEpisodes(showId);
});
