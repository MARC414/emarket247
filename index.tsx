import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ root: './', path: '/favicon.svg' }))

// Route: Home
app.get('/', (c) => {
  return c.html(homePage())
})

// Route: Shop
app.get('/shop', (c) => {
  const category = c.req.query('category') || 'all'
  const sort = c.req.query('sort') || 'featured'
  return c.html(shopPage(category, sort))
})

// Route: Product Detail
app.get('/product/:id', (c) => {
  const id = c.req.param('id')
  return c.html(productPage(id))
})

// Route: Cart
app.get('/cart', (c) => {
  return c.html(cartPage())
})

// Route: Checkout
app.get('/checkout', (c) => {
  return c.html(checkoutPage())
})

// Route: Order Confirmation
app.get('/order-confirmed', (c) => {
  return c.html(orderConfirmedPage())
})

// Route: About
app.get('/about', (c) => {
  return c.html(aboutPage())
})

// API: Products JSON
app.get('/api/products', (c) => {
  return c.json(products)
})

// ─────────────────────────────────────────────
// SHARED DATA
// ─────────────────────────────────────────────

const products = [
  {
    id: '1', name: 'Royal Bridal Necklace Set', price: 2499, originalPrice: 4200,
    category: 'necklaces', badge: 'Bestseller',
    rating: 4.9, reviews: 312,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    description: 'Exquisitely crafted 22K gold-plated bridal necklace set with matching earrings and maang tikka. Features intricate Kundan work with ruby and emerald accents.',
    material: '22K Gold Plated', weight: '65g', occasion: 'Bridal/Wedding',
    inStock: true, featured: true,
    tags: ['bridal', 'necklace', 'gold', 'kundan', 'wedding'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    ]
  },
  {
    id: '2', name: 'Diamond Blossom Earrings', price: 1299, originalPrice: 2100,
    category: 'earrings', badge: 'New Arrival',
    rating: 4.8, reviews: 198,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=600&q=80',
    description: 'Dazzling drop earrings adorned with sparkling cubic zirconia stones. Perfect for parties, events, and special occasions.',
    material: '18K Gold Plated Sterling Silver', weight: '12g', occasion: 'Party/Festival',
    inStock: true, featured: true,
    tags: ['earrings', 'diamond', 'party', 'drop'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=800&q=80',
    ]
  },
  {
    id: '3', name: 'Celestial Gold Bracelet', price: 899, originalPrice: 1400,
    category: 'bracelets', badge: 'Hot Deal',
    rating: 4.7, reviews: 245,
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=600&q=80',
    description: 'Delicate gold chain bracelet featuring celestial charms including moon, stars, and sun motifs. Adjustable length for perfect fit.',
    material: '18K Gold Plated', weight: '8g', occasion: 'Everyday/Casual',
    inStock: true, featured: true,
    tags: ['bracelet', 'gold', 'charm', 'celestial'],
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    ]
  },
  {
    id: '4', name: 'Antique Kundan Choker Set', price: 3299, originalPrice: 5500,
    category: 'necklaces', badge: 'Premium',
    rating: 5.0, reviews: 87,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    description: 'Handcrafted antique Kundan choker with meenakari work. Includes matching jhumka earrings, maang tikka, and haath phool.',
    material: 'Antique Gold Plated Brass', weight: '120g', occasion: 'Bridal/Ethnic',
    inStock: true, featured: true,
    tags: ['choker', 'kundan', 'antique', 'bridal', 'set'],
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    ]
  },
  {
    id: '5', name: 'Rose Gold Stacking Rings', price: 599, originalPrice: 950,
    category: 'rings', badge: 'Sale',
    rating: 4.6, reviews: 432,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    description: 'Set of 3 elegant rose gold stacking rings with different textures. Mix and match for a personalized look.',
    material: 'Rose Gold Plated', weight: '6g', occasion: 'Everyday/Fashion',
    inStock: true, featured: false,
    tags: ['ring', 'rose gold', 'stacking', 'fashion'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ]
  },
  {
    id: '6', name: 'Pearl Drop Jhumka Earrings', price: 749, originalPrice: 1200,
    category: 'earrings', badge: 'Trending',
    rating: 4.8, reviews: 367,
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    description: 'Traditional jhumka earrings with freshwater pearl drops. Combines classic design with modern elegance.',
    material: '22K Gold Plated', weight: '20g', occasion: 'Festive/Ethnic',
    inStock: true, featured: true,
    tags: ['jhumka', 'pearl', 'earrings', 'traditional', 'ethnic'],
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    ]
  },
  {
    id: '7', name: 'Emerald Statement Necklace', price: 1899, originalPrice: 3100,
    category: 'necklaces', badge: 'New Arrival',
    rating: 4.7, reviews: 154,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    description: 'Bold statement necklace featuring vibrant emerald-colored stones in an intricate gold-tone setting.',
    material: '18K Gold Plated', weight: '45g', occasion: 'Party/Festive',
    inStock: true, featured: false,
    tags: ['necklace', 'emerald', 'statement', 'party'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    ]
  },
  {
    id: '8', name: 'Vintage Charm Bangles Set', price: 1199, originalPrice: 1900,
    category: 'bracelets', badge: 'Popular',
    rating: 4.9, reviews: 289,
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    description: 'Set of 6 vintage-inspired bangles with intricate filigree work. Each bangle features unique engravings.',
    material: 'Antique Gold Plated', weight: '60g', occasion: 'Traditional/Wedding',
    inStock: true, featured: false,
    tags: ['bangle', 'vintage', 'set', 'traditional'],
    images: [
      'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=800&q=80',
    ]
  },
  {
    id: '9', name: 'Solitaire Diamond Ring', price: 2199, originalPrice: 3500,
    category: 'rings', badge: 'Luxury',
    rating: 4.9, reviews: 143,
    image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    description: 'Classic solitaire ring featuring a stunning 2-carat cubic zirconia center stone in a 4-prong platinum-look setting.',
    material: 'Platinum Plated Silver', weight: '5g', occasion: 'Engagement/Special',
    inStock: false, featured: false,
    tags: ['ring', 'solitaire', 'diamond', 'engagement'],
    images: [
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800&q=80',
    ]
  },
  {
    id: '10', name: 'Floral Gold Tikka Maang', price: 649, originalPrice: 1050,
    category: 'accessories', badge: 'Ethnic Special',
    rating: 4.7, reviews: 198,
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    description: 'Intricate maang tikka with floral motif center piece and delicate chain. Perfect for brides and festive occasions.',
    material: '22K Gold Plated', weight: '15g', occasion: 'Bridal/Festive',
    inStock: true, featured: false,
    tags: ['maang tikka', 'bridal', 'ethnic', 'headpiece'],
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80',
    ]
  },
  {
    id: '11', name: 'Crystal Tennis Bracelet', price: 999, originalPrice: 1600,
    category: 'bracelets', badge: 'Bestseller',
    rating: 4.8, reviews: 502,
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1573408301185-9519f94806f5?w=600&q=80',
    description: 'Glamorous tennis bracelet with continuous row of sparkling crystals. Lobster clasp for secure wear.',
    material: 'Rhodium Plated Silver', weight: '18g', occasion: 'Party/Wedding',
    inStock: true, featured: false,
    tags: ['tennis bracelet', 'crystal', 'party', 'glamour'],
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    ]
  },
  {
    id: '12', name: 'Layered Gold Chain Necklace', price: 1149, originalPrice: 1850,
    category: 'necklaces', badge: 'Trending',
    rating: 4.6, reviews: 321,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    description: '3-layer gold chain necklace with varying lengths creating a modern layered look. Minimalist yet impactful.',
    material: '18K Gold Plated', weight: '22g', occasion: 'Everyday/Casual',
    inStock: true, featured: false,
    tags: ['chain', 'layered', 'necklace', 'modern', 'minimalist'],
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    ]
  },
]

// ─────────────────────────────────────────────
// LAYOUT COMPONENTS
// ─────────────────────────────────────────────

