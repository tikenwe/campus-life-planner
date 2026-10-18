CampusMate- Your Student Life Organizer
About the Project
CampusMate is a student life planner website that that help students manage their academic task and events. I built it using HTML, CSS, and JavaScript to make organising school activities easier.
The website allows users to manage tasks, truck progress and save your information in the browser

Live Website
https://tikenwe.github.io/campus-life-planner/


Features
. Add, edit, complete, and delete tasks.
. Set task priorities, due dates, durations, and tags.
. Search and filter tasks.
.Add and delete events.
. View total, completed, and pending tasks.
.Save data using local storage.
. Exports and import data using JSON files.
Validate form inputs.
.Switch between light and dark modes.

Technologies Used

. HTML5
. CSS3
. JavaScript
. Browser localstorage
. Git and GitHub
.Github Pages

How to Run
1. Download or clone the repository.
2. Open the project folder Vs Code.
3. Open index.HTML using live server
4. Navigate between dashboard tasks events and settings.

The project can also be acccessed through the live website link above.

Project files 
. Index HTML – website structure.
. Styles/style CSS – website styling.
. Scripts/main.Js– main application logic.
. Scripts/validator.js– input validation.
Scripts/events.js– event functionality.
. Data/seed.Json– sample planner data
. README.md– project documentation.

Form validation and search

I used JavaScript validation to check user input before saving tasks and events.
The task form checks field such as the title,duration,and tag.For example, tag containing unsupported characters should display a validation message.
The search feature allows users to find tasks, while the filter helps separate pending and completed tasks.
Regex catalogue: The exact regular expressions, the purpose, and any advanced validation rules should be documented after reviewing scripts/validator.js.

Keyboard Navigation
Campusmate supports standard keyboard navigation
. Tab-move to the next interactive element.
. Shift + Tab- move to the previous interactive element.
.Enter- Activate a focus link or button.
. Space-activate a focus button.
. Skip to main content-jump past the navigation to the dashboard.

Accessibility
I used semantic HTML element such as Header, nav, main, section, and footer organise the website.

For inputs have labels, and the task form includes a status message with an ARIA live region.
I also added a skip navigation link for keyboard users and a reduced-motion CSS rule.

Testing

The following checks can be used to test CampusMate:
1. Add the task and confirm it appears in the task list.
2. Edit, complete, and delete a task.
3. Search for a task and test the pending/completed filters.
4. Add and delete event.
5. Refresh the page and check whether saved information remains.
6. Export the planner data JSON.
7. Import valid JSON backup and confirm the data Is restored.
8. Try invalid form impute and check the validation messages.
9. Switch to Dark Mode and refresh the page.
10. The layout on mobile, tablet and desktop screen sizes.
11. Use the tab key to navigate through the page.
12 use the deployed website and check the main futures work.

What I learned

While building CampusMate, I practised DOM manipulation, JavaScript event, form validation, local storage and using GIT to track changes to my project.
I also learned how to deploy a website using GitHub Pages.
