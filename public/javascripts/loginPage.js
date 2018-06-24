// Comportamento da página de signup
(function () {

    document.getElementById('button-login').addEventListener('click', function () {

        // TODO fazer verificação de entrada
        var login = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        post('/login', login, function (response) {
            console.log(response);
        })
    })

    function post(url, object, callback) {
        var XHR = new XMLHttpRequest();
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];
        var field;

        // Turn the data object into an array of URL-encoded key/value pairs.
        for (field in object) {
            urlEncodedDataPairs.push(encodeURIComponent(field) + '=' + encodeURIComponent(object[field]));
        }

        // Combine the pairs into a single string and replace all %-encoded spaces to 
        // the '+' character; matches the behaviour of browser form submissions.
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                callback(XHR.response);
            }
        }

        //Send our request
        XHR.open('POST', url);
        XHR.responseType = 'json';
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData);

    }

})();