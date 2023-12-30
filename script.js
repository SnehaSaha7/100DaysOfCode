
// Assuming 'tasks.md' is in the same directory as your HTML file
const tasksFile = 'tasks.md';

// Function to fetch the content of the tasks file
async function fetchTasks() {
    try {
        const response = await fetch(tasksFile);
        const content = await response.text();
        return content.split('\n').filter(Boolean);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}
let dayContents = [];

fetchTasks().then(tasks => {
  dayContents = tasks;
});




function createDayButtons() {
  const container = document.querySelector(".container");

  for (let i = 1; i <= dayContents.length; i++) {
    if ((i - 1) % 7 === 0) {
      // Create a new week container
      const weekContainer = document.createElement("div");
      weekContainer.className = "weeks-container";

      // Create the week label with specific styles
      const weekLabel = document.createElement("div");
      weekLabel.className = "week-label";
      weekLabel.innerText = `Week ${Math.ceil(i / 7)}`;
      weekLabel.style.writingMode = "vertical-rl";

      // Create a new container for the days buttons
      const daysContainer = document.createElement("div");
      daysContainer.className = "days-container";

      // Append the week label to the week container
      weekContainer.appendChild(weekLabel);

      // Create 7 days buttons
      for (let j = 0; j < 7; j++) {
        const day = i + j;
        if (day <= dayContents.length) {
          const button = document.createElement("button");
          button.innerText = `Day ${day}`;
          button.className = "day-button";
          button.onclick = () => showDay(day);
          daysContainer.appendChild(button);
        }
      }

      // Append the days container to the week container
      weekContainer.appendChild(daysContainer);
      const weekdivider = document.createElement("div");
      weekdivider.className = "week-divider";
      container.appendChild(weekdivider);
      // Append the week container to the main container
      container.appendChild(weekContainer);
    }
  }
}

function showDay(day) {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");

  // Ensure the day is within a valid range
  if (day >= 1 && day <= dayContents.length) {
    const dayContent = dayContents[day - 1];
    popupContent.innerHTML = dayContent;
    popup.style.display = "flex";
  } else {
    alert("Invalid day selection");
  }
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

window.onload = createDayButtons;

// const dayContents = [
//     "<b>Day 1:</b> Lorem ipsum dolor sit amet 1.",
// ];
