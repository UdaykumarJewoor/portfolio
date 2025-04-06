$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
  }

  window.addEventListener('scroll', function () {
    const headerArea = document.querySelector('.header-area');
    headerArea.classList.toggle('sticky', window.scrollY > 50);
  });

  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });


  //Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  const roles = ["Developer!", "Researcher!", "tech lover!"];
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  const roleElement = document.getElementById("role");

  function type() {
    if (currentCharIndex < roles[currentRoleIndex].length) {
      roleElement.textContent += roles[currentRoleIndex].charAt(currentCharIndex);
      currentCharIndex++;
      setTimeout(type, 100); // Typing speed
    } else {
      setTimeout(deleteRole, 1000); // Pause before deleting
    }
  }

  function deleteRole() {
    if (currentCharIndex > 0) {
      roleElement.textContent = roleElement.textContent.slice(0, -1);
      currentCharIndex--;
      setTimeout(deleteRole, 50); // Deleting speed
    } else {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(type, 500); // Pause before typing next role
    }
  }

  type();


  //contact form to excel sheet
  (function () {
    emailjs.init("91E1CCWAiHScoS7Vt"); // Replace with your EmailJS user ID
  })();

  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };

    emailjs.send('service_aptluqf', 'template_dx55q48', templateParams)
      .then(function () {
        document.getElementById("msg").textContent = "Message sent successfully!";
        document.getElementById("contactForm").style.display = "none";
        document.getElementById("reopenForm").style.display = "block";
      }, function (error) {
        document.getElementById("msg").textContent = "Failed to send the message. Please try again.";
        console.error('EmailJS error:', error);
      });
  });

  document.getElementById("reopenForm").addEventListener("click", function () {
    document.getElementById("contactForm").reset();
    document.getElementById("contactForm").style.display = "block";
    document.getElementById("reopenForm").style.display = "none";
    document.getElementById("msg").textContent = "";
  });

});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}


