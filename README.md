# Mini Ride Booking System Prototype 🚖

A lightweight ride-hailing prototype designed for testing in smaller cities.
## Features 

## 🚖 Passenger Features

1. **User Authentication**  
   Register and login using basic authentication.

2. **Ride Request**  
   Enter pickup and drop-off locations using text addresses.  
   Select ride type: **Bike**, **Car**, or **Rickshaw**.

3. **Ride Status Tracking**  
   Monitor the ride status in real time:  
     `Requested → Accepted → In Progress → Completed`.

4. **Ride History**  
   View a history of all previous rides.

---

## 🚗 Driver Features

1. **Ride Acceptance**  
   Accept or reject incoming ride requests.

2. **Ride Management**  
   Update the ride status from acceptance to completion.

## Tech Stack 🛠️

### Frontend
- React.js (Vite)
- Material-UI (MUI) for UI components
- Context API for state management

### Backend
- Node.js with Express
- MongoDB (MongoDB Atlas)

## Project Structure 📂

```
mini-ride-booking/
├── backend/               # Backend server code
│   ├── routes/            # API route handlers
│   ├── index.js           # Main server setup
│   └── server.js          # Server entry point
└── frontend/              # Frontend React app
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── context/       # Auth context
    │   ├── pages/         # Application screens
    │   ├── routes/        # Route definitions
    │   ├── theme/         # MUI theme config
    │   └── App.jsx        # Main app component
    ├── public/            # Static assets
    └── vite.config.js     # Vite configuration
```

## Data Model 🗃️

### Entities

**Users**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  userType: String, // "rider" or "captain" (driver)
  createdAt: DateTime
}
```

**Rides**
```javascript
{
  _id: ObjectId,
  passenger_email: String, // references Users.email
  driver_email: String, // references Users.email (nullable)
  pickup_location: String,
  drop_location: String,
  ride_type: String, // "bike", "car", or "rickshaw"
  status: String, // "requested", "accepted", "in-progress", "completed"
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## Getting Started 🚀

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mini-ride-booking.git
   cd mini-ride-booking
   ```

2. Set up backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MongoDB credentials
   ```

3. Set up frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## API Endpoints (Backend) 🌐

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rides` | GET | Get all active rides |
| `/api/rides` | POST | Create new ride request |
| `/api/rides/:id` | GET | Get ride details |
| `/api/rides/:id/accept` | PUT | Accept a ride (driver) |
| `/api/rides/:id/start` | PUT | Start a ride (driver) |
| `/api/rides/:id/complete` | PUT | Complete a ride (driver) |

## Screenshots 📸

(Add screenshots of your application here if available)

## Assumptions 📝

1. Fake Auth for demo 
2. Polling mechanism for ride status updates (no WebSockets)
3. 1 Ride at a time.
   

## Future Enhancements 🔮

- Real-time tracking with WebSockets
- GPS location integration
- Payment processing
- Rating system for drivers/passengers
- Push notifications
- Enhanced driver matching algorithm
- Persistant Auth FLow
- Ride Cancellation

 
 ## Screenshots
 1. Dashboard for user on left side and captain on right side.
    ![image](https://github.com/user-attachments/assets/c2402fff-34bf-4845-bb45-b2cb3a1bb2ac)
 2. Ride Request generated which will be shown to available captains.
    ![image](https://github.com/user-attachments/assets/162e6e67-881b-4da2-9d07-187f751bb6da)
 3. When a driver accepts, starts or finish a ride , user's screen is updated using polling.
    ![image](https://github.com/user-attachments/assets/1cd31b59-40a3-4440-a468-8f77e448c156)
    ![image](https://github.com/user-attachments/assets/2b1a82d2-358a-4288-84e6-480aa0f8dc1b)
    ![image](https://github.com/user-attachments/assets/7e84e91a-0acc-4e92-a71a-4cf87fe16dd0)
4. Ride History is hard coded as of now, can be inttegrated easily with database.
    ![image](https://github.com/user-attachments/assets/1ce6a581-d20d-421b-9daf-d94faee002f0)





