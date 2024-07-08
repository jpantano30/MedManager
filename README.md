<!-- markdownlint-disable -->
# MedManager

[![Home Page](./public/images/homepage_img.png)](https://medmanager.netlify.app/login)


#

# Deployment Link
<a href="https://medmanager.netlify.app/login"> MedMangager</a>

Heroku URl:
<a href="https://medmanager-b797ac84ca9c.herokuapp.com">Backend URL</a>

Backend Repository:
<a href="https://github.com/jpantano30/MedManager-Backend">Backend Repository</a>

#

## Description:

**MedManager** is an application designed to help users effectively manage their medication schedules. It provides functionalities such as tracking daily medication intake, setting reminders for medication refills, and accessing information on medication interactions via the FDA API. The main goal of MedManager is to improve adherence to medication regimens, enhance patient safety, and reduce missed doses.

#


#### Technologies used:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)
![.ENV Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![macOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)
<!-- ![Adobe Fonts](https://img.shields.io/badge/Adobe%20Fonts-000B1D.svg?style=for-the-badge&logo=Adobe%20Fonts&logoColor=white) -->
<!-- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) -->

#

#### Installation Steps:

1. **Fork & Clone the repository:**
  - In GitHub, navigate to the main page of the repository.
  - In the top-right corner of the page, click Fork.
  - Click the green "Code" button and copy the link.
  - Open the terminal on your computer and navigate to the directory where you would like to clone the repository. 
  - Use the following command in your termial to clone the repository from Github.
  - git clone [YOUR_REPOSITORY_URL_HERE]
    - This must be done for both the front and back end repositories.
2. **Install Dependencies:**
  - Navigate to the front end repository and run the following command in your terminal:
    - npm i
  - Navigate to the back end repository and run the following command in your terminal:
    - pip install -r requirements.txt
3. **Run the application:**
  - Navigate to the front end repository and run the following command in your terminal:
    - npm start
    - The application will run on port 3000 unless otherwise specified.
  - Navigate to the back end repository and run the following command in your terminal:
    - python manage.py runserver
    - The server will run on port 8000 unless otherwise specified.


#

<details>
<summary> User Stories:</summary>
 <ul>
  <li> As a user, I want to register an account, so that I can log in and manage my medications.</li>
  <li> As a user, I want to add my medications with dosage and schedule details, so that I can keep track of my medication regimen.</li>
  <li> As a user, I want to search for my medications, so that I can see what it interacts with.</li>
 </ul>
</details>

#

<details>
 <summary> 🎨 Wireframes </summary>
   <details> 
    <summary> ✏️ Rough Sketch </summary>
      <img src="/public/images/home_profile_wireframes_medmanager.png" alt="Wireframes">
      <img src="/public/images/medmanagment_wireframe.png.png" alt="Wireframes">
   </details>
</details>

#

#### Entity Relationship Diagrams

![ERD](./public/images/ERD.png)

#


#### Unsolved Problems & Challenges

- **Authentication Issues:** Although users can successfully register and sign in, the app allows unauthenticated access, resulting in error displays when accessed without logging in.
- **Date Formatting:** Challenges encountered in formatting date information when communicating between the frontend and the backend.
- **API Result Formatting:** Difficulties in formatting the results retrieved from the interaction checker to make them more user-friendly.
- **CRUD Operations:** Challenges with fetch requests while managing CRUD operations for medications using the Django backend. Specifically, DELETE requests were not completing successfully, even though a 204 No Content response was received. This issue was resolved by using `response.text()` in the return statement instead of returning an empty object.
- **Deployment Issues:** Issues with deployment of the app to Heroku and Netlify. Prior to deployment the app worked but after I ran into many errors. The app currently works but if you try to open the Heroku deployed app, it will not load and responds with a 404 (Not Found).

#

<details> 
 <summary> ❓ Future Features </summary>
 <ul>
  <li> Address the aforementioned unsolved problems. </li>
  <li> Enable guest access to the app without errors. </li>
  <li> Improve the readability of the interaction search results. </li>
  <li> Introduce the ability to edit logged medications. </li>
  <li> Enhance the overall styling of the app. </li>
  <li> Enable notifications for scheduled medication intake and refill reminders. </li>
 </ul>
</details>

#