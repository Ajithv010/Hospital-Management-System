# 🏥 Hospital Management System CRUD operation

A full-stack Hospital Management System developed using **React.js**, **Spring Boot**, and **MySQL** to simplify hospital administration through a modern web interface.

The application provides secure authentication and complete management of patients, doctors, appointments, billing, prescriptions, and medical records through RESTful APIs.

---

## ✨ Features

- 🔐 JWT Authentication
- 📊 Dashboard with Statistics
- 👨‍⚕️ Doctor Management
- 🧑 Patient Management
- 📅 Appointment Management
- 💰 Billing Management
- 💊 Prescription Management
- 📋 Medical Record Management
- 🔍 Search Functionality
- 🔔 Toast Notifications
- ⚠️ SweetAlert2 Confirmation Dialogs
- 📱 Responsive User Interface

---
# 🛠️ Tech Stack

### Frontend

- React.js
- Bootstrap 5
- React Router DOM
- Axios
- Chart.js
- React ChartJS 2
- React Toastify
- SweetAlert2

### Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- REST API

### Database

- MySQL

### Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Maven
- Git & GitHub

---
# 📂 Project Structure

Hospital-Management-System/

├── Backend/

│ ├── src/main/java/

│ │ ├── controller/

│ │ ├── entity/

│ │ ├── repository/

│ │ ├── service/

│ │ ├── security/

│ │ └── HospitalManagementApplication.java

│ └── pom.xml

│

├── Frontend/

│ ├── src/

│ │ ├── components/

│ │ ├── layouts/

│ │ ├── pages/

│ │ ├── services/

│ │ ├── App.jsx

│ │ └── main.jsx

│ └── package.json

│

└── README.md

---
# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Hospital-Management-System.git
```

```bash
cd Hospital-Management-System
```

---

## Backend Setup

```bash
cd Backend
```

Configure your MySQL database in:

```properties
src/main/resources/application.properties
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run React:

```bash
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

---

# 📌 Main Modules

### 🔐 Authentication

- Secure Login
- JWT Authentication
- Protected Routes

### 👨‍⚕️ Doctors

- Add Doctor
- Update Doctor
- Delete Doctor
- Search Doctor

### 🧑 Patients

- Add Patient
- Update Patient
- Delete Patient
- Search Patient

### 📅 Appointments

- Schedule Appointment
- Update Appointment
- Cancel Appointment
- View Appointment List

### 💰 Billing

- Create Bills
- Update Payment Status
- Delete Bills

### 💊 Prescriptions

- Add Prescription
- Update Prescription
- Delete Prescription

### 📋 Medical Records

- Maintain Medical History
- Update Records
- Delete Records

### 📊 Dashboard

- Statistics Cards
- Charts
- Hospital Overview

---
# 🌟 Project Highlights

- Developed a full-stack Hospital Management System using React.js, Spring Boot, and MySQL.
- Implemented JWT-based authentication for secure user login.
- Designed RESTful APIs for efficient communication between frontend and backend.
- Performed complete CRUD operations for all major hospital entities.
- Added dashboard analytics with interactive charts.
- Implemented search functionality across management modules.
- Enhanced user experience using Toast Notifications and SweetAlert2 confirmation dialogs.
- Built a responsive and user-friendly interface using Bootstrap 5.

---
# 🚀 Future Enhancements

- Role-Based Access Control (Admin, Doctor, Patient)
- Online Appointment Booking
- Email Notifications
- PDF & Excel Report Generation
- Cloud Deployment
- Payment Gateway Integration
- Video Consultation
- SMS Notifications

---
