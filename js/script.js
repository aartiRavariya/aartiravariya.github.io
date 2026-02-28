const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');


emailjs.init("6VWY3mf-G946KFUfL");

const form = document.getElementById("contact-form");

function showToast(msg, isSuccess = true) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.backgroundColor = isSuccess ? "green" : "red";
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show","");
  }, 3000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  emailjs.sendForm("service_pteufxh", "template_qmzwe9a", form)
    .then(() => {
      showToast("✅ Your message has been sent!");
      form.reset();
    })
    .catch((err) => {
      showToast("❌ Failed to send.", false);
      console.error("EmailJS Error:", err);
    });
});




menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});


const activePage = () => {

    const  header = document.querySelector('header');
    const  barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');

    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');

    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
                adjustFooterPadding();
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
                sections[0].classList.add('active');
                adjustFooterPadding();
            }, 1100);
    }
});


const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const slides = document.querySelectorAll('.portfolio-carousel .img-slide > *');

let index = 0;
const maxIndex = slides.length - 1;

const activePortfolio = () => { 
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    portfolioDetails[index].classList.add('active');

}

arrowRight.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
        arrowLeft.classList.remove('disabled');

        if (index === maxIndex) {
            arrowRight.classList.add('disabled');
        }

    } else {
        arrowRight.classList.add('disabled');
    }

    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        arrowRight.classList.remove('disabled');

        if (index === 0) {
            arrowLeft.classList.add('disabled');
        }

    } else {
        arrowLeft.classList.add('disabled');
    }

    activePortfolio();
});


/* Adjust body bottom padding so fixed footer doesn't cover content, but avoid
   adding padding when it would create an unnecessary scrollbar. */
function adjustFooterPadding() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // reset before measuring
    document.body.style.paddingBottom = '0px';

    const footerHeight = footer.offsetHeight || 0;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // If content is taller than viewport, reserve space so last content isn't hidden.
    if (docHeight > winHeight) {
        document.body.style.paddingBottom = footerHeight + 'px';
    } else {
        document.body.style.paddingBottom = '0px';
    }
}

// Recalculate on load and resize
window.addEventListener('load', adjustFooterPadding);
window.addEventListener('resize', () => {
    // small debounce
    clearTimeout(window._adjustFooterTimer);
    window._adjustFooterTimer = setTimeout(adjustFooterPadding, 120);
});

// Run once now in case the page is already loaded
setTimeout(adjustFooterPadding, 50);