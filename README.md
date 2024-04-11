# fit-journey

![landing-page](https://github.com/JohnGalinato808/fitjourney/raw/main/doc/fitjourney_landingpage.png)
[![fit-journey](https://github.com/JohnGalinato808/fitjourney/actions/workflows/ci.yml/badge.svg)](https://github.com/JohnGalinato808/fitjourney/actions/workflows/ci.yml)


========= 4/10/24 Updates ==========

--- **Completions in this update** ---
- Conducted Fuzz testing.
- Code cleanup to reduce possible attack surfaces.

--- **Progress** ---


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
- For Application
  - Need to fix the implementation of text filtering via API Keys.

--- **Roles and responsibilities** ---
- John Galinato
  - Current: Complete cleanup of all unused files within the application. Updated IDs file to contain only used IDs post cleanup.
  - Next: API Secret Keys implementation requires modification to allow chat filtering.
      - This issue is also known to corrupt the ability to create new user accounts as the new user account would be flagged as inappropriate content.
      - May need to work with and update cloudinary.config to fix this issue.
- Loelle Lam
  - Current: 
  - Next: 
- Mai Abe
  - Current: 
  - Next: 
- Tiffany Ngo
  - Current: 
  - Next: 


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
  - Current: Created a way to input how much time was spent on each activity whenever making a post, made it so that posts are sorted by the newest posts first by default, and fixed minor errors.
  - Next: Create a circle or bar graph that is unique to each account, that will show how much time you've spent doing various activities and will thus allow the user to track their fitness levels better.

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
    - Completed: Fixed errors relating to the "Delete log" button not redirecting back to the Workout Log page, but instead to a blank page. Fixed issue when adding a new log, where an error would be thrown saying to "Input a valid number for hours and minutes" even with a valid input. Fixed error with Edit button, where it would again throw an error saying to "Input a valid number for hours and minutes" even with a valid input. 
    - Next: Create a circle graph for each account, that will show how much time that you've spent doing various activities and will thus allow the user to track their fitness levels better. Add an option to select type of fitness activity when creating logs to make this work.
