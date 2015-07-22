$(document).on('click', '#createNewTrial', function() {
  $.post("/db/create_new_trial/:project1/:user1",
  {
      user: "Bob"
  },
  function(data, status){
    console.log("Sending new trial request")
  });
});