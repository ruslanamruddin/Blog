document.addEventListener("DOMContentLoaded", function() {
    // Curated list of distinct, eccentric fonts from Google Fonts and system fonts.
    const fonts = [
      "'Bangers', cursive",
      "'Creepster', cursive",
      "'Freckle Face', cursive",
      "'Gloria Hallelujah', cursive",
      "'Pacifico', cursive",
      "'Chewy', cursive",
      "'Lobster', cursive",
      "'Indie Flower', cursive",
      "'Permanent Marker', cursive",
      "'Walter Turncoat', cursive",
      "'Audiowide', cursive",
      "'Monoton', cursive",
      "'Orbitron', sans-serif",
      "'Rye', cursive",
      "'Black Ops One', sans-serif",
      "'Baloo Bhai', cursive",
      "'Bungee', sans-serif",
      "'Caveat', cursive",
      "'Dancing Script', cursive",
      "'Luckiest Guy', cursive",
      "'Fredoka One', cursive",
      "'Gugi', sans-serif",
      "'Knewave', cursive",
      "'Odibee Sans', sans-serif",
      "'Righteous', cursive",
      "'Shadows Into Light', cursive",
      "'Staatliches', sans-serif",
      "'VT323', monospace"
    ];
  
    // Array of style options to choose from randomly.
    const styles = [
      { fontWeight: "normal", fontStyle: "normal" },
      { fontWeight: "bold", fontStyle: "normal" },
      { fontWeight: "normal", fontStyle: "italic" }
    ];
  
    // Select the hero title element (assumes an element with class "hero-title" exists)
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) {
      console.error("Element with class 'hero-title' not found!");
      return;
    }
  
    // Parameters for iterations and delays
    const totalIterations = 100;
    const targetTotalTime = 5000; // total time in ms (5 seconds)
    const startDelay = 30;  // starting delay in ms
    const endDelay = 500;   // final delay in ms
    const exponent = 12;     // cubic exponent for non-linear slowdown
  
    // Calculate unscaled delays for each iteration using a cubic interpolation.
    let delays = [];
    for (let i = 0; i < totalIterations; i++) {
      const t = i / (totalIterations - 1);  // normalized value between 0 and 1
      const unscaledDelay = startDelay + (endDelay - startDelay) * Math.pow(t, exponent);
      delays.push(unscaledDelay);
    }
    // Scale delays so that their sum equals the target total time (5000ms)
    const sumDelays = delays.reduce((acc, cur) => acc + cur, 0);
    const scaleFactor = targetTotalTime / sumDelays;
    delays = delays.map(delay => delay * scaleFactor);
  
    // Font size parameters (in vw)
    const startSize = 5; // starting font size (vw)
    const endSize = 15;   // final font size (vw)
  
    // Recursive function to change the font, style, and size
    let iteration = 0;
    function changeFont() {
      if (iteration >= totalIterations) {
        // Final step: set final style to Inter (sans-serif, bold, 15vw)
        heroTitle.style.fontFamily = "'Inter', sans-serif";
        heroTitle.style.fontWeight = "bold";
        heroTitle.style.fontStyle = "normal";
        heroTitle.style.fontSize = endSize + "vw";
        return;
      }
      
      // Choose a random font and random style
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      
      // Apply the random font and style
      heroTitle.style.fontFamily = randomFont;
      heroTitle.style.fontWeight = randomStyle.fontWeight;
      heroTitle.style.fontStyle = randomStyle.fontStyle;
      
      // Calculate and apply a gradually increasing font size
      const newSize = startSize + (endSize - startSize) * (iteration / (totalIterations - 1));
      heroTitle.style.fontSize = newSize + "vw";
      
      // Schedule the next change after the computed delay for this iteration
      setTimeout(() => {
        iteration++;
        changeFont();
      }, delays[iteration]);
    }
  
    // Start the recursive font change process
    changeFont();
  });
  







    document.addEventListener("DOMContentLoaded", function() {
      // Load global header from header.html
      function loadGlobalHeader() {
        fetch('header.html')
          .then(response => response.text())
          .then(data => {
            const container = document.getElementById('global-header');
            container.innerHTML = data;
            // Execute inline scripts in the loaded header.html
            const scripts = container.querySelectorAll("script");
            scripts.forEach(oldScript => {
              const newScript = document.createElement("script");
              if (oldScript.src) {
                newScript.src = oldScript.src;
              } else {
                newScript.textContent = oldScript.textContent;
              }
              document.head.appendChild(newScript);
              document.head.removeChild(newScript);
            });
          })
          .catch(error => console.error('Error loading header:', error));
      }
      loadGlobalHeader();

      // Fetch and display posts from the backend
      async function fetchPosts() {
        try {
          // Update this fetch URL to match your backend route for posts:
          const response = await fetch('https://blog-back-end-sprh.onrender.com/api/posts');
          const data = await response.json();
          const container = document.getElementById('postsContainer');
          container.innerHTML = '';
          data.posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post'; // Initially hidden due to CSS
            postDiv.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.excerpt}</p>
              <p><em>${new Date(post.date).toLocaleString()}</em></p>
            `;
            container.appendChild(postDiv);
          });
          observeElements();
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
      fetchPosts();

      // Intersection Observer for lazy reveal on posts, section headers, and secondary title
      function observeElements() {
        const animatedElements = document.querySelectorAll('.post, .section-title, .secondary');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.remove('visible');
            }
          });
        }, { threshold: 0.2 });
        animatedElements.forEach(element => observer.observe(element));
      }

 // After 5.5 seconds, subtitle below the hero title
      setTimeout(() => {
        const header = document.querySelector('.hero-subtitle');
        if (header) {
          header.classList.add('visible');
        } else {
          console.error("Header element not found!");
        }
      }, 5500);
      
      // After 5.5 seconds, reveal the arrow button
      setTimeout(() => {
        const arrow = document.getElementById('scrollArrow');
        if (arrow) {
          arrow.classList.add('visible');
        } else {
          console.error("Scroll arrow element not found!");
        }
      }, 5500);

      // When the arrow is clicked, scroll smoothly to the secondary title
      document.getElementById('scrollArrow').addEventListener('click', () => {
        const target = document.getElementById('second-title');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }
      });
    });

//stop scroll at the beginning

document.addEventListener("DOMContentLoaded", function() {
    // Disable scrolling
    document.body.style.overflow = "hidden";
  
    // After 5 seconds, enable scrolling again
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 5500); // 10,000 ms
  });
  
