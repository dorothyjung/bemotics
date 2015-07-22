$(document).on('click', '#runNewTrial', function() {
  $.post("/db/create_new_trial",
  {
      user: "Bob"
  },
  function(data, status){
    console.log("Sending new trial request")
  });
});