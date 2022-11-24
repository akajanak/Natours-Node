const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/readTemplate');

// to read all template files
const tempOverview = fs.readFileSync(`${__dirname}/templates/templateOverview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/templateProduct.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/templateCard.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const productData = JSON.parse(data);

// creating http server
const server = http.createServer((req, res)=>{
    const {query, pathname} = url.parse(req.url, true);
    //OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const templateData = productData.map(el => replaceTemplate(tempCard, el));
        const outputData = tempOverview.replace('{%PRODUCTCARDS%}', templateData);
        res.end(outputData); 
        // console.log(templateData);
        // res.end('overview');  
    //PRODUCT PAGE
    }else if (pathname === "/product"){
        const productValue = productData[query.id];
        const prodTemplate = replaceTemplate(tempProduct, productValue);
        res.end(prodTemplate);
    //API PAGE
    }else if (pathname === "/api") {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
    //ERROR PAGE
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-header': 'else block'
        });
        res.end('data not found');
    }
});
server.listen(8000, '127.0.0.1', ()=>{
    console.log('server initiated successfully');
})