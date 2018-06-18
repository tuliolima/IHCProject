// Comportamento da página de signup

(function () {
    console.log('Script carregado.')

    document.getElementById('button-finish-signup').addEventListener('click', function () {
        
        // TODO VERIFICAR ENTRADAS
        var pass = document.getElementById('password').textContent;
        var rePass = document.getElementById('re-password').textContent;

        if (pass != rePass) {
            console.log("SENHAS ERRADAS");
        } else {
            console.log("CRIANDO USUARIO");
            var user = {
                name: document.getElementById('name').textContent,
                username: document.getElementById('user').textContent,
                password: pass,
                email: document.getElementById('email').textContent
            }
            post('/signup/create', user, 'post');
        }

        // TODO limpar dados
    })

    function post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form); // Isso é necessário?
        form.submit();
    }
})();