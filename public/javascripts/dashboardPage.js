// Comportamento da página de dashboard

(function () {
    console.log('Script carregado.')
    var app = {
        events: {},
        news: {},
        eventTemplate: document.querySelector('.event-template'),
        newsTemplate: document.querySelector('.news-template'),
        eventsList: document.querySelector('.events-list'),
        newsList: document.querySelector('.news-list'),
        addEventDialog: document.getElementById('addEventDialog'),
    };

    document.getElementById('button-cancel-event').addEventListener('click', function () {
        addEventDialog.close();
        // TODO limpar dados
    })

    document.getElementById('button-confirm-event').addEventListener('click', function () {
        // TODO VERIFICAR ENTRADAS, data + tempo já passaram(?)
        var eventName = document.getElementById('newEventName').value;
        var eventDate = document.getElementById('newEventDate').value;
        var eventTime = document.getElementById('newEventTime').value;
        var eventDescription = document.getElementById('newEventDescription').value;
        var eventPlace = document.getElementById('newEventPlace').value;
        var eventCategory = document.getElementById('newEventCategory').value;

        console.log("CRIANDO EVENTO");
        var event = {
            title: document.getElementById('newEventName').value,
            description: document.getElementById('newEventDescription').value,
            place: document.getElementById('newEventPlace').value,
            date: document.getElementById('newEventDate').value,
            time: document.getElementById('newEventTime').value,
            type: document.getElementById('newEventCategory').value
        }

        createEvent(event.title, event.description, event.place, event.date, event.type);

        // post('/new/event', event, 'post');
    })

    document.getElementById('button-add-event').addEventListener('click', function () {
        // Abre uma dialog de criação de eventos.
        // Por enquanto a criação está direta.
        // TODO app.toggleAddDialog(true);
        addEventDialog.showModal();
    });

    var fakeEvents = [
        {
            title: 'Prova de IHC',
            description: 'fdsfasfd',
            place: 'UnB',
            date: '28/03/2014',
            type: 1
        },
        {
            title: 'Apresentação de trabalho',
            description: '',
            place: 'Universidade de Brasília',
            date: '28/03/2014',
            type: 2
        }
    ]

    function updateEvents() {
        // Baixar os eventos do usuário do servidor
        // e atualizar na página.
        // TODO acessar o servidor
        fakeEvents.forEach(element => {
            createEvent(element.title, element.description, element.place, element.date, element.type);
        });
    }

    function createEvent(title, description, place, date, type) {
        var event = app.eventTemplate.cloneNode(true);
        event.querySelector('.title').textContent = title;
        event.querySelector('.description').textContent = description;
        event.querySelector('.place').textContent = place;
        event.querySelector('.date').textContent = date;
        // TODO Change event color
        event.classList.remove('event-template');
        event.removeAttribute('hidden');
        app.eventsList.appendChild(event);
        app.events[app.events.length] = event;
    }

    function updateNews() {
        // TODO pegar pelos interesses do usuário
        getNews('sports', 5);
    }

    function createNews(title, description, imgUrl, url) {
        console.log("Criando Notícia");
        var news = app.newsTemplate.cloneNode(true);
        news.querySelector('.mdl-card__supporting-text').textContent = title;
        news.querySelector('.mdl-card__media').style.backgroundImage = "url('" + imgUrl + "')";
        // TODO Setar o link da notícia
        news.classList.remove('news-template');
        news.removeAttribute('hidden');
        app.newsList.appendChild(news);
        app.news[app.news.length] = news;
        console.log("Notícia criada");
    }

    function getNews(wantedCategory, wantedPageSize, wantedType = 'top-headlines', wantedCountry = 'br') {
        const uri = 'https://newsapi.org/v2/'
        const type = wantedType + '?'
        const country = 'country=' + wantedCountry + '&'
        const category = 'category=' + wantedCategory + '&'
        const pageSize = 'pageSize=' + wantedPageSize + '&'
        const apiKey = 'apiKey=0a1731b051fd452d8b4b8c70b422f295';

        const url = uri + type + country + category + pageSize + apiKey

        fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data.articles);
                articles = data.articles;
                return articles.map(function (article) {
                    if (article.urlToImage != null & article.description != null) {
                        console.log(article);
                        createNews(article.title, article.description, article.urlToImage, article.url);
                    }
                });
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            })
    };

    // Code starts here:
    updateEvents();
    updateNews();
})();