# Assessment-PanurgicAU ![Static Badge](https://img.shields.io/badge/HirushaDinujaya-hdx0315-%236fffe9?logo=hexo&logoColor=%236fffe9&labelColor=%23000)

## Main Functionalities

- User SignUp
- User SignIn
  
- View Booked/Available Time Slots
- View Previous Bookings of an User
- Add Booking
- Delete Booking
  
- Admin Login
- Admin Dashboard
- Admin View of All Appoiintments

  
## Product Screenshots

### User Login Screen
![Screenshot 1.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss1.png)

### Home Screen (View available time-slots for a day)
![Screenshot 2.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss2.png)

### Add Booking screen
![Screenshot 3.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss3.png)

### My Appointments Screen
![Screenshot 4.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss4.png)

### Admin Dashboard
![Screenshot 5.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss5.png)

### Mobile View of Add Booking
![Screenshot 6.](https://github.com/hdx0315/assessment-PanurgicAU/blob/main/Assets/ss6.png)

## Project Structure

- `appointment-backend/`: Contains the backend codebase.
- `appointment-frontend/`: Contains the frontend codebase.


## Tech Stack

- **Frontend:**
  - React (with Vite) ![Static Badge](https://img.shields.io/badge/React-React?logo=react&logoColor=%2303fcfc&label=-&labelColor=%23000&color=%2303fcfc) ![Static Badge](https://img.shields.io/badge/Vite-Vite?logo=vite&logoColor=%23874dfa&label=-&labelColor=%23000&color=%235603fc)

  - Tailwind CSS for styling  ![Static Badge](https://img.shields.io/badge/Tailwind-Tailwind?logo=tailwindcss&logoColor=%234dd5fa&label=-&labelColor=%23000&color=%234dd5fa)

- **Backend:**
  - Node.js ![Static Badge](https://img.shields.io/badge/Node-Node?logo=Node.js&logoColor=%234dfa67&label=-&labelColor=%23000&color=%234dfa67)
  - Express.js ![Static Badge](https://img.shields.io/badge/Node-Node?logo=express&logoColor=%234deefa&label=-&labelColor=%23000&color=%234deefa)
  - MySQL for database ![Static Badge](https://img.shields.io/badge/MySQL-MySQL?logo=mysql&logoColor=%230f0&label=-&labelColor=%23000&color=%230f0)

- **Additional Tools:**
  - Responsive design principles
  - RESTful API architecture


## Getting Started

To set up and run the project locally, follow the instructions for both the backend and frontend.

### Prerequisites

- [Node.js](https://nodejs.org/) (Ensure you have the latest LTS version installed)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup

1. **Navigate to the Backend Directory**:

   ```bash
   cd appointment-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the `appointment-backend` directory.
   - Add the following environment variables .

```
   DB_NAME=appointment_system
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=jwt_secret
```

5. **Start the Backend Server**:

   ```bash
   npm start
   ```

   The backend server should now be running, typically on `http://localhost:5000/`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd appointment-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure TailwindCSS**:

   - https://tailwindcss.com/docs/installation/using-vite 
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

4. **Start the Frontend Development Server**:

   ```bash
   npm run dev
   ```

   The frontend application should now be running, typically on `http://localhost:5173/`.


### API Endpoints

- POST : api/auth/login : For user Login
- POST : api/auth/register : For user Register

- POST api/admin/auth/login: For admin Login

- GET : api/slots?[date] : For fetching all slots.
- GET : api/appointments : For fetching all appointments of a user.

- POST : api/appointments : For adding an appointment

- DELETE : api/appointments?[id] : For deleting an appointment.

## Developed By 

- Hirusha Dinujaya
 ![Static Badge](https://img.shields.io/badge/HirushaDinujaya-hdx0315-%236fffe9?logo=hexo&logoColor=%236fffe9&labelColor=%23000)
