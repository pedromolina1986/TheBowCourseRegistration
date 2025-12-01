SET IDENTITY_INSERT Users ON;
INSERT INTO Users (user_id, user_name, user_password, user_type) VALUES
(1, 'admin1', '$2b$10$fSkYfg0cu44YOEiSKDmmGuqP5JcCLRRGWvTconVHgtPzUHT5WhuMW', 'admin'),--password123
(2, 'admin2', '$2b$10$fSkYfg0cu44YOEiSKDmmGuqP5JcCLRRGWvTconVHgtPzUHT5WhuMW', 'admin'),
(3, 'stud1', '$2b$10$fSkYfg0cu44YOEiSKDmmGuqP5JcCLRRGWvTconVHgtPzUHT5WhuMW', 'student'),
(4, 'stud2', '$2b$10$fSkYfg0cu44YOEiSKDmmGuqP5JcCLRRGWvTconVHgtPzUHT5WhuMW', 'student');
SET IDENTITY_INSERT Users OFF;


SET IDENTITY_INSERT Department ON;
INSERT INTO Department (department_id, department_name, office_location) VALUES
(1, 'Computer Science', 'Building A'),
(2, 'Business Management', 'Building B');
SET IDENTITY_INSERT Department OFF;

SET IDENTITY_INSERT Admin ON;
INSERT INTO Admin (admin_id, user_id, first_name, last_name, email, phone_number, department_id) VALUES
(1, 1, 'Alice', 'Johnson', 'alice@school.edu', '111-1111', 1),
(2, 2, 'Bob', 'Williams', 'bob@school.edu', '222-2222', 2);
SET IDENTITY_INSERT Admin OFF;

SET IDENTITY_INSERT Instructor ON;
INSERT INTO Instructor (instructor_id, first_name, last_name, email, department_id) VALUES
(1, 'John', 'Doe', 'john.doe@school.edu', 1),
(2, 'Mary', 'Smith', 'mary.smith@school.edu', 2);
SET IDENTITY_INSERT Instructor OFF;

SET IDENTITY_INSERT Term ON;
INSERT INTO Term (term_id, term_name, start_date, end_date, status) VALUES
(1, 'Spring 2025', '2025-01-10', '2025-05-15', 'Active'),
(2, 'Fall 2025', '2025-08-20', '2025-12-10', 'Upcoming');
SET IDENTITY_INSERT Term OFF;

SET IDENTITY_INSERT Student ON;
INSERT INTO Student (student_id, user_id, first_name, last_name, email, program, department_id, term_id, year_level, assigned_by) VALUES
(1, 3, 'James', 'Brown', 'james.brown@school.edu', 'BS Computer Science', 1, 1, 1, 1),
(2, 4, 'Linda', 'Green', 'linda.green@school.edu', 'BS Business Admin', 2, 1, 1, 2);
SET IDENTITY_INSERT Student OFF;

SET IDENTITY_INSERT Profile ON;
INSERT INTO Profile (profile_id, student_id, phone_number, address, date_of_birth, gender, updated_at) VALUES
(1, 1, '123-4567', '123 Main St', '2004-02-10', 'Male', GETDATE()),
(2, 2, '987-6543', '456 Pine Ave', '2004-08-20', 'Female', GETDATE());
SET IDENTITY_INSERT Profile OFF;

SET IDENTITY_INSERT Course ON;
INSERT INTO Course (course_id, term_id, course_code, course_name, description, credit_hours, capacity, instructor_id, modified_by, modified_at) VALUES
(1, 1, 'CS101', 'Intro to Programming', 'Basic coding concepts.', 3, 40, 1, 1, GETDATE()),
(2, 1, 'BUS201', 'Marketing Principles', 'Basics of marketing.', 3, 40, 2, 2, GETDATE());
SET IDENTITY_INSERT Course OFF;

