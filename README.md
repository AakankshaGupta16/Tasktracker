# TaskTracker

A robust, full-stack task and project management application designed to streamline team collaboration and workflow tracking. Built using a secure **Spring Boot** backend and a responsive **React** frontend, TaskTracker delivers an intuitive, role-based dashboard for administrators and team members alike.

---

## Core Features

### Security & Access Control
* **Authentication & Authorization:** Secure user registration and login pipelines.
* **Password Hashing:** Industry-standard encryption using `BCryptPasswordEncoder`.
* **Role-Based Access Control (RBAC):** Tailored UI perspectives and API access levels for **Admins** (full control over projects, tasks, and assignments) and **Members** (view and update assigned task statuses).
* **Stateless Security Session:** Configured for clean, decoupled client-server interactions.

### Task & Project Management
* **Project Isolation:** Group related tasks under specific project umbrellas.
* **Full CRUD Operations:** Seamless creation, retrieval, updates, and deletion of tasks and projects.
* **State & Urgency Matrices:** Dynamic tracking via **Task Statuses** (*Todo, In Progress, Completed*) and **Priorities** (*Low, Medium, High*).
* **Workload Distribution:** Capability to assign specific tasks to individual users with hard due-date support.

### Analytics & UI
* **Dashboard Insights:** High-level metrics tracking total tasks, completion rates, and upcoming deadlines.
* **Responsive Layout:** Built with modern CSS utilities ensuring seamless use across desktop, tablet, and mobile displays.

---

## Tech Stack

### Backend Architecture
* **Language:** Java 17
* **Framework:** Spring Boot 3.x
* **Security:** Spring Security
* **Data Layer:** Spring Data JPA, Hibernate ORM
* **Database:** MySQL 8.0
* **Build Tool:** Maven

### Frontend Architecture
* **Library:** React.js (Vite runtime)
* **HTTP Client:** Axios
* **Styling:** Tailwind CSS
* **Language:** JavaScript (ES6+)

### Deployment & Tooling
* **Version Control:** Git & GitHub
* **IDEs:** IntelliJ IDEA, VS Code
* **Cloud Platform:** Railway (Backend & Managed MySQL)

---

## Project Structure

```
tasktracker/
├── tasktracker/                         # Spring Boot Backend
│   ├── .mvn/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/aakanksha/tasktracker/
│   │       │       ├── config/          # Configuration beans
│   │       │       ├── controller/      # REST API Controllers (Auth, Project, Task)
│   │       │       ├── dto/             # Request & Response Payloads
│   │       │       ├── entity/          # JPA Hibernate Entities (Project, Task, User)
│   │       │       ├── enums/           # Domain Enums (Priority, Role, TaskStatus)
│   │       │       ├── exception/       # Custom Exception Handling
│   │       │       ├── repository/      # Data Access Layer Interfaces
│   │       │       ├── security/        # Security Configurations
│   │       │       ├── service/         # Business Logic Layer (Interfaces & Impl)
│   │       │       └── util/            # Helper Utilities
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── frontend/                            # React Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/                      # Static media assets
│   │   ├── components/
│   │   │   └── Sidebar.jsx              # Collapsible navigation element
│   │   ├── pages/                       # Application Views
│   │   │   ├── CreateProject.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Tasks.jsx
│   │   ├── services/                    # API Integration Layer
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── ProjectService.js
│   │   │   └── taskService.js
│   │   ├── styles/                      # Application custom styles
│   │   ├── utils/                       # Frontend helper utilities
│   │   ├── App.css
│   │   ├── App.jsx                      # Core Routing & Layout entry
│   │   ├── index.css                    # Tailwind Directives
│   │   └── main.jsx                     # DOM Target Render root
│   ├── eslint.config.js
│   └── package.json
│
└── README.md
```
##Local Installation & Setup

Prerequisites
1.Java 17 SDK installed
2.Node.js (v18 or higher) & npm installed
3. MySQL Server running locally

#Backend Configuration
Clone the Repository
```
git clone [https://github.com/AakankshaGupta16/Tasktracker.git](https://github.com/AakankshaGupta16/Tasktracker.git)
cd Tasktracker/tasktracker
```
#Database Setup
Log into your local MySQL instance and initialize the target schema:
```
CREATE DATABASE tasktracker;
```
#Environment Configurations
To keep credentials secure, avoid hardcoding database passwords. Create local environment variables or configure your IDE run profile with the following keys:
```
# Unix/macOS
export DB_USERNAME=root
export DB_PASSWORD=your_secure_password

# Windows (Command Prompt)
set DB_USERNAME=root
set DB_PASSWORD=your_secure_password
```
Your src/main/resources/application.properties is configured to ingest these variables automatically:

