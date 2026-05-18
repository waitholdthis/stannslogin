// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    function compactGTranslate() {
        document.querySelectorAll('.gtranslate_wrapper').forEach(wrapper => {
            wrapper.classList.add('gt-compact');

            wrapper.querySelectorAll('#google_translate_element2, .skiptranslate.goog-te-gadget').forEach(element => {
                element.setAttribute('aria-hidden', 'true');
                element.style.display = 'none';
            });

            wrapper.querySelectorAll('select').forEach(select => {
                if (select.classList.contains('goog-te-combo')) {
                    return;
                }

                Array.from(select.options).forEach(option => {
                    if (option.value === '') {
                        option.remove();
                        return;
                    }

                    if (option.value.endsWith('|en')) {
                        option.textContent = 'EN';
                    }

                    if (option.value.endsWith('|es')) {
                        option.textContent = 'ES';
                    }
                });

                select.setAttribute('aria-label', 'Language');
            });
        });
    }

    compactGTranslate();
    [250, 750, 1500, 3000].forEach(delay => {
        window.setTimeout(compactGTranslate, delay);
    });

    let translateObserverActive = true;
    const translateObserver = new MutationObserver(() => {
        if (!translateObserverActive) return;
        translateObserverActive = false;
        compactGTranslate();
        setTimeout(() => { translateObserverActive = true; }, 500);
    });
    translateObserver.observe(document.body, {
        childList: true,
        subtree: false
    });

    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-controls', 'nav-menu');

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.addEventListener('click', function(e) {
        const clickedLink = e.target.closest('a');
        if (!clickedLink) return;

        const dropdown = clickedLink.closest('.dropdown');
        const isDropdownToggle = dropdown && clickedLink.classList.contains('nav-link');

        if (window.innerWidth <= 768 && isDropdownToggle) {
            e.preventDefault();
            e.stopPropagation();
            dropdowns.forEach(item => {
                if (item !== dropdown) item.classList.remove('active');
            });
            dropdown.classList.toggle('active');
            return;
        }

        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past hero
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const highlights = document.querySelector('.highlights');
            if (highlights) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = highlights.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.highlight-card, .announcement-card, .section-header').forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link[href^="#"]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Portal login functionality
    window.openPortal = function() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Portal Login</h2>
                    <button class="modal-close" onclick="closePortal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="portal-options">
                        <div class="portal-option">
                            <div class="portal-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <h3>Student Portal</h3>
                            <p>Access grades, assignments, attendance, and student resources</p>
                            <div class="portal-action">
                                <button class="btn-primary" onclick="window.open('https://www.renweb.com/logins/loginstudentparent.aspx', '_blank')">Student Login</button>
                            </div>
                        </div>
                        <div class="portal-option">
                            <div class="portal-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Parent Portal</h3>
                            <p>View your child's progress, communicate with teachers, and stay updated on school activities</p>
                            <div class="portal-action">
                                <button class="btn-primary" onclick="window.open('https://www.renweb.com/logins/loginstudentparent.aspx', '_blank')">Parent Login</button>
                            </div>
                        </div>
                        <div class="portal-option">
                            <div class="portal-icon">
                                <i class="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h3>Staff Portal</h3>
                            <p>Access gradebook, attendance, and administrative resources</p>
                            <div class="portal-action">
                                <button class="btn-primary" onclick="window.open('https://www.renweb.com/logins/loginstaff.aspx', '_blank')">Staff Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        document.body.classList.add('modal-open');

        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closePortal();
            }
        });
    };

    window.closePortal = function() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.remove();
            document.body.classList.remove('modal-open');
        }
    };

    window.openDirections = function() {
        const address = '365 N Cool Spring Street, Fayetteville, NC 28301';
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
    };

    window.openStreetView = function() {
        window.open('https://www.google.com/maps/@35.0529,-78.8779,3a,75y,90t/data=!3m4!1e1!3m2!1sAF1QipMExample!2e10', '_blank');
    };

    // Form validation and submission
    function initializeForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();

                    if (!field.value.trim()) {
                        isValid = false;
                        const error = document.createElement('div');
                        error.className = 'error-message';
                        error.textContent = 'This field is required';
                        field.parentNode.appendChild(error);
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (isValid) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Thank you for your submission! We\'ll get back to you soon.';
                    form.insertBefore(successMsg, form.firstChild);
                    
                    // Reset form
                    form.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        if (successMsg.parentNode) {
                            successMsg.remove();
                        }
                    }, 5000);
                }
            });
        });
    }

    // Initialize forms when they exist
    initializeForms();

    // Contact form specific handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <h4>Thank you for contacting St. Ann Catholic School!</h4>
                <p>We have received your message and will respond within 24 hours. If you need immediate assistance, please call us at (910) 483-3216.</p>
            `;
            contactForm.insertBefore(successMsg, contactForm.firstChild);
            
            // Reset form
            contactForm.reset();
            
            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove success message after 10 seconds
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.remove();
                }
            }, 10000);
        });
    }

    // Directions button functionality
    const directionsBtn = document.querySelector('.directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function() {
            const address = '365 N Cool Spring Street, Fayetteville, NC 28301';
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            closePortal();
        }
        
        // Enter key on buttons
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // School FAQ chatbot
    function initSchoolChatbot() {
        if (document.querySelector('.school-chatbot')) return;

        const isNestedPage = window.location.pathname.includes('/photos/');
        const pageUrl = (path) => `${isNestedPage ? '../' : ''}${path}`;
        const officePhone = '(910) 483-3216';
        const officeEmail = 'schooladmin@mysacs.org';

        const faqItems = [
            {
                label: 'Apply',
                patterns: [/apply|application|admission|enroll|enrollment|rolling|visit|tour/i],
                answer: `Applications are reviewed year-round for Pre-K through 8th grade. You can apply through Gradelink, schedule a tour, or call ${officePhone} for help with admissions.`,
                links: [
                    ['Apply online', 'https://secure.gradelink.com/1994/enrollment'],
                    ['Application checklist', pageUrl('application-checklist.html')],
                    ['Contact admissions', pageUrl('contact.html')]
                ]
            },
            {
                label: 'Tuition',
                patterns: [/tuition|cost|fee|payment|price|rate/i],
                answer: `Tuition and fee details are listed on the tuition page. For family-specific questions, the school office can help at ${officePhone}.`,
                links: [['Tuition information', pageUrl('tuition.html')]]
            },
            {
                label: 'Scholarships',
                patterns: [/scholar|financial|aid|opportunity|grant|ncseaa|tuition assistance/i],
                answer: 'St. Ann families may be able to use NC Opportunity Scholarships and Diocese of Raleigh tuition assistance. The scholarship page explains the options and next steps.',
                links: [['Scholarship opportunities', pageUrl('opportunity-scholarship.html')]]
            },
            {
                label: 'Calendar',
                patterns: [/calendar|date|event|schedule|holiday|break|early release|school year/i],
                answer: 'The school calendar includes upcoming dates, holidays, school events, and family reminders.',
                links: [['View calendar', pageUrl('calendar.html')]]
            },
            {
                label: 'Uniforms',
                patterns: [/uniform|dress code|clothes|shirt|pants|skirt|shoes/i],
                answer: 'Uniform guidelines and ordering details are available on the uniforms page.',
                links: [['Uniform information', pageUrl('uniforms.html')]]
            },
            {
                label: 'Before/After Care',
                patterns: [/before|after|care|extended|morning|afternoon|pickup|drop off/i],
                answer: 'Before and After Care information, including rates and program details, is available online.',
                links: [['Before/After Care', pageUrl('before-after-care.html')]]
            },
            {
                label: 'Contact',
                patterns: [/contact|phone|call|email|address|location|office|directions/i],
                answer: `St. Ann Catholic School is located at 365 N Cool Spring Street, Fayetteville, NC. Call ${officePhone} or email ${officeEmail}.`,
                links: [
                    ['Call the school', 'tel:+19104833216'],
                    ['Email the office', `mailto:${officeEmail}`],
                    ['Contact page', pageUrl('contact.html')]
                ]
            },
            {
                label: 'Faculty',
                patterns: [/faculty|teacher|staff|principal|bishop|pittman|administrator/i],
                answer: 'You can find faculty, staff, and leadership information on the faculty and principal pages.',
                links: [
                    ['Our faculty', pageUrl('faculty.html')],
                    ['Our principal', pageUrl('principal.html')]
                ]
            },
            {
                label: 'Supply Lists',
                patterns: [/supply|supplies|list|classroom materials|back to school/i],
                answer: 'Supply lists are available by grade so families can prepare for the school year.',
                links: [['School supply lists', pageUrl('supply-lists.html')]]
            },
            {
                label: 'Lunch & Handbook',
                patterns: [/lunch|meal|food|handbook|policy|policies|forms/i],
                answer: 'Handbook information and lunch ordering details are collected on one page for families.',
                links: [['Handbook & lunch ordering', pageUrl('handbook-lunch.html')]]
            },
            {
                label: 'Athletics',
                patterns: [/athletic|sports|basketball|soccer|volleyball|team|st patrick|shamrock/i],
                answer: 'Athletics information, sports seasons, and St. Ann/St. Patrick team unity details are available on the athletics page.',
                links: [['Athletics', pageUrl('athletics.html')]]
            },
            {
                label: 'Support',
                patterns: [/donate|support|gift|giving|fundraising|raiseright|double good/i],
                answer: 'Families and friends can support St. Ann through donations and fundraising opportunities.',
                links: [
                    ['Support Us', pageUrl('support-us.html')],
                    ['Donate', pageUrl('donate.html')],
                    ['Fundraising opportunities', pageUrl('fundraising-opportunities.html')]
                ]
            },
            {
                label: 'Safe Environment',
                patterns: [/safe|environment|volunteer|training|background|child protection/i],
                answer: 'Safe Environment information explains volunteer requirements, training, and child protection resources.',
                links: [['Safe Environment', pageUrl('safe-environment.html')]]
            },
            {
                label: 'Parish',
                patterns: [/parish|church|mass|faith|service|sacrament|prayer/i],
                answer: 'St. Ann is deeply connected to parish life, faith formation, Mass, prayer, and service.',
                links: [['Parish connection', pageUrl('parish.html')]]
            }
        ];

        const quickPrompts = [
            'How do I apply?',
            'Tuition and scholarships',
            'School calendar',
            'Uniforms',
            'Contact the office'
        ];

        const widget = document.createElement('section');
        widget.className = 'school-chatbot';
        widget.setAttribute('aria-label', 'Ask St. Ann FAQ assistant');
        widget.innerHTML = `
            <button class="chatbot-toggle" type="button" aria-expanded="false" aria-controls="school-chatbot-panel">
                <i class="fas fa-comments" aria-hidden="true"></i>
                <span>Ask St. Ann</span>
            </button>
            <div class="chatbot-panel" id="school-chatbot-panel" aria-live="polite">
                <div class="chatbot-header">
                    <div>
                        <span>St. Ann FAQ</span>
                        <strong>How can we help?</strong>
                    </div>
                    <button class="chatbot-close" type="button" aria-label="Close chat">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="chatbot-messages"></div>
                <div class="chatbot-prompts" aria-label="Common questions"></div>
                <form class="chatbot-form">
                    <input type="text" name="chatbot-question" placeholder="Ask about admissions, tuition, uniforms..." autocomplete="off" aria-label="Ask a question">
                    <button type="submit" aria-label="Send question">
                        <i class="fas fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(widget);

        const toggle = widget.querySelector('.chatbot-toggle');
        const close = widget.querySelector('.chatbot-close');
        const panel = widget.querySelector('.chatbot-panel');
        const messages = widget.querySelector('.chatbot-messages');
        const prompts = widget.querySelector('.chatbot-prompts');
        const form = widget.querySelector('.chatbot-form');
        const input = widget.querySelector('input');

        function setOpen(isOpen) {
            widget.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                window.setTimeout(() => input.focus(), 120);
            } else {
                toggle.focus();
            }
        }

        function addMessage(text, sender, links = []) {
            const message = document.createElement('div');
            message.className = `chatbot-message ${sender}`;
            const bubble = document.createElement('div');
            bubble.className = 'chatbot-bubble';
            const copy = document.createElement('p');
            copy.textContent = text;
            bubble.appendChild(copy);

            if (links.length) {
                const linkWrap = document.createElement('div');
                linkWrap.className = 'chatbot-links';
                links.forEach(([label, href]) => {
                    const link = document.createElement('a');
                    link.href = href;
                    link.textContent = label;
                    if (/^https?:/.test(href)) {
                        link.target = '_blank';
                        link.rel = 'noopener';
                    }
                    linkWrap.appendChild(link);
                });
                bubble.appendChild(linkWrap);
            }

            message.appendChild(bubble);
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        }

        function findAnswer(question) {
            const normalized = question.trim();
            return faqItems.find(item => item.patterns.some(pattern => pattern.test(normalized))) || {
                answer: `I can help with common school questions. For anything specific, please call ${officePhone} or email ${officeEmail}.`,
                links: [
                    ['Contact the office', pageUrl('contact.html')],
                    ['Call now', 'tel:+19104833216']
                ]
            };
        }

        function askQuestion(question) {
            const trimmed = question.trim();
            if (!trimmed) return;
            addMessage(trimmed, 'user');
            const result = findAnswer(trimmed);
            window.setTimeout(() => {
                addMessage(result.answer, 'bot', result.links);
            }, 180);
        }

        quickPrompts.forEach(prompt => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = prompt;
            button.addEventListener('click', () => askQuestion(prompt));
            prompts.appendChild(button);
        });

        addMessage('Hi! I can answer quick questions about admissions, tuition, scholarships, uniforms, calendars, faculty, and school contact information.', 'bot');

        toggle.addEventListener('click', () => setOpen(!widget.classList.contains('active')));
        close.addEventListener('click', () => setOpen(false));
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && widget.classList.contains('active')) {
                setOpen(false);
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            askQuestion(input.value);
            input.value = '';
        });

        panel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    initSchoolChatbot();

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedHighlightNav = debounce(highlightNavigation, 10);
    window.removeEventListener('scroll', highlightNavigation);
    window.addEventListener('scroll', debouncedHighlightNav);
});

