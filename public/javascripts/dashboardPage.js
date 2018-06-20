// Comportamento da página de dashboard

(function () {
    console.log('Script carregado.')
    var app = {
        events: [],
        news: [],
        eventTemplate: document.querySelector('.event-template'),
        newsTemplate: document.querySelector('.news-template'),
        eventsList: document.querySelector('.events-list'),
        newsList: document.querySelector('.news-list'),
        addEventDialog: document.getElementById('addEventDialog'),
    };

    var colorEnum = {
        "amarelo" : "rgb(251,192,45)",
        "vermelho" : "rgb(244,67,54)",
        "azul" : "rgb(33,150,243)",
        "verde" : "rgb(76,175,80)" 
    }

    document.getElementById('button-cancel-event').addEventListener('click', function () {
        addEventDialog.close();
        document.getElementById('newEventName').value = '';
        document.getElementById('newEventDescription').value = '';
        document.getElementById('newEventPlace').value = '';
        document.getElementById('newEventDate').value = '';
        document.getElementById('newEventTime').value = '';
        document.getElementById('newEventColor').value = 'amarelo';
    })

    document.getElementById('button-confirm-event').addEventListener('click', function () {
        // TODO VERIFICAR ENTRADAS, data + tempo já passaram(?)

        console.log("CRIANDO EVENTO");
        var event = {
            title: document.getElementById('newEventName').value,
            description: document.getElementById('newEventDescription').value,
            place: document.getElementById('newEventPlace').value,
            date: document.getElementById('newEventDate').value,
            time: document.getElementById('newEventTime').value,
            color: document.getElementById('newEventColor').value
        }

        createEventCard(event.title, event.date, event.time, event.color);

        // post('/new/event', event, 'post');
        addEventDialog.close();
        document.getElementById('newEventName').value = '';
        document.getElementById('newEventDescription').value = '';
        document.getElementById('newEventPlace').value = '';
        document.getElementById('newEventDate').value = '';
        document.getElementById('newEventTime').value = '';
        document.getElementById('newEventColor').value = 'amarelo';
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
            time: '12:00',
            color: "vermelho"
        },
        {
            title: 'Apresentação de trabalho',
            description: '',
            place: 'Universidade de Brasília',
            date: '28/03/2014',
            time: '12:00',
            color: "verde"
        },
        {
            title: 'Prova de IHC',
            description: 'fdsfasfd',
            place: 'UnB',
            date: '28/03/2014',
            time: '12:00',
            color: "azul"
        },
        {
            title: 'Apresentação de trabalho',
            description: '',
            place: 'Universidade de Brasília',
            date: '28/03/2014',
            time: '12:00',
            color: "amarelo"
        }
    ]

    function updateEvents() {
        // Baixar os eventos do usuário do servidor
        // e atualizar na página.
        // TODO acessar o servidor
        app.events = [];
        fakeEvents.forEach(element => {
            createEventCard(element.title, element.date, element.time, element.color);
            app.events.push(element);
        });
        console.log(app.events);
    }

    function createEventCard(title, date, time, color) {
        var event = app.eventTemplate.cloneNode(true);
        event.querySelector('.title').textContent = title;
        event.querySelector('.date').textContent = date;
        event.querySelector('.time').textContent = time;
        event.style.backgroundColor = colorEnum[color];
        // TODO Change event color
        event.classList.remove('event-template');
        event.removeAttribute('hidden');
        app.eventsList.appendChild(event);
    }

    function updateNews() {
        // TODO pegar pelos interesses do usuário
        getNews('sports', 5);
    }

    function createNews(title, description, imgUrl, url) {
        //console.log("Criando Notícia");
        var news = app.newsTemplate.cloneNode(true);
        news.querySelector('.mdl-card__supporting-text').textContent = title;
        news.querySelector('.mdl-card__media').style.backgroundImage = "url('" + imgUrl + "')";
        // TODO Setar o link da notícia
        news.classList.remove('news-template');
        news.removeAttribute('hidden');
        app.newsList.appendChild(news);
        app.news[app.news.length] = news;
        //console.log("Notícia criada");
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
                //console.log(data.articles);
                articles = data.articles;
                return articles.map(function (article) {
                    if (article.urlToImage != null & article.description != null) {
                        //console.log(article);
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