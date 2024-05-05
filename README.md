# FitJourney
Fit Journey is a web application developed for ICS 427 Software Quality Assurance course at University of Hawaii at Manoa. Our app aims to help users keep or enhance their fitness levels through managing any workout logs. Users are able to create, edit or delete workout logs, and to visualize their workout activities over time. This application was developed utilizing secure coding practices and aims to provide protected environment for our users. For a detailed explanation for our application features, please visit our [wiki page](https://github.com/JohnGalinato808/fitjourney/wiki).


![landing-page](https://github.com/JohnGalinato808/fitjourney/raw/main/doc/fitjourney_landingpage.png)
[![fit-journey](https://github.com/JohnGalinato808/fitjourney/actions/workflows/ci.yml/badge.svg)](https://github.com/JohnGalinato808/fitjourney/actions/workflows/ci.yml)

## Prerequisites
Before you begin, please ensure you have met the following requirements.
- Node.js: v14.21.3 or later
- Meteor: v2.15 or later

## Installation
1. Clone the Repository
   ```bash
   # Clone the repository
   git clone https://github.com/JohnGalinato808/fitjourney.git
   
   # Navigate to your repository
   cd repository

   # Navigate to app directory
   cd app
   
2. Install dependencies
   ```bash
   # Install dependencies
   meteor npm install

3. Run the application
   ```bash
   # Run application
   meteor npm run start

## Developer Notes

### Challenges and surprises

Some challenges that were involved in the creation of this website included that for some of us, the previous ICS classes were our only real experience in creating websites, meaning that at the time, security wasn't quite our priority more so than it was just getting the functionality of the site to start working. This means that when it came to focusing on security measures, it was a completely new field to start learning about, and it was a challenge trying to locate flaws in the functions of the site we created when we were used to not worrying about it. Some other difficulties included the huge range of possible security vulnerabilities that were present when it came to user input in the website. With so many possible security exploits that were present, trying to anticipate and patch these possible issues served as a very tedious and time-consuming challenge. Nevertheless, it was an issue that we approached and handled to the best of our ability.

Surprises mostly included looking at how the websites we've been working on are made in context of quality assurance and security, and then realizing just how many security exploits existed in features of the website we didn't even think twice about before. User sessions, user inputs, image submissions, web urls, user logins, and even the ability to simply view posts made by other users all contained security vulnerabilities that could be exploited by malicious actors, and thus trying to anticipate every single one was nearly impossible.

### Achievements

Achievements included getting the website's functionality working in a way that patched some of the most obvious, glaring security issues in the website. Although it is absolutely certain that we've missed some, and that some of them may be quite obvious to more skilled software developers, to us, who are still learning our way around the skill of developing web software and other applications, this is an achievement in of itself to begin recognizing and addressing possible security issues that may crop up in our software. This is only the beginning of our potential growth in our field, and this should be recognized and acknowledged. 

### Disappointments

Some disappointments include that the original idea of the website was meant to be a sort of social app that users could add each other on and where they could view each other's profiles so that they could follow each other on their fitness journeys. They could leave comments on each other's fitness posts and it'd serve as a way for each other to get motivation from one another. However, this original plan never panned out, and thus the app became more of a personal app that you could use on your own to track your own fitness goals and see how much you achieved over a period of time. 

It's a disappointment that the app never reached its full potential, but I suppose that sacrifices must be made in order to meet time constraints. Besides, if one had the time, resources, and motivation, the app could definitely reach its potential if one chose to work on it.

### Disclaimers/Caveats

Due to the time constraints the software development team had and the limited skill of the team working on it, not all futures could be implemented properly, and there exists many possible security exploits that could be used against users who are using the software. Ongoing maintenance, patches, and updates are not possible, and it is up to the discretion of the user to practice best security measures to protect their information and security, such as using up-to-date and secure passwords and being mindful of where they share personal information. Users should be reminded to use their best security practices. 

## Links

FitJourney Repository (https://github.com/JohnGalinato808/fitjourney)

Final Project Documentation (https://github.com/JohnGalinato808/fitjourney/blob/main/README.md)

Release Version 

Wiki Page (https://github.com/JohnGalinato808/fitjourney/wiki)


========= 5/04/24 Updates ==========

--- **Completions in this update** ---
- Added yearly fitness circle graph
- Admin Panel page to control accessibility of users

--- **Link** ---
- Link of continuing work (https://github.com/JohnGalinato808/fitjourney/actions)

--- **Roles and responsibilities** ---
- John Galinato
    - Completed: - Assisted with the completion of the Dashboard page. Created EditGoal function for user to edit their self-made goal as well as their goal deadline. In addition, I have created the CreateGoal function which allows users to create new goals that is then added to the database. This function will bring user to a new page where they must input an initial goal completion date with time of day, as well as a description of their goal. Finally, assisted with debugging the Dashboard page in attempt to have the page pull data from the database to be displayed onto the page.
- Loelle Lam
    - Completed: The goals feature is now fully operational, allowing users to set and track their goals. Users can see goals they created, each goal’s deadline, and mark the goals as completed. I resolved the issue in the goal component that caused the goals page to crash. Users can now edit and delete their goals from within the goals page as well.
- Mai Abe
    - Completed: - Completed Admin Panel page. The page retrieves and displays corresponding roles and ability to toggle the accessibility for each user. Made the Admin Panel page accessible only to admin users. Created toggle button to control accessibility, where it would alert the admin user each time the active/inactive status of a user was changed. The active/inactive status of a user (accessibility) is only modifiable for users with 'user' role. Users with 'admin' role are always active. Once a user was limited accessibility, an error message, 'Your account has been disabled', will be displayed on an attempt to login. 
- Tiffany Ngo
    - Completed: Implemented circle graph that shows how much fitness was done each month in a specified year, with the ability to go back to previous years. It shows only the months that have fitness entries in it, with a legend attached to the pie chart that shows how much time was spent each month exercising both in total time spent and percentage-wise.


========= 4/10/24 Updates ==========

--- **Completions in this update** ---
- Conducted Fuzz testing
- Code cleanup to reduce possible attack surfaces
- Added graph to show overall fitness levels of the user on a weekly basis for a user dashboard
- In progress partially completed features include
  - User access control management for Admins
  - Goal tracking capabilities in the dashboard for Users

--- **Link** ---
- Link of continuing work (https://github.com/JohnGalinato808/fitjourney/actions)

--- **Pending** ---
- For the user:
  - Dashboard
    - Fitness goal setting and goal tracking capabilities (in progress)
- For the admin:
  - User access control management (in progress)
  - Informational content management
- For Application
  - Continue monitering and analysing code for any issues regarding codestyle and/or injection and security penetration.

--- **Roles and responsibilities** ---
- John Galinato
  - Completed: Complete cleanup of all unused files within the application. Updated IDs file to contain only used IDs post cleanup.
  - Next: Focus on assistance with implementation of inserting a 'goal' feature.
      - Code review of 'goal' implementation to include:
          - Analysis of probable attack surfaces
          - Vulnerabilities as a result of fuzz testing.
          - Prevention of security penetrations.
- Loelle Lam
  - Completed: Created the goal collection, goal component, and goal page. Updated the navbar to include the dashboard.
  - Next: The goal feature is to be further developed, allowing users to edit their goals. Any edits should be saved and reflected in the database. Users should also be able to remove goals.
- Mai Abe
  - Completed: Fixed the user insertion function issues on a user SignUp. Removed the textCheck function as it is not relevant for our purpose to create and store user account information. On signup, all users are assigned the 'user' role. Created a User role in addition to the Admin role. Created an Admin Panel page for listing all users in the db. (in progress) 
  - Next: Create activation/deactivation functionality for users for access controlling. 
- Tiffany Ngo
  - Completed: Performed fuzz testing on the website to test for vulnerabilities and security issues, and added validation checks on the input fields for the description, title, and image upload for the fitness logs to prevent possible issues. Added graph to show overall fitness levels of the user on a weekly basis.
  - Next: Add more features for the graph, like sorting based on activity type, or maybe changing it to a bar graph that shows every activity type you did that day and for how long.


========= 3/28/24 Updates ==========

--- **Completions in the last update** ---
- Landing page that gives a brief overview of the purpose of the site and how to use it.
- Ability to log in and register a new account
- Profile management
- A way to make new posts about fitness-related activities that you've done in your day, with input fields for the title of the post, an image, a description of the activity, and how much time was spent doing it
- Ability to edit and delete posts
- Capability to search through posts to find a specific one
- Posts sorted by the newest ones

--- **Progress** ---
- Workout Log page to allow users to enter an activity log with the date, title, description, image, createdAt, owner, activityDurationHours, and activityDurationMinutes information.
  - This is an update from the journal post (Forum) page we previously had. With the update, it reflects the actual workout activity log more instead of calling it a Forum page.
  - Ability to delete posts
  - Comment feature is removed since it is irrelevant to the workout log page
  - Retrieval of Workout log sorted in order of date created
- Basic dashboard page 

--- **Link** ---
- Link of continuing work (https://github.com/JohnGalinato808/fitjourney/actions)

--- **Pending** ---
- For the user:
  - Dashboard
    - A graph that takes into account the amount of time spent exercising, and shows it to you to allow you to better monitor your fitness levels
    - Fitness goal setting and goal tracking capabilities
- For the admin:
  - User account management
  - User access control management
  - Informational content management

--- **Roles and responsibilities** ---
- John Galinato
  - Current: Removal of some identified unnecessary lines of code to reduce the amount of attackable surfaces. Began mapping component IDs to the 'Utilities/ids' directory to be used for testing. Started on Test code.
  - Next: Implementation of test code and verifying via testcafe.
- Loelle Lam
  - New Completions: Removed some unused data/components and updated miscellaneous incorrect values. Added basic user dashboard page.
  - Current: Implement fitness goal setting.
  - Next: Improve upon goal setting and tracking capabilities.
- Mai Abe
  - New Completions:
      - Create a workout log page (updated the journal post page)
      - Create a WorkoutLogCollection with the following fields to reflect the basic workout information - date, title, description, image, createdAt, owner, activityDurationHours, activityDurationMinutes
      - Create 'Edit' modals to edit a workout log for each row
      - Create 'Delete' modals to delete a workout log for each row
      - Create 'Create log' button to point to creating a workout log
  - Current: debugging Edit page to maintain the current values for each field and properly update the record
  - Next: Create an admin role and access control management UI
- Tiffany Ngo
    - Completed: Fixed errors relating to the "Delete log" button not redirecting back to the Workout Log page, but instead to a blank page. Fixed issue when adding a new log, where an error would be thrown saying to "Input a valid number for hours and minutes" even with a valid input. Fixed error with Edit button, where it would again throw an error saying to "Input a valid number for hours and minutes" even with a valid input.
    - Next: Create a circle graph for each account, that will show how much time that you've spent doing various activities and will thus allow the user to track their fitness levels better. Add an option to select type of fitness activity when creating logs to make this work.

===== 2/21/24 Updates =====

--- **What is complete so far?** ---
- Landing page that gives a brief overview of the purpose of the site and how to use it.
- Ability to log in and register a new account, as well as modify the profile of the account
- A way to make new posts about fitness-related activities that you've done in your day, with input fields for the title of the post, an image, a description of the activity, and how much time was spent doing it
- Ability to edit and delete posts
- A way to comment on posts
- Ability to delete comments
- Capability to search through posts to find a specific one
- Posts sorted by the newest ones

--- **Pending** ---

**For the user**:
- Data entry and editing for workouts
- Dashboard
- A graph that takes into account the amount of time spent exercising, and shows it to you to allow you to better monitor your fitness levels
- Profile management

**For the admin**:
- User account management
- User access control management
- Informational content management


--- **Contributions** ---
- John Galinato
    - Completed: Created Fit Journey sign-in, sign-up, landing page, home page, journal page, creating journal post, adding/deleting comments to a post, and chat moderation via AI. On Github, added test status badge.
    - Next: UI improvements and test code.
- Loelle Lam
    - Completed: Implemented editing for user-created posts.
    - Next: Improve usability of the editing function and add editing to other features
- Mai Abe
    - Completed: Created a logo, updated navbar, footer, and landing page. Updated some styling for the landing page.
    - Next: Update a journal post page to reflect a workout entry log of a user.
- Tiffany Ngo
    - Current: Created a way to input how much time was spent on each activity whenever making a post, made it so that posts are sorted by the newest posts first by default, and fixed minor errors.
    - Next: Create a circle or bar graph that is unique to each account, that will show how much time you've spent doing various activities and will thus allow the user to track their fitness levels better.
