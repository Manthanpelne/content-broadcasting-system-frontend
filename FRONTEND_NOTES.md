🎓 Educast - Content Broadcasting System Frontend Documentation
Welcome to the Educast dashboard. This project is built with Next.js 15, Tailwind CSS, and Zustand. It’s designed to be sleek, fast, and easy to use for both Teachers and Principals.

## 📂 Project Structure: Where things live
I’ve organized the code so it’s easy to find exactly what you’re looking for:
/app: The heart of the app. I’ve grouped routes by role (Teacher/Principal) so the code stays clean.
/components: Split into two parts. ui/ contains small building blocks like buttons, while shared/ contains bigger pieces like the Navbar and Sidebar.
/services: This is the "brain" for data. Instead of putting API logic inside the UI, it all happens here.
/store: Holds the "Global Memory" for the app (like who is logged in).

## 🔐 Authentication: Keeping it secure
To make the login feel real without a full backend:
Login: When you log in, the app remembers your name and role (Teacher or Principal).
Memory: I used a tool called Zustand Persist. This means if you refresh the page or close your browser, the app doesn't "forget" you—you stay logged in.

Logout: Clicking logout wipes the memory and sends you back to the gate (Login page).

## 🚦 Role-Based Routing: Who sees what?
The app acts like a security guard:
Smart Sidebar: If you are a Teacher, you see "My Uploads." If you are a Principal, you see "Pending Approvals."
Locked Doors: If a Teacher tries to manually type /principal in the URL, the app checks their role and blocks them from seeing that page.
Public Access: The "Live Broadcast" page is public—anyone with the link can see the school’s TV content.

## 📡 API & Data Approach: Built for the future
I built this to be "Backend-Ready":
The Mock API: Right now, the app saves everything to your browser’s localStorage.
Ready to Swap: If we build a real MongoDB/Node.js backend tomorrow, we only have to change one file (content-service.js) and the whole app will work instantly.

Live Updates: I used TanStack Query. It’s like a heartbeat—it checks for new approvals every 30 seconds so the "Live" screen updates automatically without you clicking refresh.

## 🧠 State Management: How we handle data
Zustand: Handles the "Big Stuff" like user identity.
TanStack Query: Handles the "Content Stuff" (fetching lists, status updates).
React State: Handles the "Little Stuff" (opening modals, typing in search bars).

## 📝 My Assumptions 
Image Storage: Since I don't have a cloud server (like AWS), I convert images into Base64 strings. This allows the image data to live right inside your browser memory so the Principal can see what you uploaded.

The "Live" Rule: For an image to show up on the school TV, two things must be true:
-The Principal has Approved it.
-The current time must be between the Start Time and End Time. Start time should be today's date and end time should be tomorrow's date


## Technical Stack
Framework: Next.js 15 (App Router)
Styling: Tailwind CSS + Shadcn UI
State: Zustand + TanStack Query (React Query)
Icons: Lucide React
Validation: Zod + React Hook Form