module.exports = function(temp, el){
    let output = temp.replace(/{%ID%}/g, el.id);
    output = output.replace(/{%PRODUCTNAME%}/g, el.productName);
    output = output.replace(/{%FROM%}/g, el.from)
    output = output.replace(/{%IMAGE%}/g, el.image);
    output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
    output = output.replace(/{%QUANTITY%}/g, el.quantity);
    output = output.replace(/{%PRICE%}/g, el.price);
    output = output.replace(/{%DESCRIPTION%}/g, el.description);
    if(!el.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};