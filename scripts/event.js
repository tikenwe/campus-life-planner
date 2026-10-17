"use strict";

function sortEventsByDate(eventItems) {
    return [...evenItems].sort(function(a,b) {
        return a.date.localeCompare(b.date);
    });
}