# search-app

Key Points

* User table or collection should consist of the
  following fields.
  i. First Name
  ii. Last Name
  iii.Gender
  iv.Email ID (Primary Key)
  v. Phone Number
* There is no “password” field. The password to login will be an OTP either sent to their
  mail or Phone Number
* Created Rest APIs for Signup, Login, Logout. Create HTML pages for the same. Every
  time a user tries to Login, OTP is sent and he has to use that OTP to login.
* Used the sql dump (world.sql) to create the other models and to populate the
  data. This will give you the data to display once the user logs in.
* On login, the dashboard with just one search bar and search button should be
  displayed. (refer google home page)
* As user starts typing in the search bar, the system should autosuggest options
  available in the system. The user will search by city or country or language.
* Once search button is pressed, list of relevant information should be displayed in the
  next screen.
* Where ever the name of a country appears, it must be clickable and should redirect to
  a “Country details” page
* Logout redirects to login page


Instruction for run the code :-

- clone the code
- Go to search-app -> backend
- npm install to install packages.
- write command npm start for "run the code".
- Go to search-app -> frontend -> signup.html
- click Go live on VScode in signup.html page.

