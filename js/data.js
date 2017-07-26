
getData(url);

$(document).ready(function() {

    $("#prodList").html(renderProducts(data));

    $("#priceAsc").click(function() {
        var priceAsc = sortPriceAscending(data);
        $("#prodList").html(renderProducts(priceAsc));
    }); 

    $("#priceDesc").click(function() {
    var priceDesc = sortPriceDescending(data);
        $("#prodList").html(renderProducts(priceDesc));
    }); 

    $('#nameAZ').click(function() {
        var nameAsc = sortNameAZ(data);
        $("#prodList").html(renderProducts(nameAsc));
    });   

    $('#nameZA').click(function() {
        var nameDesc = sortNameZA(data);
        $("#prodList").html(renderProducts(nameDesc));
    });  

    $('#research').keyup(function(){
        var rex = new RegExp($(this).val(),'i');
        var research = researchResult(data,rex);
        $("#prodList").html(renderProducts(research));
    });

}); 

/*return data */
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
        }
    });
}

/*function render */
function renderProducts(data) {
    var body = "";
    for(i = 0 ; i < data.length ; i++){
        var element = data[i];
        body += '<a href ="ficheProduit.html?product='+ element.id + '"> ';
        body += '<div class = "panel panel-default col-md-3 box">';
        body += '<div class = "panel-heading prodName" align = "center">'
                + element.name + '</div>';
        body += '<img class = "panel-body img-thumbnail image" align = "center"'
                + ' src = "'+element.picture+'" alt = "image produit"/>';
        body += '<div class = "panel-body prix" align = "center"    >Prix : '
                + element.price + '</div>';
        body += '</div></a>';
    }
    return body;
}

/*returns the integer value of a string price*/
function getIntPrice(a) {
    return parseFloat(((a.price).replace(',','')).replace('$',''));
}

/*returns the - asc - sorted by price copy of object data*/
function sortPriceAscending(data) {
    var price = data.slice(0);
    price.sort(function(a,b) {
        return getIntPrice(a) - getIntPrice(b);
    });
    return price;
}

/*returns the - desc - sorted by price copy of object data*/
function sortPriceDescending(data) {
    var price = data.slice(0);
    price.sort(function(a,b) {
        return getIntPrice(b) - getIntPrice(a);
    });
    return price;
}

/*returns the value of comparing 2 strings*/
function compareString(a,b) {
    if(a.name == b.name)
        return 0;
    if(a.name < b.name)
        return -1;
    if(a.name > b.name)
        return 1;
}

/*returns the - asc - sorted by name copy of object data*/
function sortNameAZ(data) {
    var name = data.slice(0);
    name.sort(function(a,b) {
        return compareString(a,b);
    });
    return name;
}

/*returns the - desc - sorted by name copy of object data*/
function sortNameZA(data) {
    var name = data.slice(0);
    name.sort(function(a,b) {
        return compareString(b,a);
    });
    return name;
}

/*returns the products matching the research */
function researchResult(data,rex) {
    var research = [];
    for(i = 0 ; i < data.length ; i++){
        if (rex.test(data[i].name)){
            research.push(data[i]);
        }
    }
    return research;
}