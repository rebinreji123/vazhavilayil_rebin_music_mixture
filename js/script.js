const icons = document.querySelectorAll('.icon');
const boxes = document.querySelectorAll('.box');
const audios = document.querySelectorAll('audio');
const resetButton = document.getElementById('resetButton');

let activeIcon = null;
let originalParent = null;
let occupiedBoxes = [false, false, false, false];

icons.forEach((icon) => {
  icon.addEventListener('dragstart', dragStart);
});

boxes.forEach((box, index) => {
  box.addEventListener('dragover', dragOver);
  box.addEventListener('drop', (e) => drop(e, index));
});

resetButton.addEventListener('click', resetIcons);

function dragStart(e) {
  activeIcon = e.currentTarget; // Use currentTarget to select the whole .icon element
  originalParent = e.currentTarget.parentElement; // Store the original parent
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e, index) {
  e.preventDefault();

  if (!e.target.classList.contains('icon') && !occupiedBoxes[index]) {
    const box = e.target;

    // Check if the icon is not already in a box
    if (!activeIcon.parentElement.classList.contains('box')) {
      // Append the dragged icon to the box
      box.appendChild(activeIcon);
      occupiedBoxes[index] = true;

      // Resize the dropped icon to fit the box dimensions
      activeIcon.style.width = '100%';
      activeIcon.style.height = '100%';

      // Play the corresponding audio when dropped
      const audioId = activeIcon.id.replace('icon', 'audio');
      const audio = document.getElementById(audioId);
      audio.currentTime = 0;
      audio.play();
    }
  }
}

function resetIcons() {
  icons.forEach((icon) => {
    const originalBox = originalParent;
    originalBox.appendChild(icon);

    // Reset icon size to original dimensions
    icon.style.width = '50px';
    icon.style.height = '50px';
  });

  occupiedBoxes = [false, false, false, false]; // Reset the occupied boxes

  // Pause and reset all audio
  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}


const pauseButton = document.getElementById('pauseButton');
let isPlaying = true; // Track if audio is currently playing or paused

pauseButton.addEventListener('click', toggleAudio);

function toggleAudio() {
  if (isPlaying) {
    // Pause all audio when the pause button is clicked
    audios.forEach((audio) => {
      audio.pause();
    });
    pauseButton.textContent = 'Resume'; // Change button text to "Resume"
  } else {
    // Resume playing audio when the pause button is clicked again
    audios.forEach((audio) => {
      audio.play();
    });
    pauseButton.textContent = 'Pause'; // Change button text back to "Pause"
  }

  isPlaying = !isPlaying; // Toggle the isPlaying flag
}
