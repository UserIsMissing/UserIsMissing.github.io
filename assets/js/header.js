// Dynamically load and insert the top bar header on all pages
document.addEventListener('DOMContentLoaded', function() {
	// Determine the current page
	const pathname = window.location.pathname;
	const isProjectPage = pathname.includes('/projects/');
	const isResumePage = pathname.includes('resume-page');
	const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || pathname === '';

	// Create the header HTML
	const headerHTML = `
		<!-- Top bar: name + nav (will float together) -->
		<div class="top-bar">
			<div class="name-banner">
				<h1><a href="${isProjectPage ? '../' : ''}index.html">Cole Schreiner</a></h1>
				<p>Robotics Engineer • UC Santa Cruz</p>
			</div>

			<!-- Nav -->
			<nav id="nav">
				<ul>
					<li class="${isHomePage ? 'current' : ''}"><a href="${isProjectPage ? '../' : ''}index.html">Home</a></li>
					<li>
						<a href="${isProjectPage ? '../' : ''}index.html#projects">Projects</a>
						<ul>
							<li><a href="${isProjectPage ? '' : 'projects/'}wet-dry-cycler.html">Wet-Dry Cycler (RNA Replicator)</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}professor-piano.html">Professor Piano Glove</a></li>
							<li><a href="${isProjectPage ? '' : 'projects/'}mechatronics-robot.html">Mechatronics Robot</a></li>
						</ul>
					</li>
					<li><a href="${isProjectPage ? '../' : ''}index.html#coursework">Coursework</a></li>
					<li class="${isResumePage ? 'current' : ''}"><a href="${isProjectPage ? '../resume-page.html' : 'resume-page.html'}">CV/Resume</a></li>
					<li><a href="${isProjectPage ? '../' : ''}index.html#contact">Contact</a></li>
				</ul>
			</nav>
		</div>
	`;

	// Find the header section and insert the top-bar
	const headerSection = document.querySelector('#header');
	if (headerSection) {
		headerSection.innerHTML = headerHTML + headerSection.innerHTML;
	}

	// Reinitialize nav dropdowns after header is inserted
	if (typeof jQuery !== 'undefined' && jQuery.fn.dropotron) {
		jQuery('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center'
		});
	}
});
