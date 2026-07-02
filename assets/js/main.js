/**
 * main.js
 * Home page behaviour: nav, smooth scroll, typewriter, skills/projects
 * rendering from JSON data, contact form, and scroll animations.
 */

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        const hash = $(this).attr('href');
        if (hash.length > 1 && $(hash).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top,
            }, 500, 'linear')
        }
    });

    // contact form: opens the visitor's email client with a pre-filled message
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        const name = $(this).find('[name="name"]').val();
        const email = $(this).find('[name="email"]').val();
        const phone = $(this).find('[name="phone"]').val();
        const message = $(this).find('[name="message"]').val();

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
        );
        window.location.href = `mailto:sachin227724@gmail.com?subject=${subject}&body=${body}`;
        document.getElementById("contact-form").reset();
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Sachin Chaurasiya";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// ===== Typewriter effect (self-contained, no external CDN) =====
// Cycles through `words` forever: types, pauses, deletes, moves to next word.
function startTypewriter(el, words, opts = {}) {
    const typeSpeed = opts.typeSpeed || 90;
    const deleteSpeed = opts.deleteSpeed || 45;
    const pauseAfterType = opts.pauseAfterType || 1200;
    const pauseAfterDelete = opts.pauseAfterDelete || 300;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const currentWord = words[wordIndex % words.length];

        if (!deleting) {
            charIndex++;
            el.textContent = currentWord.slice(0, charIndex);
            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(tick, pauseAfterType);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            charIndex--;
            el.textContent = currentWord.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex++;
                setTimeout(tick, pauseAfterDelete);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    tick();
}

document.addEventListener('DOMContentLoaded', function () {
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        startTypewriter(typingEl, [
            "full-stack development",
            "AI & LLM engineering",
            "backend development",
            "problem solving",
            "machine learning",
        ]);
    }
});
// ===== Typewriter effect ends =====


async function fetchData(type = "skills") {
    const path = type === "skills" ? "./data/skills.json" : "./data/projects.json";
    const response = await fetch(path);
    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name} preview" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank" rel="noopener"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank" rel="noopener">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // tilt js effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// tilt js effect (hero + about images, present at load)
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// disable common dev-tools shortcuts
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h2', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .leetcode', { interval: 600 });
srtop.reveal('.home .codechef', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL CODING PROFILES */
srtop.reveal('.coding-profiles .box', { interval: 200 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
