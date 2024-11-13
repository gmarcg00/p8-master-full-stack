CREATE DATABASE IF NOT EXISTS blogs;
USE blogs;

-- Crear la tabla de autores
CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image LONGTEXT
);

-- Crear la tabla de posts
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);


-- Insertar datos de prueba en la tabla de autores
INSERT INTO authors (name, email, image) VALUES
('Juan Pérez', 'juan.perez@example.com', 'https://ejemplo.com/imagen1.jpg'),
('María López', 'maria.lopez@example.com', 'https://ejemplo.com/imagen2.jpg'),
('Carlos García', 'carlos.garcia@example.com', 'https://ejemplo.com/imagen3.jpg');

-- Insertar datos de prueba en la tabla de posts
INSERT INTO posts (title, description, creation_date, category, author_id) VALUES
('Primera entrada', 'Descripción de la primera entrada', '2024-11-11 10:00:00', 'Tecnología', 1),
('Segunda entrada', 'Descripción de la segunda entrada', '2024-11-11 11:00:00', 'Salud', 2),
('Tercera entrada', 'Descripción de la tercera entrada', '2024-11-11 12:00:00', 'Cultura', 3),
('Cuarta entrada', 'Descripción de la primera entrada', '2024-11-11 10:00:00', 'Ciencia', 1),
('Quinta entrada', 'Descripción de la primera entrada', '2024-11-11 10:00:00', 'Deportes', 2);