# EMS

# Multi-Service Application with Kafka and Zookeeper

This repository contains a multi-service application using Docker Compose, featuring the following components:

- **Zookeeper**: Manages the Kafka cluster.
- **Kafka**: Messaging broker for communication between microservices.
- **Auth Service**: Handles user authentication and authorization.
- **User Management Service**: Manages user data and profiles.

---

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Services Overview

### 1. **Zookeeper**

- **Purpose**: Manages the Kafka cluster's metadata.
- **Port**: `2181`
- **Image**: `confluentinc/cp-zookeeper:latest`

### 2. **Kafka**

- **Purpose**: Message broker used for communication between microservices.
- **Port**: `9092`
- **Image**: `confluentinc/cp-kafka:latest`

### 3. **Auth Service**

- **Purpose**: Handles user authentication and authorization.
- **Port**: `9000`
- **Custom Image**: `viraj179/auth-service:latest`

### 4. **User Management Service**

- **Purpose**: Manages user profiles and data.
- **Port**: `9010`
- **Custom Image**: `viraj179/user-management-service:latest`

---

## How to Run

### Step 1: Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/SoftGrid2/ems.git
cd ems

docker pull confluentinc/cp-zookeeper:latest
docker pull confluentinc/cp-kafka:latest
docker pull viraj179/nlss-auth-service:latest
docker pull viraj179/nlss-user-management-service:latest

---

## Step 1: Start the application
docker-compose up -d

### Step 2: Verify Running Containers
docker ps

### Step 3: You should see the following containers:

zookeeper
kafka
auth-service
user-management

### Notes
Ensure Zookeeper starts before Kafka.
Kafka must be running for auth-service and user-management-service to work properly.
The services communicate internally through the kafka-network defined as a bridge network.

```

---

# Querying Databases in Docker Containers for `auth-service` and `user-management`

This guide provides steps to query databases running in Docker containers for both `auth-service` and `user-management` services.

---

## Prerequisites

- Docker and Docker Compose installed on your machine.
- PostgreSQL client installed locally (optional for direct host access).
- Databases `auth-service` and `user-management` running in Docker containers.

---

## Querying the `auth-service` Database

### **Accessing the Docker Container**

1. Find the running container for `auth-service`:

   ```bash
   docker ps
   ```

2. Access the PostgreSQL database inside the `auth-service` container:

   ```bash
   docker exec -it postgres-auth-service psql -U postgres -d auth-service
   ```

3. Verify tables in the database:
   ```sql
   \dt
   ```

### **Common SQL Queries**

- View data in the `users` table:

  ```sql
  SELECT * FROM users LIMIT 10;
  ```

- Count total users:

  ```sql
  SELECT COUNT(*) FROM users;
  ```

- Insert a sample user:
  ```sql
  INSERT INTO users (email, password, role, name, created_at, updated_at)
  VALUES ('example@example.com', 'securepassword', 'Admin', 'John Doe', NOW(), NOW());
  ```

---

## Querying the `user-management` Database

### **Accessing the Docker Container**

1. Find the running container for `user-management`:

   ```bash
   docker ps
   ```

2. Access the PostgreSQL database inside the `user-management` container:

   ```bash
   docker exec -it postgres-user-management psql -U postgres -d user-management
   ```

3. Verify tables in the database:
   ```sql
   \dt
   ```

### **Common SQL Queries**

- View data in the `users` table:

  ```sql
  SELECT * FROM users LIMIT 10;
  ```

- Insert a sample user:

  ```sql
  INSERT INTO users (email, password, name, created_at, updated_at)
  VALUES ('jane.doe@example.com', 'securepassword', 'Jane Doe', NOW(), NOW());
  ```

- Delete a user by ID:
  ```sql
  DELETE FROM users WHERE id = 1;
  ```

---

## Tips for Managing Databases

- **Exporting a Database:**

  ```bash
  docker exec -it postgres-auth-service pg_dump -U postgres auth-service > auth-service.sql
  ```

- **Restoring a Database:**

  ```bash
  docker exec -i postgres-auth-service psql -U postgres auth-service < auth-service.sql
  ```

- **Backup for `user-management`:**
  ```bash
  docker exec -it postgres-user-management pg_dump -U postgres user-management > user-management.sql
  ```

---

## Troubleshooting

- **Error: Relation does not exist**

  - Verify the correct database is selected.
  - Check if the tables were created properly using `\dt`.

- **Connection Issues**

  - Ensure environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) are correctly set.
  - Restart containers to apply changes:
    ```bash
    docker-compose restart
    ```

- **Check Logs**
  ```bash
  docker logs postgres-auth-service
  docker logs postgres-user-management
  ```

---

## Useful Commands

- List all databases:

  ```sql
  \l
  ```

- Describe a table:

  ```sql
  \d table_name
  ```

- Exit PostgreSQL:
  ```bash
  \q
  ```

---
