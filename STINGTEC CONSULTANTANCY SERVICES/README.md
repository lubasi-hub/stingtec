# STINGTEC BUSINESS CONSULTANTS - Website

This is the complete website for STINGTEC BUSINESS CONSULTANTS - Your Partner in Business Growth & Compliance.

## Project Structure

- `backend/` - Flask backend API with SQLite database
- `frontend/` - HTML/CSS/JavaScript frontend

## Features

1. **User Authentication** - Register, login, and admin access
2. **Service Booking System** - Customers can request services
3. **Admin Dashboard** - Manage users, services, blogs, and service requests
4. **Contact Form** - With email notifications
5. **Responsive Design** - Works on desktop and mobile devices

## How to Run

### Prerequisites
- Python 3.7+
- Node.js (optional, for development tools)

### Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `python app.py`
4. The backend will be available at `http://localhost:5000`

### Frontend Setup
1. Open `frontend/index.html` in your web browser
2. Or serve it using a local server

## Email Configuration

To enable email notifications from the contact form:

1. Set environment variables:
   - `SENDER_EMAIL`: Your email address
   - `SENDER_PASSWORD`: Your app password (not account password)
   - `SMTP_SERVER`: Your SMTP server (default: smtp.gmail.com)
   - `SMTP_PORT`: Your SMTP port (default: 587)

For Gmail:
- Use an App Password (not your regular password)
- Enable 2-factor authentication
- Generate an App Password specifically for this application

Example:
```bash
export SENDER_EMAIL="your-email@gmail.com"
export SENDER_PASSWORD="your-app-password"
python app.py
```

## Database

The application uses SQLite with the following tables:
- `users` - User accounts and authentication
- `services` - Available services
- `blogs` - Blog posts
- `service_bookings` - Service requests from customers

## Admin Access

- Default admin email: `stingteczambiasales@gmail.com`
- Default admin password: `stingtec 1234`
- Admin access is available after logging in

## Troubleshooting

### Contact Form Not Sending Emails
- The system will work but won't send emails if you haven't configured the email settings
- Check the console output for instructions on how to enable email notifications

### Service Requests Not Showing in Admin
- Make sure you're logged in as an admin user
- Service requests are stored in the database and should appear in the "Service Requests" tab

### Accounts Created Not Showing
- Ensure you're logged in as an admin to view all registered users
- User data is stored in the database and should be visible in the "Users" tab

## Issues Fixed

- ✅ Contact form now properly stores submissions in the database
- ✅ Email notifications added with proper configuration
- ✅ Service requests properly tracked in database
- ✅ User registration and authentication working
- ✅ Admin dashboard displays all required data