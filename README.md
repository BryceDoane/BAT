# Behavv
  The new way to monitor.

# Description
 This is a web application designed to assist special education teachers with the monitoring and reporting of their students' behavior in class.

## Front-Facing Usage

Navigate to https://behavior-analysis-tracker.web.app in a web browser, create an account, and begin using. You can browse all account pages, but some may still have limited functionality at this point. 

## Development Environment Setup
(1.) Download these programs

Visual Studio Code: https://code.visualstudio.com/download

Node.js: https://nodejs.org/en/

(Optional) Github Desktop: https://desktop.github.com/

(2.) Fork the project repository at https://github.com/BryceDoane/BAT

(3.) Use the terminal or Github Desktop to download the repo to the local machine

(4.) Open the project in VS Code. Most of the active code can be found in the "public" folder.

## Backend DevOps
When a user commits to the github repo, the changes are run through CircleCI to check for errors before deployment. CircleCI then routes to Firebase for deployment. 

## Contributing and Support
Pull requests are welcome. For major changes, please email bd1275@messiah.edu to discuss the issue being fixed.

Please make sure to test appropriately.

Please email bd1275@messiah.edu for any questions, comments, or concerns.

## Credits and Resources Used

 Thanks to https://github.com/BlackrockDigital/ for the Bootstrap template used in our landing page

 The Firebase Quick-Start Guide: https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html

 Lance from StackOverFlow for the dashboard current date script. https://stackoverflow.com/questions/32540044/html-display-current-date/32540196



# Change Log
## V 1.0
1. Refined homepage design
2. Linked CircleCI to firebase for continuous deployment
3. Created backend database

## V 1.1
1. Added registration and login pages
2. User login information can be sent to and retrieved from the database
3. Login page displays the status of authentication until a user dashboard is developed
4. About us and contact us pages added

## V1.2
1. Added dashboard, user settings, classes, and students pages
2. Additional security added through email account verification and other signup error checking
3. Ability to change password and delete account
4. UUID introduced to better organize and populate database in future versions

## V1.3
1. Added ability to create students, classes, and tasks
2. Improved database and added connections between classes and tasks
3. Displays added information and auto refreshes page upon added data
4. User account information shows on dashboard and settings page
5. Fixed page links and signin bugs

## Future Releases

In Version 1.4, we will focus on efforts on displaying information properly on the dashboard in a user friendly UI.
