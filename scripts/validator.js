"use strict";

//Check whether a text field contains a value.
function isNotEmpty(value) {
    return typeof value === "string" && value.trim() !== "";
}
//Check that a tittle has no leading or trailing spaces.
function isValidTitle(value) {
    return typeof value === "string" &&
    /^\S(?:.*\S)?$/.test(value) &&
    !/\s{2,}/.test(value);
}

// Check whether a date has a valid YYYY-MM-DD Format.
function isValidDate(value) {
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

    return year + "-" + month + "-" + day === value;
}

//Check that a duration is a positive whole number.
function isvalidDuration(value) {
    return /^(0|[1-9]\d*)$/.test(String(value)) &&
     Number(value) > 0;
}

//Check that a tag contains letters, spaces, or hyphens.
function isValidTag(value) {
    return typeof value === "string" &&
    /^[A-Za-z] + (?:[ -][A-Za-z]+)*$/.test(value);
}

//Validate task information.
function validateTask(title,date,priority, duration,tag) {
    if (!isNotEmpty(title)) {
        return "please enter a task title.";
    }

    if (!isValidTitle(title)) {
        return "Task title cannot have extra spaces.";
    }

    if (!["low", "medium", "high"].includes(priority)) {
        return "Please select a valid priority";
    }

    if (!isValidDate(date)) {
        return "Please select a valid task date.";
    }
     
    if(!isvalidDuration(duration)) {
        return "Please enter a avalid duration in minutes.";
    }
    if (!isValidTag(tag)) {
        return "Please enter a valid tag using letters, spaces, or hyphens.";
    }
    return "";
}

//Validate event information.
function validateEvent(title, date) {
    if (!isNotEmpty(title)) {
        return "Please enter an event name.";
    }


    if(!isValidDate(date)) {
        return "Please select a valid event date.";
    }

    return "";
}
