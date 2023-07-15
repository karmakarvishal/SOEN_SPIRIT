# Spirit-Soen6011summer2023   
## Project Description:
This project aims to develop a Career Services Application with a backend system using MySQL as the database technology. The backend is responsible for handling data storage, authentication, file uploads (specifically resume uploads), role-based authorization, and exposing high-level APIs for the front end. The frontend technologies used in this project include AngularJS, JavaScript, and jQuery.

###  Employer:
- Account Creation/Registration: Employers can easily create an account or register on the platform.
- Login: Employers can securely log in to their accounts to access the platform's features.
- Browse Candidates: Employers can efficiently search and browse through a pool of candidates based on specific criteria.
- Post Job Offers: Employers can post job openings and provide detailed descriptions of the positions available.
- Candidate Selection: Employers can review and select candidates who have applied for a job offer to schedule interviews.

### Student/Candidate:
- Account Creation/Registration: Students can easily create an account or register on the platform.
- Login: Students can securely log in to their accounts to access the platform's features.
- Resume Building/Upload: Students  upload their resumes to showcase their skills and qualifications.
- Browse and Apply for Job Offers: Students can explore various job postings and apply for positions that match their interests and qualifications.
- Application Tracking: Students can keep track of their applications and monitor the progress of each application.

### Admin:
- User Profile Management: The admin has the authority to manage all user profiles.
- Job Postings Management: The admin can oversee the job postings.
- Tracking and Notifications: The admin can track the activities of both employers and students, ensuring a smooth user experience.

### Notifications:
- Employer Notifications: Employers will receive instant notifications when students apply for their job postings, keeping them informed and facilitating prompt responses.
- Student Notifications: Students will receive notifications when they are selected for an interview, ensuring they are aware of the opportunity.
- By integrating these features and functionalities, the platform will provide a seamless experience for employers, students, and administrators, making the job searching and recruitment processes efficient and effective.

## Technologies:
- Frontend:
    - The front end of the Career Services Application is built using AngularJS, JavaScript, and jQuery. AngularJS is a powerful JavaScript framework that provides a robust structure for building dynamic web applications. JavaScript is a fundamental programming language used for enhancing interactivity and adding custom functionalities. jQuery is a feature-rich JavaScript library that simplifies DOM manipulation, event handling, and AJAX interactions.
- Backend:
    - The backend of this Career Services Application follows a modular and scalable approach. It is built using modern web development principles and technologies, ensuring robustness, security, and maintainability. The backend architecture is designed to handle concurrent requests efficiently, allowing for a seamless user experience.
    - Database:
        - The backend utilizes *MySQL* as the database technology to store and manage data related to user profiles, job listings, connections, and more. MySQL is a reliable and widely-used relational database management system that offers robust data handling capabilities, transaction support, and scalability.
    - Backend Library/Framework
        - To streamline the development process and enhance the functionality of the backend, the project incorporates the *Express.js* framework. Express.js is a fast and minimalist web application framework for Node.js. It provides a range of features and middleware that simplify routing, request handling, and response management, making it an ideal choice for building RESTful APIs.
    - High-Level APIs Requirements
        - The backend exposes a set of high-level APIs to facilitate communication between the frontend and backend systems in the Career Services Application. These APIs enable the frontend, built using AngularJS, JavaScript, and jQuery, to perform various operations and interact with the backend effectively. Some of the high-level APIs requirements include:
          1. User Management APIs: APIs for user registration, login, profile retrieval, and update.
          2. File Upload APIs: APIs for handling resume uploads and associating them with user profiles.
          3. Job Listings APIs: APIs for creating, retrieving, updating, and deleting job listings.
          4. Connection APIs: APIs for managing user connections, such as sending connection requests and accepting/rejecting them.
          5. Search APIs: APIs for searching and filtering job listings and user profiles based on various criteria.
          6. Authentication and Authorization APIs: APIs for user authentication and authorization checks.
          7. Error Handling APIs: APIs to handle and return appropriate error messages and status codes.
          These high-level APIs are designed to be intuitive, efficient, and well-documented, enabling seamless integration with the AngularJS, JavaScript, and jQuery frontend of the Career Services Application and smooth communication between the two systems.
    - Role-Based Authorization
        - To control access to various features and resources within the Career Services Application, the backend implements a role-based authorization system. This system allows different users to have different levels of access based on their roles and permissions. The backend maintains a set of roles (such as "admin," "employer," and "job seeker") and associates them with specific permissions. Based on their assigned roles, users are granted or restricted access to certain functionalities.
     
    - Authentication: 
        - To ensure secure access to the Career Services Application, the backend employs a robust authentication mechanism. It utilizes *JSON Web Tokens (JWT)* for user authentication. JWT is a stateless and secure method for transmitting information between parties as a JSON object. It enables the backend to verify the authenticity of requests and ensure that only authorized users can access protected resources.

  - File Upload (Specifically Resume Upload): 
      - The backend incorporates a file upload functionality, specifically for resume uploads. When users upload their resumes, the backend handles the process securely and efficiently. It utilizes a multipart form-data approach to receive and process file uploads. The uploaded resumes are then stored in a designated directory on the server or in a cloud storage service like *Amazon S3*.

## Team Members and Roles:

### Jay Dhanani (40232469) 
  - Role : Scrum Master and Developer
  - Expertise:  Front-End and Back-End Technologies
### Neha Deshmukh (40221804)
  - Role : Project Manager and Developer
  - Expertise:  Project Management and Automated Testing
### Priyesh Bhalala (40217267)
  - Role : Product Owner and Developer
  - Expertise:  Front-End Technologies and Database Management 
### Simran Kaur (40221666)
  - Role : Developer
  - Expertise:  Database Management and Back-End Technologies
### Vishal Karmakar (40220935)
  - Role : Developer
  - Expertise: Back-End Technologies
### Vinay Sahrawat (40220936)
  - Role : Product Owner & Developer
  - Expertise: Front-End and Back-End Technologies
