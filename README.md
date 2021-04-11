# Behavv - The New Way to Monitor

 This is a web application designed to assist special education teachers with the monitoring and reporting of their students' behavior in class.

## Front-Facing Usage

Navigate to https://behavv.com in a web browser, create an account, and begin using. You can browse all account pages, but some may still have limited functionality at this point. 

## Development Environment Setup
(1.) Download these programs

Visual Studio Code: https://code.visualstudio.com/download

Git: https://git-scm.com/downloads 

Node.js: https://nodejs.org/en/

(Optional) Github Desktop: https://desktop.github.com/

(2.) Fork the project repository at https://github.com/BryceDoane/BAT

(3.) Use the terminal or Github Desktop to download the repo to the local machine. For development purposes, use the dev branch until code is further tested.

(4.) Open the project in VS Code. Most of the active code can be found in the "public" folder.

## Backend DevOps
When a user commits to the github repo, the changes are run through CircleCI to check for errors before deployment. CircleCI then routes to Firebase, which we are using for hosting. The backend Firebase is then connected to our domain for deployment. 

## Contributing and Support
Pull requests are welcome. For major changes, please email bd1275@messiah.edu to discuss the issue being fixed.

Please make sure to test appropriately.

Please email bd1275@messiah.edu for any questions, comments, or concerns.

## Credits and Resources Used

 Thanks to https://github.com/BlackrockDigital/ for the Bootstrap template used in our landing page

 The Firebase Quick-Start Guide: https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html

 Lance from StackOverFlow for the dashboard current date script. https://stackoverflow.com/questions/32540044/html-display-current-date/32540196

 subtlepatterns.com for the background designs



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

## V1.4
1. Official domain (behavv.com) replaces old temporary domain
2. Added ability to delete class, student, and task objects
3. Complete database overhaul on the backend
4. Dashboard UI redesign on the frontend
5. User dashboard pages now show information on a per-user basis

## V1.5
1. Dashboard now has functionality to save user input data
2. Classes redesigned to utilize cards to display class information
3. Register and Login UI redesign
4. Reports page creation on the front end

## V1.6
1. Redesigned dashboard to better display overview of information using graphs and charts
2. Cards on classes page now show detailed class information when clicked
3. Other minor visual improvements
4. Confirmation before deleting account or changing password

## V1.7 - Beta Begins
1. Restyle some elements for a better user experience
2. Graphs shown on dashboard and in report now pull information from database
3. Tables on reports page now allow user to enter information and ratings
4. Fixed countless functionality bugs

This version is our minimum viable product, or the version that we believe fulfills our vision for this project, and could be used on a day-to-day basis. There may still be some bugs present, but all intended functionality is now in place.

## V1.8
1. Fixed multiple page refresh and redirect errors
2. Reports table now shows real data and is color coded
3. Data entry validation now present in many area of the site, including reports data input
4. Users can now generate and download reports as PDF files
5. Many other small bug fixes

## V1.9
1. Error checking on reports and data entry fields has been implemented
2. Improved alert messages are more descriptive for clarity
3. Major UI overhaul of dashboard and related pages
4. Downloadable reports are now cleaner and include additional information
5. Multiple small bug fixes with redirects, input boxes, and

## Future Releases

This next version will be our final demo ready release. In Version 2.0, we will focus our efforts on finding and fixing the last few bugs and taking into account feedback from our beta testing team. (thank you to the Hit Pause team). Outside of development, we will also work on creating a finalized script and preparing a professional looking and edited video for our presentation.
