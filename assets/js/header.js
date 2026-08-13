// Dynamically load and insert the top bar header on all pages
document.addEventListener('DOMContentLoaded', function() {
	// Determine the current page
	const pathname = window.location.pathname;
	const isProjectPage = pathname.includes('/projects/');
	const isResumePage = pathname.includes('resume-page');
	const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || pathname === '';

	// Create the header HTML
	const headerHTML = `
		<!-- Shared site header -->
		<div class="top-bar">
			<div class="name-banner">
				<div class="name-banner__copy">
					<h1><a href="${isProjectPage ? '../' : ''}index.html">Cole Schreiner</a></h1>
					<p>Robotics Engineer • UC Santa Cruz</p>
				</div>
				<div class="name-banner__contact">
					<ul class="name-banner__social social">
						<li><a class="icon brands fa-linkedin-in" href="https://linkedin.com/in/cole-schreiner" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span class="label">LinkedIn</span></a></li>
						<li><a class="icon brands fa-github" href="https://github.com/UserIsMissing" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><span class="label">GitHub</span></a></li>
					</ul>
					<div class="name-banner__details">
						<a href="mailto:ColeRobotEngineer@gmail.com">ColeRobotEngineer@gmail.com</a>
						<a href="tel:4242577168">(424) 257-7168</a>
					</div>
				</div>
			</div>

			<!-- Nav -->
			<nav id="nav">
				<ul>
					<li class="nav-home ${isHomePage ? 'current' : ''}"><a href="${isProjectPage ? '../' : ''}index.html">Home</a></li>
					<li class="nav-projects ${isProjectPage ? 'current' : ''}">
						<a href="${isProjectPage ? '../' : ''}index.html#projects">Projects</a>
						<ul>
							<li><a href="${isProjectPage ? '' : 'projects/'}AI_Small-Scale-UAV.html">Small-Scale UAV Neural Autopilot</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}wet-dry-cycler.html">Wet-Dry Cycler (RNA Replicator)</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}professor-piano.html">Professor Piano Glove</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}mechatronics-robot.html">Mechatronics Robot</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}pvnet-dog-sensor.html">PvNet Canine Gait Analysis Sensor</a></li>
						</ul>
					</li>
					<li class="nav-coursework"><a href="${isProjectPage ? '../' : ''}index.html#coursework">Coursework</a></li>
					<li class="nav-resume ${isResumePage ? 'current' : ''}"><a href="${isProjectPage ? '../resume-page.html' : 'resume-page.html'}">Resume</a></li>
					<li class="nav-contact"><a href="${isProjectPage ? '../' : ''}index.html#contact">Contact</a></li>
				</ul>
			</nav>
		</div>
	`;

	// Find the header section and insert the shared header only once.
	const headerSection = document.querySelector('#header');
	if (headerSection && !headerSection.querySelector('.top-bar')) {
		const hasExistingContent = headerSection.innerHTML.trim().length > 0;
		headerSection.innerHTML = headerHTML + headerSection.innerHTML;
		headerSection.classList.add('shared-header');
		if (!hasExistingContent) {
			headerSection.classList.add('header-simple');
		}
	}

	// Reinitialize nav dropdowns after header is inserted
	if (typeof jQuery !== 'undefined' && jQuery.fn.dropotron) {
		jQuery('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center'
		});
	}

	// Add scroll-based highlighting for homepage sections
	if (isHomePage) {
		function updateNavHighlight() {
			// Get all nav items
			const navHome = document.querySelector('.nav-home');

			// Remove all current classes
			const allNavs = [document.querySelector('.nav-home'), document.querySelector('.nav-projects'), document.querySelector('.nav-coursework'), document.querySelector('.nav-contact')];
			allNavs.forEach(nav => {
				if (nav) nav.classList.remove('current');
			});

			// Only highlight Home on homepage
			if (navHome) navHome.classList.add('current');
		}

		// Initial check
		setTimeout(updateNavHighlight, 100);
	}
});

