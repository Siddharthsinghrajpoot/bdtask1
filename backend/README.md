# Events & Nudges Management Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) 
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)

A **Node.js + Express + MongoDB backend** project to manage **Events** and **Event Nudges**.  
Provides full **CRUD functionality** with proper validation, pagination, and ObjectId checks.

---

## Table of Contents
1. [Tech Stack](#tech-stack)  
2. [Base URL](#base-url)  
3. [Task 1 – Events API](#task-1--events-api)  
   - [Event Data Model](#event-data-model)  
   - [Events API Endpoints](#events-api-endpoints)  
4. [Task 2 – Nudges API](#task-2--nudges-api)  
   - [Nudge Data Model](#nudge-data-model)  
   - [Nudges API Endpoints](#nudges-api-endpoints)  
5. [Database Design](#database-design)  
6. [Validation & Error Handling](#validation--error-handling)  
7. [Run the Project](#run-the-project)  
8. [Postman Collection](#postman-collection)  
9. [Project Highlights](#project-highlights)  

---

## Tech Stack
- Node.js  
- Express.js  
- MongoDB (Native Driver)  
- dotenv  
- nodemon (for development)  

---

## Base URL
http://localhost:5000/api/v3/app



---

# Task 1 – Events API

## Event Data Model

| Field        | Type   | Required |
|-------------|--------|----------|
| name        | String | Yes |
| tagline     | String | Yes |
| schedule    | String (ISO Date) | Yes |
| description | String | Yes |
| moderator   | String | Yes |
| category    | String | Yes |
| sub_category| String | Yes |
| rigor_rank  | Number | Yes |
| files       | Array  | No  |

---

## Events API Endpoints

### 1️⃣ Create Event

---

# Task 1 – Events API

## Event Data Model

| Field        | Type   | Required |
|-------------|--------|----------|
| name        | String | Yes |
| tagline     | String | Yes |
| schedule    | String (ISO Date) | Yes |
| description | String | Yes |
| moderator   | String | Yes |
| category    | String | Yes |
| sub_category| String | Yes |
| rigor_rank  | Number | Yes |
| files       | Array  | No  |

---

## Events API Endpoints

### 1️⃣ Create Event
POST /events
**Request Body Example**
```json
{
  "name": "Tech Conference",
  "tagline": "Future of Technology",
  "schedule": "2026-01-20T10:00:00Z",
  "description": "Annual technology conference",
  "moderator": "John Doe",
  "category": "Technology",
  "sub_category": "AI",
  "rigor_rank": 5,
  "files": ["banner.png"]
}

2️⃣ Get All Events
GET /events

3️⃣ Get Single Event by ID
GET /events?id=<event_id>

4️⃣ Get Latest Events (Pagination)
GET /events?type=latest&limit=5&page=1

5️⃣ Update Event
PUT /events/:id

6️⃣ Delete Event
DELETE /events/:id



Task 2 – Nudges API
Overview
Nudge = Reminder or notification linked to an Event
Features: title, description, schedule, optional image/icon/invitation
Must link to an existing Event via eventId

Nudge Data Model
| Field       | Type                 | Required |
| ----------- | -------------------- | -------- |
| eventId     | String (Event `_id`) | Yes      |
| title       | String               | Yes      |
| schedule    | String (ISO Date)    | Yes      |
| description | String               | Yes      |
| image       | String (URL)         | No       |
| icon        | String (URL)         | No       |
| invitation  | String               | No       |


Nudges API Endpoints

1️⃣ Create Nudge
POST /nudges

Request Body Example
{
  "eventId": "695657cdbf6343bb63349dc6",
  "title": "Event Reminder",
  "schedule": "2026-01-20T09:00:00Z",
  "description": "Reminder for upcoming event",
  "image": "https://example.com/cover.png",
  "icon": "https://example.com/icon.png",
  "invitation": "Join us today!"
}

2️⃣ Get All Nudges
GET /nudges

3️⃣ Get Single Nudge
GET /nudges?id=<nudge_id>

4️⃣ Update Nudge
PUT /nudges/:id

5️⃣ Delete Nudge
DELETE /nudges/:id


Database Design
Database Name: myAppDB
Collections: events, nudges
Relationship:
Each Nudge stores eventId referencing _id of Event
MongoDB generates _id automatically for both Events and Nudges


Validation & Error Handling
Required fields checked before DB operations
Invalid/missing ObjectIds return clear errors
Optional fields validated for correct type
Files array validated if provided

Run the Project
git clone <repo-url>
cd <repo-folder>
npm install
npm run dev

Server runs at:http://localhost:5000



Postman Collection
Import Events-Nudges.postman_collection.json
All CRUD endpoints ready for testing
Supports query params, path params, and request body


Project Highlights
Professional REST API structure
Native MongoDB driver (no Mongoose)
Events and Nudges clearly separated
Pagination for latest events
Full CRUD with validation & error handling
Company-ready for GitHub portfolio submission


















