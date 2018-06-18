(function () {
    var app = {
        events: {},
        news: {},
        eventTemplate: document.querySelector('.event-template'),
        eventsList: document.querySelector('.events-list'),
        addEventDialog: document.getElementById('addEventDialog')
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
        event.classList.remove('cardTemplate');
        event.removeAttribute('hidden');
        app.eventsList.appendChild(event);
        app.events[app.events.length] = event;
    }

    function getApi(wantedContainer, wantedCategory, wantedPageSize, wantedType = 'top-headlines', wantedCountry = 'br') {
        const ul = document.getElementById(wantedContainer);
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

                let articles = data.articles;

                return articles.map(function (article) {
                    let li = createNode('li'),
                        img = createNode('img'),
                        span = createNode('span');

                    if (article.urlToImage != null) {
                        img.src = article.urlToImage
                        img.width = 300
                        append(li, img);
                    }
                    span.innerHTML = `
            <br><b>Título </b> ${article.title} 
            <br><b> Por: </b> ${article.author} 
            <br> <b>Descrição:</b>${article.description}`;

                    append(li, span);
                    append(ul, li);

                })
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            })
    };

    // Code starts here:
    updateEvents();
})();