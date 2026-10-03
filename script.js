/* =========================================================
   RITESH YADAV — PORTFOLIO JAVASCRIPT
   AI & Data Science | Web Development
========================================================= */

"use strict";


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   PAGE LOADER
========================================================= */

const loader = $("#loader");

if (loader) {

    const hideLoader = () => {
        loader.classList.add("hidden");
        document.body.classList.add("page-loaded");
    };

    if (document.readyState === "complete") {

        setTimeout(hideLoader, 500);

    } else {

        window.addEventListener("load", () => {
            setTimeout(hideLoader, 600);
        }, { once: true });

    }
}


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText = $("#typingText");

const roles = [
    "AI & Data Science Student",
    "Future AI Engineer",
    "Web Developer",
    "Python Learner",
    "Data Explorer",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {

        charIndex++;

        typingText.textContent =
            currentRole.substring(0, charIndex);

        if (charIndex >= currentRole.length) {

            isDeleting = true;

            setTimeout(typeRole, 1600);

            return;
        }

    } else {

        charIndex--;

        typingText.textContent =
            currentRole.substring(0, charIndex);

        if (charIndex <= 0) {

            charIndex = 0;

            isDeleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;

        }
    }

    const typingSpeed =
        isDeleting ? 40 : 70;

    setTimeout(typeRole, typingSpeed);
}

typeRole();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = $("#menuButton");
const mobileMenu = $("#mobileMenu");

if (menuButton && mobileMenu) {

    const mobileLinks =
        $$("a", mobileMenu);

    const toggleMenu = () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    };

    menuButton.addEventListener(
        "click",
        toggleMenu
    );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = $(".navbar");

let lastScrollY = 0;

function updateNavbar() {

    if (!navbar) return;

    const currentScroll =
        window.scrollY;

    if (currentScroll > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

    lastScrollY = currentScroll;
}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress =
    $("#scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (scrollHeight <= 0) {

        scrollProgress.style.width = "0%";

        return;
    }

    const progress =
        Math.min(
            100,
            Math.max(
                0,
                (scrollTop / scrollHeight) * 100
            )
        );

    scrollProgress.style.width =
        `${progress}%`;
}


/* =========================================================
   SCROLL HANDLER
   Performance optimized with requestAnimationFrame
========================================================= */

let scrollTicking = false;

function handleScroll() {

    if (!scrollTicking) {

        window.requestAnimationFrame(() => {

            updateScrollProgress();
            updateNavbar();
            updateActiveNavigation();
            updateBackToTop();

            scrollTicking = false;

        });

        scrollTicking = true;
    }
}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    $$(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("section[id]");

const navLinks =
    $$(".nav-link");

function updateActiveNavigation() {

    if (!sections.length || !navLinks.length) {
        return;
    }

    const scrollPosition =
        window.scrollY + 220;

    let activeSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            activeSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${activeSection}`
        );

    });
}

updateActiveNavigation();


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    $("#backTop");

function updateBackToTop() {

    if (!backTop) return;

    backTop.classList.toggle(
        "show",
        window.scrollY > 600
    );
}


if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR SCROLLING
========================================================= */

const anchorLinks =
    $$('a[href^="#"]');

anchorLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
    $(".cursor-dot");

const cursorOutline =
    $(".cursor-outline");


const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    cursorDot &&
    cursorOutline &&
    finePointer
) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        },
        { passive: true }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.16;

        outlineY +=
            (mouseY - outlineY) * 0.16;


        cursorOutline.style.left =
            `${outlineX}px`;

        cursorOutline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    const cursorTargets =
        $$(
            "a, button, .skill-card, .project-card, .stat-card, .tool-tags span"
        );


    cursorTargets.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorOutline.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorOutline.classList.remove(
                    "hover"
                );

            }
        );

    });

}


/* =========================================================
   PROJECT CARD 3D TILT
========================================================= */

const projectCards =
    $$(".project-card");


if (
    finePointer &&
    projectCards.length
) {

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const percentX =
                    x / rect.width;


                const percentY =
                    y / rect.height;


                const rotateX =
                    (0.5 - percentY) * 3;


                const rotateY =
                    (percentX - 0.5) * 3;


                card.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1200px) rotateX(0deg) rotateY(0deg)";

            }
        );

    });

}


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

const magneticElements =
    $$(
        ".button-primary, .nav-cta, .contact-email"
    );


if (finePointer) {

    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   SKILL BAR OBSERVATION
========================================================= */

const skillCards = $$(".skill-card");

if (
    "IntersectionObserver" in window &&
    skillCards.length > 0
) {

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.25
        }
    );

    skillCards.forEach(card => {

        skillObserver.observe(card);

    });

}