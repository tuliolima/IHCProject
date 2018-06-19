// Comportamento da página de dashboard

(function () {
    console.log('Script carregado.')
    var app = {
        events: {},
        news: {},
        eventTemplate: document.querySelector('.event-template'),
        newsTemplate: document.querySelector('.news-template'),
        eventsList: document.querySelector('.events-list'),
        newsList: document.querySelector('news-list'),
        addEventDialog: document.getElementById('addEventDialog'),
        articles: []
    };

    document.getElementById('button-cancel-event').addEventListener('click', function () {
        addEventDialog.close();
        // TODO limpar dados
    })

    document.getElementById('button-confirm-event').addEventListener('click', function () {
        // TODO pegar dados
        var title = "Prova de Cálculo 1"
        createEvent(title, '', '', '', 1);
        addEventDialog.close();
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

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    function getNews(wantedCategory, wantedPageSize, wantedType = 'top-headlines', wantedCountry = 'br') {
        const uri = 'https://newsapi.org/v2/'
        const type = wantedType + '?'
        const country = 'country=' + wantedCountry + '&'
        const category = 'category=' + wantedCategory + '&'
        const pageSize = 'pageSize=' + wantedPageSize + '&'
        const apiKey = 'apiKey=0a1731b051fd452d8b4b8c70b422f295';

        const url = uri + type + country + category + pageSize + apiKey
        const ul = document.getElementById('noticias');
        //var req = new Request(url);

        fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {

                articles = data.articles;

                return articles.map(function(article) {
                    let div = createNode('div');
                    if(article.urlToImage != null & article.description != null){
                    div.innerHTML = 
                        `<a target="_blank" href="${article.url}" style="text-decoration: none;">
                        <div class="mdl-card news-template news-card mdl-cell mdl-cell--12-col" style="height:400px;">
                            <div class="mdl-card__media mdl-color-text--grey-50" style="background-image: url('${article.urlToImage}'); width=500px;">
                            </div>
                            <br>
                            <b style="text-align:center; text-transform: uppercase;">${article.title}</b>
                            <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                                ${article.description}
                            </div>
                        </div></a>`
                    }
                    append(ul, div);
                })

            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            })
    };

    // Code starts here:
    updateEvents();
    updateNews();
})();

