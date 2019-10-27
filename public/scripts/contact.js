
function saveMessage(){
    //read data
    var name = $("#txtName").val();
    var mail = $("txtMail").val();
    var message = $("txtMessage").val();

    //create an object
    var msg = {
        name: name,
        mail: mail,
        message: message,
        user: 'Mykul'
    };

    console.log(msg);

    //send the object to back end
    $.ajax({
        url: '/api/message',
        type: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
        success: function(res){
            console.log("Server says", res);
        },
        error: function(error){
            console.log("Error saving message", error);
        }

    });

}

function init() {
    console.log("Contact Page!");

        //click event on button
        $("#btnSend").click(saveMessage);

}


window.onload = init;