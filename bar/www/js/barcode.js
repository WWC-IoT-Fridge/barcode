var request = require('request');
//var options = {
//    host: 'www.searchupc.com',
//    path: '/handlers/upcsearch.ashx?request_type=3&access_token=3D0B8DB1-8BBA-409A-85B5-9EE3E866FC1D&upc=' +
//               result.text}
//var callback = function(response) {
//    var str = '';
//    response.on('data', function(chunk) {
//        str += chunk;
//    });
//    
//    response.on('end', function() {
//        console.log(str);
//    });
//}
//
//http.request(options, callback).end();
function scanBarcode(result) {
    request('www.searchupc.com//handlers/upcsearch.ashx?request_type=3&access_token=3D0B8DB1-8BBA-409A-85B5-9EE3E866FC1D&upc=' + result.text, function(error, res, body) {
        console.log('test');
        if(!error && res.statusCode === 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    })
}

//function getUPCData(upc) {
//    
//}
module.exports = scanBarcode;
