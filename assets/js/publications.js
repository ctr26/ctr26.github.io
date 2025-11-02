/**
 * Dynamic Publications Loader
 * Fetches publication data using DOI lookup and updates the publications section
 */

class PublicationsLoader {
    constructor() {
        this.userGoogleScholarId = 'XVt7BYQAAAAJ';
        this.cacheKey = 'scholar_publications';
        this.publicationsJsonUrl = '/assets/data/publications.json';
        this.fallbackPatents = [
            {
                title: "TxPert: AI-Driven Perturbation Prediction System",
                authors: "Russell, C.T., et al.",
                year: 2025,
                venue: "Patent Pending",
                link: "#",
                doi: null,
                citations: 0
            },
            {
                title: "HOOK-1: Novel Therapeutic Target Discovery Platform",
                authors: "Russell, C.T., et al.",
                year: 2025,
                venue: "Patent Pending",
                link: "#",
                doi: null,
                citations: 0
            }
        ];
        this.fallbackPublications = [
            {
                title: "TxPert: Leveraging Biochemical Relationships for Out-of-Distribution Perturbation Prediction",
                authors: "Russell, C.T., et al.",
                year: 2025,
                venue: "NeurIPS 2025",
                link: "https://neurips.cc/virtual/2025/loc/san-diego/poster/116558",
                doi: null,
                citations: 0
            },
            {
                title: "DL4MicEverywhere: Deep learning for microscopy made flexible, shareable and reproducible",
                authors: "Gómez-de-Mariscal, E., Russell, C.T., et al.",
                year: 2024,
                venue: "Nature Methods",
                link: "https://doi.org/10.1038/s41592-024-02295-6",
                doi: "10.1038/s41592-024-02295-6",
                citations: 12
            },
            {
                title: "The BioImage Archive–building a home for life-sciences microscopy data",
                authors: "Hartley, M., Gault, D., Donovan, C., Mahood, R., Oyetunde, A., Russell, C.T., et al.",
                year: 2023,
                venue: "Nucleic Acids Research",
                link: "https://doi.org/10.1093/nar/gkac1072",
                doi: "10.1093/nar/gkac1072",
                citations: 15
            },
            {
                title: "The COVID-19 Data Portal: accelerating SARS-CoV-2 and COVID-19 research through rapid open access data sharing",
                authors: "Harrison, P.W., Lopez, R., Rahman, N., Russell, C.T., et al.",
                year: 2021,
                venue: "Nucleic Acids Research",
                link: "https://doi.org/10.1093/nar/gkab417",
                doi: "10.1093/nar/gkab417",
                citations: 89
            },
            {
                title: "Frame localisation optical projection tomography",
                authors: "Russell, C.T., Vallejo Ramirez, P.P., Rees, E.J.",
                year: 2021,
                venue: "Scientific Reports",
                link: "https://doi.org/10.1038/s41598-021-84002-5",
                doi: "10.1038/s41598-021-84002-5",
                citations: 3
            },
            {
                title: "mmSIM: An open toolbox for accessible structured illumination microscopy",
                authors: "Russell, C.T., Shaw, M.",
                year: 2021,
                venue: "Philosophical Transactions A",
                link: "https://doi.org/10.1098/rsta.2020.0353",
                doi: "10.1098/rsta.2020.0353",
                citations: 7
            },
            {
                title: "An open-hardware sample mounting solution for inverted lightsheet microscopes",
                authors: "Russell, C.T., Rees, E.J.",
                year: 2020,
                venue: "Journal of Microscopy",
                link: "https://doi.org/10.1111/jmi.12935",
                doi: "10.1111/jmi.12935",
                citations: 4
            },
            {
                title: "Helminth Defense Molecules as Design Templates for Membrane Active Antibiotics",
                authors: "Hammond, K., Lewis, H., Faruqui, N., Russell, C.T., et al.",
                year: 2019,
                venue: "ACS Infectious Diseases",
                link: "https://doi.org/10.1021/acsinfecdis.9b00157",
                doi: "10.1021/acsinfecdis.9b00157",
                citations: 21
            },
            {
                title: "Homographically generated light sheets for the microscopy of large specimens",
                authors: "Russell, C.T., Rees, E.J., Kaminski, C.F.",
                year: 2018,
                venue: "Optics Letters",
                link: "https://doi.org/10.1364/OL.43.000663",
                doi: "10.1364/OL.43.000663",
                citations: 8
            }
        ];
        this.corsProxy = 'https://api.allorigins.win/raw?url=';
    }

    async init() {
        try {
            let publications = null;
            let patents = null;
            let source = 'fallback';

            // Try JSON file
            const jsonData = await this.loadFromJson();
            if (jsonData) {
                if (jsonData.publications && jsonData.publications.length > 0) {
                    publications = jsonData.publications;
                    source = 'json';
                    console.log('Loaded publications from JSON file');
                }
                if (jsonData.patents && jsonData.patents.length > 0) {
                    patents = jsonData.patents;
                    console.log('Loaded patents from JSON file');
                }
            }

            // Try localStorage cache if JSON failed
            if (!publications || !patents) {
                const cachedData = this.getCachedPublications();
                if (cachedData) {
                    if (!publications && cachedData.publications) {
                        publications = cachedData.publications;
                        source = 'cache';
                    }
                    if (!patents && cachedData.patents) {
                        patents = cachedData.patents;
                    }
                }
            }

            // Use fallback if we have nothing
            if (!publications || publications.length < this.fallbackPublications.length) {
                publications = this.fallbackPublications;
                source = 'fallback';
            }
            if (!patents || patents.length < this.fallbackPatents.length) {
                patents = this.fallbackPatents;
            }

            this.renderPatents(patents, source);
            this.renderPublications(publications, source);

        } catch (error) {
            console.warn('Error in init, using fallback:', error);
            this.renderPatents(this.fallbackPatents, 'fallback');
            this.renderPublications(this.fallbackPublications, 'fallback');
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

    renderPatents(patents, source = 'unknown') {
        const container = document.getElementById('patents-list');
        if (!container) return;

        patents.sort((a, b) => (b.year || 0) - (a.year || 0));

        const html = patents.map((patent, index) => {
            return `
                <div class="patent-item" data-year="${patent.year}">
                    <p><strong>${index + 1}.</strong> ${patent.authors} (${patent.year}).
                    "${patent.title}" <em>${patent.venue}</em>.</p>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
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
            'api': 'live API',
            'fallback': 'curated list'
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
                return data;
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

    cachePublications(publications, patents) {
        try {
            const data = {
                publications: publications,
                patents: patents,
                timestamp: Date.now()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(data));
            console.log('Publications and patents cached successfully');
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