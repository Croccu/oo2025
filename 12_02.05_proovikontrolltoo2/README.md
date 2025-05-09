# 📚 Dictionary App – Proovikontrolltöö

This is a full-stack dictionary management application built for the *09.05.2025 Proovikontrolltöö*.

It allows users to:
- View, add, edit, and delete dictionary **words** with descriptions
- Link words to a **manager** (dictionary owner)
- Sort and paginate words
- View manager-specific word lists
- Fetch and display related images via the **Unsplash API**

---

## 🧱 Project Structure
12_02.05_proovikontrolltoo2/
├── dictionary/ ← Java Spring Boot backend
├── frontend/ ← React + TypeScript frontend
├── start.sh ← Start script for macOS/Linux
├── start.bat ← Start script for Windows
├── README.md

---

## 🚀 How to Run

### 🔹 Backend (Spring Boot)
- Requires Java 17+ and PostgreSQL running.
- Configured in `dictionary/src/main/resources/application.properties`
- Starts automatically via script.

### 🔹 Frontend (React + Vite)
- Requires Node.js 18+
- Runs on [http://localhost:5173](http://localhost:5173)

---

## 🛠 Launching the App

From the root folder (12_02.05_proovikontrolltoo2):

### macOS / Linux
```bash
./start.sh

### macOS / Linux
start.bat
or
Double-click start.bat
