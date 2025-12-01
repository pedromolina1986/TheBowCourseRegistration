-- 1️⃣ Criar o banco de dados
CREATE DATABASE TheBowCourse;
GO
 
-- 2️⃣ Usar o banco recém-criado
USE TheBowCourse;
GO
 
-- 3️⃣ Criar o login no servidor (nível global)
IF NOT EXISTS (SELECT name FROM sys.sql_logins WHERE name = 'bowcourse_sql')
BEGIN
    CREATE LOGIN bowcourse_sql
    WITH PASSWORD = '12345',
         CHECK_POLICY = OFF,       -- Desativa política de complexidade
         CHECK_EXPIRATION = OFF;   -- Desativa expiração de senha
END;
GO
 
-- 4️⃣ Criar o usuário no banco de dados e vinculá-lo ao login
CREATE USER bowcourse_sql FOR LOGIN bowcourse_sql;
GO
 
-- 5️⃣ Conceder permissões completas sobre o banco
EXEC sp_addrolemember 'db_owner', 'bowcourse_sql';
GO
 
-- 6️⃣ Criar a tabela Users
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL
);
-- Department table
CREATE TABLE Department (
    department_id INT IDENTITY(1,1) PRIMARY KEY,
    department_name VARCHAR(100),
    office_location VARCHAR(100)
);
 
-- Admin table
CREATE TABLE dbo.Admin (
    admin_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,         -- link to Users table
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    department_id INT NOT NULL,
    CONSTRAINT FK_Admin_User FOREIGN KEY (user_id) REFERENCES dbo.Users(user_id),
    CONSTRAINT FK_Admin_Department FOREIGN KEY (department_id) REFERENCES dbo.Department(department_id)
);
 
-- Instructor table
CREATE TABLE Instructor (
    instructor_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

-- Term table
CREATE TABLE Term (
    term_id INT IDENTITY(1,1) PRIMARY KEY,
    term_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20)
);

 
-- Student table
CREATE TABLE Student (
    student_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,                   -- link to Users table
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    program VARCHAR(100),
	department_id INT,
	term_id INT,
    year_level INT,
    assigned_by INT,
                     -- optional: which admin assigned the student
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
	FOREIGN KEY (department_id) REFERENCES Department(department_id),
	FOREIGN KEY (term_id) REFERENCES Term(term_id),
    FOREIGN KEY (assigned_by) REFERENCES Admin(admin_id)
);
 
-- Profile table
CREATE TABLE Profile (
    profile_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(10),
    updated_at DATETIME,
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
  
-- Course table
CREATE TABLE Course (
    course_id INT IDENTITY(1,1) PRIMARY KEY,
    term_id INT,
    course_code VARCHAR(20),
    course_name VARCHAR(100),
    description TEXT,
    credit_hours INT,
    capacity INT,
    instructor_id INT,
    modified_by INT,
    modified_at DATETIME,
    FOREIGN KEY (term_id) REFERENCES Term(term_id),
    FOREIGN KEY (instructor_id) REFERENCES Instructor(instructor_id),
    FOREIGN KEY (modified_by) REFERENCES Admin(admin_id)
);
 
-- TermSelection table
CREATE TABLE TermSelection (
    term_selection_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    term_id INT,
    selection_date DATE,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (term_id) REFERENCES Term(term_id)
);
 
-- CourseRegistration table
CREATE TABLE CourseRegistration (
    registration_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    course_id INT,
    term_id INT,
    registration_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    FOREIGN KEY (term_id) REFERENCES Term(term_id)
);
 
-- MyCourse table
CREATE TABLE MyCourse (
    mycourse_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    course_id INT,
    term_id INT,
    progress INT,
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    FOREIGN KEY (term_id) REFERENCES Term(term_id)
);
 
-- Dashboard table
CREATE TABLE Dashboard (
    dashboard_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    last_login DATETIME,
    notifications TEXT,
    recent_activity TEXT,
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
 
-- ContactAdmin table
CREATE TABLE ContactAdmin (
    contact_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    admin_id INT,
    subject VARCHAR(100),
    message TEXT,
    sent_at DATETIME,
    reply TEXT,
    reply_date DATETIME,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
 
-- AdminDashboard table
CREATE TABLE AdminDashboard (
    admin_dashboard_id INT IDENTITY(1,1) PRIMARY KEY,
    admin_id INT,
    total_students INT,
    total_courses INT,
    total_registrations INT,
    new_messages INT,
    last_login DATETIME,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
 
-- AdminProfile table
CREATE TABLE AdminProfile (
    admin_profile_id INT IDENTITY(1,1) PRIMARY KEY,
    admin_id INT,
    position VARCHAR(50),
    office_address VARCHAR(255),
    updated_at DATETIME,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
 
-- SubmittedForms table
CREATE TABLE SubmittedForms (
    form_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT,
    admin_id INT,
    subject VARCHAR(100),
    issue_description TEXT,
    submission_date DATETIME,
    status VARCHAR(20),
    admin_response TEXT,
    response_date DATETIME,
    priority VARCHAR(20) DEFAULT 'Low',
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
 
-- SignUp table
CREATE TABLE SignUp (
    signup_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    confirm_password VARCHAR(100),
    date_of_birth DATE,
    phone_number VARCHAR(15),
    program VARCHAR(100)
);
 
-- Login table
CREATE TABLE Login (
    login_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(20),
    student_id INT,
    admin_id INT,
    account_status VARCHAR(20),
    created_at DATETIME,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
GO
 