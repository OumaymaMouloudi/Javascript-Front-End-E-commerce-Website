

var total = 0;

/*convert json string from local storage into json object */
var cart = eval('(' + localStorage.getItem("cart") + ')'); 
console.log(cart);

        
$(document).ready(function() {
    $('.content').html(renderCart(cart));
    $("#orderTotal").text("$" + total);
    $('.qte').keyup(function() {
        var newCart = modifyQuantity(cart,$(this).data('index'),$(this).val());
        localStorage.setItem('cart', JSON.stringify(newCart));
    });
    $('.update').click(function () {
        window.location.reload(); 
    });
    $('.remove').click(function () {
        removeFromCart(cart,$(this).data('index'));
        
    });
});

/*remove cart[index] from local storage and upload the page to have the result shown */
function removeFromCart(cart,index) {
    cart.splice($(this).data('index'),1);
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

/*modify the quantity of a product in local storage */
function modifyQuantity(cart,index,val) {
    var newCart = cart.slice(0);
    newCart[index].quantity = val;
    return newCart;
}
/*the display of the cart rows in the table */
function renderCart(cart) {
    var body = "";
    for(i = 0 ; i < cart.length ; i++){
        body += '<tr><td class = "col-sm-8"><div class = "col-sm-2">' + 
                '<img class = "imgProduit" src="' + cart[i].picture + 
                '" alt="image Prod"></div><div class="col-sm-6">';
        body += '<span id = "prodName">' + cart[i].name + '</span><br>';
        body += '<span id = "prodComp">'+ cart[i].company + '</span>';
        body += '</div></td><td class = "col-sm-1" id = "price">'+ 
                cart[i].price +'</td>';
        body += '<td class = "col-sm-1" id = "qte"><input type="text" ' + 
                'name="" value="'+ cart[i].quantity +'" data-index = "'+ 
                i +'" class = "qte"></span></td>';
        body += '<td class = "col-sm-1"><button class ="btn btn-default remove"'
                +' type="button" data-index = "'+ i +'">remove</button></td>'+
                '<td class = "col-sm-1" id = "total">$'+ getTotalForItem(cart[i]) +
                '</td><tr>';
        total += getTotalForItem(cart[i]);
    }
    return body;

}

/*get the total price of the total quantity of a product  */
function getTotalForItem(element) {
    return round((parseFloat(((element.price).replace(',','')).replace('$','')) 
            * element.quantity)) ;
}

/*round a value to 2digits after ','*/
function round(value) {
  return Math.floor(value * 100)/100;
}
