"use strict";

function sortEventsByDate(eventItems) {
    return [...eventItems].sort(function(a,b) {
        return a.date.localeCompare(b.date);
    });
}

function renderEvents() {
    eventList.innerHTML = "";
     
    if (events.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No events added yet.";

        eventList.appendChild(emptyMessage);
        return;
    }

    const sortedEvents = sortEventsByDate(events);

    sortedEvents.forEach(event => {
        const card = document.createElement("article");
        card.className = "item-card";

        const title = document.createElement("h3");
        title.textContent = event.title;

        const date = document.createElement("p");
        date.textContent = "Event Date: " + event.date;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            const confirmed = confirm(
                "Are you sure you want to delete this event?"
            );

            if (!confirmed) {
                return;
            }

            events= events.filter(
                item => item.id !== event.id
            );

            saveData();
            renderEvents();
            updateDashboard();

            showMessage("Event deleted successfully.");
        });

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(deleteButton);

        eventList.appendChild(card);
    });

}