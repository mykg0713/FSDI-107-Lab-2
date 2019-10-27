var serverURL = "http://restclass.azurewebsites.net";



function Item(code, title, price, category, description, rating) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.rating = rating;
    this.user = "Mykul";
}

function clearForm(){
    $("#txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtCategory").val("");
    $("#txtDescription").val("");
    $("#txtRating").val("");
    $("#txtImage").val("");
}

function saveItem() {
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var category = $("#txtCategory").val();
    var description = $("#txtDescription").val();
    var rating = $("#txtRating").val();
    var image = $("txtImage").val();

    var test = new Item(code, title, price, category, description, rating, image);
    console.log(test);

    //send the object to a server
    $.ajax({
        url: serverURL + "/API/points",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(test),
        success: function (response) {
            //alert the user
            console.log("Data Saved Server responded with", response);
            clearForm();
            $("#alert").removeClass("hide");

            //set a timer to execute some actions
            setTimeout(
                function(){
                    $("#alert").addClass("show");
                
                4000 // 10,000 = 10 sec
                }
            );
        },
        error: function (details) {
            console.log("Error, something went wrong", details);
        }
    });


}




function init() {
    console.log("admin page");
    $("#btnSave").click(saveItem);


}

window.onload = init;
