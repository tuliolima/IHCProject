// Comportamento da página de signup
(function () {

    document.getElementById('button-finish-signup').addEventListener('click', function () {

        var pass = document.getElementById('password').value;
        var rePass = document.getElementById('re-password').value;

        if (pass != rePass) {
            console.log("SENHAS ERRADAS");
        } else {
            console.log("CRIANDO USUARIO");
            var user = {
                name: document.getElementById('name').value,
                username: document.getElementById('user').value,
                password: pass,
                email: document.getElementById('email').value
            }
            console.log(user);
        }

        post('/signup/create', user, function(XHR) {
            // TODO tratar a resposta
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
                callback(XHR);
            }
        }

        //Send our request
        XHR.open('POST', url);
        //XHR.responseType = 'json';
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData);

    }

})();