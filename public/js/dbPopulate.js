$(document).on('click', '#createNewTrial', function() {
  $.post("/db/create_new_trial/proj1/testuser1",
  {
      user: "Bob"
  },
  function(data, status){
    console.log("Sending new trial request")
  });
});