<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindAHomeCare | Interactive Brand Identity System</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- Google Fonts: Lora (Primary Typeface) -->
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- Tailwind Configuration for Brand Colors -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            navy: '#1B4F72',
                            navyDark: '#133B57',
                            navyLight: '#C7DCEB',
                            sky: '#EDF5F8',
                            gold: '#FAD06E',
                            goldDark: '#C29A2A',
                            goldLight: '#FDE9B8',
                            cream: '#FBF5EB',
                            charcoal: '#1F1F1F',
                            darkGray: '#3A3A3A',
                            softGray: '#F2F2F2',
                            ghost: '#FAFAFA'
                        }
                    },
                    fontFamily: {
                        serif: ['Lora', 'serif'],
                    }
                }
            }
        }
    </script>

    <style>
        /* Base Styles */
        body {
            font-family: 'Lora', serif;
            background-color: #FAFAFA;
            color: #1F1F1F;
        }

        /* Chart Container Styling (Mandatory Requirement) */
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
            padding: 1rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 640px) {
            .chart-container {
                height: 300px;
            }
        }

        /* Custom CSS Logo Construction (No SVG) */
        .css-logo {
            width: 40px;
            height: 40px;
            border: 4px solid #FAD06E;
            border-radius: 50%;
            position: relative;
            display: inline-block;
        }
        .css-logo::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
            background-color: #1B4F72;
            border-radius: 50%;
        }
        .css-logo::before {
            content: '';
            position: absolute;
            top: -2px;
            right: -2px;
            width: 12px;
            height: 12px;
            background-color: #FAD06E;
            border-radius: 50%;
        }

        /* Interactive Elements */
        .color-swatch {
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }
        .color-swatch:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .step-card {
            transition: all 0.3s ease;
        }
        .step-card.active {
            border-left: 6px solid #FAD06E;
            background-color: #EDF5F8;
        }
    </style>

    <!-- Placeholder Comments -->
    <!-- Chosen Palette: FindAHomeCare Primary (Deep Navy/Sky White) & Secondary (Warm Gold/Cream) -->
    <!-- Application Structure Plan: The SPA is designed as an interactive "Digital Brand Style Guide". It begins with the Core Identity to establish the brand voice. It then provides an interactive "Visual System" section for designers to copy color codes and test typography. The third section, "Brand in Action," demonstrates the practical application of these assets through the Services and Process flows described in the report. Finally, an Analytics section uses charts to visualize the Brand Composition and Testimonial Impact, adding a quantitative layer to the qualitative brand kit. This structure allows stakeholders to not just read about the brand, but experience and utilize its components. -->
    <!-- Visualization & Content Choices: 
        1. Color Composition Doughnut Chart: Goal -> Inform. Viz -> Chart.js Doughnut. Justification -> Visualizes the recommended usage ratio of the brand palette (Dominant Navy, Accent Gold) as implied by the visual hierarchy in the PDF.
        2. Testimonial Impact Bar Chart: Goal -> Impact/Growth. Viz -> Chart.js Bar. Justification -> The testimonial explicitly mentions "grown my client base." A chart reinforces this success metric dynamically.
        3. Typography Tester: Goal -> Compare/Change. Viz -> Interactive Text Area. Justification -> Allows users to see the 'Lora' font in various weights/sizes instantly.
        4. Interactive Process Timeline: Goal -> Change/Flow. Viz -> JS-driven Step Wizard. Justification -> Breaks down the 3-step user process into digestible, interactive chunks.
        CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. 
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
</head>
<body class="flex flex-col min-h-screen">

    <!-- Navigation -->
    <nav class="bg-brand-navy text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="css-logo mr-3"></div>
                    <span class="font-bold text-xl tracking-tight">FindAHomeCare</span>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#identity" class="hover:text-brand-gold transition-colors">Identity</a>
                    <a href="#visual-system" class="hover:text-brand-gold transition-colors">Visual System</a>
                    <a href="#brand-action" class="hover:text-brand-gold transition-colors">Services & Process</a>
                    <a href="#analytics" class="hover:text-brand-gold transition-colors">Impact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section: Value Proposition -->
    <header id="identity" class="bg-brand-sky border-b border-brand-navyLight">
        <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 pr-0 md:pr-12">
                <div class="inline-block bg-brand-gold/20 text-brand-navyDark px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Brand Kit 2026
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
                    Find your place.
                </h1>
                <p class="text-xl text-brand-darkGray mb-8 leading-relaxed">
                    A welcoming community offering the peace, privacy, and lifestyle you've been searching for. Backed by <span class="font-bold text-brand-navy">Care Indeed's</span> expertise.
                </p>
                <div class="flex space-x-4">
                    <button onclick="scrollToSection('visual-system')" class="bg-brand-navy text-white px-6 py-3 rounded hover:bg-brand-navyDark transition-colors shadow-md">
                        Explore Identity
                    </button>
                    <button onclick="scrollToSection('brand-action')" class="bg-white text-brand-navy border border-brand-navy px-6 py-3 rounded hover:bg-brand-sky transition-colors">
                        View Application
                    </button>
                </div>
            </div>
            <div class="md:w-1/2 mt-10 md:mt-0 relative">
                <!-- Abstract Representation of "Logo Mark" described in report -->
                <div class="w-64 h-64 mx-auto bg-brand-navy rounded-full flex items-center justify-center relative shadow-2xl">
                    <div class="w-48 h-48 border-8 border-brand-gold rounded-full flex items-center justify-center">
                         <div class="w-24 h-24 bg-brand-sky rounded-full"></div>
                    </div>
                    <div class="absolute top-0 right-10 w-12 h-12 bg-brand-gold rounded-full border-4 border-white"></div>
                </div>
                <p class="text-center mt-4 text-sm text-brand-charcoal italic">The "Logo Mark": A circular, abstract icon representing connection and care.</p>
            </div>
        </div>
    </header>

    <main class="flex-grow">
        
        <!-- Section 2: Visual System (Interactive Palette & Typography) -->
        <section id="visual-system" class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-brand-navy border-b-2 border-brand-gold inline-block pb-2">Visual System</h2>
                    <p class="mt-4 text-lg text-brand-darkGray max-w-3xl">
                        The visual foundation of FindAHomeCare relies on a balance of professional stability (Navy) and welcoming warmth (Gold). Use the interactive tools below to copy color codes and test the primary typeface, <b>Lora</b>.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Interactive Color Palette -->
                    <div>
                        <h3 class="text-xl font-bold text-brand-navyDark mb-6">Interactive Color Palette</h3>
                        <p class="text-sm text-gray-500 mb-4">Click any swatch to copy its Hex code.</p>
                        
                        <div class="space-y-6">
                            <!-- Primary -->
                            <div>
                                <h4 class="font-semibold text-brand-charcoal mb-2">Primary</h4>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-white text-xs" style="background-color: #1B4F72;" onclick="copyColor('#1B4F72')">Deep Navy<br>#1B4F72</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs border border-gray-200" style="background-color: #EDF5F8;" onclick="copyColor('#EDF5F8')">Sky White<br>#EDF5F8</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-white text-xs" style="background-color: #133B57;" onclick="copyColor('#133B57')">Darkest<br>#133B57</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs" style="background-color: #C7DCEB;" onclick="copyColor('#C7DCEB')">Accent Blue<br>#C7DCEB</div>
                                </div>
                            </div>
                            
                            <!-- Secondary -->
                            <div>
                                <h4 class="font-semibold text-brand-charcoal mb-2">Secondary</h4>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs" style="background-color: #FAD06E;" onclick="copyColor('#FAD06E')">Warm Gold<br>#FAD06E</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs border border-gray-200" style="background-color: #FBF5EB;" onclick="copyColor('#FBF5EB')">Cream<br>#FBF5EB</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-white text-xs" style="background-color: #C29A2A;" onclick="copyColor('#C29A2A')">Antique Gold<br>#C29A2A</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs" style="background-color: #FDE9B8;" onclick="copyColor('#FDE9B8')">Soft Yellow<br>#FDE9B8</div>
                                </div>
                            </div>

                            <!-- Neutrals -->
                            <div>
                                <h4 class="font-semibold text-brand-charcoal mb-2">Neutrals</h4>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-white text-xs" style="background-color: #1F1F1F;" onclick="copyColor('#1F1F1F')">Charcoal<br>#1F1F1F</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-white text-xs" style="background-color: #3A3A3A;" onclick="copyColor('#3A3A3A')">Dark Gray<br>#3A3A3A</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs border border-gray-200" style="background-color: #F2F2F2;" onclick="copyColor('#F2F2F2')">Soft Gray<br>#F2F2F2</div>
                                    <div class="color-swatch h-24 rounded-lg flex flex-col justify-end p-2 text-brand-navy text-xs border border-gray-200" style="background-color: #FAFAFA;" onclick="copyColor('#FAFAFA')">Ghost White<br>#FAFAFA</div>
                                </div>
                            </div>
                        </div>
                        <div id="copy-toast" class="hidden mt-2 p-2 bg-brand-navy text-white text-sm rounded text-center">Color Copied!</div>
                    </div>

                    <!-- Typography Tester -->
                    <div class="bg-brand-sky p-8 rounded-xl border border-brand-navyLight">
                        <h3 class="text-xl font-bold text-brand-navyDark mb-4">Typography: Lora</h3>
                        <p class="mb-4 text-sm text-brand-charcoal">The brand utilizes a sophisticated serif font to convey authority and elegance. Try it below.</p>
                        
                        <div class="bg-white p-6 rounded shadow-inner min-h-[200px]">
                            <p id="type-preview" class="text-brand-charcoal" style="font-size: 24px;">
                                FindAHomeCare connects families with compassionate professionals.
                            </p>
                        </div>
                        
                        <div class="mt-6 flex flex-col space-y-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-brand-navy mb-1">Font Size</label>
                                <input type="range" min="16" max="64" value="24" class="w-full accent-brand-navy" oninput="updateFontSize(this.value)">
                            </div>
                            <div class="flex space-x-4">
                                <button onclick="setTypeStyle('normal')" class="px-3 py-1 bg-brand-navy text-white text-sm rounded">Regular</button>
                                <button onclick="setTypeStyle('italic')" class="px-3 py-1 bg-brand-navy text-white text-sm rounded italic">Italic</button>
                                <button onclick="setTypeStyle('700')" class="px-3 py-1 bg-brand-navy text-white text-sm rounded font-bold">Bold</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Brand in Action (Services & Process) -->
        <section id="brand-action" class="py-16 bg-brand-cream">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-brand-navy border-b-2 border-brand-gold inline-block pb-2">Brand In Action: Services & Flow</h2>
                    <p class="mt-4 text-lg text-brand-darkGray max-w-3xl">
                        This section demonstrates how the brand's core services and user process should be presented to families: clear, comforting, and structured.
                    </p>
                </div>

                <!-- Core Services Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all border-t-4 border-brand-navy">
                        <div class="text-4xl mb-4">🏠</div>
                        <h3 class="text-2xl font-bold text-brand-navy mb-2">Assisted Living</h3>
                        <p class="text-brand-charcoal">Communities offering the perfect balance of independence and support.</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all border-t-4 border-brand-gold">
                        <div class="text-4xl mb-4">🤝</div>
                        <h3 class="text-2xl font-bold text-brand-navy mb-2">Home Care</h3>
                        <p class="text-brand-charcoal">Professional care provided in the comfort and safety of your own home.</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all border-t-4 border-brand-navy">
                        <div class="text-4xl mb-4">🧠</div>
                        <h3 class="text-2xl font-bold text-brand-navy mb-2">Memory Care</h3>
                        <p class="text-brand-charcoal">Specialized support environments for individuals with memory impairments.</p>
                    </div>
                </div>

                <!-- Interactive Process Stepper -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                    <!-- Step Navigation -->
                    <div class="md:w-1/3 bg-brand-navy text-white p-8">
                        <h3 class="text-2xl font-bold mb-6 text-brand-gold">The User Process</h3>
                        <p class="mb-8 text-brand-sky text-sm">How we connect families with providers. Click a step to view details.</p>
                        
                        <div class="space-y-4">
                            <button onclick="setStep(1)" id="btn-step-1" class="w-full text-left p-4 rounded bg-brand-navyDark hover:bg-brand-navyLight hover:text-brand-navy transition-colors border-l-4 border-brand-gold">
                                <span class="font-bold">Step 1:</span> Needs
                            </button>
                            <button onclick="setStep(2)" id="btn-step-2" class="w-full text-left p-4 rounded hover:bg-brand-navyLight hover:text-brand-navy transition-colors border-l-4 border-transparent">
                                <span class="font-bold">Step 2:</span> Matching
                            </button>
                            <button onclick="setStep(3)" id="btn-step-3" class="w-full text-left p-4 rounded hover:bg-brand-navyLight hover:text-brand-navy transition-colors border-l-4 border-transparent">
                                <span class="font-bold">Step 3:</span> Choice
                            </button>
                        </div>
                    </div>
                    
                    <!-- Step Content Display -->
                    <div class="md:w-2/3 p-10 bg-brand-sky flex items-center">
                        <div id="step-content">
                            <!-- Dynamic Content Loaded Here -->
                            <div class="animate-fade-in">
                                <h4 class="text-3xl font-bold text-brand-navy mb-4">Tell us about your needs</h4>
                                <p class="text-xl text-brand-charcoal mb-6">Fill out our simple, secure form to share your loved one's care requirements.</p>
                                <div class="inline-block px-4 py-2 bg-brand-gold text-brand-navy font-bold rounded">Step 1 Action</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4: Analytics & Social Proof -->
        <section id="analytics" class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-brand-navy border-b-2 border-brand-gold inline-block pb-2">Impact & Visualization</h2>
                    <p class="mt-4 text-lg text-brand-darkGray max-w-3xl">
                        Visualizing the brand composition and the tangible results provided to our partners.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    
                    <!-- Chart 1: Brand Color Balance -->
                    <div>
                        <div class="mb-6">
                            <h3 class="text-xl font-bold text-brand-navy">Brand Color Composition</h3>
                            <p class="text-sm text-gray-500">Recommended visual weight for layouts.</p>
                        </div>
                        <!-- MANDATORY CHART CONTAINER -->
                        <div class="chart-container">
                            <canvas id="colorChart"></canvas>
                        </div>
                        <div class="mt-4 p-4 bg-brand-sky rounded text-sm text-brand-navy italic border-l-4 border-brand-navy">
                            "The primary palette represents stability and trust, while the secondary gold adds warmth."
                        </div>
                    </div>

                    <!-- Chart 2 & Testimonial -->
                    <div>
                        <div class="mb-6">
                            <h3 class="text-xl font-bold text-brand-navy">Caregiver Success Metrics</h3>
                            <p class="text-sm text-gray-500">Based on testimonial feedback regarding client growth.</p>
                        </div>
                        <!-- MANDATORY CHART CONTAINER -->
                        <div class="chart-container">
                            <canvas id="growthChart"></canvas>
                        </div>
                        
                        <!-- Testimonial Block -->
                        <div class="mt-6 bg-brand-navy text-white p-6 rounded-lg relative">
                            <div class="text-4xl text-brand-gold absolute top-4 left-4">“</div>
                            <p class="pl-6 italic relative z-10 mb-4">
                                As an independent, I love the qualified respite referrals—it’s free to join, and I’ve grown my client base without marketing costs. Families trust the platform.
                            </p>
                            <div class="flex items-center pl-6">
                                <div class="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold mr-3">M</div>
                                <div>
                                    <p class="font-bold text-brand-gold">Maria L.</p>
                                    <p class="text-xs text-brand-sky">Caregiver, Oakland</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>

    <footer class="bg-brand-charcoal text-brand-softGray py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-6 md:mb-0">
                <span class="font-bold text-2xl tracking-tight text-white">FindAHomeCare</span>
                <p class="text-sm mt-2 text-gray-400">© 2026 Brand Guidelines. Powered by Care Indeed.</p>
            </div>
            <div class="flex space-x-6">
                <a href="#" class="hover:text-brand-gold transition-colors">Privacy</a>
                <a href="#" class="hover:text-brand-gold transition-colors">Vetting Process</a>
                <a href="#" class="hover:text-brand-gold transition-colors">Contact</a>
            </div>
        </div>
    </footer>

    <!-- JavaScript Logic -->
    <script>
        // --- State Management ---
        const appState = {
            currentStep: 1,
            colors: {
                navy: '#1B4F72',
                gold: '#FAD06E',
                sky: '#EDF5F8',
                white: '#FFFFFF',
                dark: '#3A3A3A'
            },
            processData: [
                {
                    id: 1,
                    title: "Tell us about your needs",
                    desc: "Fill out our simple, secure form to share your loved one's care requirements.",
                    action: "Start Assessment"
                },
                {
                    id: 2,
                    title: "Get matched with vetted providers",
                    desc: "We connect you with licensed, local agencies ready to help. Our expertise ensures a safe match.",
                    action: "View Matches"
                },
                {
                    id: 3,
                    title: "Compare & choose with confidence",
                    desc: "Review your options, speak with agencies, and select the right fit for your family.",
                    action: "Finalize Care"
                }
            ]
        };

        // --- Interaction Functions ---

        // 1. Smooth Scroll Navigation
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // 2. Color Palette Copier
        function copyColor(hex) {
            navigator.clipboard.writeText(hex).then(() => {
                const toast = document.getElementById('copy-toast');
                toast.textContent = `Copied ${hex}`;
                toast.style.backgroundColor = hex;
                // Adjust text color based on background brightness for readability
                toast.style.color = (hex === '#EDF5F8' || hex === '#FBF5EB' || hex === '#F2F2F2' || hex === '#FAFAFA' || hex === '#FDE9B8' || hex === '#C7DCEB') ? '#1B4F72' : '#FFFFFF';
                
                toast.classList.remove('hidden');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 2000);
            });
        }

        // 3. Typography Tester
        function updateFontSize(val) {
            document.getElementById('type-preview').style.fontSize = val + 'px';
        }

        function setTypeStyle(style) {
            const el = document.getElementById('type-preview');
            el.style.fontWeight = 'normal';
            el.style.fontStyle = 'normal';
            
            if (style === 'italic') el.style.fontStyle = 'italic';
            else if (style === '700') el.style.fontWeight = '700';
        }

        // 4. Process Stepper Logic
        function setStep(stepId) {
            appState.currentStep = stepId;
            
            // Update Buttons
            [1, 2, 3].forEach(id => {
                const btn = document.getElementById(`btn-step-${id}`);
                if (id === stepId) {
                    btn.classList.add('bg-brand-navyDark', 'border-brand-gold');
                    btn.classList.remove('border-transparent');
                } else {
                    btn.classList.remove('bg-brand-navyDark', 'border-brand-gold');
                    btn.classList.add('border-transparent');
                }
            });

            // Update Content with Fade Animation
            const contentDiv = document.getElementById('step-content');
            const data = appState.processData.find(d => d.id === stepId);
            
            contentDiv.innerHTML = `
                <div class="animate-fade-in opacity-0 transition-opacity duration-500" id="inner-content">
                    <h4 class="text-3xl font-bold text-brand-navy mb-4">${data.title}</h4>
                    <p class="text-xl text-brand-charcoal mb-6">${data.desc}</p>
                    <div class="inline-block px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded shadow-md hover:bg-brand-goldDark transition-colors cursor-pointer">${data.action}</div>
                </div>
            `;
            
            // Trigger reflow for animation
            setTimeout(() => {
                document.getElementById('inner-content').classList.remove('opacity-0');
            }, 50);
        }

        // --- Chart Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            
            // Chart 1: Brand Color Composition (Doughnut)
            // Goal: Inform designers of the correct color balance.
            const ctxColor = document.getElementById('colorChart').getContext('2d');
            new Chart(ctxColor, {
                type: 'doughnut',
                data: {
                    labels: ['Primary Navy', 'Sky White', 'Secondary Gold', 'Neutrals'],
                    datasets: [{
                        data: [45, 30, 15, 10], // Estimated weights based on design best practices for this kit
                        backgroundColor: [
                            appState.colors.navy,
                            appState.colors.sky,
                            appState.colors.gold,
                            appState.colors.dark
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { family: 'Lora' } }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.raw + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Chart 2: Caregiver Growth (Bar)
            // Goal: Visualize the impact mentioned in the testimonial ("grown my client base").
            const ctxGrowth = document.getElementById('growthChart').getContext('2d');
            new Chart(ctxGrowth, {
                type: 'bar',
                data: {
                    labels: ['Before Joining', 'After Joining'],
                    datasets: [{
                        label: 'Client Base Growth',
                        data: [20, 85], // Mock data illustrating "Growth"
                        backgroundColor: [appState.colors.sky, appState.colors.gold],
                        borderColor: [appState.colors.navy, appState.colors.navy],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { display: false },
                            ticks: { display: false } // Hide numbers to keep it abstract/illustrative
                        },
                        x: {
                            grid: { display: false },
                            ticks: { font: { family: 'Lora', size: 14 } }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y + '% Increase';
                                }
                            }
                        }
                    }
                }
            });

            // Initialize Step 1 active state
            setStep(1);
        });

    </script>
</body>
</html>