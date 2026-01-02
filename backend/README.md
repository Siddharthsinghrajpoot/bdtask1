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
4. [Task 2 – Nudges API](#task-2--nudges-api)
5. [Database Design](#database-design)
6. [Validation & Error Handling](#validation--error-handling)
7. [Run the Project](#run-the-project)
8. [Postman Collection](#postman-collection)
9. [Project Highlights](#project-highlights)
10. [Environment Variables](#environment-variables)

---

## Tech Stack
- Node.js
- Express.js
- MongoDB (Native Driver)
- dotenv
- nodemon

---

## Base URL
http://localhost:5000/api/v3/app



---

# Task 1 – Events API

## Event Data Model

| Field | Type | Required |
|------|------|----------|
| name | String | Yes |
| tagline | String | Yes |
| schedule | ISO Date String | Yes |
| description | String | Yes |
| moderator | String | Yes |
| category | String | Yes |
| sub_category | String | Yes |
| rigor_rank | Number | Yes |
| files | Array | No |

---

## Events API Endpoints

### 1️⃣ Create Event  
**POST** `/events`

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

3️⃣ Get Single Event

GET /events?id=<event_id>

4️⃣ Get Latest Events (Pagination)

GET /events?type=latest&limit=5&page=1

5️⃣ Update Event

PUT /events/:id

6️⃣ Delete Event

DELETE /events/:id

# Task 2 – Nudges API

## Nudge Data Model

| Field | Type | Required |
|------|------|----------|
| eventId | String (Event `_id`) | Yes |
| title | String | Yes |
| schedule | String (ISO Date) | Yes |
| description | String | Yes |
| image | String (URL) | No |
| icon | String (URL) | No |
| invitation | String | No |

---

## Nudges API Endpoints

### 1️⃣ Create Nudge  
**POST** `/nudges`

**Request Body Example**
```json
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

3️⃣ Get Single Nudge by ID

GET /nudges?id=<nudge_id>

4️⃣ Update Nudge

PUT /nudges/:id

5️⃣ Delete Nudge

DELETE /nudges/:id


# Database Design

## Database Details

| Item | Description |
|-----|-------------|
| Database Name | myAppDB |
| Collections | events, nudges |

---

## Collections Structure

### 1️⃣ Events Collection
- Stores all event-related information
- MongoDB auto-generates `_id` for each event

### 2️⃣ Nudges Collection
- Stores reminders/notifications
- Each nudge references an event using `eventId`

---

## Relationship
- One **Event** → Many **Nudges**
- `nudges.eventId` → references `events._id`


# Validation & Error Handling

## Validation Rules

### 1️⃣ Events Validation
- All required fields must be present
- `rigor_rank` must be a number
- `schedule` must be a valid ISO date
- `files` must be an array if provided

### 2️⃣ Nudges Validation
- `eventId` must be a valid MongoDB ObjectId
- Referenced event must exist
- `schedule` must be a valid ISO date

---

## Error Handling
- Invalid ObjectId returns proper error response
- Missing required fields return validation errors
- Database errors handled gracefully
- Consistent API error messages

# environment-variables

## Required Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URL=mongodb+srv://test-y:OyCNnlgdSkrp6PiA@cluster0.pzejdkz.mongodb.net/myAppDB?












