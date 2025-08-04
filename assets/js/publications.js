/**
 * Dynamic Publications Loader
 * Fetches publication data using DOI lookup and updates the publications section
 */

class PublicationsLoader {
    constructor() {
        this.userGoogleScholarId = 'XVt7BYQAAAAJ';
        this.cacheKey = 'scholar_publications';
        this.publicationsJsonUrl = '/assets/data/publications.json';
        this.fallbackPublications = [
            {
                title: "TxPert: Leveraging Biochemical Relationships for Out-of-Distribution Perturbation Prediction",
                authors: "Russell, C.T., et al.",
                year: 2025,
                venue: "arXiv preprint",
                link: "https://arxiv.org/abs/2505.14919",
                doi: null
            },
            {
                title: "DL4MicEverywhere: Deep learning for microscopy made flexible, shareable and reproducible",
                authors: "Gómez-de-Mariscal, E., Russell, C.T., et al.",
                year: 2024,
                venue: "Nature Methods",
                link: "https://doi.org/10.1038/s41592-024-02295-6",
                doi: "10.1038/s41592-024-02295-6"
            },
            {
                title: "The COVID-19 Data Portal: accelerating SARS-CoV-2 and COVID-19 research through rapid open access data sharing",
                authors: "Harrison, P.W., Lopez, R., Rahman, N., Russell, C.T., et al.",
                year: 2021,
                venue: "Nucleic Acids Research",
                link: "https://doi.org/10.1093/nar/gkab417",
                doi: "10.1093/nar/gkab417"
            },
            {
                title: "Frame localisation optical projection tomography",
                authors: "Russell, C.T., Vallejo Ramirez, P.P., Rees, E.J.",
                year: 2021,
                venue: "Scientific Reports",
                link: "https://doi.org/10.1038/s41598-021-84002-5",
                doi: "10.1038/s41598-021-84002-5"
            },
            {
                title: "mmSIM: An open toolbox for accessible structured illumination microscopy",
                authors: "Russell, C.T., Shaw, M.",
                year: 2021,
                venue: "Philosophical Transactions A",
                link: "https://doi.org/10.1098/rsta.2020.0353",
                doi: "10.1098/rsta.2020.0353"
            },
            {
                title: "An open-hardware sample mounting solution for inverted lightsheet microscopes",
                authors: "Russell, C.T., Rees, E.J.",
                year: 2020,
                venue: "Journal of Microscopy",
                link: "https://doi.org/10.1111/jmi.12935",
                doi: "10.1111/jmi.12935"
            },
            {
                title: "Helminth Defense Molecules as Design Templates for Membrane Active Antibiotics",
                authors: "Hammond, K., Lewis, H., Faruqui, N., Russell, C.T., et al.",
                year: 2019,
                venue: "ACS Infectious Diseases",
                link: "https://doi.org/10.1021/acsinfecdis.9b00157",
                doi: "10.1021/acsinfecdis.9b00157"
            },
            {
                title: "Homographically generated light sheets for the microscopy of large specimens",
                authors: "Russell, C.T., Rees, E.J., Kaminski, C.F.",
                year: 2018,
                venue: "Optics Letters",
                link: "https://doi.org/10.1364/OL.43.000663",
                doi: "10.1364/OL.43.000663"
            }
        ];
        this.corsProxy = 'https://api.allorigins.win/raw?url=';
    }

    async init() {
        try {
            // Try to load from JSON file first (stored in repo)
            const jsonData = await this.loadFromJson();
            if (jsonData) {
                console.log('Loading publications from JSON file');
                this.renderPublications(jsonData, 'json');
                return;
            }

            // Fallback to localStorage cache
            const cachedData = this.getCachedPublications();
            if (cachedData) {
                console.log('Loading publications from localStorage cache');
                this.renderPublications(cachedData.publications, 'cache');
                return;
            }

            // Last resort: fetch from API
            const publications = await this.fetchPublications();
            if (publications && publications.length > 0) {
                this.cachePublications(publications);
                this.renderPublications(publications, 'api');
            } else {
                console.warn('No publications available from any source');
                this.showError();
            }
        } catch (error) {
            console.warn('Failed to load publications:', error);
            this.showError();
        }
    }

    async fetchPublications() {
        // Try Google Scholar via proxy (may be blocked)
        const scholarData = await this.fetchFromScholar();
        if (scholarData && scholarData.length > 0) {
            return scholarData;
        }
        
        throw new Error('No data available from APIs');
    }

    async fetchFromScholar() {
        // Note: This is likely to be blocked by CORS, kept for demonstration
        const scholarUrl = `https://scholar.google.com/citations?user=${this.userGoogleScholarId}&hl=en&view_op=list_works&sortby=pubdate`;
        
        try {
            const response = await fetch(this.corsProxy + encodeURIComponent(scholarUrl));
            const html = await response.text();
            return this.parseScholarHTML(html);
        } catch (error) {
            throw new Error('Scholar access blocked');
        }
    }

    parseScholarHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const papers = [];
        
        const rows = doc.querySelectorAll('.gsc_a_tr');
        rows.forEach((row, index) => {
            if (index >= 10) return; // Limit to 10 papers
            
            const titleEl = row.querySelector('.gsc_a_at');
            const authorsEl = row.querySelector('.gsc_a_at + div');
            const venueEl = row.querySelector('.gs_gray:last-child');
            const citationsEl = row.querySelector('.gsc_a_c');
            
            if (titleEl) {
                let link = titleEl.href || '#';
                // Ensure absolute URLs for Google Scholar links
                if (link.startsWith('/citations')) {
                    link = 'https://scholar.google.com' + link;
                }
                
                papers.push({
                    title: titleEl.textContent.trim(),
                    authors: authorsEl ? authorsEl.textContent.trim() : 'Unknown authors',
                    venue: venueEl ? venueEl.textContent.trim() : 'Unknown venue',
                    year: this.extractYear(venueEl ? venueEl.textContent : ''),
                    citations: citationsEl ? parseInt(citationsEl.textContent) || 0 : 0,
                    link: link
                });
            }
        });
        
        return papers;
    }

    async enhanceWithCrossref(publications) {
        const enhanced = [];
        
        for (const pub of publications) {
            if (pub.doi) {
                try {
                    const crossrefData = await this.fetchFromCrossref(pub.doi);
                    enhanced.push({
                        ...pub,
                        citations: crossrefData.citations || pub.citations,
                        venue: crossrefData.venue || pub.venue
                    });
                } catch (error) {
                    enhanced.push(pub);
                }
            } else {
                enhanced.push(pub);
            }
            
            // Small delay to be respectful to API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return enhanced;
    }

    async fetchFromCrossref(doi) {
        const crossrefUrl = `https://api.crossref.org/works/${doi}`;
        
        try {
            const response = await fetch(crossrefUrl);
            const data = await response.json();
            const work = data.message;
            
            return {
                venue: work['container-title'] ? work['container-title'][0] : null,
                citations: work['is-referenced-by-count'] || 0
            };
        } catch (error) {
            throw new Error('Crossref fetch failed');
        }
    }

    extractYear(text) {
        const yearMatch = text.match(/\b(19|20)\d{2}\b/);
        return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
    }

    renderPublications(publications, source = 'unknown') {
        const container = document.getElementById('publications-list');
        if (!container) return;

        // Sort by year descending
        publications.sort((a, b) => (b.year || 0) - (a.year || 0));

        const html = publications.map((pub, index) => {
            const citationText = pub.citations > 0 ? ` (${pub.citations} citations)` : '';
            const linkText = pub.doi ? 'DOI' : 'Link';
            
            return `
                <div class="publication-item" data-year="${pub.year}">
                    <p><strong>${index + 1}.</strong> ${pub.authors} (${pub.year}). 
                    "${pub.title}" <em>${pub.venue}</em>${citationText}. 
                    <a href="${pub.link}" target="_blank">${linkText}</a></p>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        
        // Add source indicator
        const sourceLabels = {
            'json': 'repository data',
            'cache': 'cached data', 
            'api': 'live API'
        };
        
        const updateInfo = document.createElement('p');
        updateInfo.innerHTML = `<small><em>Loaded from: ${sourceLabels[source] || source}</em></small>`;
        updateInfo.style.marginTop = '1rem';
        updateInfo.style.opacity = '0.7';
        container.appendChild(updateInfo);
    }

    async loadFromJson() {
        try {
            const response = await fetch(this.publicationsJsonUrl);
            if (response.ok) {
                const data = await response.json();
                return data.publications || data; // Handle different JSON structures
            }
        } catch (error) {
            console.warn('Failed to load JSON file:', error);
        }
        return null;
    }

    getCachedPublications() {
        try {
            const cached = localStorage.getItem(this.cacheKey);
            if (!cached) return null;

            const data = JSON.parse(cached);
            // No expiry check - cache indefinitely
            return data;
        } catch (error) {
            console.warn('Error reading cache:', error);
            localStorage.removeItem(this.cacheKey);
            return null;
        }
    }

    cachePublications(publications) {
        try {
            const data = {
                publications: publications,
                timestamp: Date.now()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(data));
            console.log('Publications cached successfully');
        } catch (error) {
            console.warn('Error caching publications:', error);
        }
    }

    showError() {
        const container = document.getElementById('publications-list');
        if (!container) return;

        container.innerHTML = `
            <p><em>Publications could not be loaded from Google Scholar API. 
            <a href="https://scholar.google.com/citations?user=${this.userGoogleScholarId}&hl=en" target="_blank">
            View publications directly on Google Scholar →</a></em></p>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PublicationsLoader();
    loader.init();
});