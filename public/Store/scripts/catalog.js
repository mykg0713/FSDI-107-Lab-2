
/** GLOBAL Variablies */
var items = [];
var serverURL = "http://restclass.azurewebsites.net";





/** functions */

function getCatalogFromServer(){
    /**
     * Create a AJAX request to ge the data
     * When the data its received:
     *  - fill the items array
     *  - call display catalog
     */

     $.ajax({
         url:  serverURL + "/API/points",
         type: "GET",
         success: function (res) {
             
        // filter and only get my item to ITEMS array
        /** Travel the array
         * get each item inside the arry
         * compare the item.user with your name
         * if equal, add the item to items array
         */
        for( var i = 0; i < res.length; i++){
            var theItem = res[i];
            
            if(theItem.user == "Mykul"){
                //this item belongs to me
                items.push(theItem);
            }
        }
        //display
        displayCatalog();
},
         error:  function(error){

         }
     });
}
function displayCatalog(){
    /**
     * Travel the array
     * get each element from the array
     * display the element into the DOM (html)
     */
    for (var i=0; i< items.length; i++){
        var product = items[i];

       displayItem(product);
        
    }

}

function displayItem(product){
    var pLayout = `<div class="item">
    <img src="images/${product.image}">
    <h4>${product.title}</h4>
    <h5>${product.price}</h5>
    <p>${product.description}</p>
  
    <button class="myButton">Add to Cart</button>
    </div>`;
    
    $("#catalog").append(pLayout);
}

function search(){
    //get the text
    var text = $("#txtSearch").val();
    
    //clear the catalog
    $("#catalog").html("");

    /**
     * Travel the array
     * get eavh elemetn from the array
     * compare the text with the product.title
     * if match, display the item
     */

     for(var i =0; i < items.length; i++){
         var product = items[i];
         var code = items[i];
        
         //Note: parse string to lower case to remove case sensitivity
       
        if(
            product.title.toLowerCase().includes( text.toLowerCase()) 
            || product.price.toLowerCase().includes(text.toLowerCase())
            || product.description.toLowerCase().includes(text.toLowerCase())
            ){
            displayItem(product); 

        }

     }
}

function init(){
    console.log("Catalog Page");

    //events
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function(e){
        if(e.key == "Enter"){
            search();
            e.preventDefault(); //prevent default action (form submit)
        }
    });

    getCatalogFromServer();
   


}

/** Initialization  */
window.onload = init;