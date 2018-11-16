*Lawn-List*
---
A productivity app for the landscaping industry!


*Getting Started*

assuming you have both rails and yarn installed on your machine

1. Clone the repository to your computer.
2. In command line open the directory of where you cloned the project to.
3. Run the following to install the necessary dependencies.
---
`$ bundle install`
`$ yarn install`

4. Create and prepare the database.
`$ bundle exec rake:db create`
`$ bundle exec rake:db migrate`

5. Start the rails server by running the following. Then visit localhost:3000 in your browser of choice.
`$ rails s`
6. In another terminal window in the same directory run the following 




*Frameworks*

-Devise gem - User authentications.
-Material-ui - Google's ReactJs style library
-ReactJs

*APIs*
Google Maps

*Features I'm Currently Working on*

-Employees - employees can sign in to a seperate account to view their lawn list.
-Dark Sky API - so the user is prepared for inclimate weather.
