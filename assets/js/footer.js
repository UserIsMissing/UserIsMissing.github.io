document.addEventListener('DOMContentLoaded', function() {
	// Determine current page location
	const pathname = window.location.pathname;
	const isProjectPage = pathname.includes('/projects/');
	const isResumePage = pathname.includes('resume-page');
	const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || pathname === '';

	// Determine relative path to index.html
	let indexPath = 'index.html';
	if (isProjectPage) {
		indexPath = '../index.html';
	}

	// Build footer HTML
	const footerHTML = `
		<!-- Footer -->
			<section id="footer">
				<div class="container">
					<div class="row">
						<div class="col-8 col-12-medium">
							<section id="contact">
								<header>
									<h2>Let's Connect</h2>
									<p>I'm always interested in new opportunities and collaborations</p>
								</header>
								<div class="row">
									<div class="col-6 col-12-small">
										<h3>Professional Links</h3>
										<ul class="divided">
											<li><a href="https://linkedin.com/in/cole-schreiner" target="_blank">LinkedIn Profile</a></li>
											<li><a href="https://github.com/UserIsMissing" target="_blank">GitHub Repositories</a></li>
											<li><a href="${indexPath}#resume">Download Resume/CV</a></li>
											<li><a href="mailto:ColeRobotEngineer@gmail.com">Email Me</a></li>
										</ul>
									</div>
									<div class="col-6 col-12-small">
										<h3>Quick Links</h3>
										<ul class="divided">
											<li><a href="${indexPath}#projects">View My Projects</a></li>
											<li><a href="${indexPath}#coursework">Academic Work</a></li>
											<li><a href="${indexPath}#resume">Professional Experience</a></li>
											<li><a href="${indexPath}#intro">About Me</a></li>
										</ul>
									</div>
								</div>
							</section>
						</div>
						<div class="col-4 col-12-medium">
							<section>
								<header>
									<h2>Contact Information</h2>
								</header>
								<ul class="social">
									<li><a class="icon brands fa-linkedin-in" href="https://linkedin.com/in/cole-schreiner" target="_blank"><span class="label">LinkedIn</span></a></li>
									<li><a class="icon brands fa-github" href="https://github.com/UserIsMissing" target="_blank"><span class="label">GitHub</span></a></li>
									<li><a class="icon solid fa-envelope" href="mailto:ColeRobotEngineer@gmail.com"><span class="label">Email</span></a></li>
									<li><a class="icon solid fa-phone" href="tel:424-257-7168"><span class="label">Phone</span></a></li>
								</ul>
								<ul class="contact">
									<li>
										<h3>Location</h3>
										<p>
											Palos Verdes, CA<br />
											Available for Relocation<br />
											Open to Remote Work
										</p>
									</li>
									<li>
										<h3>Email</h3>
										<p><a href="mailto:ColeRobotEngineer@gmail.com">ColeRobotEngineer@gmail.com</a></p>
									</li>
									<li>
										<h3>Phone</h3>
										<p><a href="tel:424-257-7168">(424) 257-7168</a></p>
									</li>
								</ul>
							</section>
						</div>
						<div class="col-12">
							<!-- Copyright -->
								<div id="copyright">
									<ul class="links">
										<li>&copy; 2025 Cole Schreiner. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
									</ul>
								</div>
						</div>
					</div>
				</div>
			</section>
	`;

	// Insert footer into page
	const footerSection = document.getElementById('footer-placeholder');
	if (footerSection) {
		footerSection.innerHTML = footerHTML;
	}
});
