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

    document.getElementById('button-confirm-event').addEventListener('click', function() {
        // TODO pegar dados
        var event;
        var title = "Prova de Cálculo 1"
        event = app.eventTemplate.cloneNode(true);
        event.classList.remove('cardTemplate');
        event.querySelector('.title').textContent = title;
        event.removeAttribute('hidden');
        app.eventsList.appendChild(event);
        app.events[1] = event;
        addEventDialog.close();
    })

    document.getElementById('button-add-event').addEventListener('click', function () {
        // Abre uma dialog de criação de eventos.
        // Por enquanto a criação está direta.
        // TODO app.toggleAddDialog(true);
        addEventDialog.showModal();
    });
})();