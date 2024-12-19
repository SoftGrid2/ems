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
- **Port**: `4000`
- **Custom Image**: `viraj179/auth-service:latest`

### 4. **User Management Service**

- **Purpose**: Manages user profiles and data.
- **Port**: `4001`
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