// Add CSS for modal and animations dynamically
const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 26, 46, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(6px);
        animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
        background: #faf8f0;
        border-radius: 0.75rem;
        width: min(980px, 92vw);
        max-width: 92vw;
        max-height: 90vh;
        overflow: auto;
        box-shadow: 0 25px 50px -12px rgba(26, 39, 68, 0.3);
        animation: modalSlideIn 0.3s ease-out;
        border: 1px solid #e2ddd2;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e2ddd2;
        background: white;
        border-radius: 0.75rem 0.75rem 0 0;
    }

    .modal-header h2 {
        font-family: 'Cormorant Garamond', 'Georgia', serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a2744;
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #8a827c;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background: #f5f2e8;
        color: #2c2420;
    }

    .modal-body {
        padding: 2rem;
    }

    .portal-options {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
        align-items: stretch;
    }

    .portal-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem 1.5rem;
        border: 1px solid #e2ddd2;
        border-radius: 0.6rem;
        transition: all 0.3s ease;
        background: white;
        min-height: 100%;
    }

    .portal-option:hover {
        border-color: #c9a84c;
        box-shadow: 0 4px 12px -2px rgba(26, 39, 68, 0.08);
        transform: translateY(-2px);
    }

    .portal-icon {
        width: 3rem;
        height: 3rem;
        background: linear-gradient(145deg, #1a2744 0%, #2a3d5e 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: #c9a84c;
        font-size: 1.25rem;
    }

    .portal-option h3 {
        font-family: 'Cormorant Garamond', 'Georgia', serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a2744;
        margin-bottom: 0.75rem;
    }

    .portal-option p {
        color: #5a524d;
        flex: 1;
        margin-bottom: 1.75rem;
        font-size: 0.9rem;
        line-height: 1.6;
    }

    .portal-action {
        display: flex;
        justify-content: center;
        margin-top: auto;
        width: 100%;
    }

    .portal-action .btn-primary {
        display: inline-flex;
        justify-content: center;
        min-width: 10.5rem;
        width: min(100%, 12rem);
    }

    .modal-open {
        overflow: hidden;
    }

    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .error-message {
        color: #9a3a4a;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .success-message {
        background: #1a2744;
        color: #c9a84c;
        padding: 1.25rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        animation: fadeIn 0.3s ease-out;
        border: 1px solid rgba(201, 168, 76, 0.3);
    }

    .success-message h4 {
        color: white;
        margin-bottom: 0.5rem;
    }

    .success-message p {
        color: rgba(255, 255, 255, 0.8);
    }

    .error {
        border-color: #7b2d3a !important;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @media (max-width: 768px) {
        .portal-options {
            grid-template-columns: 1fr;
        }

        .modal-content {
            max-width: 95vw;
            margin: 1rem;
        }

        .modal-header,
        .modal-body {
            padding: 1.5rem;
        }

        .portal-option {
            padding: 1.5rem 1rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
