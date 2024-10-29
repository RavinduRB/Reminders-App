# 🚀 Reminders App

![Image1](https://github.com/user-attachments/assets/841b0699-15d4-48a5-9587-467d9214f160)

![Image2](https://github.com/user-attachments/assets/78fed9d7-ec78-4e43-b1cf-f8baa359dfb0)

## 🚀 Reminders App - Operation

This reminders app is a countdown timer and alarm system with data storage capabilities, allowing users to set reminders, store them in a database, edit or delete reminders, and play an alarm sound when the countdown finishes. Here’s a breakdown of how it all works across each component:

### 1. **index.html**
   - **Purpose**: Provides the main structure of the app’s user interface.
   - **Features**:
     - Form fields for setting countdown hours, minutes, and seconds.
     - A “Start Countdown” button to begin a countdown and a “Stop Alarm” button to stop the alarm when it sounds.
     - Table to display reminders stored in the database, with options to edit or delete each one.

### 2. **countdown.js**
   - **Purpose**: Manages the countdown functionality, plays the alarm sound, and displays the remaining time.
   - **Working**:
     - **Start Countdown**: `startCountdown()` is triggered when the user begins a countdown.
       - It converts the inputted hours, minutes, and seconds into total seconds, then uses `setInterval` to decrement this time every second.
       - The countdown time is displayed on the screen in real-time.
       - When the countdown reaches zero, it plays an alarm sound, displays “Time’s up!” and shows the “Stop Alarm” button.
     - **Stop Alarm**: `stopAlarm()` pauses and resets the alarm sound, hides the “Stop Alarm” button, and allows a new countdown to start.

### 3. **script.js**
   - **Purpose**: Handles reminder management (setting, loading, editing, and deleting reminders) and communicates with an IndexedDB database.
   - **Working**:
     - **Database Initialization**: Initializes an IndexedDB database named `reminderDB` with an object store called `reminders`.
       - This database stores each reminder with `day`, `time`, and a unique `id` for easy retrieval, modification, and deletion.
     - **Set Alarm**: The `setAlarm()` function stores a new reminder in the database.
       - It retrieves the selected day and time from user input, adds them to the `reminders` object store, and then calls `loadReminders()` to refresh the displayed list of reminders.
     - **Load Reminders**: `loadReminders()` retrieves and displays all reminders from the database.
       - It opens a read-only transaction to access all reminders, and passes them to `displayReminders()` to render in the HTML table.
     - **Edit Reminder**: `editReminder()` allows users to update an existing reminder’s day and time, then reloads the updated list.
     - **Delete Reminder**: `deleteReminder()` removes a reminder by `id` and refreshes the displayed list.

### 4. **server.js**
   - **Purpose**: Serves as a backend API for storing reminders in an SQLite database (for demonstration purposes, the database is in-memory).
   - **API Endpoints**:
     - `/addReminder`: Adds a new reminder to the SQLite database.
     - `/getReminders`: Retrieves all reminders from the SQLite database.
     - `/editReminder/:id`: Updates an existing reminder in the database by `id`.
     - `/deleteReminder/:id`: Deletes a reminder from the database by `id`.
   - **Express Server**: Serves static files (like HTML, CSS, and JavaScript) and listens for API requests on port 3000.

### 5. **styles.css**
   - **Purpose**: Provides styling to make the app visually appealing and user-friendly.
   - **Key Styles**:
     - Styles the countdown display, buttons, table, and layout elements for readability and consistency.
     - Ensures button hover effects, table row colors, and the visibility of specific elements like the alarm button for an interactive user experience.

---

### **Reminder Alert Mechanism**
When the countdown timer matches the set time in the reminders database:
   - The alarm sound is triggered to alert the user.
   - The “Stop Alarm” button appears to allow users to stop the alarm manually, adding interactivity.

In essence, this app combines front-end and back-end components for managing reminders, running countdowns, and alerting users, with data persistence for reminders through IndexedDB. The server allows for seamless communication and data management while maintaining a simple yet effective UI.

---

## **🚀 Reminder & Countdown App - User Manual**


## **App Overview**
This Reminder & Countdown App allows you to:
1. Set up a countdown timer and receive an alarm alert when it ends.
2. Create, edit, and delete reminders for specific days and times.
3. View and manage a list of reminders, which are saved for future reference.

This user-friendly guide will walk you through using each of these features.

---

### **1. Starting the App**
   - Ensure the app server is running. Open a web browser and go to `http://localhost:3000` (or the specified address if different).
   - You’ll see the main interface with options to set a countdown, add reminders, and view stored reminders in a table.

---

### **2. Countdown Timer**
#### **Setting and Starting a Countdown**
1. **Enter the Countdown Time**:
   - In the “Countdown Timer” section, enter the desired hours, minutes, and seconds for the countdown.
   
2. **Start the Countdown**:
   - Click **Start Countdown**. The countdown display will show the remaining time, updated every second.

3. **Alarm Notification**:
   - When the countdown reaches zero, an alarm sound will play, and the display will read, “Time’s up!”
   - The **Stop Alarm** button will appear to allow you to turn off the sound.

#### **Stopping the Alarm**
   - To stop the alarm, click **Stop Alarm**. This will pause and reset the alarm sound.

---

### **3. Setting a Reminder**
#### **Adding a New Reminder**
1. **Select Reminder Time**:
   - In the “Reminder” section, select the hours, minutes, and seconds for your reminder.
   
2. **Enable Day Setting (Optional)**:
   - To specify a day, check **Set Day** and select a date.
   - If not enabled, the reminder will default to today’s date.

3. **Save Reminder**:
   - Click **Set Reminder** to save the reminder.
   - The new reminder will be added to the list in the “Reminders” section below.

---

### **4. Managing Reminders**
#### **Viewing Reminders**
   - All reminders are displayed in a table in the “Reminders” section.
   - Each row shows the reminder’s **Date** and **Time**.

#### **Editing a Reminder**
1. Click **Edit** beside a reminder you wish to modify.
2. A prompt will appear to update the date and time.
   - Enter the new date and/or time in the format requested (e.g., `HH:MM:SS` for time).
3. The reminder list will refresh to show the updated details.

#### **Deleting a Reminder**
   - To delete a reminder, click **Delete** beside the reminder.
   - This will remove the reminder from both the display and the database.

---

### **5. Tips and Troubleshooting**
- **Alarm Volume**: Make sure your device’s volume is on to hear the alarm.
- **Invalid Date/Time Inputs**: Ensure dates and times are correctly formatted (24-hour format for time) for reminders and countdowns.
- **Database Storage**: Reminders are stored in a database and will remain saved even after restarting the app.
  
---

### **App Interface Overview**
1. **Countdown Display**: Shows remaining countdown time in `HH:MM:SS` format.
2. **Reminders Table**: Lists reminders with **Date**, **Time**, and options to **Edit** or **Delete**.

---

With these steps, you should be fully equipped to use the Reminder & Countdown App for scheduling your reminders and using the countdown alarm effectively. Enjoy!
