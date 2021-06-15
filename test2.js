$(function()
{
  $("#input").on("click",".edit",handleUpdate);
  $("#input").on("click",".del",Del);
  $("#addbtn").click(add);
  //handling input fields s
  $("#addbtn").attr("disabled", true);
  $('#country').change(function () {
      if ($('#name').val() != '' && $('#email').val() != '' && $('#number').val() != '' && $('#male').val() != '' && $('#female').val() != '' && $('#street').val() != '' && $('#city').val() != '' && $('#country').val() != '') {
          $('#addbtn').attr('disabled', false);
      } else {
          $('#addbtn').attr('disabled', true);
      }
  });
  $("#upd").click(function() {
  $("#addbtn").attr("disabled",false);
  var id= $("#_id").val();
  var name = $("#name").val();
  var gender = $("input[name=gender]:checked").val();
  var email= $("#email").val();
  var number1=$("#number").val();
  var street=$("#street").val();
  var city=$("#city").val();
  var country=$("#country").val();
  console.log(number1);
  $.ajax({
    url: "http://localhost/api/products/" + id,
    method: "PUT",
    data: JSON.stringify({name,email,gender,street,city,country,number1}),
    dataType: "json",
    contentType: "application/json",
    error: function(xhr, textStatus, error){
      var input=$("#ip");
      input.append("<div><p>+"+xhr.statusText+"<br>TRY AGAIN</p></div>");
    },
    success: function(response) {
      load();
      
    },
    
  });

});
});
//delete function
function Del() {
  var btn = $(this);
  var parentDiv = btn.closest(".resc");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "http://localhost/api/products/"+id,
    method: "DELETE",
    success: function() {
      load();
    }
  });
}
//post function
function add() {
 
  var name = $("#name").val();
  var gender = $("input[name=gender]:checked").val();
  var email= $("#email").val();
  var number1=$("#number").val();
  var street=$("#street").val();
  var city=$("#city").val();
  var country=$("#country").val();
  console.log(number1);
  $.ajax({
    url: "http://localhost/api/products",
    method: "POST",
    data: JSON.stringify({name,email,gender,street,city,country,number1}),
    dataType: "json",
    contentType: "application/json",
    error: function(xhr, textStatus, error){
      var input=$("#ip");
      input.append("<div><p>+"+xhr.statusText+"<br>TRY AGAIN</p></div>");
     },
    success: function(response) {
      //console.log(data);
      load();
    }
   
   });
  /*
  Second method for posting data
  const data = {name,email,gender,street,city,country,number1};
    const option ={
      method: "POST",
      headers :
       {
        "Content-Type" : "application/json"
       },
      body :JSON.stringify(data)};
      fetch("http://localhost/api/products",option)
      console.log(data);
      load();*/
}
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".resc");
  let id = parentDiv.attr("data-id");
  $.get("http://localhost/api/products/" + id, function(
    response
  ) {
    $("#_id").val(response.id);
    $("#name").val(response.name);
    $("#email").val(response.email);
    $('input:radio[name="gender"][value='+response.gender+']').prop('checked',true);
    $("#number").val(response.number1);
    $("#street").val(response.Address.street);
    $("#city").val(response.Address.city);
    $("#country").val(response.Address.country);
    $("#addbtn").attr("disabled",true);

  });
}
// GET function
function load()
{
  $.getJSON('http://localhost/api/products').done(function(data) {
  console.log(data);
  var inp=$("#input")      
  inp.empty();
  for(var i=0;i<data.length;i++)
    {
      var res=data[i];
     inp.append("<div class=resc data-id="+res.id+"><h1>"+res.id+"  "+res.name+"</h1><h3>"+res.email+" Gender:"+res.gender+"   "+res.number1+"</h3><h3>ADDRESS: "+res.Address.street+ " "+res.Address.city+ " "+res.Address.country+" <br><button class=del >DELETE</button>"+" "+"<button class=edit> EDIT</button></div>");
    } 
    });
}    