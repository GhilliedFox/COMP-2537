function loadEvents() {
  $.ajax({
    url: "http://localhost:5000/timeline/getAllEvents",
    type: "get",
    success: (x) => {
      console.log(x);
      for (i = 0; i < x.length; i++) {
        $("main").append(
          `
                <p> 
                    Event  Text - ${x[i].text}
                <br> 
                    Event  time - ${x[i].time}
                <br> 
                    Event  Hits - ${x[i].hits}

                <br> 
                    <button class="LikeButton" id="${x[i]["_id"]}"> Like! </button>
                <br> 
                    <button class="deleteItem" id="${x[i]["_id"]}"> Delete </button>
                </p>

                
                `
        );
      }
    },
  });
}

function increamentHitsByOne() {
  x = this.id;
  $.ajax({
    url: `http://localhost:5000/timeline/inreaseHits/${x}`,
    type: "get",
    success: (e) => {
      console.log(e);
    },
  });
}
function deleteItem() {
  x = this.id;
  $.ajax({
    url: `http://localhost:5000/timeline/remove/${x}`,
    type: "get",
    success: (e) => {
      console.log(e);
    },
  });
}
function setup() {
  loadEvents();

  $("body").on("click", ".LikeButton", increamentHitsByOne);
  $("body").on("click", ".deleteItem", deleteItem);
}

$(document).ready(setup);