SET IDENTITY_INSERT TermSelection ON;
INSERT INTO TermSelection (term_selection_id, student_id, term_id, selection_date) VALUES
(1, 1, 1, '2025-01-05'),
(2, 2, 1, '2025-01-06');
SET IDENTITY_INSERT TermSelection OFF;

SET IDENTITY_INSERT CourseRegistration ON;
INSERT INTO CourseRegistration (registration_id, student_id, course_id, term_id, registration_date, status) VALUES
(1, 1, 1, 1, '2025-01-08', 'Registered'),
(2, 2, 2, 1, '2025-01-09', 'Registered');
SET IDENTITY_INSERT CourseRegistration OFF;

SET IDENTITY_INSERT MyCourse ON;
INSERT INTO MyCourse (mycourse_id, student_id, course_id, term_id, progress, grade) VALUES
(1, 1, 1, 1, 20, NULL),
(2, 2, 2, 1, 10, NULL);
SET IDENTITY_INSERT MyCourse OFF;

SET IDENTITY_INSERT Dashboard ON;
INSERT INTO Dashboard (dashboard_id, student_id, last_login, notifications, recent_activity) VALUES
(1, 1, GETDATE(), 'Welcome James', 'Registered CS101'),
(2, 2, GETDATE(), 'Welcome Linda', 'Registered BUS201');
SET IDENTITY_INSERT Dashboard OFF;

SET IDENTITY_INSERT ContactAdmin ON;
INSERT INTO ContactAdmin (contact_id, student_id, admin_id, subject, message, sent_at, reply, reply_date) VALUES
(1, 1, 1, 'Account Help', 'I need help logging in', GETDATE(), NULL, NULL),
(2, 2, 2, 'Course Inquiry', 'How to drop a course?', GETDATE(), NULL, NULL);
SET IDENTITY_INSERT ContactAdmin OFF;

SET IDENTITY_INSERT AdminDashboard ON;
INSERT INTO AdminDashboard (admin_dashboard_id, admin_id, total_students, total_courses, total_registrations, new_messages, last_login) VALUES
(1, 1, 1, 1, 1, 1, GETDATE()),
(2, 2, 1, 1, 1, 1, GETDATE());
SET IDENTITY_INSERT AdminDashboard OFF;

SET IDENTITY_INSERT AdminProfile ON;
INSERT INTO AdminProfile (admin_profile_id, admin_id, position, office_address, updated_at) VALUES
(1, 1, 'Head of CS', 'Room 101', GETDATE()),
(2, 2, 'Dean of Business', 'Room 202', GETDATE());
SET IDENTITY_INSERT AdminProfile OFF;

SET IDENTITY_INSERT SubmittedForms ON;
INSERT INTO SubmittedForms (form_id, student_id, admin_id, subject, issue_description, submission_date, status, admin_response, response_date, priority)
VALUES
(1, 1, 1, 'Password Reset', 'I forgot my password', GETDATE(), 'Pending', NULL, NULL, 'High'),
(2, 2, 2, 'Change Program', 'Request to change program', GETDATE(), 'Pending', NULL, NULL, 'Low');
SET IDENTITY_INSERT SubmittedForms OFF;

SET IDENTITY_INSERT SignUp ON;
INSERT INTO SignUp (signup_id, first_name, last_name, email, password, confirm_password, date_of_birth, phone_number, program) VALUES
(1, 'Test', 'User', 'test.user@example.com', '12345', '12345', '2005-01-01', '555-0000', 'Temp Program');
SET IDENTITY_INSERT SignUp OFF;

SET IDENTITY_INSERT Login ON;
INSERT INTO Login (login_id, username, password, role, student_id, admin_id, account_status, created_at) VALUES
(1, 'admin1', 'pass123', 'Admin', NULL, 1, 'Active', GETDATE()),
(2, 'stud1', 'pass123', 'Student', 1, NULL, 'Active', GETDATE());
SET IDENTITY_INSERT Login OFF;


