// Comportamento da página de dashboard

(function () {
    console.log('Script carregado.')
    var app = {
        events: [],
        news: [],
        interests: ['sports', 'business'],
        eventTemplate: document.querySelector('.event-template'),
        newsTemplate: document.querySelector('.news-template'),
        eventsList: document.querySelector('.events-list'),
        newsList: document.querySelector('.news-list'),
        addEventDialog: document.getElementById('addEventDialog'),
        editEventDialog: document.getElementById('editEventDialog'),
        interestsDialog: document.getElementById('interestsDialog'),
        editEventID: ''
    };

    var colorEnum = {
        "amarelo": "rgb(251,192,45)",
        "vermelho": "rgb(244,67,54)",
        "azul": "rgb(33,150,243)",
        "verde": "rgb(76,175,80)"
    }

    var fakeEvents = [
        {
            title: 'Prova de IHC',
            description: 'fdsfasfd',
            place: 'UnB',
            date: '2014-03-22',
            time: '12:00',
            color: "vermelho",
            id: generateID()
        },
        {
            title: 'Apresentação de trabalho',
            description: '',
            place: 'Universidade de Brasília',
            date: '2015-03-18',
            time: '12:00',
            color: "verde",
            id: generateID()
        },
        {
            title: 'Prova de IHC',
            description: 'fdsfasfd',
            place: 'UnB',
            date: '2015-03-18',
            time: '12:00',
            color: "azul",
            id: generateID()
        },
        {
            title: 'Apresentação de trabalho',
            description: '',
            place: 'Universidade de Brasília',
            date: '2015-03-18',
            time: '12:00',
            color: "amarelo",
            id: generateID()
        }
    ]

    // Main starts here:
    updateEvents();
    //TODO atualizar interesses
    updateNews();

    // Definição dos listeners
    document.getElementById('button-cancel-event').addEventListener('click', function () {
        addEventDialog.close();
        document.getElementById('newEventName').value = '';
        document.getElementById('newEventDescription').value = '';
        document.getElementById('newEventPlace').value = '';
        document.getElementById('newEventDate').value = '';
        document.getElementById('newEventTime').value = '';
        document.getElementById('newEventColor').value = 'amarelo';
    });

    document.getElementById('button-confirm-event').addEventListener('click', function () {

        console.log("CRIANDO EVENTO");
        console.log(document.getElementById('newEventDate').value);
        var event = {
            title: document.getElementById('newEventName').value,
            description: document.getElementById('newEventDescription').value,
            place: document.getElementById('newEventPlace').value,
            date: document.getElementById('newEventDate').value,
            time: document.getElementById('newEventTime').value,
            color: document.getElementById('newEventColor').value,
            id: generateID()
        }

        app.events[event.id] = event;

        createEventCard(event.title, event.date, event.time, event.color, event.id);

        post('/event/create', event);

        addEventDialog.close();
        document.getElementById('newEventName').value = '';
        document.getElementById('newEventDescription').value = '';
        document.getElementById('newEventPlace').value = '';
        document.getElementById('newEventDate').value = '';
        document.getElementById('newEventTime').value = '';
        document.getElementById('newEventColor').value = 'amarelo';
    });

    document.getElementById('button-add-event').addEventListener('click', function () {
        // Abre uma dialog de criação de eventos.
        addEventDialog.showModal();
    });

    // Listener para editar um evento ao clicar nele
    document.querySelectorAll('.event-card').forEach(element => {
        element.addEventListener('click', function () {
            console.log('Clicou no card ' + element.id);
            app.editEventID = element.id;
            event = app.events[element.id];
            document.getElementById('eventName').parentElement.MaterialTextfield.change(event.title);
            document.getElementById('eventDescription').parentElement.MaterialTextfield.change(event.description);
            document.getElementById('eventPlace').parentElement.MaterialTextfield.change(event.place);
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time;
            document.getElementById('eventColor').parentElement.MaterialTextfield.change(event.color);
            editEventDialog.showModal();
        })
    });

    document.getElementById('button-cancel-editEvent').addEventListener('click', function () {
        editEventDialog.close();
        document.getElementById('eventName').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventPlace').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventColor').value = 'amarelo';
        app.editEventID = '';
    });

    document.getElementById('button-confirm-editEvent').addEventListener('click', function () {

        // TODO Atualizar o evento no servidor
        // id do evento : app.editEventID
        let event = {
            title: document.getElementById('eventName').value,
            description: document.getElementById('eventDescription').value,
            place: document.getElementById('eventPlace').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            color: document.getElementById('eventColor').value,
            id: app.editEventID
        };

        app.events[event.id] = event;

        console.log(app.editEventID);
        editEventCard(event.title,
            event.date,
            event.time,
            event.color,
            event.id
        );

        editEventDialog.close();
        document.getElementById('eventName').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventPlace').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventColor').value = 'amarelo';
        app.editEventID = '';
    });

    document.getElementById('button-interests').addEventListener('click', function () {
        // Abre uma dialog de interesses.
        app.interests.forEach(element => {
            document.getElementById(element + '-checkbox').parentElement.MaterialCheckbox.check();
        });
        interestsDialog.showModal();
    });

    document.getElementById('button-cancel-interests').addEventListener('click', function () {
        interestsDialog.close();
    });

    document.getElementById('button-confirm-interests').addEventListener('click', function () {

        console.log("Salvando interesses");

        app.interests = [];

        if (document.getElementById('business-checkbox').checked)
            app.interests.push('business');
        if (document.getElementById('entertainment-checkbox').checked)
            app.interests.push('entertainment');
        if (document.getElementById('sports-checkbox').checked)
            app.interests.push('sports');
        if (document.getElementById('general-checkbox').checked)
            app.interests.push('general');
        if (document.getElementById('health-checkbox').checked)
            app.interests.push('health');
        if (document.getElementById('science-checkbox').checked)
            app.interests.push('science');
        if (document.getElementById('technology-checkbox').checked)
            app.interests.push('technology');

        interestsDialog.close();

        updateNews();
    });

    // Functions
    function updateEvents() {
        // Baixar os eventos do usuário do servidor
        // e atualizar na página.
        // TODO acessar o servidor e atualizar o vetor local
        app.events = [];
        fakeEvents.forEach(element => {
            createEventCard(element.title, element.date, element.time, element.color, element.id);
            app.events[element.id] = element;
            console.log(element.id);
        });
        //console.log(app.events);
    }

    function createEventCard(title, date, time, color, id) {
        var event = app.eventTemplate.cloneNode(true);
        event.id = id;
        event.querySelector('.title').textContent = title;
        event.querySelector('.date').textContent = date;
        event.querySelector('.time').textContent = time;
        event.style.backgroundColor = colorEnum[color];
        event.classList.remove('event-template');
        event.removeAttribute('hidden');
        app.eventsList.appendChild(event);
    }

    function editEventCard(title, date, time, color, id) {
        console.log(id);
        var event = document.getElementById('' + id);
        event.id = id;
        event.querySelector('.title').textContent = title;
        event.querySelector('.date').textContent = date;
        event.querySelector('.time').textContent = time;
        event.style.backgroundColor = colorEnum[color];
    }

    function updateNews() {

        clearNews();
        app.interests.forEach(element => {
            getNews(wantedCategory = element, wantedPageSize = 3);
            
        });
    }

    function getNews(wantedCategory, wantedPageSize, wantedType = 'top-headlines', wantedCountry = 'br') {
        const uri = 'https://newsapi.org/v2/'
        const type = wantedType + '?'
        const country = 'country=' + wantedCountry + '&'
        const category = 'category=' + wantedCategory + '&'
        const pageSize = 'pageSize=' + wantedPageSize + '&'
        const apiKey = 'apiKey=0a1731b051fd452d8b4b8c70b422f295';

        const url = uri + type + country + category + pageSize + apiKey

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {
                //console.log(data.articles);
                articles = data.articles;
                return articles.map(function (article) {
                    if (article.urlToImage != null) {
                        //console.log(article);
                        createNews(article.title, article.urlToImage, article.url);
                    }
                });
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            })
    };

    function generateID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function createNews(title, imgUrl, url) {
        var news = app.newsTemplate.cloneNode(true);
        news.querySelector('.mdl-card__supporting-text').textContent = title;
        news.querySelector('.mdl-card__media').style.backgroundImage = "url('" + imgUrl + "')";
        // O listener deve ser definido aqui no momento de criar a notícia,
        // pois a resposta da api demora a chegar e a notícia só é criada por último.
        news.addEventListener('click', function () {
            //console.log('Clicou na fakeNews');
            window.open(url);
        })
        news.classList.remove('news-template');
        news.removeAttribute('hidden');
        app.newsList.appendChild(news);
        app.news[app.news.length] = news;
        //console.log('Notícia criada.');
    }

    function clearNews() {
        while(app.newsList.firstChild) {
            app.newsList.removeChild(app.newsList.firstChild);
        }
    }

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

        XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
              callback(XHR.response);
            }
          }

        //Send our request
        XHR.open('POST', url);
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData);

    }
})();