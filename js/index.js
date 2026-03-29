/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar on load
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // --- Custom scroll-based active nav link tracker ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');

    function updateActiveLink() {
        const navHeight = document.querySelector('#mainNav').offsetHeight;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= navHeight + 80) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const parentLi = link.closest('li');
            if (parentLi) parentLi.classList.remove('active');

            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
                if (parentLi) parentLi.classList.add('active');
            }
        });
    }

    document.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Send email via FormSubmit AJAX (no domain restrictions, works on GitHub Pages)
function sendMail() {
    const submitBtn = document.getElementById("submitButton");
    const successMsg = document.getElementById("submitSuccessMessage");
    const errorMsg = document.getElementById("submitErrorMessage");

    // Disable button while sending to prevent double submissions
    submitBtn.classList.add("disabled");
    submitBtn.innerText = "Sending...";

    fetch("https://formsubmit.co/ajax/spinandtension@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        })
    })
    .then(res => res.json())
    .then(data => {
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";

        // Show success, hide error
        successMsg.classList.remove("d-none");
        errorMsg.classList.add("d-none");

        // Reset button
        submitBtn.innerText = "Send";
        submitBtn.classList.remove("disabled");

        // Hide success message after 5 seconds
        setTimeout(() => successMsg.classList.add("d-none"), 5000);
    })
    .catch(err => {
        // Show error, hide success
        errorMsg.classList.remove("d-none");
        successMsg.classList.add("d-none");

        // Reset button
        submitBtn.innerText = "Send";
        submitBtn.classList.remove("disabled");

        console.log(err);
    });
}