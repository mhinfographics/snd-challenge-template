
window.onload = function () {loadSetupAndLanguage();}
function loadSetupAndLanguage() {
    fetch('setup.json')
        .then(response => response.json())
        .then(setupData => {
            // If setup.json is empty, skip and go to addcontent()
            if (!setupData || (Array.isArray(setupData) && setupData.length === 0) || (typeof setupData === 'object' && Object.keys(setupData).length === 0)) {
                addcontent();
                return;
            }
            const setup = Array.isArray(setupData) ? setupData[0] : setupData;
            // Update meta and lang attributes in DOM if needed
            document.documentElement.lang = setup.language || 'en';
            const metaLang = document.querySelector('meta[http-equiv="Content-Language"]');
            if (metaLang) {
                metaLang.setAttribute('content', setup.language || 'en');
            }
            fetch('data/languaje.json')
                .then(response => response.json())
                .then(langData => {
                    const langObj = langData.find(l => l.language_code === setup.language) || langData.find(l => l.language_code === 'en') || {};
                    const footerIntro = document.querySelector('.footer-intro');
                    if (footerIntro && langObj.footer_intro) {
                        footerIntro.innerHTML = langObj.footer_intro;
                    }
                    const footerNote = document.querySelector('.g-centered.footer-note');
                    if (footerNote && langObj.footer_note) {
                        footerNote.innerHTML = langObj.footer_note;
                    }
                })
                .finally(() => {
                    // Replace [+username] in DOM if present (for canonical/meta tags)
                    // This only works for tags present in the DOM
                    const username = setup.user || '';
                    document.querySelectorAll('link[rel="canonical"], meta[property="og:url"], meta[property="og:image"], meta[property="twitter:url"], meta[name="image"], meta[name="twitter:image"], meta[property="twitter:domain"]').forEach(el => {
                        if (el.hasAttribute('href')) {
                            el.href = el.href.replace('[+username]', username);
                        }
                        if (el.hasAttribute('content')) {
                            el.content = el.content.replace('[+username]', username);
                        }
                    });
                    addcontent();
                });
        })
        .catch(() => {
            // If error loading setup.json, just proceed to addcontent()
            addcontent();
        });
}
function addcontent() {
    fetch('data/project.json')
        .then(response => response.text())
        .then(text => {
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                data = [];
            }
            if (!Array.isArray(data) || data.length === 0) {
                // If project.json is empty or not an array, use demo.json
                return fetch('data/demo.json')
                    .then(response => response.json());
            }
            return data;
        })
        .then(data => {
            const container = document.getElementById('main-container');
            let lastHeadlineWrapper = null;
            // University footer logic
            const universityFooter = document.querySelector('.footer-logo.university');
            const universityItem = data.find(item => item.type === 'university');
            if (universityFooter && universityItem && universityItem.credit) {
                // Insert logo image
                const logoImg = document.createElement('img');
                logoImg.src = `images/${universityItem.credit}`;
                logoImg.alt = universityItem.content;
                universityFooter.appendChild(logoImg);
                // Insert university name
                const uniName = document.createElement('h2');
                uniName.textContent = universityItem.content;
                universityFooter.appendChild(uniName);
            }
            data.forEach(item => {
                let el;
                let wrapper;
                switch (item.type) {
                    case 'university':
                        // If there is a headline-wrapper, insert h5 at the top
                        if (lastHeadlineWrapper) {
                            const universityEl = document.createElement('h5');
                            universityEl.className = 'university';
                            universityEl.innerHTML = item.content;
                            lastHeadlineWrapper.insertBefore(universityEl, lastHeadlineWrapper.firstChild);
                        }
                        break;
                    case 'photo':
                        wrapper = document.createElement('div');
                        wrapper.classList.add('g-media');
                        el = document.createElement('img');
                        el.src = `images/${item.content}`;
                        el.alt = item.alt || '';
                        el.style.width = '100%';
                        if (item.max_size && item.max_size !== 'body') {
                            el.style.maxWidth = item.max_size + 'px';
                        } else if (item.max_size === 'body') {
                            wrapper.classList.add('body-size');
                        }
                        wrapper.appendChild(el);
                        // Add credit paragraph if present
                        if (item.credit) {
                            const creditEl = document.createElement('p');
                            creditEl.innerHTML = item.credit;
                            creditEl.className = 'g-credit';
                            wrapper.appendChild(creditEl);
                        }
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = null;
                        break;
                    case 'headline':
                        wrapper = document.createElement('div');
                        wrapper.className = 'headline-wrapper';
                        el = document.createElement('h1');
                        el.textContent = item.content;
                        wrapper.appendChild(el);
                        if (item.max_size && item.max_size !== 'body') {
                            wrapper.style.maxWidth = item.max_size;
                        } else if (item.max_size === 'body') {
                            wrapper.classList.add('body-size');
                        }
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = wrapper;
                        break;
                    case 'bylines':
                        if (lastHeadlineWrapper) {
                            const bylineEl = document.createElement('div');
                            bylineEl.className = 'bylines';
                            // Add .g-by span
                            const bySpan = document.createElement('span');
                            bySpan.className = 'g-by';
                            bySpan.innerHTML = item.content + '&nbsp;';
                            bylineEl.appendChild(bySpan);
                            // Add .g-names span
                            if (item.credit) {
                                const namesSpan = document.createElement('span');
                                namesSpan.className = 'g-names';
                                namesSpan.innerHTML = item.credit;
                                bylineEl.appendChild(namesSpan);
                            }
                            if (item.max_size) {
                                bylineEl.style.maxWidth = item.max_size;
                            }
                            // Insert after h1
                            const h1 = lastHeadlineWrapper.querySelector('h1');
                            if (h1 && h1.nextSibling) {
                                lastHeadlineWrapper.insertBefore(bylineEl, h1.nextSibling);
                            } else {
                                lastHeadlineWrapper.appendChild(bylineEl);
                            }
                        }
                        break;
                    case 'subhead':
                        wrapper = document.createElement('div');
                        el = document.createElement('h2');
                        el.textContent = item.content;
                        wrapper.appendChild(el);
                        if (item.max_size && item.max_size !== 'body') {
                            wrapper.style.maxWidth = item.max_size;
                        } else if (item.max_size === 'body') {
                            wrapper.className = 'body-size';
                        }
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = null;
                        break;
                    case 'text':
                        wrapper = document.createElement('div');
                        el = document.createElement('p');
                        el.innerHTML = item.content;
                        wrapper.appendChild(el);
                        if (item.max_size && item.max_size !== 'body') {
                            wrapper.style.maxWidth = item.max_size;
                        } else if (item.max_size === 'body') {
                            wrapper.className = 'body-size';
                        }
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = null;
                        break;
                    case 'graphic':
                        wrapper = document.createElement('div');
                        wrapper.className = 'graphic-wrapper';
                        wrapper.classList.add('g-media');
                        if (item.max_size && item.max_size !== 'body') {
                            wrapper.style.maxWidth = item.max_size + 'px';
                        } else if (item.max_size === 'body') {
                            wrapper.className += ' media-size';
                        }
                        fetch(`graphics/${item.content}.html`)
                            .then(response => response.text())
                            .then(html => {
                                // Insert the ai2html graphic HTML directly
                                wrapper.innerHTML = html;
                                if (item.credit) {
                                    const creditEl = document.createElement('p');
                                    creditEl.innerHTML = item.credit;
                                    creditEl.className = 'g-credit';
                                    wrapper.appendChild(creditEl);
                                }
                            })
                            .catch(error => {
                                wrapper.innerHTML = '<p>Error loading graphic.</p>';
                            });
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = null;
                        break;
                    case 'video':
                        wrapper = document.createElement('div');
                        el = document.createElement('video');
                        el.src = `media/${item.content}`;
                        el.controls = true;
                        el.style.width = '100%';
                        if (item.max_size && item.max_size !== 'body') {
                            el.style.maxWidth = item.max_size + 'px';
                        } else if (item.max_size === 'body') {
                            wrapper.className = 'media-size';
                        }
                        wrapper.appendChild(el);
                        // Add credit paragraph if present
                        if (item.credit) {
                            const creditEl = document.createElement('p');
                            creditEl.innerHTML = item.credit;
                            creditEl.className = 'g-credit';
                            wrapper.appendChild(creditEl);
                        }
                        container.appendChild(wrapper);
                        lastHeadlineWrapper = null;
                        break;
                    default:
                        lastHeadlineWrapper = null;
                        break;
                }
            });
        })
        .catch(error => console.error('Error fetching project data:', error));
}