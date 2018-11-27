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
  <li><code>$ bundle install<code></li>
  <li><code>$ yarn install</code></li>
</ul>

4. Create and prepare the database.
<ul>
  <li><code>$ bundle exec rake:db create</code></li>
  <li><code>$ bundle exec rake:db migrate</code></li>
</ul>
5. Start the rails server by running the following. Then visit localhost:3000 in your browser of choice.
<ul>
  <li><code>$ rails s</code></li>
  <h5>6. In another terminal window in the same directory run the following</h5> 
  <li><code>$ yarn start</code></li>
</ul>

<hr />

<h3>Frameworks</h3>

<p>-Devise gem - User authentication.</p>
<p>-Material-ui - Google's ReactJs style library</p>
<p>-ReactJs</p>

*APIs*
<p>Google Maps</p>
<p>Google Places</p>

<strong>Features I'm Currently Working on</strong>
  <p>Employees - employees can sign in to a seperate account to view their lawn list.</p>
  <p>Dark Sky API - so the user is prepared for inclimate weather.</p>
  <p>Done button - when an employee finishes a lawn it outputs in a list of "finsihed lawns".</p>
