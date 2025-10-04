# Resume System - Simple PDF Drop-in

This folder contains a simple PDF preview system for your portfolio website.

## How to Use

1. **Add Your Resume:**
   - Drop your resume PDF file in this folder
   - Name it exactly: `My_Resume.pdf`
   - Path should be: `C:\Users\ColeS\Desktop\UserIsMissing.github.io\resume\My_Resume.pdf`

2. **That's It!**
   - Your portfolio website will automatically detect the PDF
   - Visitors can preview it directly in the browser
   - They can also download it with the "Download PDF" button

## How It Works

- When someone clicks "View Resume" on your portfolio, the website checks for `My_Resume.pdf`
- If found, it displays a beautiful PDF preview using PDF.js
- If not found, it shows instructions to add the file
- The download button always links to `My_Resume.pdf`

## Updating Your Resume

To update your resume:
1. Replace `My_Resume.pdf` with your new version
2. Keep the same filename: `My_Resume.pdf`
3. The website will automatically show the new version

No need to edit any code or compile anything - just drop in your PDF file!