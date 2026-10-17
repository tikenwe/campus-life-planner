"use strict";

//Check whether a text field contains a value.
function isNotEmpty(value) {
    return typeof value === "string" && value.trim() !== "";
}

// Check whether a date has a valid YYYY-MM-DD Format.
function isValiDate(value) {
    if (typeof value !== "string") {
        return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const date = new Date(value + "T00:00:00");

    if(Number.isNaN(date.getTime())) {
        return false;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");

    return year + "-" + day === value;
}

//Validate task information.
function validateTask(title,date,priority) {
    if (!isNotEmpty(title)) {
        return "please enter a task title.";
    }

    if (!isValidDate(date)) {
        return "please select a valid task due date";
    }

    if (!isValidDate(date)) {
        return "Please select a valid priority.";
    }
    return "";
}

//Validate event information.
function validEvent(title, date) {
    if (!isNotEmpty(title)) {
        return "Please enter an event name.";
    }


    if(!isValidDate(date)) {
        return "Please select a valid event date.";
    }

    return "";
}
