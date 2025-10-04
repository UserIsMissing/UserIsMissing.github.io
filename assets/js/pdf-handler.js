/**
 * PDF Handler for Cole Schreiner's Portfolio
 * Handles PDF preview rendering using PDF.js with iframe fallback
 */

class PDFHandler {
    constructor() {
        this.pdfjsLib = null;
        this.initPDFJS();
    }

    async initPDFJS() {
        try {
            // Load PDF.js from CDN
            if (typeof pdfjsLib === 'undefined') {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
            this.pdfjsLib = pdfjsLib;
        } catch (error) {
            console.warn('PDF.js failed to load, will use iframe fallback:', error);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async renderPDFPreview(pdfUrl, containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return false;
        }

        const defaultOptions = {
            width: 600,
            height: 800,
            scale: 1.2,
            showDownloadButton: true,
            showFullViewButton: true,
            previewPage: 1
        };

        const config = { ...defaultOptions, ...options };

        try {
            if (this.pdfjsLib) {
                return await this.renderWithPDFJS(pdfUrl, container, config);
            } else {
                return this.renderWithIframe(pdfUrl, container, config);
            }
        } catch (error) {
            console.warn('PDF.js rendering failed, falling back to iframe:', error);
            return this.renderWithIframe(pdfUrl, container, config);
        }
    }

    async renderWithPDFJS(pdfUrl, container, config) {
        try {
            // Load the PDF document
            const loadingTask = this.pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            
            // Get the first page
            const page = await pdf.getPage(config.previewPage);
            
            // Calculate viewport
            const viewport = page.getViewport({ scale: config.scale });
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            // Render the page
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            
            // Clear container and add preview
            container.innerHTML = this.createPDFPreviewHTML(pdfUrl, config);
            const previewContainer = container.querySelector('.pdf-preview-canvas');
            previewContainer.appendChild(canvas);
            
            // Add click handler to open full PDF
            canvas.style.cursor = 'pointer';
            canvas.addEventListener('click', () => this.openPDFInNewTab(pdfUrl));
            
            console.log('PDF preview rendered successfully with PDF.js');
            return true;
            
        } catch (error) {
            console.error('PDF.js rendering error:', error);
            throw error;
        }
    }

    renderWithIframe(pdfUrl, container, config) {
        try {
            container.innerHTML = this.createPDFPreviewHTML(pdfUrl, config, true);
            
            const iframe = container.querySelector('iframe');
            iframe.src = pdfUrl;
            
            console.log('PDF preview rendered with iframe fallback');
            return true;
            
        } catch (error) {
            console.error('Iframe rendering error:', error);
            return false;
        }
    }

    createPDFPreviewHTML(pdfUrl, config, useIframe = false) {
        const fileName = pdfUrl.split('/').pop();
        
        return `
            <div class="pdf-preview-container" style="
                border: 1px solid #ddd;
                border-radius: 5px;
                overflow: hidden;
                background: #f9f9f9;
                max-width: ${config.width}px;
                margin: 0 auto;
            ">
                <div class="pdf-preview-header" style="
                    background: #252122;
                    color: white;
                    padding: 10px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                ">
                    <span>📄 ${fileName}</span>
                    <div class="pdf-actions">
                        ${config.showDownloadButton ? `
                            <a href="${pdfUrl}" download class="pdf-action-btn" style="
                                color: #03bafc;
                                text-decoration: none;
                                margin-right: 10px;
                                font-size: 12px;
                            ">⬇ Download</a>
                        ` : ''}
                        ${config.showFullViewButton ? `
                            <a href="${pdfUrl}" target="_blank" class="pdf-action-btn" style="
                                color: #03bafc;
                                text-decoration: none;
                                font-size: 12px;
                            ">🔍 Full View</a>
                        ` : ''}
                    </div>
                </div>
                <div class="pdf-preview-content" style="
                    background: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: ${config.height}px;
                ">
                    ${useIframe ? `
                        <iframe 
                            style="
                                width: 100%;
                                height: ${config.height}px;
                                border: none;
                            "
                            title="PDF Preview">
                        </iframe>
                    ` : `
                        <div class="pdf-preview-canvas" style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 20px;
                        "></div>
                    `}
                </div>
            </div>
        `;
    }

    openPDFInNewTab(pdfUrl) {
        window.open(pdfUrl, '_blank');
    }

    // Utility method to check if PDF exists
    async checkPDFExists(pdfUrl) {
        try {
            const response = await fetch(pdfUrl, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error('Error checking PDF existence:', error);
            return false;
        }
    }
}

// Initialize PDF handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.pdfHandler = new PDFHandler();
});

// Utility function for easy use in HTML
async function loadPDFPreview(pdfUrl, containerId, options = {}) {
    if (window.pdfHandler) {
        return await window.pdfHandler.renderPDFPreview(pdfUrl, containerId, options);
    } else {
        console.error('PDF handler not initialized');
        return false;
    }
}