const fs = require('fs');
const path = require('path');

const leads = JSON.parse(fs.readFileSync('agency_pipeline/leads/leads.json', 'utf8'));

const images = {
  "Classic American Diner": "https://images.unsplash.com/photo-1550966842-293e077d3f33?auto=format&fit=crop&w=1920&q=80",
  "Donut Shop & Bakery": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1920&q=80",
  "Breakfast & Brunch": "https://images.unsplash.com/photo-1513267048331-5611cad82e4f?auto=format&fit=crop&w=1920&q=80",
  "Barbershop": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80",
  "Auto Repair": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80",
  "Plumbing": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80",
  "Plumbing & Heating": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80"
};

const colors = {
  "Classic American Diner": { primary: "#e63946", secondary: "#f1faee", accent: "#a8dadc" },
  "Donut Shop & Bakery": { primary: "#ffb703", secondary: "#8ecae6", accent: "#219ebc" },
  "Breakfast & Brunch": { primary: "#588157", secondary: "#fefae0", accent: "#bc6c25" },
  "Barbershop": { primary: "#1d3557", secondary: "#f1faee", accent: "#457b9d" },
  "Auto Repair": { primary: "#333533", secondary: "#f5cb5c", accent: "#cfdbd5" },
  "Plumbing": { primary: "#0077b6", secondary: "#caf0f8", accent: "#00b4d8" },
  "Plumbing & Heating": { primary: "#023e8a", secondary: "#ade8f4", accent: "#0077b6" }
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
    <title>${lead.name} | ${lead.category} in Santa Monica</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${color.primary};
            --secondary: ${color.secondary};
            --accent: ${color.accent};
            --text: #2d3436;
            --glass: rgba(255, 255, 255, 0.85);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
            background-color: var(--secondary);
        }

        h1, h2, h3 {
            font-family: 'Playfair Display', serif;
        }

        /* Hero Section with Parallax */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${heroImg}') no-repeat center center fixed;
            background-size: cover;
            color: white;
            padding: 0 20px;
        }

        .hero-content {
            max-width: 800px;
            animation: fadeInUp 1s ease-out;
        }

        .hero h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
        }

        .hero p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            font-weight: 300;
        }

        .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background-color: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .cta-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        /* Glassmorphism Sections */
        section {
            padding: 100px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 50px;
            position: relative;
        }

        .section-title::after {
            content: '';
            display: block;
            width: 60px;
            height: 4px;
            background: var(--primary);
            margin: 20px auto;
            border-radius: 2px;
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }

        .glass-card {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.05);
        }

        /* Services Grid */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }

        .service-item {
            text-align: center;
            transition: transform 0.3s;
        }

        .service-item:hover {
            transform: scale(1.05);
        }

        .service-item h3 {
            margin: 20px 0 10px;
            color: var(--primary);
        }

        /* Reviews */
        .reviews-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .review-card {
            flex: 1;
            min-width: 300px;
            max-width: 350px;
            font-style: italic;
        }

        .review-card span {
            display: block;
            margin-top: 15px;
            font-weight: 600;
            font-style: normal;
            color: var(--primary);
        }

        /* Footer */
        footer {
            background: #1e272e;
            color: white;
            padding: 80px 20px;
            text-align: center;
        }

        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }

        .footer-content p {
            margin-bottom: 10px;
            opacity: 0.8;
        }

        .footer-content a {
            color: var(--accent);
            text-decoration: none;
        }

        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .about-grid { grid-template-columns: 1fr; }
            section { padding: 60px 20px; }
        }
    </style>
</head>
<body>
    <header class="hero">
        <div class="hero-content">
            <p>ESTABLISHED IN SANTA MONICA</p>
            <h1>${lead.name}</h1>
            <p>${lead.hook}</p>
            <a href="tel:${lead.phone.replace(/\D/g, '')}" class="cta-button">${lead.category.includes('Restaurant') || lead.category.includes('Cafe') ? 'Order Now' : 'Book a Service'}</a>
            <div style="margin-top: 30px; font-size: 1.2rem;">★ ${lead.rating} — ${lead.reviews} Reviews</div>
        </div>
    </header>

    <section id="about">
        <div class="about-grid">
            <div class="glass-card">
                <h2 class="section-title" style="text-align: left;">Our Story</h2>
                <p>For years, <strong>${lead.name}</strong> has been a cornerstone of the Santa Monica community. We pride ourselves on delivering ${lead.category.toLowerCase()} services with a level of care and attention you simply won't find anywhere else.</p>
                <br>
                <p>Located at ${lead.address}, our shop is more than just a business—it's a place where quality meets tradition. Whether you're here for our signature ${lead.specialties[0]} or just to experience the vibe that locals have raved about for decades, you're always welcome.</p>
            </div>
            <div>
                <img src="${heroImg}" alt="About ${lead.name}" style="width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            </div>
        </div>
    </section>

    <section id="services" style="background-color: rgba(0,0,0,0.02);">
        <h2 class="section-title">What We Do Best</h2>
        <div class="services-grid">
            ${lead.specialties.map(s => `
                <div class="glass-card service-item">
                    <h3>${s}</h3>
                    <p>Experience the finest ${s} in the area, prepared with passion and served with a smile.</p>
                </div>
            `).join('')}
        </div>
    </section>

    <section id="reviews">
        <h2 class="section-title">From the Community</h2>
        <div class="reviews-container">
            ${lead.review_quotes.map(q => `
                <div class="glass-card review-card">
                    <div style="color: #f1c40f; margin-bottom: 10px;">★★★★★</div>
                    "${q}"
                    <span>— Local Customer</span>
                </div>
            `).join('')}
        </div>
    </section>

    <section id="location">
        <h2 class="section-title">Visit Us</h2>
        <div class="glass-card" style="text-align: center;">
            <p style="font-size: 1.2rem; margin-bottom: 20px;">${lead.address}</p>
            <p style="font-weight: 600; color: var(--primary);">Hours of Operation:</p>
            ${Object.entries(lead.hours).map(([days, time]) => `<p>${days}: ${time}</p>`).join('')}
            <br>
            <a href="tel:${lead.phone.replace(/\D/g, '')}" style="font-size: 1.5rem; color: var(--primary); text-decoration: none; font-weight: 700;">${lead.phone}</a>
            <div style="margin-top: 30px; height: 300px; background: #eee; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                <!-- Embed Google Maps iframe here -->
                <p>Map View for ${lead.name}</p>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">${lead.name}</h2>
            <p>${lead.address}</p>
            <p>${lead.phone}</p>
            <div style="margin: 30px 0;">
                <a href="#">Instagram</a> | <a href="#">Facebook</a> | <a href="#">Yelp</a>
            </div>
            <p style="font-size: 0.8rem; opacity: 0.5;">&copy; ${new Date().getFullYear()} ${lead.name}. Built with pride in Santa Monica.</p>
        </div>
    </footer>

    <script>
        // Smooth scroll animations
        window.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.glass-card');
            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                if(cardTop < window.innerHeight - 100) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Initial state for animations
        document.querySelectorAll('.glass-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
        });
    </script>
</body>
</html>
  `;
}

leads.forEach(lead => {
  const dir = path.join('agency_pipeline/sites', lead.name.replace(/[^a-z0-9]/gi, '_').toLowerCase());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHTML(lead));
  console.log(`Generated site for ${lead.name}`);
});
