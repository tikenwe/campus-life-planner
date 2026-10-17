"use strict";

function sortEventsByDate(eventItems) {
    return [...eventItems].sort(function(a,b) {
        return a.date.localeCompare(b.date);
    });
}