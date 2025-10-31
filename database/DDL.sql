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
GO
