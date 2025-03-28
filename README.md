# 📌 To-Do App  
A **task management application** built with **Node.js** and **Express.js**, allowing users to **add, update, delete, and track** their tasks efficiently. This project includes **user authentication**, **database management**, and **email notifications** for an enhanced experience.  

## 🚀 Features  
✅ **User Authentication** – Secure login & registration (using bcrypt for password hashing).  
✅ **Task Management** – Create, view, edit, and delete tasks.  
✅ **Task Status** – Mark tasks as completed or pending.  
✅ **Email Notifications** – Send task reminders via email (powered by SendGrid/Nodemailer).  
✅ **Database Support** – Supports both **MongoDB** (via Mongoose) and **MySQL** (via Sequelize).  
✅ **Session Management** – Uses **express-session** and **connect-mongodb-session** for session handling.  
✅ **Input Validation** – Secure form submissions with **express-validator** and **CSRF protection**.  
✅ **Flash Messages** – Inform users about actions using **connect-flash**.  
✅ **Templating Engine** – Uses **EJS** for rendering dynamic pages.  

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS (for dynamic templating)  
- **Database:** MongoDB (Mongoose) & MySQL (Sequelize ORM)  
- **Authentication:** bcrypt.js for password encryption  
- **Session Handling:** express-session, connect-mongodb-session  
- **Email Integration:** SendGrid, Nodemailer  
- **Security:** CSRF protection with csurf  

## 📦 Dependencies  
| Package                           | Version  | Description |
|-----------------------------------|---------|-------------|
| **@sendgrid/mail**                | ^8.1.4  | SendGrid API for email notifications |
| **bcryptjs**                      | ^3.0.2  | Hashing passwords for secure authentication |
| **connect-flash**                 | ^0.1.1  | Flash messages for user notifications |
| **connect-mongodb-session**       | ^5.0.0  | MongoDB session store for express-session |
| **csurf**                         | ^1.10.0 | CSRF protection middleware |
| **ejs**                           | ^3.1.10 | Embedded JavaScript templating engine |
| **express-session**               | ^1.18.1 | Session management for authentication |
| **express-validator**             | ^7.2.1  | Middleware for input validation |
| **mangodb** (typo, should be MongoDB?) | ^1.0.0  | Incorrect package, should be removed |
| **mongodb**                       | ^6.14.2 | MongoDB driver for Node.js |
| **mongoose**                      | ^8.12.1 | Object Data Modeling (ODM) for MongoDB |
| **mysql2**                        | ^3.12.0 | MySQL database client for Node.js |
| **nodemailer**                    | ^6.10.0 | Library for sending emails |
| **nodemailer-sendgrid-transport** | ^0.2.0  | SendGrid transport plugin for Nodemailer |
| **nodemon**                       | ^3.1.9  | Auto-restart Node.js server on file changes |
| **sequelize**                     | ^6.37.5 | ORM for MySQL and PostgreSQL |

## 🔧 Installation & Setup  
1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```  

2. **Install Dependencies:**  
   ```bash
   npm install
   ```  

3. **Set Up Environment Variables:**  
   Create a `.env` file in the root directory and add:  
   ```env
   PORT=5000
   MONGO_URI=your_database_url
   MYSQL_DB=your_mysql_database
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   NODEMAILER_USER=your_email@example.com
   NODEMAILER_PASS=your_email_password
   ```  

4. **Run the Application:**  
   ```bash
   npm start
   ```  
   The server should now be running on **http://localhost:5000**.  

## 📡 API Endpoints  
| Method | Endpoint        | Description        |
|--------|---------------|--------------------|
| GET    | `/tasks`       | Fetch all tasks   |
| POST   | `/tasks`       | Create a new task |
| PUT    | `/tasks/:id`   | Update a task     |
| DELETE | `/tasks/:id`   | Delete a task     |

## 📸 Screenshots (Optional)  
![image](https://github.com/user-attachments/assets/6156a801-7530-492b-9bd4-dc376eaae06a)
![image](https://github.com/user-attachments/assets/db669d9c-2d60-42e1-a2a0-5a8d5847c629)
![image](https://github.com/user-attachments/assets/d9d57097-ee4a-41b0-973d-6274f96e3aa3)
![image](https://github.com/user-attachments/assets/44d58769-9b47-4616-b007-5211f070cfb9)
![image](https://github.com/user-attachments/assets/a0f14200-876d-4c8f-a814-f3e78e5911b4)
![image](https://github.com/user-attachments/assets/e63041f9-f84d-45b2-a167-cf15f86b6363)
![image](https://github.com/user-attachments/assets/baa1eb0f-1bb9-400f-80d7-b6661d58cac3)
![image](https://github.com/user-attachments/assets/7fc6a355-6979-4e66-a90a-0629d1650b4a)


## 🛠️ Future Enhancements  
- [ ] Add priority levels for tasks  
- [ ] Implement user-specific task categories  
- [ ] Enhance email notifications for deadlines  

## 🤝 Contributing  
Feel free to fork this repository, open issues, and submit pull requests!  

## 📜 License  
This project is licensed under the **MIT License**.  

---

This README fully details your project, dependencies, and setup. Let me know if you need any changes! 🚀
