
getData(url);
var key = 0;
$(document).ready(function() {
    var productId = $_GET('product');
    var productObj = getElement(data , productId)    
    console.log(productObj);
    //localStorage.setItem('cart', JSON.stringify(obj));
    $('.imgProd').attr("src",productObj.picture);
    $("#prodTitle").text(productObj.name);
    $("#prodPrice").text(productObj.price);
    $('#description').text(productObj.description);
    $('#addToCart').click(function () {
        var oldItems = JSON.parse(localStorage.getItem('cart')) || [];
        var newItem = productObj;
        oldItems = checkItemsExistance(newItem,oldItems);
        updateLocalStorage('cart',oldItems);
        console.log(oldItems);
        url = "panier.html";
        window.location(url);
    });                
});

function checkItemsExistance(nItem,oItems) {
    var exist = false;
    newItem = Object.assign({} , nItem );
    oldItems = oItems.slice(0);
    for(i = 0 ; i < oldItems.length ; i++ ){
        if(newItem.id == oldItems[i].id){
            exist = true ;
            key = i;
        }
    }
    if(exist){
        oldItems[key].quantity ++ ;
    }else{
        newItem.quantity = 1;
        oldItems.push(newItem);
    }
    return oldItems;
}

function updateLocalStorage(key,Items) {
    localStorage.setItem(key, JSON.stringify(Items));
}

function redirect(url,productId) {
    url = "panier.html?product="+productId;
        window.location(url);
}

function getElement(data, productId) {
    var productObj = {};
    for( i = 0 ; i<data.length ; i++){
        if(data[i].id == productId){
            productObj = data[i];
        }
    }
    return productObj;
}

/*return variables sent in url */
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

//return data 
function getData(url) {
    
    deferred = $.Deferred();
    $.ajax({
        url: url,
        type:"GET",
        dataType: "json",
        success: function(parsed){
            data = parsed;
            deferred.promise( data );
        },
        error : function(){
            deferred.resolve( "error" );
            //alert("error");
        }
    });
}