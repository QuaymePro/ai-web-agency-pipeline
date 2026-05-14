const fs = require('fs');
const path = require('path');

const leads = JSON.parse(fs.readFileSync('dubai_pipeline/leads/leads.json', 'utf8'));

const images = {
  "Beauty Salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80",
  "Wellness & Therapy": "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&w=1920&q=80",
  "Beauty & Spa": "https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&w=1920&q=80",
  "Auto Repair": "https://images.unsplash.com/photo-1517524204709-440263301d97?auto=format&fit=crop&w=1920&q=80",
  "Pet Care": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1920&q=80",
  "Health": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80"
};

const colors = {
  "Beauty Salon": { primary: "#d4af37", secondary: "#ffffff", accent: "#2d3436" }, // Gold & White
  "Wellness & Therapy": { primary: "#78e08f", secondary: "#f1f2f6", accent: "#0c2461" },
  "Beauty & Spa": { primary: "#fa8072", secondary: "#fffafa", accent: "#2f3640" },
  "Auto Repair": { primary: "#e84118", secondary: "#f5f6fa", accent: "#2f3640" },
  "Pet Care": { primary: "#40739e", secondary: "#f5f6fa", accent: "#273c75" },
  "Health": { primary: "#00a8ff", secondary: "#ffffff", accent: "#191970" }
};

function generateHTML(lead) {
  const color = colors[lead.category] || { primary: "#333", secondary: "#fff", accent: "#666" };
  const heroImg = images[lead.category] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.name} | Premium ${lead.category} Dubai</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${color.primary};
            --secondary: ${color.secondary};
            --accent: ${color.accent};
            --text: #2d3436;
            --glass: rgba(255, 255, 255, 0.9);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            color: var(--text);
            line-height: 1.7;
            overflow-x: hidden;
            background-color: var(--secondary);
        }

        h1, h2, h3 {
            font-family: 'Cormorant Garamond', serif;
            letter-spacing: 1px;
        }

        /* Premium Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${heroImg}') no-repeat center center fixed;
            background-size: cover;
            color: white;
            padding: 0 20px;
        }

        .hero-content {
            max-width: 900px;
            animation: fadeIn 1.5s ease-in;
        }

        .hero h1 {
            font-size: 5rem;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2.5rem;
            font-weight: 300;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        .cta-button {
            display: inline-block;
            padding: 18px 50px;
            background-color: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 2px;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 2px;
            transition: all 0.4s;
            border: 1px solid var(--primary);
        }

        .cta-button:hover {
            background-color: transparent;
            color: white;
            border-color: white;
        }

        /* Sections */
        section {
            padding: 120px 20px;
            max-width: 1300px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 80px;
        }

        .section-header h2 {
            font-size: 3.5rem;
            margin-bottom: 10px;
        }

        .section-header p {
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        /* Glass Cards */
        .glass-card {
            background: var(--glass);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(0,0,0,0.05);
            padding: 60px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.03);
            border-radius: 4px;
        }

        /* About Section */
        .about-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
        }

        /* Services */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }

        .service-box {
            background: white;
            padding: 50px;
            text-align: center;
            border-bottom: 4px solid var(--primary);
            transition: transform 0.3s;
        }

        .service-box:hover {
            transform: translateY(-15px);
        }

        .service-box h3 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        /* Testimonials */
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }

        .testimonial-card {
            padding: 40px;
            border-left: 1px solid #eee;
        }

        .testimonial-card p {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.5rem;
            line-height: 1.4;
            margin-bottom: 20px;
        }

        .testimonial-card .author {
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--primary);
        }

        /* Contact/Footer */
        footer {
            background: #111;
            color: white;
            padding: 100px 20px;
            text-align: center;
        }

        .footer-logo {
            font-size: 2.5rem;
            margin-bottom: 40px;
        }

        .footer-contact {
            margin-bottom: 60px;
        }

        .footer-contact p {
            font-size: 1.1rem;
            margin-bottom: 10px;
            opacity: 0.7;
        }

        .footer-bottom {
            padding-top: 40px;
            border-top: 1px solid #222;
            font-size: 0.7rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.5;
        }

        /* Mobile */
        @media (max-width: 900px) {
            .hero h1 { font-size: 3rem; }
            .about-container { grid-template-columns: 1fr; }
            .section-header h2 { font-size: 2.5rem; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(1.05); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
</head>
<body>
    <header class="hero">
        <div class="hero-content">
            <p>ESTABLISHED IN DUBAI</p>
            <h1>${lead.name}</h1>
            <p>${lead.category}</p>
            <a href="mailto:${lead.email}" class="cta-button">BOOK AN APPOINTMENT</a>
        </div>
    </header>

    <section id="story">
        <div class="section-header">
            <p>UNCOMPROMISING QUALITY</p>
            <h2>The Tradition</h2>
        </div>
        <div class="about-container">
            <div>
                <img src="${heroImg}" alt="Dubai Luxury" style="width: 100%; filter: grayscale(20%);">
            </div>
            <div class="glass-card">
                <p>Located in the vibrant heart of <strong>Al Barsha</strong>, ${lead.name} represents the pinnacle of ${lead.category.toLowerCase()} services in Dubai.</p>
                <br>
                <p>We combine international standards with local hospitality to create an experience that is both sophisticated and deeply personal. Our commitment to excellence is reflected in every detail, from our expert team to the premium products we use.</p>
                <br>
                <p>Visit us at ${lead.address} and discover why we are the preferred choice for those who demand nothing but the best.</p>
            </div>
        </div>
    </section>

    <section id="services" style="background: #fafafa;">
        <div class="section-header">
            <p>ELITE OFFERINGS</p>
            <h2>Signature Services</h2>
        </div>
        <div class="services-grid">
            ${lead.specialties.map(s => `
                <div class="service-box">
                    <h3>${s}</h3>
                    <p>Bespoke care tailored to your exact needs, delivered with absolute precision and elegance.</p>
                </div>
            `).join('')}
        </div>
    </section>

    <section id="clients">
        <div class="section-header">
            <p>CLIENT VOICES</p>
            <h2>The Experience</h2>
        </div>
        <div class="testimonial-grid">
            ${lead.review_quotes.map(q => `
                <div class="testimonial-card">
                    <p>"${q}"</p>
                    <div class="author">★ 5.0 — Verified Client</div>
                </div>
            `).join('')}
        </div>
    </section>

    <footer>
        <div class="footer-logo">${lead.name}</div>
        <div class="footer-contact">
            <p>${lead.address}</p>
            <p><a href="tel:${lead.phone.replace(/\+/g, '')}" style="color: white; text-decoration: none;">${lead.phone}</a></p>
            <p><a href="mailto:${lead.email}" style="color: var(--primary); text-decoration: none;">${lead.email}</a></p>
        </div>
        <div class="footer-bottom">
            &copy; ${new Date().getFullYear()} ${lead.name} Dubai. All Rights Reserved.
        </div>
    </footer>
</body>
</html>
  `;
}

leads.forEach(lead => {
  const dir = path.join('dubai_pipeline/sites', lead.name.replace(/[^a-z0-9]/gi, '_').toLowerCase());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHTML(lead));
  console.log(`Generated Dubai site for ${lead.name}`);
});
