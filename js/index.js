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

// Send email via EmailJS
function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value
    };

    const serviceID = "service_vziw9qr";
    const templateID = "template_0lfmwhl";

    const submitBtn = document.getElementById("submitButton");
    const successMsg = document.getElementById("submitSuccessMessage");
    const errorMsg = document.getElementById("submitErrorMessage");

    // Disable button while sending to prevent double submissions
    submitBtn.classList.add("disabled");
    submitBtn.innerText = "Sending...";

    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            // Clear the form fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("phone").value = "";

            // Show success message, hide error message
            successMsg.classList.remove("d-none");
            errorMsg.classList.add("d-none");

            // Reset button text
            submitBtn.innerText = "Send";
            submitBtn.classList.remove("disabled");

            // Hide the success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.add("d-none");
            }, 5000);

            console.log(res);
        })
        .catch((err) => {
            // Show error message, hide success message
            errorMsg.classList.remove("d-none");
            successMsg.classList.add("d-none");

            // Reset button
            submitBtn.innerText = "Send";
            submitBtn.classList.remove("disabled");

            console.log(err);
        });
}