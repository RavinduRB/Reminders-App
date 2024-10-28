// Initialize IndexedDB
let db;
const request = indexedDB.open("reminderDB", 1);

request.onerror = (event) => {
    console.error("Database error:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("reminders", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;
    loadReminders();
};

// Toggle day setting
document.getElementById('day-set').addEventListener('change', function() {
    document.getElementById('alarm-day').disabled = !this.checked;
});

// Set Alarm function
function setAlarm() {
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const seconds = document.getElementById('seconds').value;
    const day = document.getElementById('day-set').checked ? document.getElementById('alarm-day').value : new Date().toISOString().split('T')[0];
    
    const reminder = { day, time: `${hours}:${minutes}:${seconds}` };
    const transaction = db.transaction(["reminders"], "readwrite");
    const objectStore = transaction.objectStore("reminders");
    objectStore.add(reminder);

    transaction.oncomplete = () => {
        loadReminders();
    };
}

// Load Reminders function
function loadReminders() {
    const transaction = db.transaction(["reminders"]);
    const objectStore = transaction.objectStore("reminders");

    const reminders = [];
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            reminders.push({ id: cursor.key, ...cursor.value });
            cursor.continue();
        } else {
            displayReminders(reminders);
        }
    };
}

// Display Reminders in Table
function displayReminders(reminders) {
    const tbody = document.getElementById('reminders-body');
    tbody.innerHTML = '';
    reminders.forEach(reminder => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reminder.day}</td>
            <td>${reminder.time}</td>
            <td><button onclick="editReminder(${reminder.id}, '${reminder.day}', '${reminder.time}')">Edit</button></td>
            <td><button onclick="deleteReminder(${reminder.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Edit Reminder function
function editReminder(id, day, time) {
    const newDay = prompt("Edit day:", day);
    const newTime = prompt("Edit time (HH:MM:SS):", time);
    if (newDay && newTime) {
        const transaction = db.transaction(["reminders"], "readwrite");
        const objectStore = transaction.objectStore("reminders");
        objectStore.get(id).onsuccess = (event) => {
            const reminder = event.target.result;
            reminder.day = newDay;
            reminder.time = newTime;
            objectStore.put(reminder).onsuccess = () => {
                loadReminders();
            };
        };
    }
}

// Delete Reminder function
function deleteReminder(id) {
    const transaction = db.transaction(["reminders"], "readwrite");
    const objectStore = transaction.objectStore("reminders");
    objectStore.delete(id).onsuccess = () => {
        loadReminders();
    };
}
