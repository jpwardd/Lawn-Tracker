<h2><strong>Lawn-List</strong></h2>
---
A productivity app for the landscaping industry!

<h4>Getting Started</h4>

<strong>assuming you have both rails and yarn installed on your machine</strong>

1. Clone the repository to your computer.
2. In command line open the directory of where you cloned the project to.
3. Run the following to install the necessary dependencies.
---
<ul>
  <li>`$ bundle install`</li>
  <li>`$ yarn install`</li>
</ul>

4. Create and prepare the database.
<ul>
<li>`$ bundle exec rake:db create`</li>
<li>`$ bundle exec rake:db migrate`</li>
</ul>
5. Start the rails server by running the following. Then visit localhost:3000 in your browser of choice.
<ul>
  <li>`$ rails s`</li>
  <h5>6. In another terminal window in the same directory run the following</h5> 
  <li>`$ yarn start`</li>
</ul>

<hr />

<h3>Frameworks</h3>

-Devise gem - User authentication.
-Material-ui - Google's ReactJs style library
-ReactJs

*APIs*
Google Maps
Google Places

<strong>Features I'm Currently Working on</strong>
<ul>
  <li>Employees - employees can sign in to a seperate account to view their lawn list.</li>
  <li>Dark Sky API - so the user is prepared for inclimate weather.</li>
  <li>Done button - when an employee finishes a lawn it outputs in a list of "finsihed lawns".</li>
</ul>