function baseHTML(title: string, description: string, content: string, extraHead = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="jewelry, gold plated, necklace, earrings, bracelet, rings, bridal jewelry, Bangladesh, online jewelry shop, emarket247">
  <meta name="author" content="Emarket247">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <title>${title}</title>

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gold: {
              50: '#fffdf0',
              100: '#fff8d6',
              200: '#ffeea3',
              300: '#ffe166',
              400: '#ffd024',
              500: '#f5b800',
              600: '#d49800',
              700: '#a97400',
              800: '#7d5500',
              900: '#4a3200',
            },
            rose: {
              50: '#fff0f3',
              100: '#ffe0e7',
              200: '#ffc0cf',
              300: '#ff8fa3',
              400: '#ff6b8a',
              500: '#f83d66',
              600: '#e5174a',
              700: '#c1103d',
              800: '#9f1039',
              900: '#880f36',
            },
            champagne: '#f7e7ce',
            cream: '#fdf8f0',
          },
          fontFamily: {
            serif: ['Cormorant Garamond', 'Georgia', 'serif'],
            sans: ['Jost', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  ${extraHead}
  <style>
    :root {
      --gold: #c9a84c;
      --gold-dark: #9a7c2e;
      --gold-light: #e8d5a3;
      --rose-gold: #c9836a;
      --cream: #fdf8f0;
      --charcoal: #2c2c2c;
      --soft-black: #1a1a1a;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--charcoal); overflow-x: hidden; }
    h1,h2,h3,h4 { font-family: 'Cormorant Garamond', serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f5ede0; }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* Animations */
    @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }
    @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }

    .fade-in-up { animation: fadeInUp 0.6s ease forwards; }
    .float-anim { animation: float 3s ease-in-out infinite; }
    .sparkle { animation: sparkle 2s ease-in-out infinite; }

    /* Gold gradient */
    .gold-gradient { background: linear-gradient(135deg, #c9a84c 0%, #f5d878 50%, #c9a84c 100%); }
    .gold-text { background: linear-gradient(135deg, #c9a84c, #f0c060, #c9a84c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .shimmer-text {
      background: linear-gradient(90deg, #c9a84c 0%, #f5d878 30%, #c9a84c 60%, #f5d878 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    /* Navbar */
    .navbar { transition: all 0.4s ease; backdrop-filter: blur(10px); }
    .navbar.scrolled { background: rgba(253,248,240,0.97) !important; box-shadow: 0 2px 20px rgba(201,168,76,0.15); }
    .nav-link { position:relative; transition:color 0.3s; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:var(--gold); transition:width 0.3s; }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }
    .nav-link:hover { color: var(--gold-dark); }

    /* Buttons */
    .btn-gold {
      background: linear-gradient(135deg, #c9a84c 0%, #f0c060 50%, #c9a84c 100%);
      background-size: 200% auto;
      color: white;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .btn-gold::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }
    .btn-gold:hover::before { left: 100%; }
    .btn-gold:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(201,168,76,0.4); }

    .btn-outline-gold {
      border: 1.5px solid var(--gold);
      color: var(--gold-dark);
      background: transparent;
      transition: all 0.3s ease;
    }
    .btn-outline-gold:hover {
      background: linear-gradient(135deg, #c9a84c, #f0c060);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(201,168,76,0.3);
    }

    /* Product Card */
    .product-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(201,168,76,0.2);
    }
    .product-img-wrap { position:relative; overflow:hidden; padding-top:100%; }
    .product-img-wrap img {
      position:absolute; top:0; left:0; width:100%; height:100%;
      object-fit:cover; transition: transform 0.6s ease, opacity 0.4s ease;
    }
    .product-img-front { z-index:2; }
    .product-img-hover { z-index:1; opacity:0; transform:scale(1.05); }
    .product-card:hover .product-img-front { opacity:0; transform:scale(1.05); }
    .product-card:hover .product-img-hover { opacity:1; z-index:2; transform:scale(1); }

    .product-overlay {
      position:absolute; bottom:0; left:0; right:0;
      background: linear-gradient(to top, rgba(26,26,26,0.9), transparent);
      padding: 20px;
      transform: translateY(100%);
      transition: transform 0.4s ease;
      z-index: 10;
    }
    .product-card:hover .product-overlay { transform: translateY(0); }

    /* Badge */
    .badge-gold { background: linear-gradient(135deg, #c9a84c, #f0c060); color:white; font-size:11px; font-weight:600; letter-spacing:0.5px; }
    .badge-rose { background: linear-gradient(135deg, #c9836a, #e8a694); color:white; font-size:11px; font-weight:600; letter-spacing:0.5px; }
    .badge-new { background: linear-gradient(135deg, #4a9b7f, #70c4a4); color:white; font-size:11px; font-weight:600; letter-spacing:0.5px; }

    /* Hero */
    .hero-bg {
      background: linear-gradient(135deg, #fdf0e0 0%, #fff8ee 30%, #fef3e6 60%, #fdf0e0 100%);
    }
    .hero-pattern {
      background-image: radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%),
                        radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%);
    }

    /* Decorative divider */
    .gold-divider {
      display:flex; align-items:center; gap:12px;
    }
    .gold-divider::before, .gold-divider::after {
      content:''; flex:1; height:1px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
    }

    /* Section title */
    .section-tag {
      display:inline-block;
      font-family:'Jost',sans-serif;
      font-size:11px; font-weight:600;
      letter-spacing:3px; text-transform:uppercase;
      color:var(--gold-dark); padding:6px 16px;
      border: 1px solid rgba(201,168,76,0.4);
      border-radius:50px;
      background: rgba(201,168,76,0.06);
    }

    /* Category card */
    .category-card {
      position:relative; overflow:hidden; border-radius:20px; cursor:pointer;
      transition: all 0.4s ease;
    }
    .category-card:hover { transform: scale(1.03); }
    .category-card:hover .category-overlay { background: rgba(0,0,0,0.3); }

    /* Cart icon pulse */
    .cart-badge {
      position:absolute; top:-6px; right:-6px;
      width:18px; height:18px; border-radius:50%;
      background: linear-gradient(135deg,#c9a84c,#f0c060);
      color:white; font-size:10px; font-weight:700;
      display:flex; align-items:center; justify-content:center;
    }

    /* Wishlist heart */
    .wishlist-btn {
      position:absolute; top:12px; right:12px; z-index:10;
      width:36px; height:36px; border-radius:50%;
      background:white; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 2px 10px rgba(0,0,0,0.1);
      transition:all 0.3s ease;
    }
    .wishlist-btn:hover { background:#fff0f3; transform:scale(1.1); }
    .wishlist-btn.active .fa-heart { color:#e5174a; }

    /* Form inputs */
    .form-input {
      border: 1.5px solid #e8dcc8;
      border-radius: 10px;
      padding: 12px 16px;
      font-family: 'Jost', sans-serif;
      font-size: 14px;
      transition: all 0.3s;
      background: white;
      width: 100%;
      outline: none;
    }
    .form-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }
    .form-label { font-size:13px; font-weight:500; color:#555; margin-bottom:6px; display:block; }

    /* Star rating */
    .star-rating { color: #f5b800; }

    /* Toast */
    .toast {
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:white; border-left:4px solid var(--gold);
      padding:16px 20px; border-radius:12px;
      box-shadow:0 8px 30px rgba(0,0,0,0.12);
      display:flex; align-items:center; gap:12px;
      min-width:280px; max-width:380px;
      animation:slideIn 0.4s ease;
    }

    /* Mobile menu */
    .mobile-menu {
      position:fixed; top:0; right:0; bottom:0;
      width:85%; max-width:320px;
      background:white; z-index:9998;
      transform:translateX(100%); transition:transform 0.4s ease;
      box-shadow:-4px 0 30px rgba(0,0,0,0.1);
    }
    .mobile-menu.open { transform:translateX(0); }

    /* Breadcrumb */
    .breadcrumb a { color:var(--gold-dark); font-size:13px; }
    .breadcrumb span { font-size:13px; color:#888; margin:0 6px; }

    /* Review stars */
    .rating-bar { height:6px; border-radius:3px; background:#f0e8d8; overflow:hidden; }
    .rating-fill { height:100%; background:linear-gradient(to right, #c9a84c, #f0c060); }

    /* Checkout stepper */
    .step-dot {
      width:36px; height:36px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-weight:600; font-size:14px; transition:all 0.3s;
    }
    .step-dot.active { background:linear-gradient(135deg,#c9a84c,#f0c060); color:white; box-shadow:0 4px 15px rgba(201,168,76,0.4); }
    .step-dot.done { background:#4caf50; color:white; }
    .step-dot.inactive { background:#f0e8d8; color:#999; }
    .step-line { flex:1; height:2px; background:#f0e8d8; }
    .step-line.active { background:linear-gradient(to right,#c9a84c,#f0c060); }

    /* Quantity input */
    .qty-btn {
      width:36px; height:36px; border-radius:8px;
      background:#f5ede0; border:none; cursor:pointer;
      font-size:18px; font-weight:300;
      display:flex; align-items:center; justify-content:center;
      transition:all 0.2s; color:#333;
    }
    .qty-btn:hover { background:var(--gold); color:white; }

    /* Accordion */
    .accordion-content { max-height:0; overflow:hidden; transition:max-height 0.4s ease; }
    .accordion-content.open { max-height:400px; }

    /* Search bar */
    .search-bar {
      background:white; border-radius:50px;
      border:1.5px solid #e8dcc8;
      padding:10px 20px 10px 44px;
      font-family:'Jost',sans-serif; font-size:14px;
      outline:none; transition:all 0.3s;
      width:100%;
    }
    .search-bar:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(201,168,76,0.1); }

    /* Filter chip */
    .filter-chip {
      padding:6px 16px; border-radius:50px;
      border:1.5px solid #e8dcc8; background:white;
      font-size:13px; cursor:pointer; transition:all 0.25s;
      white-space:nowrap;
    }
    .filter-chip:hover, .filter-chip.active {
      background:linear-gradient(135deg,#c9a84c,#f0c060);
      border-color:transparent; color:white;
    }

    /* Price range */
    input[type=range] { accent-color: var(--gold); }

    /* Marquee */
    .marquee-track { display:flex; gap:40px; white-space:nowrap; }
    @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .marquee-anim { animation:marquee 20s linear infinite; }
    .marquee-anim:hover { animation-play-state:paused; }

    /* Glassmorphism card */
    .glass-card {
      background:rgba(255,255,255,0.8);
      backdrop-filter:blur(10px);
      border:1px solid rgba(255,255,255,0.6);
    }

    /* Image zoom on product page */
    .img-zoom-wrap { overflow:hidden; cursor:zoom-in; }
    .img-zoom-wrap img { transition:transform 0.5s ease; }
    .img-zoom-wrap:hover img { transform:scale(1.12); }

    /* Payment card icons */
    .payment-icon { filter:grayscale(0.3); transition:filter 0.3s; }
    .payment-icon:hover { filter:none; }

    /* Responsive grid */
    @media(max-width:640px) {
      .hero-title { font-size:2.4rem !important; }
      .product-grid { grid-template-columns:repeat(2,1fr) !important; }
    }
  </style>
</head>
<body>
  ${navbar()}
  <div id="page-content">
    ${content}
  </div>
  ${footer()}
  ${cartSidebar()}
  ${toastContainer()}
  ${mobileMenu()}
  ${scripts()}
</body>
</html>`
}

function navbar() {
  return `
<nav class="navbar fixed top-0 left-0 right-0 z-50 bg-[#fdf8f0]/95" id="navbar">
  <!-- Top bar -->
  <div class="gold-gradient py-2 px-4 text-center text-xs text-white font-medium tracking-widest hidden sm:block">
    <span class="marquee-anim-inline">✦ FREE DELIVERY ON ORDERS OVER ৳1500 &nbsp;&nbsp; ✦ &nbsp;&nbsp; AUTHENTIC GOLD-PLATED JEWELRY &nbsp;&nbsp; ✦ &nbsp;&nbsp; EASY RETURNS WITHIN 7 DAYS &nbsp;&nbsp; ✦ &nbsp;&nbsp; FOLLOW US @EMARKET247BD &nbsp;&nbsp; ✦</span>
  </div>

  <!-- Main navbar -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <i class="fas fa-gem text-white text-sm"></i>
        </div>
        <div>
          <div class="font-serif font-bold text-xl leading-none text-[#2c2c2c]">Emarket<span class="gold-text">247</span></div>
          <div class="text-[9px] font-sans tracking-[3px] text-[#c9a84c] uppercase">Fine Jewellery</div>
        </div>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <a href="/" class="nav-link font-sans text-sm font-medium text-gray-700 py-2">Home</a>
        <div class="relative group">
          <a href="/shop" class="nav-link font-sans text-sm font-medium text-gray-700 py-2 flex items-center gap-1">
            Shop <i class="fas fa-chevron-down text-[10px] ml-1 text-gold-600 transition-transform group-hover:rotate-180"></i>
          </a>
          <div class="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[#f0e8d8]">
            <a href="/shop?category=necklaces" class="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fdf3e3] hover:text-[#c9a84c] transition-colors"><i class="fas fa-circle-dot text-xs text-[#c9a84c] w-4"></i>Necklaces</a>
            <a href="/shop?category=earrings" class="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fdf3e3] hover:text-[#c9a84c] transition-colors"><i class="fas fa-circle-dot text-xs text-[#c9a84c] w-4"></i>Earrings</a>
            <a href="/shop?category=bracelets" class="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fdf3e3] hover:text-[#c9a84c] transition-colors"><i class="fas fa-circle-dot text-xs text-[#c9a84c] w-4"></i>Bracelets</a>
            <a href="/shop?category=rings" class="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fdf3e3] hover:text-[#c9a84c] transition-colors"><i class="fas fa-circle-dot text-xs text-[#c9a84c] w-4"></i>Rings</a>
            <a href="/shop?category=accessories" class="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fdf3e3] hover:text-[#c9a84c] transition-colors"><i class="fas fa-circle-dot text-xs text-[#c9a84c] w-4"></i>Accessories</a>
          </div>
        </div>
        <a href="/about" class="nav-link font-sans text-sm font-medium text-gray-700 py-2">About</a>
        <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="nav-link font-sans text-sm font-medium text-gray-700 py-2">Contact</a>
      </nav>

      <!-- Right icons -->
      <div class="flex items-center gap-4">
        <!-- Search -->
        <button onclick="toggleSearch()" class="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#f5ede0] transition-colors text-gray-600" aria-label="Search">
          <i class="fas fa-search text-sm"></i>
        </button>

        <!-- Wishlist -->
        <button onclick="window.location='/shop'" class="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#f5ede0] transition-colors text-gray-600 relative" aria-label="Wishlist">
          <i class="far fa-heart text-sm"></i>
          <span class="cart-badge" id="wishlist-count" style="display:none">0</span>
        </button>

        <!-- Cart -->
        <button onclick="toggleCart()" class="flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#f5ede0] transition-colors text-gray-600 relative" aria-label="Shopping Cart">
          <i class="fas fa-shopping-bag text-sm"></i>
          <span class="cart-badge" id="cart-count">0</span>
        </button>

        <!-- Mobile menu -->
        <button onclick="toggleMobileMenu()" class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5ede0] transition-colors text-gray-600" aria-label="Menu">
          <i class="fas fa-bars text-sm"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Search Bar (hidden by default) -->
  <div id="search-bar-container" class="hidden border-t border-[#f0e8d8] bg-white py-3 px-4">
    <div class="max-w-2xl mx-auto relative">
      <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm"></i>
      <input type="text" class="search-bar" placeholder="Search for necklaces, earrings, rings..." id="main-search" onkeyup="handleSearch(event)" autocomplete="off">
    </div>
    <div id="search-results" class="max-w-2xl mx-auto mt-2 hidden bg-white rounded-2xl shadow-xl border border-[#f0e8d8] overflow-hidden"></div>
  </div>
</nav>
<div class="h-16"></div><!-- spacer for fixed nav -->
<!-- announcement on mobile -->
<div class="gold-gradient py-1.5 px-4 text-center text-xs text-white font-medium tracking-wide sm:hidden">
  ✦ FREE DELIVERY OVER ৳1500 &nbsp;|&nbsp; EASY RETURNS
</div>`
}

function footer() {
  return `
<footer class="bg-[#1a1408] text-[#e8d5a3] pt-16 pb-8 mt-0">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

      <!-- Brand -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-md">
            <i class="fas fa-gem text-white"></i>
          </div>
          <div>
            <div class="font-serif font-bold text-2xl text-white">Emarket<span class="shimmer-text">247</span></div>
            <div class="text-[9px] font-sans tracking-[3px] text-[#c9a84c] uppercase">Fine Jewellery</div>
          </div>
        </div>
        <p class="text-sm text-[#b8a070] leading-relaxed mb-5">
          Your trusted destination for exquisite gold-plated jewelry in Bangladesh. Elegance delivered to your door.
        </p>
        <div class="flex gap-3">
          <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="w-9 h-9 rounded-full bg-[#2a1e0a] flex items-center justify-center hover:bg-[#c9a84c] transition-colors text-[#c9a84c] hover:text-white">
            <i class="fab fa-facebook-f text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-full bg-[#2a1e0a] flex items-center justify-center hover:bg-[#c9a84c] transition-colors text-[#c9a84c] hover:text-white">
            <i class="fab fa-instagram text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-full bg-[#2a1e0a] flex items-center justify-center hover:bg-[#c9a84c] transition-colors text-[#c9a84c] hover:text-white">
            <i class="fab fa-tiktok text-sm"></i>
          </a>
          <a href="#" class="w-9 h-9 rounded-full bg-[#2a1e0a] flex items-center justify-center hover:bg-[#c9a84c] transition-colors text-[#c9a84c] hover:text-white">
            <i class="fab fa-whatsapp text-sm"></i>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-serif text-white text-lg mb-5 font-semibold">Quick Links</h4>
        <ul class="space-y-2.5">
          ${['Home', 'Shop', 'About', 'New Arrivals', 'Sale'].map(l => `
          <li><a href="/${l.toLowerCase().replace(' ', '-')}" class="text-sm text-[#b8a070] hover:text-[#c9a84c] transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-[10px] text-[#c9a84c]"></i>${l}</a></li>`).join('')}
        </ul>
      </div>

      <!-- Categories -->
      <div>
        <h4 class="font-serif text-white text-lg mb-5 font-semibold">Collections</h4>
        <ul class="space-y-2.5">
          ${['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Accessories', 'Bridal Sets'].map(l => `
          <li><a href="/shop?category=${l.toLowerCase()}" class="text-sm text-[#b8a070] hover:text-[#c9a84c] transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-[10px] text-[#c9a84c]"></i>${l}</a></li>`).join('')}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-serif text-white text-lg mb-5 font-semibold">Get in Touch</h4>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <i class="fab fa-facebook-f mt-0.5 text-[#c9a84c] w-4"></i>
            <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="text-sm text-[#b8a070] hover:text-[#c9a84c] transition-colors">facebook.com/Emarket247bd</a>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-envelope mt-0.5 text-[#c9a84c] w-4"></i>
            <span class="text-sm text-[#b8a070]">info@emarket247.com</span>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-phone mt-0.5 text-[#c9a84c] w-4"></i>
            <span class="text-sm text-[#b8a070]">+880 1700-000000</span>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-map-marker-alt mt-0.5 text-[#c9a84c] w-4"></i>
            <span class="text-sm text-[#b8a070]">Dhaka, Bangladesh</span>
          </li>
        </ul>
        <div class="mt-5">
          <p class="text-xs text-[#7a6040] mb-2">Subscribe for offers</p>
          <div class="flex">
            <input type="email" placeholder="Your email" class="flex-1 bg-[#2a1e0a] border border-[#4a3520] text-white text-sm rounded-l-lg px-3 py-2 outline-none focus:border-[#c9a84c]">
            <button class="btn-gold px-4 rounded-r-lg text-sm font-medium">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Payment methods -->
    <div class="border-t border-[#2a1e0a] pt-8 mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-xs text-[#7a6040]">Secure payments accepted:</p>
        <div class="flex flex-wrap gap-3 items-center">
          ${['bKash', 'Nagad', 'Rocket', 'VISA', 'MasterCard', 'COD'].map(p => `<span class="bg-[#2a1e0a] text-[#c9a84c] text-xs px-3 py-1 rounded-md font-medium border border-[#3a2a10]">${p}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="border-t border-[#2a1e0a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-xs text-[#7a6040]">© 2024 Emarket247 Fine Jewellery. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#" class="text-xs text-[#7a6040] hover:text-[#c9a84c] transition-colors">Privacy Policy</a>
        <a href="#" class="text-xs text-[#7a6040] hover:text-[#c9a84c] transition-colors">Terms of Service</a>
        <a href="#" class="text-xs text-[#7a6040] hover:text-[#c9a84c] transition-colors">Shipping Policy</a>
      </div>
    </div>
  </div>
</footer>`
}

function cartSidebar() {
  return `
<!-- Cart Overlay -->
<div id="cart-overlay" class="fixed inset-0 bg-black/40 z-[9996] hidden" onclick="toggleCart()"></div>

<!-- Cart Sidebar -->
<aside id="cart-sidebar" class="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[9997] transform translate-x-full transition-transform duration-400 ease-out shadow-2xl flex flex-col">
  <div class="p-5 border-b border-[#f0e8d8] flex items-center justify-between">
    <div class="flex items-center gap-3">
      <i class="fas fa-shopping-bag text-[#c9a84c]"></i>
      <h3 class="font-serif font-semibold text-xl text-gray-800">Your Cart</h3>
      <span id="cart-item-count" class="badge-gold px-2 py-0.5 rounded-full text-xs">0</span>
    </div>
    <button onclick="toggleCart()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5ede0] transition-colors text-gray-500">
      <i class="fas fa-times"></i>
    </button>
  </div>

  <!-- Cart Items -->
  <div id="cart-items-list" class="flex-1 overflow-y-auto p-4 space-y-3">
    <!-- populated by JS -->
    <div id="cart-empty" class="flex flex-col items-center justify-center h-full text-center py-16">
      <div class="w-20 h-20 rounded-full bg-[#f5ede0] flex items-center justify-center mb-4">
        <i class="fas fa-shopping-bag text-3xl text-[#c9a84c]"></i>
      </div>
      <p class="font-serif text-xl text-gray-600 mb-2">Your cart is empty</p>
      <p class="text-sm text-gray-400 mb-6">Discover our beautiful jewelry collection</p>
      <button onclick="toggleCart(); window.location='/shop';" class="btn-gold px-6 py-2.5 rounded-full text-sm font-medium text-white">
        Browse Collection
      </button>
    </div>
  </div>

  <!-- Cart Footer -->
  <div id="cart-footer" class="hidden border-t border-[#f0e8d8] p-5 bg-[#fdf8f0]">
    <div class="space-y-2 mb-4">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span id="cart-subtotal">৳0</span>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <span>Delivery</span>
        <span class="text-green-600" id="cart-delivery">Free</span>
      </div>
      <div class="border-t border-[#f0e8d8] pt-2 flex justify-between font-semibold text-base">
        <span class="font-serif">Total</span>
        <span id="cart-total" class="gold-text font-bold">৳0</span>
      </div>
    </div>
    <a href="/checkout" onclick="toggleCart()" class="btn-gold w-full py-3.5 rounded-xl text-white font-medium text-center block text-sm tracking-wide hover:shadow-lg transition-all">
      Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
    </a>
    <button onclick="toggleCart(); window.location='/cart';" class="w-full py-2.5 mt-2 text-sm text-[#c9a84c] hover:text-[#9a7c2e] font-medium transition-colors">
      View Full Cart
    </button>
  </div>
</aside>`
}

function toastContainer() {
  return `<div id="toast-container" class="fixed bottom-6 right-6 z-[9999] space-y-3" style="pointer-events:none"></div>`
}

function mobileMenu() {
  return `
<div id="mobile-overlay" class="fixed inset-0 bg-black/50 z-[9994] hidden" onclick="toggleMobileMenu()"></div>
<div id="mobile-menu" class="mobile-menu flex flex-col">
  <div class="p-5 border-b border-[#f0e8d8] flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
        <i class="fas fa-gem text-white text-xs"></i>
      </div>
      <span class="font-serif font-bold text-lg">Emarket<span class="gold-text">247</span></span>
    </div>
    <button onclick="toggleMobileMenu()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5ede0]">
      <i class="fas fa-times text-gray-500"></i>
    </button>
  </div>
  <nav class="flex-1 p-5 space-y-1">
    <a href="/" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-700 font-medium"><i class="fas fa-home w-5 text-[#c9a84c]"></i>Home</a>
    <a href="/shop" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-700 font-medium"><i class="fas fa-store w-5 text-[#c9a84c]"></i>Shop All</a>
    <a href="/shop?category=necklaces" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-600 text-sm ml-4"><i class="fas fa-circle-dot w-5 text-[#c9a84c] text-xs"></i>Necklaces</a>
    <a href="/shop?category=earrings" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-600 text-sm ml-4"><i class="fas fa-circle-dot w-5 text-[#c9a84c] text-xs"></i>Earrings</a>
    <a href="/shop?category=bracelets" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-600 text-sm ml-4"><i class="fas fa-circle-dot w-5 text-[#c9a84c] text-xs"></i>Bracelets</a>
    <a href="/shop?category=rings" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-600 text-sm ml-4"><i class="fas fa-circle-dot w-5 text-[#c9a84c] text-xs"></i>Rings</a>
    <a href="/about" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-700 font-medium"><i class="fas fa-info-circle w-5 text-[#c9a84c]"></i>About</a>
    <a href="/cart" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f5ede0] text-gray-700 font-medium"><i class="fas fa-shopping-bag w-5 text-[#c9a84c]"></i>Cart</a>
  </nav>
  <div class="p-5 border-t border-[#f0e8d8]">
    <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="flex items-center gap-3 text-sm text-[#c9a84c] font-medium">
      <i class="fab fa-facebook-f"></i> Follow us on Facebook
    </a>
  </div>
</div>`
}

function productCard(p: any) {
  const discount = Math.round((1 - p.price / p.originalPrice) * 100)
  const badgeColor = p.badge === 'New Arrival' || p.badge === 'Trending' ? 'badge-new' :
                     p.badge === 'Premium' || p.badge === 'Luxury' ? 'badge-rose' : 'badge-gold'
  return `
<article class="product-card group" data-product-id="${p.id}">
  <!-- Wishlist -->
  <button class="wishlist-btn" onclick="toggleWishlist('${p.id}', this)" aria-label="Add to wishlist">
    <i class="far fa-heart text-sm text-gray-400"></i>
  </button>

  <!-- Badge -->
  ${p.badge ? `<span class="absolute top-3 left-3 z-10 ${badgeColor} px-2.5 py-1 rounded-full uppercase">${p.badge}</span>` : ''}
  ${!p.inStock ? `<div class="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-[16px]"><span class="bg-gray-700 text-white text-xs px-4 py-2 rounded-full font-medium">Out of Stock</span></div>` : ''}
  ${discount >= 30 ? `<span class="absolute top-3 right-12 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">-${discount}%</span>` : ''}

  <!-- Image -->
  <a href="/product/${p.id}">
    <div class="product-img-wrap">
      <img src="${p.image}" alt="${p.name}" class="product-img-front" loading="lazy" width="400" height="400">
      <img src="${p.hoverImage}" alt="${p.name} alternate view" class="product-img-hover" loading="lazy" width="400" height="400">
    </div>
    <!-- Add to cart overlay -->
    <div class="product-overlay">
      <button onclick="event.preventDefault(); addToCart('${p.id}')" class="w-full btn-gold py-2.5 rounded-xl text-white text-sm font-medium tracking-wide">
        <i class="fas fa-shopping-bag mr-2"></i>Add to Cart
      </button>
    </div>
  </a>

  <!-- Info -->
  <div class="p-4">
    <div class="flex items-center gap-1 mb-1">
      <div class="star-rating text-xs flex gap-0.5">
        ${Array.from({length: 5}, (_, i) => `<i class="${i < Math.floor(p.rating) ? 'fas' : 'far'} fa-star"></i>`).join('')}
      </div>
      <span class="text-xs text-gray-400 ml-1">(${p.reviews})</span>
    </div>
    <a href="/product/${p.id}">
      <h3 class="font-serif font-semibold text-gray-800 text-sm leading-snug hover:text-[#c9a84c] transition-colors line-clamp-2 mb-2">${p.name}</h3>
    </a>
    <div class="flex items-center justify-between">
      <div class="flex items-baseline gap-2">
        <span class="font-serif font-bold text-[#c9a84c] text-base">৳${p.price.toLocaleString()}</span>
        <span class="text-xs text-gray-400 line-through">৳${p.originalPrice.toLocaleString()}</span>
      </div>
      <button onclick="addToCart('${p.id}')" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5ede0] hover:bg-[#c9a84c] hover:text-white transition-all text-[#c9a84c] text-xs" aria-label="Quick add">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</article>`
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────

function homePage() {
  const featured = products.filter(p => p.featured).slice(0, 8)
  const trending = products.sort((a,b) => b.reviews - a.reviews).slice(0, 4)

  return baseHTML(
    'Emarket247 - Exquisite Gold-Plated Jewellery | Bangladesh',
    'Discover stunning gold-plated jewelry including necklaces, earrings, bracelets, and rings. Authentic craftsmanship for women in Bangladesh. Free delivery over ৳1500.',
    `
<!-- HERO SECTION -->
<section class="hero-bg hero-pattern relative overflow-hidden min-h-[90vh] flex items-center" aria-label="Hero">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
    <div class="grid lg:grid-cols-2 gap-10 items-center">

      <!-- Text -->
      <div class="text-center lg:text-left fade-in-up">
        <div class="section-tag mb-5 inline-flex items-center gap-2">
          <i class="fas fa-sparkles text-[#c9a84c] text-xs"></i>
          New Collection 2024
        </div>
        <h1 class="hero-title font-serif font-light leading-tight mb-4" style="font-size:3.8rem; color:#1a1408">
          Wear Your
          <span class="block font-bold italic shimmer-text">Golden Story</span>
        </h1>
        <p class="text-base text-gray-600 leading-relaxed mb-8 max-w-xl font-sans">
          Handcrafted gold-plated jewelry that captures the essence of elegance. From timeless bridal sets to everyday sparkle — express yourself with Emarket247.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <a href="/shop" class="btn-gold px-8 py-4 rounded-full text-white font-medium text-sm tracking-wide inline-flex items-center justify-center gap-2">
            <i class="fas fa-gem"></i> Explore Collection
          </a>
          <a href="/shop?category=bridal" class="btn-outline-gold px-8 py-4 rounded-full font-medium text-sm tracking-wide inline-flex items-center justify-center gap-2">
            Bridal Sets <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <!-- Trust badges -->
        <div class="flex flex-wrap justify-center lg:justify-start gap-6 mt-10">
          ${[
            {icon:'fas fa-shield-alt', text:'100% Authentic'},
            {icon:'fas fa-truck', text:'Free Delivery'},
            {icon:'fas fa-undo', text:'7-Day Returns'},
          ].map(b => `
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#f5ede0] flex items-center justify-center">
              <i class="${b.icon} text-xs text-[#c9a84c]"></i>
            </div>
            <span class="text-xs font-medium text-gray-600">${b.text}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Hero Images Collage -->
      <div class="relative hidden lg:block float-anim">
        <div class="relative w-full max-w-md mx-auto">
          <!-- Main image -->
          <div class="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white" style="height:480px">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85"
                 alt="Bridal Necklace Set" class="w-full h-full object-cover" width="600" height="480" fetchpriority="high">
          </div>
          <!-- Mini cards -->
          <div class="absolute -left-16 top-1/4 glass-card rounded-2xl p-3 shadow-xl border border-white/70 w-36 animate-pulse">
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80" alt="earrings" class="w-full h-20 object-cover rounded-xl mb-2">
            <p class="text-xs font-medium text-gray-700">Diamond Earrings</p>
            <p class="text-xs font-bold text-[#c9a84c]">৳1,299</p>
          </div>
          <div class="absolute -right-10 bottom-1/4 glass-card rounded-2xl p-3 shadow-xl border border-white/70 w-36">
            <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&q=80" alt="bracelet" class="w-full h-20 object-cover rounded-xl mb-2">
            <p class="text-xs font-medium text-gray-700">Gold Bracelet</p>
            <p class="text-xs font-bold text-[#c9a84c]">৳899</p>
          </div>
          <!-- Floating badge -->
          <div class="absolute -top-4 -right-4 gold-gradient w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg sparkle">
            <span class="text-white text-xs font-bold leading-none">UP TO</span>
            <span class="text-white text-2xl font-bold leading-none">50%</span>
            <span class="text-white text-[9px] font-medium">OFF</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Decorative elements -->
  <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#c9a84c]/5 blur-3xl pointer-events-none"></div>
  <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-[#c9a84c]/8 blur-3xl pointer-events-none"></div>
</section>

<!-- MARQUEE BANNER -->
<div class="bg-[#1a1408] py-3 overflow-hidden">
  <div class="flex">
    <div class="marquee-anim marquee-track text-[#e8d5a3] text-xs font-medium tracking-widest uppercase">
      ${['✦ New Arrivals', '✦ Bridal Collection', '✦ Gold Plated', '✦ Authentic Jewelry', '✦ Bangladesh\'s Finest', '✦ Free Delivery', '✦ Premium Quality', '✦ Trending Styles', '✦ New Arrivals', '✦ Bridal Collection', '✦ Gold Plated', '✦ Authentic Jewelry', '✦ Bangladesh\'s Finest', '✦ Free Delivery', '✦ Premium Quality', '✦ Trending Styles'].join('<span class="mx-10"></span>')}
    </div>
  </div>
</div>

<!-- CATEGORY SECTION -->
<section class="py-20 bg-white" aria-label="Shop by Category">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <div class="section-tag mb-3">Browse by Type</div>
      <h2 class="font-serif text-4xl font-light text-gray-800 mt-2">Shop by <span class="shimmer-text font-semibold">Category</span></h2>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      ${[
        {name:'Necklaces', icon:'💛', img:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80', count:38},
        {name:'Earrings', icon:'✨', img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', count:52},
        {name:'Bracelets', icon:'🌟', img:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80', count:29},
        {name:'Rings', icon:'💍', img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80', count:34},
        {name:'Accessories', icon:'👑', img:'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80', count:18},
      ].map(cat => `
      <a href="/shop?category=${cat.name.toLowerCase()}" class="category-card text-center group" aria-label="Shop ${cat.name}">
        <div class="relative h-52 rounded-2xl overflow-hidden shadow-md">
          <img src="${cat.img}" alt="${cat.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="300" height="300">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent category-overlay transition-all duration-300"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p class="font-serif font-semibold text-base">${cat.name}</p>
            <p class="text-xs text-gray-300">${cat.count} items</p>
          </div>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- FEATURED PRODUCTS -->
<section class="py-20 bg-[#fdf8f0]" aria-label="Featured Products">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
      <div>
        <div class="section-tag mb-2">Handpicked for You</div>
        <h2 class="font-serif text-4xl font-light text-gray-800">Featured <span class="shimmer-text font-semibold">Collection</span></h2>
      </div>
      <a href="/shop" class="btn-outline-gold px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2">
        View All <i class="fas fa-arrow-right text-xs"></i>
      </a>
    </div>

    <!-- Filter chips -->
    <div class="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter products">
      ${['All', 'Necklaces', 'Earrings', 'Bracelets', 'Rings'].map((cat, i) => `
      <button onclick="filterProducts('${cat.toLowerCase() === 'all' ? 'all' : cat.toLowerCase()}', this)"
              class="filter-chip ${i === 0 ? 'active' : ''}" role="radio" aria-checked="${i === 0}">
        ${cat}
      </button>`).join('')}
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 product-grid" id="featured-grid">
      ${featured.map(p => productCard(p)).join('')}
    </div>

    <div class="text-center mt-10">
      <a href="/shop" class="btn-gold px-10 py-4 rounded-full text-white font-medium text-sm inline-flex items-center gap-2">
        <i class="fas fa-gem"></i> Explore All Jewelry
      </a>
    </div>
  </div>
</section>

<!-- PROMO BANNER -->
<section class="relative overflow-hidden" aria-label="Promotional Banner">
  <div class="absolute inset-0">
    <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80" alt="Jewelry Banner" class="w-full h-full object-cover" loading="lazy">
    <div class="absolute inset-0 bg-gradient-to-r from-[#1a1408]/90 via-[#1a1408]/70 to-transparent"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
    <div class="max-w-lg">
      <div class="section-tag mb-4" style="border-color:rgba(201,168,76,0.6); color:#e8d5a3; background:rgba(201,168,76,0.1)">Limited Time Offer</div>
      <h2 class="font-serif font-bold text-4xl md:text-5xl text-white mb-4">
        Bridal Season<br><span class="shimmer-text">Sale — Up to 50% Off</span>
      </h2>
      <p class="text-[#e8d5a3] text-sm leading-relaxed mb-8">Exquisite bridal jewelry sets crafted for your special day. Gold-plated with authentic stone work, delivered across Bangladesh.</p>
      <div class="flex flex-wrap gap-3">
        <a href="/shop?category=necklaces" class="btn-gold px-8 py-4 rounded-full text-white font-medium text-sm inline-flex items-center gap-2">
          Shop Bridal Sets <i class="fas fa-gem"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- WHY CHOOSE US -->
<section class="py-20 bg-white" aria-label="Why Choose Us">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <div class="section-tag mb-3">Our Promise</div>
      <h2 class="font-serif text-4xl font-light text-gray-800">Why Choose <span class="shimmer-text font-semibold">Emarket247</span></h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${[
        {icon:'fas fa-gem', title:'Premium Quality', desc:'Every piece crafted from high-quality materials with authentic gold plating that lasts.'},
        {icon:'fas fa-truck', title:'Free Delivery', desc:'Complimentary delivery across Bangladesh on orders above ৳1500.'},
        {icon:'fas fa-shield-alt', title:'Secure Payment', desc:'bKash, Nagad, Rocket, cards accepted. 100% safe and encrypted.'},
        {icon:'fas fa-undo', title:'Easy Returns', desc:'Hassle-free 7-day return policy. Your satisfaction is guaranteed.'},
      ].map(f => `
      <div class="text-center p-7 rounded-2xl bg-[#fdf8f0] hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 border border-transparent hover:border-[#f0e8d8]">
        <div class="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform">
          <i class="${f.icon} text-white text-lg"></i>
        </div>
        <h3 class="font-serif font-semibold text-lg text-gray-800 mb-2">${f.title}</h3>
        <p class="text-sm text-gray-500 leading-relaxed">${f.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- TRENDING NOW -->
<section class="py-20 bg-[#1a1408]" aria-label="Trending Products">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-12">
      <div>
        <div class="section-tag mb-3" style="border-color:rgba(201,168,76,0.4); color:#e8d5a3; background:rgba(201,168,76,0.08)">🔥 Hot Right Now</div>
        <h2 class="font-serif text-4xl font-light text-white">Trending <span class="shimmer-text font-semibold">Picks</span></h2>
      </div>
      <a href="/shop?sort=popular" class="text-[#c9a84c] text-sm hover:text-[#f0c060] transition-colors flex items-center gap-2 hidden sm:flex">
        See All <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${trending.map(p => productCard(p)).join('')}
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="py-20 bg-[#fdf8f0]" aria-label="Customer Reviews">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <div class="section-tag mb-3">Happy Customers</div>
      <h2 class="font-serif text-4xl font-light text-gray-800">What Our <span class="shimmer-text font-semibold">Customers Say</span></h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${[
        {name:'Rina Ahmed', location:'Dhaka', rating:5, review:'Absolutely stunning necklace set! The quality is even better than expected. My sister wore it for her wedding and everyone was asking where she got it. Will definitely order again!', product:'Royal Bridal Necklace Set', avatar:'R'},
        {name:'Fatima Begum', location:'Chittagong', rating:5, review:'Fast delivery and beautifully packaged. The earrings are exactly as shown. I have bought 3 times already and every piece is perfect. Highly recommend Emarket247!', product:'Diamond Blossom Earrings', avatar:'F'},
        {name:'Nadia Islam', location:'Sylhet', rating:5, review:'Ordered the Kundan choker for my engagement and received so many compliments! The craftsmanship is beautiful and it looks way more expensive than the price. Love it!', product:'Antique Kundan Choker Set', avatar:'N'},
      ].map(t => `
      <article class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#f5ede0]">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full gold-gradient flex items-center justify-center text-white font-bold text-lg font-serif">
              ${t.avatar}
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">${t.name}</p>
              <p class="text-xs text-gray-400 flex items-center gap-1"><i class="fas fa-map-marker-alt text-[#c9a84c]"></i>${t.location}</p>
            </div>
          </div>
          <div class="star-rating text-xs flex gap-0.5">
            ${Array.from({length: t.rating}, () => '<i class="fas fa-star"></i>').join('')}
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed italic">"${t.review}"</p>
        <p class="text-xs text-[#c9a84c] mt-3 font-medium"><i class="fas fa-check-circle mr-1"></i>Verified Purchase: ${t.product}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- INSTAGRAM-STYLE GRID -->
<section class="py-16 bg-white" aria-label="Follow on Social Media">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center">
    <div class="section-tag mb-4">@Emarket247bd</div>
    <h2 class="font-serif text-3xl font-light text-gray-800 mb-2">Follow Us on <span class="shimmer-text font-semibold">Facebook</span></h2>
    <p class="text-sm text-gray-500 mb-8">Tag us in your photos for a chance to be featured</p>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
      ${[
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
        'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&q=80',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&q=80',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80',
        'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=300&q=80',
      ].map(img => `
      <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="relative overflow-hidden rounded-xl group block aspect-square">
        <img src="${img}" alt="Jewelry from Emarket247" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="200" height="200">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <i class="fab fa-facebook-f text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl"></i>
        </div>
      </a>`).join('')}
    </div>
    <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="btn-outline-gold px-8 py-3 rounded-full text-sm font-medium inline-flex items-center gap-2">
      <i class="fab fa-facebook-f"></i> Visit Our Facebook Page
    </a>
  </div>
</section>
`,
    `
<!-- Structured data for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "name": "Emarket247 Fine Jewellery",
  "description": "Premium gold-plated jewelry store in Bangladesh offering necklaces, earrings, bracelets, rings, and bridal sets.",
  "url": "https://emarket247.pages.dev",
  "sameAs": ["https://www.facebook.com/Emarket247bd"],
  "address": {"@type": "PostalAddress", "addressCountry": "BD", "addressLocality": "Dhaka"},
  "priceRange": "৳৳",
  "openingHours": "Mo-Su 09:00-21:00",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Jewelry Collection",
    "itemListElement": [
      {"@type": "OfferCatalog", "name": "Necklaces"},
      {"@type": "OfferCatalog", "name": "Earrings"},
      {"@type": "OfferCatalog", "name": "Bracelets"},
      {"@type": "OfferCatalog", "name": "Rings"}
    ]
  }
}
</script>
`
  )
}

// ─────────────────────────────────────────────
// SHOP PAGE
// ─────────────────────────────────────────────

function shopPage(category: string, sort: string) {
  const cats = ['all', 'necklaces', 'earrings', 'bracelets', 'rings', 'accessories']
  const catLabel = category === 'all' ? 'All Jewelry' : category.charAt(0).toUpperCase() + category.slice(1)

  return baseHTML(
    `${catLabel} | Shop Fine Jewellery | Emarket247`,
    `Browse our collection of ${catLabel.toLowerCase()} - gold-plated jewelry for women. Free delivery across Bangladesh on orders above ৳1500.`,
    `
<!-- SHOP HERO -->
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-10 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="breadcrumb mb-4 flex items-center" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      <a href="/shop">Shop</a>
      ${category !== 'all' ? `<span>/</span><span class="text-gray-600 font-medium text-sm">${catLabel}</span>` : ''}
    </nav>
    <h1 class="font-serif font-bold text-4xl text-gray-800">${catLabel}</h1>
    <p class="text-sm text-gray-500 mt-1">Discover our handpicked collection of fine gold-plated jewelry</p>
  </div>
</section>

<!-- SHOP LAYOUT -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
  <div class="flex gap-8">

    <!-- SIDEBAR FILTERS (desktop) -->
    <aside class="hidden lg:block w-64 flex-shrink-0" aria-label="Filters">

      <!-- Search -->
      <div class="relative mb-5">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9a84c] text-xs"></i>
        <input type="text" class="search-bar" placeholder="Search jewelry..." id="shop-search" oninput="filterShop()">
      </div>

      <!-- Category filter -->
      <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#f0e8d8]">
        <h3 class="font-serif font-semibold text-base text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-layer-group text-[#c9a84c] text-sm"></i> Categories
        </h3>
        <div class="space-y-2">
          ${cats.map(cat => `
          <label class="flex items-center justify-between cursor-pointer group">
            <div class="flex items-center gap-2">
              <input type="radio" name="category" value="${cat}" ${cat === category ? 'checked' : ''}
                class="accent-[#c9a84c]" onchange="applyCategoryFilter('${cat}')">
              <span class="text-sm ${cat === category ? 'text-[#c9a84c] font-medium' : 'text-gray-600'} group-hover:text-[#c9a84c] transition-colors">
                ${cat === 'all' ? 'All Jewelry' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </div>
            <span class="text-xs text-gray-400 bg-[#f5ede0] px-2 py-0.5 rounded-full">
              ${cat === 'all' ? products.length : products.filter(p => p.category === cat).length}
            </span>
          </label>`).join('')}
        </div>
      </div>

      <!-- Price filter -->
      <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#f0e8d8]">
        <h3 class="font-serif font-semibold text-base text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-tag text-[#c9a84c] text-sm"></i> Price Range
        </h3>
        <div class="space-y-3">
          <input type="range" min="0" max="5000" value="5000" id="price-range" class="w-full" oninput="updatePriceFilter(this.value)">
          <div class="flex justify-between text-xs text-gray-500">
            <span>৳0</span>
            <span class="text-[#c9a84c] font-semibold" id="price-label">Up to ৳5,000</span>
            <span>৳5,000+</span>
          </div>
        </div>
      </div>

      <!-- Sort -->
      <div class="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#f0e8d8]">
        <h3 class="font-serif font-semibold text-base text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-sort text-[#c9a84c] text-sm"></i> Sort By
        </h3>
        <div class="space-y-2">
          ${[
            {val:'featured', label:'Featured'},
            {val:'price-low', label:'Price: Low to High'},
            {val:'price-high', label:'Price: High to Low'},
            {val:'popular', label:'Most Popular'},
            {val:'newest', label:'Newest First'},
          ].map(s => `
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="sort" value="${s.val}" ${s.val === sort ? 'checked' : ''} class="accent-[#c9a84c]" onchange="applySortFilter('${s.val}')">
            <span class="text-sm text-gray-600 hover:text-[#c9a84c] transition-colors">${s.label}</span>
          </label>`).join('')}
        </div>
      </div>

      <!-- In Stock filter -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-[#f0e8d8]">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" id="in-stock-filter" class="accent-[#c9a84c] w-4 h-4" onchange="filterShop()">
          <span class="text-sm text-gray-700 font-medium">In Stock Only</span>
        </label>
      </div>
    </aside>

    <!-- PRODUCTS AREA -->
    <div class="flex-1">
      <!-- Mobile filters bar -->
      <div class="lg:hidden flex gap-2 mb-5 overflow-x-auto pb-2">
        ${cats.map(cat => `
        <a href="/shop?category=${cat}" class="filter-chip flex-shrink-0 ${cat === category ? 'active' : ''}">
          ${cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </a>`).join('')}
      </div>

      <!-- Toolbar -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p class="text-sm text-gray-500" id="results-count">
          Showing <strong id="showing-count" class="text-gray-700">--</strong> products
        </p>
        <div class="flex items-center gap-3">
          <select onchange="applySortFilter(this.value)" class="form-input text-sm py-2 pr-8 w-auto rounded-lg cursor-pointer" style="padding-right:32px" aria-label="Sort products">
            <option value="featured" ${sort === 'featured' ? 'selected' : ''}>Featured</option>
            <option value="price-low" ${sort === 'price-low' ? 'selected' : ''}>Price: Low → High</option>
            <option value="price-high" ${sort === 'price-high' ? 'selected' : ''}>Price: High → Low</option>
            <option value="popular" ${sort === 'popular' ? 'selected' : ''}>Most Popular</option>
          </select>
          <!-- Grid view toggle -->
          <div class="flex border border-[#e8dcc8] rounded-lg overflow-hidden">
            <button onclick="setGridCols(2)" id="grid2-btn" class="px-2.5 py-2 bg-white hover:bg-[#f5ede0] transition-colors text-xs text-gray-500" aria-label="2 column grid">
              <i class="fas fa-th-large"></i>
            </button>
            <button onclick="setGridCols(3)" id="grid3-btn" class="px-2.5 py-2 bg-[#c9a84c] text-white text-xs" aria-label="3 column grid">
              <i class="fas fa-th"></i>
            </button>
            <button onclick="setGridCols(4)" id="grid4-btn" class="px-2.5 py-2 bg-white hover:bg-[#f5ede0] transition-colors text-xs text-gray-500" aria-label="4 column grid">
              <i class="fas fa-border-all"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5" id="shop-product-grid">
        ${products.map(p => `
        <div class="product-item" data-category="${p.category}" data-price="${p.price}" data-rating="${p.rating}" data-id="${p.id}" data-stock="${p.inStock}">
          ${productCard(p)}
        </div>`).join('')}
      </div>

      <!-- No results -->
      <div id="no-results" class="hidden text-center py-20">
        <div class="w-16 h-16 rounded-full bg-[#f5ede0] flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-search text-2xl text-[#c9a84c]"></i>
        </div>
        <p class="font-serif text-xl text-gray-600 mb-2">No jewelry found</p>
        <p class="text-sm text-gray-400 mb-4">Try adjusting your filters</p>
        <button onclick="clearFilters()" class="btn-outline-gold px-6 py-2.5 rounded-full text-sm">Clear Filters</button>
      </div>
    </div>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────────

function productPage(id: string) {
  const p = products.find(p => p.id === id) || products[0]
  const related = products.filter(pr => pr.category === p.category && pr.id !== p.id).slice(0, 4)
  const discount = Math.round((1 - p.price / p.originalPrice) * 100)

  return baseHTML(
    `${p.name} | Emarket247 Fine Jewellery`,
    `${p.description} Available at ৳${p.price.toLocaleString()}. Free delivery across Bangladesh on orders above ৳1500.`,
    `
<!-- Breadcrumb -->
<div class="bg-[#fdf8f0] py-4 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="breadcrumb flex items-center" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span>
      <a href="/shop">Shop</a><span>/</span>
      <a href="/shop?category=${p.category}">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</a><span>/</span>
      <span class="text-gray-700 font-medium text-sm truncate max-w-[200px]">${p.name}</span>
    </nav>
  </div>
</div>

<!-- PRODUCT DETAIL -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
  <div class="grid lg:grid-cols-2 gap-12">

    <!-- Images -->
    <div>
      <div class="img-zoom-wrap rounded-3xl overflow-hidden shadow-xl mb-4 aspect-square">
        <img src="${p.images[0]}" alt="${p.name}" id="main-product-img" class="w-full h-full object-cover" width="700" height="700" fetchpriority="high">
      </div>
      <div class="flex gap-3 overflow-x-auto pb-2">
        ${p.images.map((img, i) => `
        <button onclick="changeProductImg('${img}', this)" class="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-[#c9a84c]' : 'border-transparent'} hover:border-[#c9a84c] transition-colors thumb-btn" aria-label="View image ${i+1}">
          <img src="${img}" alt="${p.name} view ${i+1}" class="w-full h-full object-cover" loading="lazy" width="80" height="80">
        </button>`).join('')}
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-col">
      ${p.badge ? `<span class="badge-gold self-start px-3 py-1 rounded-full mb-3 uppercase text-xs">${p.badge}</span>` : ''}
      <h1 class="font-serif font-bold text-3xl md:text-4xl text-gray-800 mb-3 leading-tight">${p.name}</h1>

      <!-- Rating -->
      <div class="flex items-center gap-3 mb-4">
        <div class="flex gap-1 star-rating">
          ${Array.from({length: 5}, (_, i) => `<i class="${i < Math.floor(p.rating) ? 'fas' : i < p.rating ? 'fas fa-star-half-alt' : 'far'} fa-star text-sm"></i>`).join('')}
        </div>
        <span class="text-sm font-semibold text-[#c9a84c]">${p.rating}</span>
        <span class="text-sm text-gray-400">(${p.reviews} reviews)</span>
        ${p.inStock ? '<span class="ml-2 text-xs text-green-600 flex items-center gap-1"><i class="fas fa-check-circle"></i> In Stock</span>' : '<span class="ml-2 text-xs text-red-500 flex items-center gap-1"><i class="fas fa-times-circle"></i> Out of Stock</span>'}
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-3 mb-5">
        <span class="font-serif font-bold text-4xl text-[#c9a84c]">৳${p.price.toLocaleString()}</span>
        <span class="text-xl text-gray-400 line-through">৳${p.originalPrice.toLocaleString()}</span>
        <span class="badge-gold px-2.5 py-1 rounded-full text-xs">${discount}% OFF</span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 leading-relaxed mb-6 border-l-2 border-[#c9a84c] pl-4 italic">${p.description}</p>

      <!-- Details -->
      <div class="grid grid-cols-2 gap-3 mb-6 p-4 bg-[#fdf8f0] rounded-xl">
        ${[
          {label:'Material', val:p.material, icon:'fas fa-ring'},
          {label:'Weight', val:p.weight, icon:'fas fa-weight'},
          {label:'Occasion', val:p.occasion, icon:'fas fa-calendar-star'},
          {label:'Category', val:p.category.charAt(0).toUpperCase()+p.category.slice(1), icon:'fas fa-tag'},
        ].map(d => `
        <div class="flex items-center gap-2">
          <i class="${d.icon} text-[#c9a84c] text-xs w-4"></i>
          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-wide">${d.label}</p>
            <p class="text-sm font-medium text-gray-700">${d.val}</p>
          </div>
        </div>`).join('')}
      </div>

      <!-- Quantity + Add to Cart -->
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center gap-2 bg-[#f5ede0] rounded-xl p-1">
          <button class="qty-btn" onclick="changeQty(-1)" aria-label="Decrease quantity">−</button>
          <input type="number" id="qty-input" value="1" min="1" max="10" class="w-12 text-center text-sm font-semibold bg-transparent border-none outline-none">
          <button class="qty-btn" onclick="changeQty(1)" aria-label="Increase quantity">+</button>
        </div>
        <button onclick="addToCartQty('${p.id}')" class="btn-gold flex-1 py-4 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 ${!p.inStock ? 'opacity-50 cursor-not-allowed' : ''}" ${!p.inStock ? 'disabled' : ''}>
          <i class="fas fa-shopping-bag"></i>
          ${p.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <button onclick="toggleWishlistProduct('${p.id}', this)" class="w-12 h-12 flex items-center justify-center rounded-xl border border-[#e8dcc8] bg-white hover:border-[#c9a84c] transition-all hover:text-[#e5174a]" aria-label="Add to wishlist" id="wishlist-prod-btn">
          <i class="far fa-heart text-gray-400 text-lg"></i>
        </button>
      </div>

      <!-- Quick buy -->
      <a href="/checkout" onclick="addToCartQty('${p.id}')" class="btn-outline-gold w-full py-4 rounded-xl font-medium text-sm text-center block mb-6">
        ⚡ Buy Now — Instant Checkout
      </a>

      <!-- Trust signals -->
      <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[#f0e8d8]">
        ${[
          {icon:'fas fa-truck', text:'Free Delivery', sub:'Orders over ৳1500'},
          {icon:'fas fa-shield-alt', text:'Secure Payment', sub:'100% encrypted'},
          {icon:'fas fa-undo', text:'7-Day Return', sub:'Hassle free'},
        ].map(t => `
        <div class="text-center">
          <i class="${t.icon} text-[#c9a84c] mb-1"></i>
          <p class="text-xs font-medium text-gray-700">${t.text}</p>
          <p class="text-[10px] text-gray-400">${t.sub}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- TABS: Description, Reviews, Shipping -->
  <div class="mt-16">
    <div class="flex gap-0 border-b border-[#f0e8d8] overflow-x-auto" role="tablist">
      ${[
        {id:'desc', label:'Description'},
        {id:'reviews', label:'Reviews ('+p.reviews+')'},
        {id:'shipping', label:'Shipping & Returns'},
        {id:'care', label:'Jewelry Care'},
      ].map((tab, i) => `
      <button role="tab" aria-selected="${i===0}" onclick="switchTab('${tab.id}', this)"
              class="tab-btn px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-all ${i===0 ? 'border-b-2 border-[#c9a84c] text-[#c9a84c]' : 'text-gray-500 hover:text-gray-700'}">
        ${tab.label}
      </button>`).join('')}
    </div>

    <div class="py-8">
      <div id="tab-desc" class="tab-content">
        <div class="max-w-2xl">
          <h3 class="font-serif text-xl font-semibold mb-4 text-gray-800">Product Description</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">${p.description}</p>
          <ul class="space-y-2">
            ${['Premium quality gold plating that lasts', 'Hypoallergenic materials suitable for sensitive skin', 'Packaged in premium jewelry gift box', 'Certificate of authenticity included', 'Perfect for gifting and special occasions'].map(f => `
            <li class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-check text-[#c9a84c] text-xs"></i>${f}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div id="tab-reviews" class="tab-content hidden">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <div class="text-center p-8 bg-[#fdf8f0] rounded-2xl">
              <p class="font-serif text-7xl font-bold text-[#c9a84c]">${p.rating}</p>
              <div class="flex justify-center gap-1 star-rating text-lg my-2">
                ${Array.from({length: 5}, (_, i) => `<i class="${i < Math.floor(p.rating) ? 'fas' : 'far'} fa-star"></i>`).join('')}
              </div>
              <p class="text-sm text-gray-500">Based on ${p.reviews} reviews</p>
            </div>
            <div class="space-y-3 mt-5">
              ${[
                {stars:5, pct:78},
                {stars:4, pct:15},
                {stars:3, pct:5},
                {stars:2, pct:1},
                {stars:1, pct:1},
              ].map(r => `
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-500 w-6">${r.stars}★</span>
                <div class="rating-bar flex-1"><div class="rating-fill" style="width:${r.pct}%"></div></div>
                <span class="text-xs text-gray-400 w-8">${r.pct}%</span>
              </div>`).join('')}
            </div>
          </div>
          <div class="space-y-5">
            ${[
              {name:'Rina A.', rating:5, date:'2 days ago', text:'Beautiful quality! Exactly as described. The gold plating is stunning.'},
              {name:'Meher N.', rating:5, date:'1 week ago', text:'Perfect for my wedding. Got so many compliments!'},
              {name:'Tasnim K.', rating:4, date:'2 weeks ago', text:'Very elegant piece. Fast delivery too!'},
            ].map(r => `
            <div class="bg-[#fdf8f0] p-5 rounded-xl border border-[#f0e8d8]">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-sm text-gray-700">${r.name}</span>
                <span class="text-xs text-gray-400">${r.date}</span>
              </div>
              <div class="flex gap-1 star-rating text-xs mb-2">${Array.from({length: r.rating}, () => '<i class="fas fa-star"></i>').join('')}</div>
              <p class="text-sm text-gray-600 italic">"${r.text}"</p>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <div id="tab-shipping" class="tab-content hidden">
        <div class="max-w-xl space-y-5">
          ${[
            {icon:'fas fa-truck', title:'Delivery Within Bangladesh', text:'Free delivery on orders above ৳1500. Standard delivery in 3-5 business days. Express delivery available.'},
            {icon:'fas fa-box-open', title:'Packaging', text:'Every order is carefully packaged in our signature jewelry box with tissue paper and a ribbon.'},
            {icon:'fas fa-undo', title:'Easy Returns', text:'Return within 7 days of delivery for a full refund. Item must be unworn and in original packaging.'},
            {icon:'fas fa-phone', title:'Customer Support', text:'Reach us via Facebook: @Emarket247bd or call +880 1700-000000. Available 9am-9pm daily.'},
          ].map(s => `
          <div class="flex gap-4 p-5 bg-[#fdf8f0] rounded-xl border border-[#f0e8d8]">
            <div class="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
              <i class="${s.icon} text-white text-sm"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 text-sm mb-1">${s.title}</h4>
              <p class="text-sm text-gray-600">${s.text}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div id="tab-care" class="tab-content hidden">
        <div class="max-w-xl">
          <h3 class="font-serif text-xl font-semibold mb-4">Jewelry Care Tips</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            ${[
              {icon:'fas fa-tint', title:'Avoid Water', text:'Remove before swimming, bathing, or washing hands.'},
              {icon:'fas fa-spray-can', title:'No Chemicals', text:'Keep away from perfumes, lotions, and cleaning products.'},
              {icon:'fas fa-box', title:'Proper Storage', text:'Store in the provided box or a soft pouch when not wearing.'},
              {icon:'fas fa-cloth', title:'Clean Gently', text:'Wipe with a soft, dry cloth after each wear.'},
            ].map(c => `
            <div class="p-4 bg-[#fdf8f0] rounded-xl border border-[#f0e8d8]">
              <i class="${c.icon} text-[#c9a84c] mb-2"></i>
              <h4 class="font-semibold text-sm text-gray-800 mb-1">${c.title}</h4>
              <p class="text-xs text-gray-600">${c.text}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RELATED PRODUCTS -->
  ${related.length > 0 ? `
  <section class="mt-8 pt-12 border-t border-[#f0e8d8]" aria-label="Related Products">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-serif text-3xl font-light text-gray-800">You May Also <span class="shimmer-text font-semibold">Like</span></h2>
      <a href="/shop?category=${p.category}" class="text-sm text-[#c9a84c] hover:text-[#9a7c2e] flex items-center gap-1">View All <i class="fas fa-arrow-right text-xs"></i></a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${related.map(rp => productCard(rp)).join('')}
    </div>
  </section>` : ''}
</div>

`,
    `<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Product",
  "name":"${p.name}",
  "description":"${p.description}",
  "image":"${p.images[0]}",
  "brand":{"@type":"Brand","name":"Emarket247"},
  "offers":{
    "@type":"Offer",
    "price":"${p.price}",
    "priceCurrency":"BDT",
    "availability":"${p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}",
    "url":"https://emarket247.pages.dev/product/${p.id}"
  },
  "aggregateRating":{
    "@type":"AggregateRating",
    "ratingValue":"${p.rating}",
    "reviewCount":"${p.reviews}"
  }
}
</script>`
  )
}

// ─────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────

function cartPage() {
  return baseHTML(
    'Shopping Cart | Emarket247 Fine Jewellery',
    'Review your cart and proceed to checkout. Shop gold-plated jewelry with free delivery across Bangladesh.',
    `
<section class="bg-[#fdf8f0] py-10 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="breadcrumb mb-3 flex items-center" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span><span class="text-gray-600 font-medium text-sm">Cart</span>
    </nav>
    <h1 class="font-serif font-bold text-4xl text-gray-800">Shopping Cart</h1>
  </div>
</section>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
  <div class="grid lg:grid-cols-3 gap-8">

    <!-- Cart Items -->
    <div class="lg:col-span-2">
      <div id="cart-page-empty" class="hidden text-center py-20 bg-white rounded-3xl shadow-sm border border-[#f0e8d8]">
        <div class="w-24 h-24 rounded-full bg-[#f5ede0] flex items-center justify-center mx-auto mb-5">
          <i class="fas fa-shopping-bag text-4xl text-[#c9a84c]"></i>
        </div>
        <h2 class="font-serif text-2xl text-gray-600 mb-3">Your cart is empty</h2>
        <p class="text-sm text-gray-400 mb-6">Start shopping and add your favorite jewelry!</p>
        <a href="/shop" class="btn-gold px-8 py-3.5 rounded-full text-white font-medium text-sm inline-flex items-center gap-2">
          <i class="fas fa-gem"></i> Browse Collection
        </a>
      </div>

      <div id="cart-page-items" class="space-y-4">
        <!-- populated by JS -->
      </div>

      <div class="flex items-center justify-between mt-6 pt-4 border-t border-[#f0e8d8]" id="cart-page-actions">
        <button onclick="clearCart()" class="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
          <i class="fas fa-trash-alt text-xs"></i> Clear Cart
        </button>
        <a href="/shop" class="btn-outline-gold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <i class="fas fa-arrow-left text-xs"></i> Continue Shopping
        </a>
      </div>
    </div>

    <!-- Order Summary -->
    <aside>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e8d8] sticky top-24">
        <h2 class="font-serif font-semibold text-xl text-gray-800 mb-5">Order Summary</h2>

        <div class="space-y-3 mb-5" id="order-summary-details">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal (<span id="summary-items">0</span> items)</span>
            <span id="summary-subtotal" class="font-medium">৳0</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span id="summary-delivery" class="text-green-600 font-medium">Free</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Discount</span>
            <span id="summary-discount" class="text-[#c9a84c] font-medium">—</span>
          </div>
        </div>

        <!-- Coupon -->
        <div class="mb-5">
          <div class="flex gap-2">
            <input type="text" id="coupon-input" placeholder="Promo code" class="form-input text-sm flex-1">
            <button onclick="applyCoupon()" class="btn-outline-gold px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap">Apply</button>
          </div>
          <p class="text-xs text-gray-400 mt-1.5">Try: WELCOME10 for 10% off</p>
          <p id="coupon-msg" class="text-xs mt-1 hidden"></p>
        </div>

        <div class="border-t border-[#f0e8d8] pt-4 mb-5">
          <div class="flex justify-between items-baseline">
            <span class="font-serif font-semibold text-lg text-gray-800">Total</span>
            <span id="summary-total" class="font-serif font-bold text-2xl gold-text">৳0</span>
          </div>
          <p class="text-xs text-gray-400 mt-1">VAT included where applicable</p>
        </div>

        <a href="/checkout" class="btn-gold w-full py-4 rounded-xl text-white font-medium text-sm text-center block mb-3">
          Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
        </a>

        <!-- Payment methods -->
        <div class="border-t border-[#f0e8d8] pt-4 mt-2">
          <p class="text-xs text-center text-gray-400 mb-3">Secure payments via</p>
          <div class="flex flex-wrap gap-2 justify-center">
            ${['bKash', 'Nagad', 'Rocket', 'VISA', 'COD'].map(m => `<span class="text-xs bg-[#fdf8f0] border border-[#f0e8d8] px-2.5 py-1 rounded-lg text-gray-600 font-medium">${m}</span>`).join('')}
          </div>
        </div>

        <!-- Trust -->
        <div class="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
          <i class="fas fa-lock text-[#c9a84c] text-xs"></i>
          <span>256-bit SSL secured checkout</span>
        </div>
      </div>
    </aside>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// CHECKOUT PAGE
// ─────────────────────────────────────────────

function checkoutPage() {
  return baseHTML(
    'Checkout | Emarket247 Fine Jewellery',
    'Complete your jewelry order. Secure checkout with bKash, Nagad, Rocket, cards, and cash on delivery.',
    `
<!-- Progress Bar -->
<div class="bg-white border-b border-[#f0e8d8] py-5">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-center gap-0">
      <!-- Step 1: Delivery -->
      <div class="flex flex-col items-center">
        <div class="step-dot active" id="step1-dot">1</div>
        <span class="text-xs mt-2 font-medium text-[#c9a84c]">Delivery</span>
      </div>
      <div class="step-line w-16 sm:w-24 mx-2" id="step-line-1-2"></div>
      <!-- Step 2: Payment -->
      <div class="flex flex-col items-center">
        <div class="step-dot inactive" id="step2-dot">2</div>
        <span class="text-xs mt-2 text-gray-400" id="step2-label">Payment</span>
      </div>
      <div class="step-line w-16 sm:w-24 mx-2" id="step-line-2-3"></div>
      <!-- Step 3: Review -->
      <div class="flex flex-col items-center">
        <div class="step-dot inactive" id="step3-dot">3</div>
        <span class="text-xs mt-2 text-gray-400" id="step3-label">Review</span>
      </div>
    </div>
  </div>
</div>

<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
  <div class="grid lg:grid-cols-3 gap-8">

    <!-- LEFT: Steps -->
    <div class="lg:col-span-2 space-y-6">

      <!-- STEP 1: Delivery Details -->
      <div id="checkout-step-1" class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#f0e8d8]">
        <h2 class="font-serif font-semibold text-2xl text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-sans">1</span>
          Delivery Information
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label" for="first-name">First Name *</label>
            <input type="text" id="first-name" class="form-input" placeholder="Farida" required autocomplete="given-name">
          </div>
          <div>
            <label class="form-label" for="last-name">Last Name *</label>
            <input type="text" id="last-name" class="form-input" placeholder="Rahman" required autocomplete="family-name">
          </div>
          <div>
            <label class="form-label" for="phone">Phone Number *</label>
            <input type="tel" id="phone" class="form-input" placeholder="+880 1700-000000" required autocomplete="tel">
          </div>
          <div>
            <label class="form-label" for="email-co">Email (Optional)</label>
            <input type="email" id="email-co" class="form-input" placeholder="your@email.com" autocomplete="email">
          </div>
          <div class="sm:col-span-2">
            <label class="form-label" for="address">Street Address *</label>
            <input type="text" id="address" class="form-input" placeholder="House no., Road, Area" required autocomplete="street-address">
          </div>
          <div>
            <label class="form-label" for="city">City / District *</label>
            <select id="city" class="form-input cursor-pointer" required>
              <option value="">Select City</option>
              ${['Dhaka','Chittagong','Sylhet','Rajshahi','Khulna','Barisal','Rangpur','Mymensingh','Comilla','Gazipur','Narayanganj'].map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="form-label" for="area">Area / Upazila</label>
            <input type="text" id="area" class="form-input" placeholder="Gulshan, Banani, etc." autocomplete="address-level3">
          </div>
          <div class="sm:col-span-2">
            <label class="form-label" for="notes">Order Notes (Optional)</label>
            <textarea id="notes" class="form-input resize-none" rows="2" placeholder="Special instructions for your order..."></textarea>
          </div>
        </div>
        <button onclick="goToStep(2)" class="btn-gold mt-6 px-8 py-3.5 rounded-xl text-white font-medium text-sm w-full sm:w-auto">
          Continue to Payment <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- STEP 2: Payment Method -->
      <div id="checkout-step-2" class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#f0e8d8] opacity-60 pointer-events-none" style="transition:opacity 0.3s">
        <h2 class="font-serif font-semibold text-2xl text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-sans">2</span>
          Payment Method
        </h2>

        <!-- Payment options -->
        <div class="space-y-3 mb-6" id="payment-methods">
          ${[
            {id:'bkash', label:'bKash Mobile Banking', icon:'fas fa-mobile-alt', color:'bg-pink-50 border-pink-200', activeColor:'border-pink-500', desc:'Pay via bKash personal or merchant number'},
            {id:'nagad', label:'Nagad Mobile Banking', icon:'fas fa-mobile-alt', color:'bg-orange-50 border-orange-200', activeColor:'border-orange-500', desc:'Pay via Nagad mobile account'},
            {id:'rocket', label:'Rocket (DBBL)', icon:'fas fa-rocket', color:'bg-purple-50 border-purple-200', activeColor:'border-purple-500', desc:'Pay via Dutch-Bangla Rocket'},
            {id:'card', label:'Debit / Credit Card', icon:'fas fa-credit-card', color:'bg-blue-50 border-blue-200', activeColor:'border-blue-500', desc:'VISA, MasterCard, AMEX'},
            {id:'cod', label:'Cash on Delivery', icon:'fas fa-money-bill-wave', color:'bg-green-50 border-green-200', activeColor:'border-green-500', desc:'Pay when you receive'},
          ].map((pm, i) => `
          <label class="flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-sm payment-option ${pm.color} ${i===0?pm.activeColor+' shadow-sm':''}" for="pay-${pm.id}">
            <input type="radio" name="payment" id="pay-${pm.id}" value="${pm.id}" ${i===0?'checked':''} class="mt-1 accent-[#c9a84c]" onchange="handlePaymentChange('${pm.id}', this.closest('.payment-option'))">
            <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <i class="${pm.icon} text-[#c9a84c]"></i>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm text-gray-800">${pm.label}</p>
              <p class="text-xs text-gray-500 mt-0.5">${pm.desc}</p>
            </div>
          </label>`).join('')}
        </div>

        <!-- Mobile payment number -->
        <div id="mobile-payment-details" class="p-4 bg-pink-50 rounded-2xl border border-pink-200 mb-4">
          <p class="text-sm text-gray-700 font-medium mb-3">Send payment to:</p>
          <div class="flex items-center gap-3 bg-white rounded-xl p-3 border border-pink-200">
            <i class="fas fa-mobile-alt text-[#c9a84c]"></i>
            <span class="font-bold text-gray-800" id="payment-number">01700-000000</span>
            <button onclick="copyPaymentNumber()" class="ml-auto text-xs text-[#c9a84c] hover:text-[#9a7c2e] flex items-center gap-1">
              <i class="fas fa-copy"></i> Copy
            </button>
          </div>
          <div class="mt-3">
            <label class="form-label">Transaction ID *</label>
            <input type="text" id="trx-id" class="form-input text-sm" placeholder="Enter your bKash/Nagad transaction ID" required>
          </div>
        </div>

        <!-- Card details (hidden by default) -->
        <div id="card-payment-details" class="hidden p-4 bg-blue-50 rounded-2xl border border-blue-200 mb-4 space-y-3">
          <div>
            <label class="form-label">Card Number *</label>
            <input type="text" id="card-number" class="form-input text-sm" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCard(this)">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="form-label">Expiry Date *</label>
              <input type="text" id="card-expiry" class="form-input text-sm" placeholder="MM/YY" maxlength="5">
            </div>
            <div>
              <label class="form-label">CVV *</label>
              <input type="text" id="card-cvv" class="form-input text-sm" placeholder="123" maxlength="4">
            </div>
          </div>
          <div>
            <label class="form-label">Name on Card *</label>
            <input type="text" id="card-name" class="form-input text-sm" placeholder="Farida Rahman">
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button onclick="goToStep(1)" class="btn-outline-gold px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> Back
          </button>
          <button onclick="goToStep(3)" class="btn-gold px-8 py-3.5 rounded-xl text-white font-medium text-sm flex-1 sm:flex-none">
            Review Order <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>

      <!-- STEP 3: Review & Confirm -->
      <div id="checkout-step-3" class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#f0e8d8] opacity-60 pointer-events-none" style="transition:opacity 0.3s">
        <h2 class="font-serif font-semibold text-2xl text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-sans">3</span>
          Review & Confirm
        </h2>

        <!-- Delivery summary -->
        <div class="bg-[#fdf8f0] rounded-2xl p-5 mb-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-sm text-gray-700 flex items-center gap-2"><i class="fas fa-map-marker-alt text-[#c9a84c]"></i> Delivery Address</h3>
            <button onclick="goToStep(1)" class="text-xs text-[#c9a84c] hover:underline">Edit</button>
          </div>
          <div id="review-delivery" class="text-sm text-gray-600 space-y-1"></div>
        </div>

        <!-- Payment summary -->
        <div class="bg-[#fdf8f0] rounded-2xl p-5 mb-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-sm text-gray-700 flex items-center gap-2"><i class="fas fa-credit-card text-[#c9a84c]"></i> Payment Method</h3>
            <button onclick="goToStep(2)" class="text-xs text-[#c9a84c] hover:underline">Edit</button>
          </div>
          <p id="review-payment" class="text-sm text-gray-600"></p>
        </div>

        <!-- Items summary -->
        <div class="mb-6" id="review-items"></div>

        <!-- Terms -->
        <label class="flex items-start gap-3 mb-5 cursor-pointer">
          <input type="checkbox" id="terms-check" class="mt-0.5 accent-[#c9a84c] w-4 h-4">
          <span class="text-sm text-gray-600">I agree to the <a href="#" class="text-[#c9a84c] hover:underline">Terms of Service</a> and <a href="#" class="text-[#c9a84c] hover:underline">Privacy Policy</a></span>
        </label>

        <div class="flex gap-3">
          <button onclick="goToStep(2)" class="btn-outline-gold px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <i class="fas fa-arrow-left text-xs"></i> Back
          </button>
          <button onclick="placeOrder()" id="place-order-btn" class="btn-gold flex-1 py-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2">
            <i class="fas fa-shield-alt"></i> Place Order Securely
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT: Order Summary -->
    <aside>
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e8d8] sticky top-24">
        <h3 class="font-serif font-semibold text-lg text-gray-800 mb-4">Order Summary</h3>
        <div id="checkout-items" class="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1"></div>
        <div class="border-t border-[#f0e8d8] pt-4 space-y-2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span id="co-subtotal">৳0</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Delivery</span>
            <span class="text-green-600 font-medium" id="co-delivery">Free</span>
          </div>
          <div class="flex justify-between text-sm" id="co-discount-row" style="display:none">
            <span class="text-gray-600">Discount</span>
            <span class="text-[#c9a84c] font-medium" id="co-discount">—</span>
          </div>
          <div class="flex justify-between font-semibold text-base pt-2 border-t border-[#f0e8d8]">
            <span class="font-serif">Total</span>
            <span id="co-total" class="gold-text font-bold">৳0</span>
          </div>
        </div>
        <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2">
          <i class="fas fa-lock text-green-500 mt-0.5 text-xs flex-shrink-0"></i>
          <p class="text-xs text-green-700">Your order is protected by SSL encryption and our 100% authentic guarantee.</p>
        </div>
      </div>
    </aside>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// ORDER CONFIRMED PAGE
// ─────────────────────────────────────────────

function orderConfirmedPage() {
  return baseHTML(
    'Order Confirmed! | Emarket247 Fine Jewellery',
    'Your jewelry order has been placed successfully. Thank you for shopping with Emarket247.',
    `
<div class="min-h-[70vh] flex items-center justify-center py-16">
  <div class="max-w-lg w-full mx-auto px-4 text-center">
    <!-- Success animation -->
    <div class="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-lg" style="animation:float 3s ease-in-out infinite">
      <i class="fas fa-check text-white text-4xl"></i>
    </div>

    <h1 class="font-serif font-bold text-4xl text-gray-800 mb-3">Order Confirmed!</h1>
    <p class="text-gray-500 text-sm mb-2">Order ID: <strong class="text-[#c9a84c]" id="order-id">#EM-000000</strong></p>
    <p class="text-gray-600 mb-8">Thank you for shopping with Emarket247! Your beautiful jewelry is being prepared with care and will be delivered soon.</p>

    <div class="bg-[#fdf8f0] rounded-2xl p-6 mb-8 text-left border border-[#f0e8d8]">
      <h3 class="font-serif font-semibold text-lg text-gray-800 mb-4">What's Next?</h3>
      <div class="space-y-4">
        ${[
          {icon:'fas fa-box', title:'Order Processing', text:'We\'re preparing your jewelry with care (1 business day)'},
          {icon:'fas fa-truck', title:'Dispatch', text:'Your order will be dispatched within 1-2 business days'},
          {icon:'fas fa-home', title:'Delivery', text:'Expected delivery in 3-5 business days across Bangladesh'},
          {icon:'fab fa-facebook-f', title:'Track via Facebook', text:'Message us on Facebook @Emarket247bd for order updates'},
        ].map((s, i) => `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full ${i===0 ? 'gold-gradient' : 'bg-[#f0e8d8]'} flex items-center justify-center flex-shrink-0">
            <i class="${s.icon} ${i===0 ? 'text-white' : 'text-[#c9a84c]'} text-xs"></i>
          </div>
          <div>
            <p class="font-semibold text-sm text-gray-700">${s.title}</p>
            <p class="text-xs text-gray-500">${s.text}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="/shop" class="btn-gold px-8 py-3.5 rounded-full text-white font-medium text-sm inline-flex items-center justify-center gap-2">
        <i class="fas fa-gem"></i> Continue Shopping
      </a>
      <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="btn-outline-gold px-8 py-3.5 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2">
        <i class="fab fa-facebook-f"></i> Contact Us
      </a>
    </div>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────

function aboutPage() {
  return baseHTML(
    'About Us | Emarket247 Fine Jewellery | Bangladesh',
    'Learn about Emarket247 - Bangladesh\'s trusted gold-plated jewelry destination. Authentic, elegant, affordable.',
    `
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-16 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center">
    <div class="section-tag mb-4">Our Story</div>
    <h1 class="font-serif font-bold text-5xl text-gray-800 mb-4">About <span class="shimmer-text">Emarket247</span></h1>
    <p class="text-base text-gray-600 max-w-xl mx-auto">Bangladesh's premier destination for exquisite gold-plated jewelry. Where elegance meets affordability.</p>
  </div>
</section>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-16">

  <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
    <div>
      <div class="section-tag mb-4">Who We Are</div>
      <h2 class="font-serif text-4xl font-light text-gray-800 mb-5">Crafting <span class="shimmer-text font-semibold">Timeless Elegance</span></h2>
      <p class="text-gray-600 leading-relaxed mb-4 text-sm">Emarket247 was founded with a simple vision: to make exquisite, high-quality gold-plated jewelry accessible to women across Bangladesh. We believe every woman deserves to feel like royalty without breaking the bank.</p>
      <p class="text-gray-600 leading-relaxed mb-6 text-sm">Our curated collection features everything from traditional bridal sets to modern everyday jewelry, all crafted with premium materials and meticulous attention to detail.</p>
      <div class="grid grid-cols-3 gap-5">
        ${[
          {num:'5000+', label:'Happy Customers'},
          {num:'200+', label:'Unique Designs'},
          {num:'4.9★', label:'Average Rating'},
        ].map(s => `
        <div class="text-center p-4 bg-[#fdf8f0] rounded-2xl border border-[#f0e8d8]">
          <p class="font-serif font-bold text-2xl text-[#c9a84c]">${s.num}</p>
          <p class="text-xs text-gray-500 mt-1">${s.label}</p>
        </div>`).join('')}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80" alt="Bridal necklace" class="rounded-2xl shadow-lg w-full h-64 object-cover" loading="lazy">
      <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80" alt="Gold earrings" class="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" loading="lazy">
    </div>
  </div>

  <!-- Values -->
  <div class="text-center mb-12">
    <div class="section-tag mb-3">What We Stand For</div>
    <h2 class="font-serif text-4xl font-light text-gray-800">Our <span class="shimmer-text font-semibold">Values</span></h2>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
    ${[
      {icon:'fas fa-gem', title:'Authentic Quality', desc:'Every piece is crafted from premium-grade materials with durable gold plating that maintains its brilliance.'},
      {icon:'fas fa-heart', title:'Women First', desc:'Our designs celebrate femininity and empower women to express their unique style with confidence.'},
      {icon:'fas fa-truck', title:'Delivered with Care', desc:'Your jewelry arrives in beautiful packaging, perfect as a gift to yourself or a loved one.'},
      {icon:'fas fa-tags', title:'Affordable Luxury', desc:'We believe elegance shouldn\'t come with a high price tag. Premium jewelry, accessible prices.'},
      {icon:'fas fa-handshake', title:'Trusted Service', desc:'Thousands of happy customers across Bangladesh trust Emarket247 for their jewelry needs.'},
      {icon:'fab fa-facebook-f', title:'Social Community', desc:'Follow us on Facebook @Emarket247bd for new collections, offers, and styling tips.'},
    ].map(v => `
    <div class="p-6 bg-white rounded-2xl border border-[#f0e8d8] hover:shadow-md transition-shadow">
      <div class="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center mb-4 shadow-sm">
        <i class="${v.icon} text-white"></i>
      </div>
      <h3 class="font-serif font-semibold text-lg text-gray-800 mb-2">${v.title}</h3>
      <p class="text-sm text-gray-500 leading-relaxed">${v.desc}</p>
    </div>`).join('')}
  </div>

  <!-- CTA -->
  <div class="text-center bg-gradient-to-r from-[#1a1408] to-[#2a1e08] rounded-3xl p-12">
    <h2 class="font-serif text-3xl text-white font-bold mb-4">Start Your Jewelry Journey</h2>
    <p class="text-[#e8d5a3] text-sm mb-8 max-w-md mx-auto">Explore hundreds of stunning pieces and find the perfect jewelry for every occasion.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="/shop" class="btn-gold px-8 py-4 rounded-full text-white font-medium text-sm inline-flex items-center gap-2 justify-center">
        <i class="fas fa-gem"></i> Shop Now
      </a>
      <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-white px-8 py-4 rounded-full font-medium text-sm inline-flex items-center gap-2 justify-center transition-all">
        <i class="fab fa-facebook-f"></i> Follow on Facebook
      </a>
    </div>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// SCRIPTS
// ─────────────────────────────────────────────

function scripts() {
  return `
<script>
// ─── CART STATE ───
let cart = JSON.parse(localStorage.getItem('emarket247_cart') || '[]')
let wishlist = JSON.parse(localStorage.getItem('emarket247_wishlist') || '[]')
let couponDiscount = 0
let currentStep = 1

// Product data
const PRODUCTS = ${JSON.stringify(products)}

function findProduct(id) { return PRODUCTS.find(p => p.id === id) }

// ─── CART FUNCTIONS ───
function addToCart(productId, qty = 1) {
  const product = findProduct(productId)
  if (!product || !product.inStock) return
  const existing = cart.find(item => item.id === productId)
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 10)
  } else {
    cart.push({ id: productId, qty })
  }
  saveCart()
  updateCartUI()
  showToast('Added to cart!', product.name, product.image, 'success')
  const sidebar = document.getElementById('cart-sidebar')
  if (sidebar && !document.getElementById('cart-overlay').classList.contains('block')) {
    setTimeout(() => toggleCart(), 400)
  }
}

function addToCartQty(productId) {
  const qtyInput = document.getElementById('qty-input')
  const qty = qtyInput ? parseInt(qtyInput.value) : 1
  addToCart(productId, qty)
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId)
  saveCart()
  updateCartUI()
  updateCartPage()
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId)
  if (!item) return
  item.qty = Math.max(1, Math.min(10, item.qty + delta))
  saveCart()
  updateCartUI()
  updateCartPage()
}

function clearCart() {
  if (!confirm('Clear your cart?')) return
  cart = []
  saveCart()
  updateCartUI()
  updateCartPage()
}

function saveCart() {
  localStorage.setItem('emarket247_cart', JSON.stringify(cart))
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = findProduct(item.id)
    return p ? sum + (p.price * item.qty) : sum
  }, 0)
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0)
}

function updateCartUI() {
  const count = getCartCount()
  const countEls = document.querySelectorAll('#cart-count, #cart-item-count')
  countEls.forEach(el => {
    el.textContent = count
    el.style.display = count > 0 ? 'flex' : 'none'
  })

  // Sidebar items
  const listEl = document.getElementById('cart-items-list')
  const emptyEl = document.getElementById('cart-empty')
  const footerEl = document.getElementById('cart-footer')
  if (!listEl) return

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex'
    if (footerEl) footerEl.classList.add('hidden')
    return
  }
  if (emptyEl) emptyEl.style.display = 'none'
  if (footerEl) footerEl.classList.remove('hidden')

  const total = getCartTotal()
  const delivery = total >= 1500 ? 0 : 80

  const items = cart.map(item => {
    const p = findProduct(item.id)
    if (!p) return ''
    return \`<div class="flex gap-3 bg-[#fdf8f0] rounded-xl p-3">
      <img src="\${p.image}" alt="\${p.name}" class="w-14 h-14 object-cover rounded-lg flex-shrink-0">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-800 truncate">\${p.name}</p>
        <p class="text-xs text-[#c9a84c] font-semibold">৳\${p.price.toLocaleString()}</p>
        <div class="flex items-center gap-2 mt-1">
          <button onclick="updateQty('\${p.id}', -1)" class="w-5 h-5 rounded-full bg-white border border-[#e8dcc8] text-xs flex items-center justify-center hover:bg-[#c9a84c] hover:text-white hover:border-transparent transition-all">−</button>
          <span class="text-xs font-semibold w-4 text-center">\${item.qty}</span>
          <button onclick="updateQty('\${p.id}', 1)" class="w-5 h-5 rounded-full bg-white border border-[#e8dcc8] text-xs flex items-center justify-center hover:bg-[#c9a84c] hover:text-white hover:border-transparent transition-all">+</button>
        </div>
      </div>
      <button onclick="removeFromCart('\${p.id}')" class="text-gray-300 hover:text-red-400 transition-colors ml-1" aria-label="Remove">
        <i class="fas fa-times text-xs"></i>
      </button>
    </div>\`
  }).join('')

  listEl.innerHTML = (emptyEl ? emptyEl.outerHTML : '') + items

  document.getElementById('cart-subtotal').textContent = '৳' + total.toLocaleString()
  document.getElementById('cart-delivery').textContent = delivery === 0 ? 'Free' : '৳' + delivery
  document.getElementById('cart-delivery').className = delivery === 0 ? 'text-green-600' : 'text-gray-600'
  document.getElementById('cart-total').textContent = '৳' + (total + delivery).toLocaleString()
}

// ─── CART PAGE ───
function updateCartPage() {
  const pageItems = document.getElementById('cart-page-items')
  const pageEmpty = document.getElementById('cart-page-empty')
  const pageActions = document.getElementById('cart-page-actions')
  const summaryItems = document.getElementById('summary-items')
  const summarySubtotal = document.getElementById('summary-subtotal')
  const summaryDelivery = document.getElementById('summary-delivery')
  const summaryDiscount = document.getElementById('summary-discount')
  const summaryTotal = document.getElementById('summary-total')
  if (!pageItems) return

  const subtotal = getCartTotal()
  const delivery = subtotal >= 1500 ? 0 : 80
  const discount = couponDiscount
  const total = subtotal + delivery - discount

  if (cart.length === 0) {
    pageItems.innerHTML = ''
    if (pageEmpty) pageEmpty.classList.remove('hidden')
    if (pageActions) pageActions.classList.add('hidden')
  } else {
    if (pageEmpty) pageEmpty.classList.add('hidden')
    if (pageActions) pageActions.classList.remove('hidden')
    pageItems.innerHTML = cart.map(item => {
      const p = findProduct(item.id)
      if (!p) return ''
      return \`<div class="bg-white rounded-2xl p-5 shadow-sm border border-[#f0e8d8] flex gap-4 items-start">
        <a href="/product/\${p.id}">
          <img src="\${p.image}" alt="\${p.name}" class="w-20 h-20 object-cover rounded-xl flex-shrink-0 hover:opacity-90 transition-opacity">
        </a>
        <div class="flex-1 min-w-0">
          <a href="/product/\${p.id}" class="font-serif font-semibold text-gray-800 hover:text-[#c9a84c] transition-colors text-sm leading-snug block mb-1">\${p.name}</a>
          <p class="text-xs text-gray-400 mb-2">\${p.material}</p>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="flex items-center gap-2 bg-[#f5ede0] rounded-xl p-1">
              <button onclick="updateQty('\${p.id}', -1)" class="qty-btn" aria-label="Decrease">−</button>
              <span class="text-sm font-semibold w-6 text-center">\${item.qty}</span>
              <button onclick="updateQty('\${p.id}', 1)" class="qty-btn" aria-label="Increase">+</button>
            </div>
            <span class="font-serif font-bold text-[#c9a84c] text-base">৳\${(p.price * item.qty).toLocaleString()}</span>
            <span class="text-xs text-gray-400 line-through">৳\${(p.originalPrice * item.qty).toLocaleString()}</span>
          </div>
        </div>
        <button onclick="removeFromCart('\${p.id}')" class="text-gray-300 hover:text-red-400 transition-colors p-1" aria-label="Remove">
          <i class="fas fa-trash-alt text-sm"></i>
        </button>
      </div>\`
    }).join('')
  }

  if (summaryItems) summaryItems.textContent = getCartCount()
  if (summarySubtotal) summarySubtotal.textContent = '৳' + subtotal.toLocaleString()
  if (summaryDelivery) {
    summaryDelivery.textContent = delivery === 0 ? 'Free' : '৳' + delivery
    summaryDelivery.className = delivery === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-600'
  }
  if (summaryDiscount) summaryDiscount.textContent = discount > 0 ? '−৳' + discount : '—'
  if (summaryTotal) summaryTotal.textContent = '৳' + total.toLocaleString()
}

function applyCoupon() {
  const code = document.getElementById('coupon-input').value.trim().toUpperCase()
  const msg = document.getElementById('coupon-msg')
  const subtotal = getCartTotal()
  if (code === 'WELCOME10') {
    couponDiscount = Math.floor(subtotal * 0.1)
    msg.textContent = '✓ 10% discount applied!'
    msg.className = 'text-xs mt-1 text-green-600'
    msg.classList.remove('hidden')
    showToast('Coupon Applied!', '10% discount on your order', null, 'success')
  } else if (code === 'BRIDE20') {
    couponDiscount = Math.floor(subtotal * 0.2)
    msg.textContent = '✓ 20% bridal discount applied!'
    msg.className = 'text-xs mt-1 text-green-600'
    msg.classList.remove('hidden')
    showToast('Coupon Applied!', '20% bridal discount!', null, 'success')
  } else {
    couponDiscount = 0
    msg.textContent = '✗ Invalid coupon code'
    msg.className = 'text-xs mt-1 text-red-500'
    msg.classList.remove('hidden')
  }
  updateCartPage()
}

// ─── CHECKOUT FUNCTIONS ───
function updateCheckoutSummary() {
  const items = document.getElementById('checkout-items')
  const coSubtotal = document.getElementById('co-subtotal')
  const coDelivery = document.getElementById('co-delivery')
  const coTotal = document.getElementById('co-total')
  if (!items) return

  const subtotal = getCartTotal()
  const delivery = subtotal >= 1500 ? 0 : 80
  const total = subtotal + delivery - couponDiscount

  items.innerHTML = cart.map(item => {
    const p = findProduct(item.id)
    if (!p) return ''
    return \`<div class="flex gap-3 items-center">
      <img src="\${p.image}" alt="\${p.name}" class="w-12 h-12 object-cover rounded-lg flex-shrink-0">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-800 truncate">\${p.name}</p>
        <p class="text-xs text-gray-400">Qty: \${item.qty}</p>
      </div>
      <span class="text-xs font-bold text-[#c9a84c]">৳\${(p.price*item.qty).toLocaleString()}</span>
    </div>\`
  }).join('')

  if (coSubtotal) coSubtotal.textContent = '৳' + subtotal.toLocaleString()
  if (coDelivery) {
    coDelivery.textContent = delivery === 0 ? 'Free' : '৳' + delivery
  }
  if (coTotal) coTotal.textContent = '৳' + total.toLocaleString()
}

function goToStep(step) {
  const steps = [1,2,3]
  steps.forEach(s => {
    const el = document.getElementById('checkout-step-' + s)
    const dot = document.getElementById('step' + s + '-dot')
    const label = document.getElementById('step' + s + '-label')
    if (!el) return
    if (s < step) {
      el.style.opacity = '1'
      el.style.pointerEvents = 'auto'
      if (dot) { dot.className = 'step-dot done'; dot.innerHTML = '<i class="fas fa-check text-xs"></i>'; }
    } else if (s === step) {
      el.style.opacity = '1'
      el.style.pointerEvents = 'auto'
      if (dot) { dot.className = 'step-dot active'; dot.textContent = s; }
      if (label) { label.className = 'text-xs mt-2 font-medium text-[#c9a84c]'; }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      el.style.opacity = '0.6'
      el.style.pointerEvents = 'none'
      if (dot) { dot.className = 'step-dot inactive'; dot.textContent = s; }
      if (label) { label.className = 'text-xs mt-2 text-gray-400'; }
    }
  })
  const line12 = document.getElementById('step-line-1-2')
  const line23 = document.getElementById('step-line-2-3')
  if (line12) line12.className = step >= 2 ? 'step-line w-16 sm:w-24 mx-2 active' : 'step-line w-16 sm:w-24 mx-2'
  if (line23) line23.className = step >= 3 ? 'step-line w-16 sm:w-24 mx-2 active' : 'step-line w-16 sm:w-24 mx-2'

  currentStep = step

  if (step === 3) {
    // populate review
    const name = (document.getElementById('first-name')?.value||'') + ' ' + (document.getElementById('last-name')?.value||'')
    const phone = document.getElementById('phone')?.value || ''
    const address = document.getElementById('address')?.value || ''
    const city = document.getElementById('city')?.value || ''
    const reviewDel = document.getElementById('review-delivery')
    if (reviewDel) reviewDel.innerHTML = \`<p>\${name}</p><p>\${phone}</p><p>\${address}, \${city}</p>\`

    const payMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod'
    const payLabels = {bkash:'bKash Mobile Banking', nagad:'Nagad Mobile Banking', rocket:'Rocket (DBBL)', card:'Debit/Credit Card', cod:'Cash on Delivery'}
    const reviewPay = document.getElementById('review-payment')
    if (reviewPay) reviewPay.textContent = payLabels[payMethod] || 'Cash on Delivery'

    const reviewItems = document.getElementById('review-items')
    if (reviewItems) {
      reviewItems.innerHTML = \`<h3 class="font-serif font-semibold text-base text-gray-800 mb-3">Order Items</h3>\` +
        cart.map(item => {
          const p = findProduct(item.id)
          if (!p) return ''
          return \`<div class="flex gap-3 items-center p-3 bg-[#fdf8f0] rounded-xl mb-2">
            <img src="\${p.image}" alt="\${p.name}" class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">\${p.name}</p>
              <p class="text-xs text-gray-400">Qty: \${item.qty}</p>
            </div>
            <span class="font-bold text-[#c9a84c] text-sm">৳\${(p.price*item.qty).toLocaleString()}</span>
          </div>\`
        }).join('')
    }
  }
}

function handlePaymentChange(method, el) {
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.classList.remove('border-pink-500','border-orange-500','border-purple-500','border-blue-500','border-green-500','shadow-sm')
    const colors = {bkash:'bg-pink-50 border-pink-200', nagad:'bg-orange-50 border-orange-200', rocket:'bg-purple-50 border-purple-200', card:'bg-blue-50 border-blue-200', cod:'bg-green-50 border-green-200'}
  })
  const activeColors = {bkash:'border-pink-500', nagad:'border-orange-500', rocket:'border-purple-500', card:'border-blue-500', cod:'border-green-500'}
  if (el) { el.classList.add(activeColors[method] || 'border-[#c9a84c]', 'shadow-sm') }

  const mobileDet = document.getElementById('mobile-payment-details')
  const cardDet = document.getElementById('card-payment-details')
  const numbers = {bkash:'01700-000000 (bKash)', nagad:'01700-000001 (Nagad)', rocket:'01700-000002 (Rocket)'}

  if (mobileDet && cardDet) {
    if (method === 'card') {
      mobileDet.classList.add('hidden')
      cardDet.classList.remove('hidden')
    } else if (method === 'cod') {
      mobileDet.classList.add('hidden')
      cardDet.classList.add('hidden')
    } else {
      mobileDet.classList.remove('hidden')
      cardDet.classList.add('hidden')
      const numEl = document.getElementById('payment-number')
      if (numEl) numEl.textContent = numbers[method] || '01700-000000'
    }
  }
}

function copyPaymentNumber() {
  const num = document.getElementById('payment-number')?.textContent
  if (num) {
    navigator.clipboard.writeText(num.split(' ')[0])
    showToast('Copied!', 'Payment number copied to clipboard', null, 'info')
  }
}

function placeOrder() {
  const termsCheck = document.getElementById('terms-check')
  if (!termsCheck?.checked) {
    showToast('Please agree to terms', 'Check the terms & conditions box', null, 'error')
    return
  }
  if (cart.length === 0) {
    showToast('Empty Cart', 'Please add items to cart first', null, 'error')
    return
  }
  const btn = document.getElementById('place-order-btn')
  if (btn) {
    btn.disabled = true
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...'
  }
  // Simulate order processing
  setTimeout(() => {
    cart = []
    saveCart()
    updateCartUI()
    const orderId = '#EM-' + Math.floor(100000 + Math.random() * 900000)
    localStorage.setItem('last_order_id', orderId)
    window.location.href = '/order-confirmed'
  }, 2000)
}

function formatCard(input) {
  let v = input.value.replace(/\\D/g, '').substring(0, 16)
  input.value = v.replace(/(\\d{4})/g, '$1 ').trim()
}

// ─── WISHLIST ───
function toggleWishlist(productId, btn) {
  event.preventDefault()
  event.stopPropagation()
  const idx = wishlist.indexOf(productId)
  const icon = btn.querySelector('i')
  if (idx >= 0) {
    wishlist.splice(idx, 1)
    if (icon) { icon.className = 'far fa-heart text-sm text-gray-400'; }
    btn.classList.remove('active')
  } else {
    wishlist.push(productId)
    if (icon) { icon.className = 'fas fa-heart text-sm text-red-400'; }
    btn.classList.add('active')
    const p = findProduct(productId)
    showToast('Saved to wishlist!', p?.name || '', p?.image, 'wishlist')
  }
  localStorage.setItem('emarket247_wishlist', JSON.stringify(wishlist))
  updateWishlistCount()
}

function toggleWishlistProduct(productId, btn) {
  const idx = wishlist.indexOf(productId)
  const icon = btn.querySelector('i')
  if (idx >= 0) {
    wishlist.splice(idx, 1)
    if (icon) { icon.className = 'far fa-heart text-gray-400 text-lg'; }
  } else {
    wishlist.push(productId)
    if (icon) { icon.className = 'fas fa-heart text-red-400 text-lg'; }
    showToast('Saved to wishlist!', '', null, 'wishlist')
  }
  localStorage.setItem('emarket247_wishlist', JSON.stringify(wishlist))
  updateWishlistCount()
}

function updateWishlistCount() {
  const el = document.getElementById('wishlist-count')
  if (el) {
    el.textContent = wishlist.length
    el.style.display = wishlist.length > 0 ? 'flex' : 'none'
  }
}

// ─── TOAST ───
function showToast(title, subtitle, img, type = 'success') {
  const colors = {success:'#22c55e', error:'#ef4444', info:'#3b82f6', wishlist:'#e5174a'}
  const icons = {success:'fas fa-check-circle', error:'fas fa-times-circle', info:'fas fa-info-circle', wishlist:'fas fa-heart'}
  const container = document.getElementById('toast-container')
  if (!container) return
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.style.borderLeftColor = colors[type]
  toast.style.pointerEvents = 'auto'
  toast.innerHTML = \`
    \${img ? \`<img src="\${img}" alt="" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">\` : \`<div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background:\${colors[type]}20"><i class="\${icons[type]} text-base" style="color:\${colors[type]}"></i></div>\`}
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-gray-800">\${title}</p>
      \${subtitle ? \`<p class="text-xs text-gray-500 truncate">\${subtitle}</p>\` : ''}
    </div>
    <button onclick="this.closest('.toast').remove()" class="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"><i class="fas fa-times text-xs"></i></button>
  \`
  container.appendChild(toast)
  setTimeout(() => toast.style.opacity = '0', 3500)
  setTimeout(() => toast.remove(), 4000)
}

// ─── CART SIDEBAR TOGGLE ───
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar')
  const overlay = document.getElementById('cart-overlay')
  if (!sidebar) return
  const isOpen = !sidebar.classList.contains('translate-x-full')
  if (isOpen) {
    sidebar.classList.add('translate-x-full')
    overlay.classList.add('hidden')
    document.body.style.overflow = ''
  } else {
    sidebar.classList.remove('translate-x-full')
    overlay.classList.remove('hidden')
    overlay.classList.add('block')
    document.body.style.overflow = 'hidden'
  }
}

// ─── MOBILE MENU ───
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu')
  const overlay = document.getElementById('mobile-overlay')
  menu.classList.toggle('open')
  overlay.classList.toggle('hidden')
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : ''
}

// ─── SEARCH ───
function toggleSearch() {
  const bar = document.getElementById('search-bar-container')
  bar.classList.toggle('hidden')
  if (!bar.classList.contains('hidden')) {
    document.getElementById('main-search').focus()
  }
}

function handleSearch(e) {
  if (e.key === 'Escape') { document.getElementById('search-bar-container').classList.add('hidden'); return; }
  const query = e.target.value.toLowerCase().trim()
  const resultsEl = document.getElementById('search-results')
  if (!query || query.length < 2) { resultsEl.classList.add('hidden'); return; }
  const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.tags.some(t => t.includes(query))).slice(0, 5)
  if (results.length === 0) { resultsEl.innerHTML = '<p class="p-4 text-sm text-gray-500">No results found</p>'; resultsEl.classList.remove('hidden'); return; }
  resultsEl.innerHTML = results.map(p => \`
    <a href="/product/\${p.id}" onclick="toggleSearch()" class="flex items-center gap-3 px-4 py-3 hover:bg-[#fdf3e3] transition-colors border-b border-[#f5ede0] last:border-0">
      <img src="\${p.image}" alt="\${p.name}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-800 truncate">\${p.name}</p>
        <p class="text-xs text-gray-400">\${p.category}</p>
      </div>
      <span class="text-sm font-bold text-[#c9a84c] flex-shrink-0">৳\${p.price.toLocaleString()}</span>
    </a>\`).join('')
  resultsEl.classList.remove('hidden')
}

// ─── NAVBAR SCROLL ───
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar')
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20)
})

// ─── PRODUCT FILTER (home page) ───
function filterProducts(category, btn) {
  const grid = document.getElementById('featured-grid')
  if (!grid) return
  document.querySelectorAll('.filter-chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-checked','false'); })
  btn.classList.add('active')
  btn.setAttribute('aria-checked', 'true')
  grid.querySelectorAll('[data-product-id]').forEach(card => {
    const parentCat = card.closest('[data-category]')
    if (!parentCat) {
      const prodId = card.getAttribute('data-product-id')
      const prod = findProduct(prodId)
      if (prod) card.closest('article').style.display = category === 'all' || prod.category === category ? 'block' : 'none'
      return
    }
  })
  // Re-render from PRODUCTS
  const filtered = category === 'all' ? PRODUCTS.filter(p => p.featured) : PRODUCTS.filter(p => p.category === category)
  grid.innerHTML = filtered.slice(0,8).map(p => \`
  <article class="product-card group" data-product-id="\${p.id}">
    <button class="wishlist-btn" onclick="toggleWishlist('\${p.id}', this)"><i class="far fa-heart text-sm text-gray-400"></i></button>
    \${p.badge ? \`<span class="absolute top-3 left-3 z-10 badge-gold px-2.5 py-1 rounded-full uppercase text-xs">\${p.badge}</span>\` : ''}
    <a href="/product/\${p.id}">
      <div class="product-img-wrap">
        <img src="\${p.image}" alt="\${p.name}" class="product-img-front" loading="lazy" width="400" height="400">
        <img src="\${p.hoverImage}" alt="\${p.name}" class="product-img-hover" loading="lazy" width="400" height="400">
      </div>
      <div class="product-overlay">
        <button onclick="event.preventDefault(); addToCart('\${p.id}')" class="w-full btn-gold py-2.5 rounded-xl text-white text-sm font-medium tracking-wide">
          <i class="fas fa-shopping-bag mr-2"></i>Add to Cart
        </button>
      </div>
    </a>
    <div class="p-4">
      <div class="flex items-center gap-1 mb-1">
        <div class="star-rating text-xs flex gap-0.5">\${Array.from({length:5},(_,i)=> '<i class="'+(i<Math.floor(p.rating)?'fas':'far')+' fa-star"></i>').join('')}</div>
        <span class="text-xs text-gray-400 ml-1">(\${p.reviews})</span>
      </div>
      <a href="/product/\${p.id}"><h3 class="font-serif font-semibold text-gray-800 text-sm leading-snug hover:text-[#c9a84c] transition-colors line-clamp-2 mb-2">\${p.name}</h3></a>
      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="font-serif font-bold text-[#c9a84c] text-base">৳\${p.price.toLocaleString()}</span>
          <span class="text-xs text-gray-400 line-through">৳\${p.originalPrice.toLocaleString()}</span>
        </div>
        <button onclick="addToCart('\${p.id}')" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5ede0] hover:bg-[#c9a84c] hover:text-white transition-all text-[#c9a84c] text-xs">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  </article>\`).join('')
  // Update wishlist buttons
  updateWishlistButtons()
}

// ─── SHOP PAGE FILTERS ───
function filterShop() {
  const searchVal = document.getElementById('shop-search')?.value?.toLowerCase() || ''
  const priceMax = parseInt(document.getElementById('price-range')?.value || '5000')
  const inStockOnly = document.getElementById('in-stock-filter')?.checked || false
  const catChecked = document.querySelector('input[name="category"]:checked')?.value || 'all'
  const sortVal = document.querySelector('input[name="sort"]:checked')?.value || 'featured'

  const items = document.querySelectorAll('.product-item')
  let visible = 0
  items.forEach(item => {
    const cat = item.getAttribute('data-category')
    const price = parseInt(item.getAttribute('data-price'))
    const stock = item.getAttribute('data-stock') === 'true'
    const id = item.getAttribute('data-id')
    const prod = findProduct(id)
    const nameMatch = !searchVal || prod?.name.toLowerCase().includes(searchVal) || prod?.tags?.some(t => t.includes(searchVal))
    const catMatch = catChecked === 'all' || cat === catChecked
    const priceMatch = price <= priceMax
    const stockMatch = !inStockOnly || stock
    if (nameMatch && catMatch && priceMatch && stockMatch) {
      item.style.display = 'block'; visible++
    } else {
      item.style.display = 'none'
    }
  })

  const countEl = document.getElementById('showing-count')
  if (countEl) countEl.textContent = visible
  const noResults = document.getElementById('no-results')
  if (noResults) noResults.classList.toggle('hidden', visible > 0)
}

function applyCategoryFilter(cat) {
  window.location.href = '/shop?category=' + cat
}

function applySortFilter(sort) {
  const url = new URL(window.location.href)
  url.searchParams.set('sort', sort)
  window.location.href = url.toString()
}

function updatePriceFilter(val) {
  const label = document.getElementById('price-label')
  if (label) label.textContent = val >= 5000 ? 'Any price' : 'Up to ৳' + parseInt(val).toLocaleString()
  filterShop()
}

function clearFilters() {
  window.location.href = '/shop'
}

function setGridCols(cols) {
  const grid = document.getElementById('shop-product-grid')
  if (!grid) return
  grid.className = grid.className.replace(/grid-cols-\d+/g, '')
  const colMap = {2:'grid-cols-1 sm:grid-cols-2', 3:'grid-cols-1 sm:grid-cols-2 md:grid-cols-3', 4:'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'}
  grid.className = 'grid ' + (colMap[cols] || colMap[3]) + ' gap-4 md:gap-5'
  document.querySelectorAll('[id$="-btn"]').forEach(b => b.className = b.className.replace('bg-[#c9a84c] text-white','bg-white text-gray-500 hover:bg-[#f5ede0]'))
  const activeBtn = document.getElementById('grid' + cols + '-btn')
  if (activeBtn) activeBtn.className = activeBtn.className.replace('bg-white text-gray-500 hover:bg-[#f5ede0]','bg-[#c9a84c] text-white')
}

// ─── PRODUCT PAGE ───
function changeProductImg(src, btn) {
  const main = document.getElementById('main-product-img')
  if (main) main.src = src
  document.querySelectorAll('.thumb-btn').forEach(b => b.className = b.className.replace('border-[#c9a84c]','border-transparent'))
  btn.className = btn.className.replace('border-transparent','border-[#c9a84c]')
}

function changeQty(delta) {
  const input = document.getElementById('qty-input')
  if (!input) return
  const newVal = Math.max(1, Math.min(10, parseInt(input.value) + delta))
  input.value = newVal
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'))
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.className = b.className.replace('border-b-2 border-[#c9a84c] text-[#c9a84c]','text-gray-500 hover:text-gray-700')
  })
  document.getElementById('tab-' + tabId).classList.remove('hidden')
  btn.className = btn.className.replace('text-gray-500 hover:text-gray-700','border-b-2 border-[#c9a84c] text-[#c9a84c]')
}

// ─── WISHLIST BUTTONS UPDATE ───
function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const card = btn.closest('[data-product-id]')
    if (!card) return
    const id = card.getAttribute('data-product-id')
    if (wishlist.includes(id)) {
      btn.classList.add('active')
      const icon = btn.querySelector('i')
      if (icon) icon.className = 'fas fa-heart text-sm text-red-400'
    }
  })
}

// ─── ORDER CONFIRMED ───
function initOrderConfirmed() {
  const orderId = localStorage.getItem('last_order_id') || ('#EM-' + Math.floor(100000 + Math.random() * 900000))
  const el = document.getElementById('order-id')
  if (el) el.textContent = orderId
  localStorage.removeItem('last_order_id')
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI()
  updateWishlistCount()
  updateWishlistButtons()
  updateCartPage()
  updateCheckoutSummary()
  initOrderConfirmed()

  // Fade in animation observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.product-card, .category-card').forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
    observer.observe(el)
  })

  // Show product count on shop page
  const countEl = document.getElementById('showing-count')
  if (countEl) countEl.textContent = document.querySelectorAll('.product-item').length

  // Mark active nav
  const path = window.location.pathname
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path || (path.startsWith('/shop') && link.getAttribute('href') === '/shop')) {
      link.classList.add('active')
    }
  })
})
</script>`
}

export default app
