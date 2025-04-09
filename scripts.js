// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  // --- Function to load HTML content ---
  function loadHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (element) {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          element.innerHTML = data;
          // ** Important: Re-run hamburger setup *after* header loads **
          if (elementId === 'header-placeholder') {
            setupHamburger();
          }
          // ** Important: Re-run dynamic year setup *after* footer loads **
           if (elementId === 'footer-placeholder') {
             setupDynamicYear();
           }
        })
        .catch(error => {
          console.error(`Could not load HTML from ${filePath}:`, error);
          element.innerHTML = `<p>Error loading content from ${filePath}.</p>`;
        });
    } else {
      console.warn(`Placeholder element with ID "${elementId}" not found.`);
    }
  }

  // --- Function to set up hamburger menu logic ---
  function setupHamburger() {
    const burger = document.querySelector('.hamburger');
    const navList = document.querySelector('nav ul'); // Target the ul directly

    if (burger && navList) {
        // Remove previous listener if any to prevent duplicates? Might not be necessary if loaded once.
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navList.classList.toggle('open');
      });
    } else {
      // It might take a moment for fetched HTML to be parsed, slight delay could help
      // setTimeout(() => {
      //     if (!document.querySelector('.hamburger')) console.warn("Hamburger menu elements not found after loading header.");
      // }, 100); // Check again shortly after load attempt
       console.warn("Hamburger elements not found immediately after header injection."); // More accurate warning
    }
  }

   // --- Function to set up dynamic copyright year ---
   function setupDynamicYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        } else {
            console.warn("Current year span not found after loading footer.");
        }
   }


  // --- Load Header and Footer ---
  loadHTML('header-placeholder', 'header.html');
  loadHTML('footer-placeholder', 'footer-content.html');

  // --- Original Hamburger Menu Logic (now moved into setupHamburger) ---
  // const burger = document.querySelector('.hamburger'); // ... this logic is now called after fetch completes

  // --- Original Dynamic Copyright Year (now moved into setupDynamicYear) ---
  // const yearSpan = document.getElementById('current-year'); // ... this logic is now called after fetch completes


  // --- Add other global or page-specific scripts here ---

}); // End DOMContentLoaded
