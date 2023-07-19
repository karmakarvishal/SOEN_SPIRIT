# Spirit-Soen6011summer2023   

## Description:
The Career Services Platform is an integrated online solution that facilitates efficient and effective connections between students seeking employment and employers with job openings. This platform acts as a centralized hub, offering a wide range of features to streamline the process of finding and filling job positions.

For students, the platform serves as a comprehensive showcase for their portfolios, allowing them to highlight their skills, experiences, and achievements. They can easily browse and apply for job postings, leveraging personalized search filters to find opportunities that align with their career goals. The platform also provides resources and tools to enhance their job-seeking journey, such as resume building assistance, interview preparation materials, and networking opportunities.

On the employer side, the platform enables businesses to effortlessly post job offers and manage the entire hiring process. Employers can review candidate applications, access their portfolios, and efficiently evaluate their qualifications. The platform offers intuitive applicant tracking features, allowing employers to streamline their decision-making process and efficiently communicate with potential hires.

By providing a convenient and centralized solution, the Career Services Platform offers enhanced efficiency and personalized experiences for both job seekers and employers. It empowers students to showcase their talents and connect with relevant job opportunities, while helping employers identify and attract top talent in a streamlined manner. Ultimately, this platform aims to bridge the gap between students and employers, fostering successful career outcomes for all parties involved.

### Key features: 

1. User Registration and Login:
   - Students, employers, and admin can create individual accounts using their email and password. These credentials provide secure access to the platform's features.

2. Student/Candidate Profile Management:
   - Students can create and modify their profiles, including uploading and/or building resumes, adding portfolio materials, and tailoring their profiles to match market requirements. This allows students to present their skills, education, and experience effectively.

3. Job Posting and Management:
   - Employers can create and manage job posts, including job descriptions, required qualifications, and application deadlines. They have the flexibility to track and update their job postings throughout the hiring process.

4. Job Search and Application:
   - Students can browse and search for job offers based on various criteria, such as location, industry, or job type. They can submit applications directly through the platform, attaching relevant documents and tailored cover letters.

5. Application Tracking:
   - Students can track the status of their applications, ensuring they are informed about the progress of each job opportunity. They receive notifications when their applications are received, reviewed, or if they are selected for interviews.

6. Candidate Selection and Interview Management:
   - Employers can review candidate applications, shortlist potential candidates, and schedule interviews. They have tools to track and manage the hiring process efficiently.

7. Admin Dashboard:
   - The admin has access to a dedicated dashboard to manage user profiles, job postings, and track overall system activity. They can handle system configuration, user support, and resolve any issues that may arise.

The Career Services Platform provides a user-friendly and intuitive interface accessible from PCs or mobile devices with an internet connection. The platform ensures the security of login credentials, protecting user information from unauthorized access. By leveraging this platform, job seekers can gain visibility and tailor their profiles, increasing their chances of securing suitable employment. Employers can efficiently search for qualified candidates, review applications, and streamline their hiring process. The platform simplifies the entire job search and recruitment cycle, benefitting both students and employers alike.

## Approach:
The project approach for developing the career services platform can be divided into several stages:
1. Requirement Gathering:
   - Understand the specific needs and objectives of the platform, such as the features and functionalities required for students, employers, and the admin. Identify the key user flows, interactions, and system requirements.
     
2. System Design:
   - Create a system design that outlines the architecture of the platform. This includes database design, user interface design, and the overall system flow. Determine the technologies and frameworks that will be used for development.
     
3. Front-end Development:
   - Implement the user interfaces for different user roles (students, employers, admin). Design and develop intuitive and user-friendly interfaces that allow users to easily navigate, update profiles, post jobs, and apply for jobs. The front-end development can utilize web technologies like AngularJS.
     
4. Back-end Development:
   - Build the server-side logic and functionality that powers the platform. This includes user authentication, account creation, job posting and application management, notification systems, and data storage. Choose a suitable programming language and framework for the back-end development, such as Node.js with Express.
     
5. Database Implementation:
    - Set up a database to store user information, job postings, applications, and other relevant data. Design the database schema and implement it using a suitable database management system (e.g., MySQL).
      
6. Integration and Testing:
    - Integrate the front-end and back-end components, ensuring smooth communication and functionality between different parts of the platform. Perform thorough testing to identify and fix any bugs or issues. Conduct both unit testing (testing individual components) and integration testing (testing the entire system).
      
7. Deployment:
    - Prepare the platform for deployment to a server or cloud hosting service. Configure the necessary infrastructure, such as setting up web servers, databases, and security measures. Ensure that the platform is scalable, secure, and able to handle the expected traffic.
      
8. User Training and Documentation:
    - Develop user guides and documentation to help students, employers, and the admin understand how to use the platform effectively. Provide training or tutorials if necessary to familiarize users with the features and functionalities.
      
9. Maintenance and Support:
    - Once the platform is live, provide ongoing maintenance and support to address any issues, add new features, and ensure the platform remains up-to-date and secure. Continuously gather user feedback and make improvements based on user needs and market trends.

Throughout the project, it's essential to follow an agile development approach, involving regular communication with stakeholders, iterating on feedback, and prioritizing features based on their importance and impact.


## Technologies Used:
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

## Team Members and Roles (with GitHub IDs):

### Jay Dhanani (40232469) 
  - Github username : jaydhanani99
  - Role : Scrum Master and Developer
  - Expertise:  Front-End and Back-End Technologies
### Neha Deshmukh (40221804)
  - Github username : dneha1210
  - Role : Project Manager and Developer
  - Expertise:  Project Management and Automated Testing
### Priyesh Bhalala (40217267)
  - Github username : PriyeshBhalala105
  - Role : Product Owner and Developer
  - Expertise:  Front-End Technologies and Database Management 
### Simran Kaur (40221666)
  - Github username : Simran-99
  - Role : Developer
  - Expertise:  Database Management and Back-End Technologies
### Vishal Karmakar (40220935)
  - Github username : karmakarvishal
  - Role : Developer
  - Expertise: Back-End Technologies
### Vinay Sahrawat (40220936)
  - Github username : sahrawatvinay
  - Role : Product Owner & Developer
  - Expertise: Front-End and Back-End Technologies