```
spring.datasource.url=jdbc:mysql://localhost:3306/tasktracker?useSSL=false&serverTimezone=UTC
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=false
```
#Execute Backend Application
```
mvn clean install
mvn spring-boot:run
```
The REST API will boot and listen by default on http://localhost:8080.

#Frontend Configuration
Navigate out to the frontend directory:

```
cd ../frontend
```
Install Dependencies
```
npm install
```
Set up Environment File
Create a .env file in the root of the frontend/ directory to map your API gateway:
```
VITE_API_BASE_URL=http://localhost:8080/api
```
Open your browser and navigate to the address provided in your terminal (typically http://localhost:5173).

## API Reference Outline

All endpoints are prefixed with `/api`. Below are the core interaction modules:

| Context | Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/signup` | Register a new user profile | Public |
| **Auth** | `POST` | `/auth/login` | Authenticate credentials | Public |
| **Projects** | `GET` | `/projects` | List all active projects | Admin / Member |
| **Projects** | `POST` | `/projects` | Instantiate a new project container | Admin Only |
| **Tasks** | `GET` | `/tasks` | Fetch filtered list of tasks | Admin / Member |
| **Tasks** | `POST` | `/tasks` | Create a task and bind to project | Admin Only |
| **Tasks** | `PUT` | `/tasks/{id}` | Update status, text, or assignee | Admin / Member |
| **Tasks** | `DELETE`| `/tasks/{id}` | Permanently drop a task record | Admin Only |
| **Stats** | `GET` | `/dashboard/stats`| Return aggregate counts for cards | Admin / Member |


## Database Entity Schema Design

The underlying relational schema mapping managed by Hibernate generates three essential tables with cascading relationship integrity:

* **Users Table:** Holds credentials (`id`, `username`, `email`, `password`, `role`).
* **Projects Table:** Holds business categories (`id`, `name`, `description`, `created_at`).
* **Tasks Table:** Main transactional dataset mapped via Foreign Keys to both projects and target owners:
  * `id` (PK)
  * `title` & `description`
  * `status` (*ENUM/String Mapping*)
  * `priority` (*ENUM/String Mapping*)
  * `due_date` (*Temporal Date*)
  * `project_id` (*FK linking to Projects*)
  * `assigned_to_user_id` (*FK linking to Users*)

---

## Engineering Challenges & Resolutions


* **Cross-Origin Resource Sharing (CORS):**
  * **Challenge:** Browser blocks incoming data streams from `localhost:8080` while browsing on `localhost:5173`.
  * **Resolution:** Implemented a global `@CrossOrigin` configuration filter setup within Spring Security configuration bean classes to safely process trusted client domains.
* **State Synchronicity in Role UI:**
  * **Challenge:** Preventing state flickering and unauthorized routing visibility when a user with `ROLE_MEMBER` logs in compared to `ROLE_ADMIN`.
  * **Resolution:** Designed a modular Context Provider in React to cache user metadata on validation, driving conditional rendering locks across components.

---

## Learning Milestones

* Architectural design of a decoupled **Monolith-to-SPA architecture**.
* Mastery over **Spring Data JPA** object-relational abstraction patterns and transactional boundary enforcement.
* Implementation of custom, scalable **Spring Security filter configurations** and encrypted user identity patterns.
* Experience navigating public-cloud infrastructure variables, multi-service provisioning, and automated build flows on **Railway**.

---

## Roadmap & Future Optimizations

**JWT Tokenization:** Implement stateless JSON Web Token filters for secure, intercepted cookie/header authentication pipelines.
**Real-Time WebSockets:** Add live push notifications for task updates and team assignments.
**Advanced Productivity Gantt Charts:** Integrate a rich charts timeline analytics board for project tracking.
**S3 Document Attachments:** Add capability to upload mock files or asset attachments directly onto individual task view wrappers.

---

## Author

**Aakanksha Gupta**
* Electronics and Communication Engineering Undergraduate \| Vellore Institute of Technology (VIT), Chennai
* Passionate Backend & Full-Stack Developer focused on distributed Java systems and intuitive web engineering.
* [GitHub Profile](https://github.com/AakankshaGupta16)
