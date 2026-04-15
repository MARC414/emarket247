import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './dist' }))
app.use('/favicon.svg', serveStatic({ root: './dist', path: '/favicon.svg' }))

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

// Route: Search
app.get('/search', (c) => {
  const query = c.req.query('q') || ''
  return c.html(searchPage(query))
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
            <span class="text-sm text-[#b8a84c] w-4"></i>
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

    <!-- Info -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <div class="star-rating text-sm flex gap-0.5">
          ${Array.from({length: 5}, (_, i) => `<i class="${i < Math.floor(p.rating) ? 'fas' : 'far'} fa-star"></i>`).join('')}
        </div>
        <span class="text-sm text-gray-400">(${p.reviews} reviews)</span>
        ${p.badge ? `<span class="badge-${p.badge === 'New Arrival' || p.badge === 'Trending' ? 'new' : 'gold'} px-3 py-1 text-xs">${p.badge}</span>` : ''}
      </div>

      <h1 class="font-serif font-bold text-3xl text-gray-800 mb-3">${p.name}</h1>

      <div class="flex items-baseline gap-3 mb-4">
        <span class="font-serif font-bold text-3xl text-[#c9a84c]">৳${p.price.toLocaleString()}</span>
        <span class="text-lg text-gray-400 line-through">৳${p.originalPrice.toLocaleString()}</span>
        ${discount >= 30 ? `<span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold">-${discount}%</span>` : ''}
      </div>

      <div class="flex items-center gap-4 mb-6 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <i class="fas fa-shield-alt text-[#c9a84c]"></i>
          <span>100% Authentic</span>
        </div>
        <div class="flex items-center gap-1">
          <i class="fas fa-truck text-[#c9a84c]"></i>
          <span>Free Delivery</span>
        </div>
        <div class="flex items-center gap-1">
          <i class="fas fa-undo text-[#c9a84c]"></i>
          <span>7-Day Returns</span>
        </div>
      </div>

      <p class="text-gray-600 leading-relaxed mb-6">${p.description}</p>

      <!-- Product details -->
      <div class="bg-[#fdf8f0] rounded-2xl p-5 mb-6">
        <h3 class="font-serif font-semibold text-lg text-gray-800 mb-4">Product Details</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-500">Material:</span>
            <span class="font-medium text-gray-800 ml-2">${p.material}</span>
          </div>
          <div>
            <span class="text-gray-500">Weight:</span>
            <span class="font-medium text-gray-800 ml-2">${p.weight}</span>
          </div>
          <div>
            <span class="text-gray-500">Occasion:</span>
            <span class="font-medium text-gray-800 ml-2">${p.occasion}</span>
          </div>
          <div>
            <span class="text-gray-500">Category:</span>
            <span class="font-medium text-gray-800 ml-2">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
          </div>
        </div>
      </div>

      <!-- Quantity and Add to Cart -->
      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center border border-[#e8dcc8] rounded-xl overflow-hidden">
          <button onclick="updateQuantity(-1)" class="qty-btn" aria-label="Decrease quantity">
            <i class="fas fa-minus"></i>
          </button>
          <span id="quantity" class="px-4 py-2 text-center min-w-[50px] font-medium">1</span>
          <button onclick="updateQuantity(1)" class="qty-btn" aria-label="Increase quantity">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <button onclick="addToCart('${p.id}')" class="flex-1 btn-gold py-4 rounded-xl text-white font-medium text-sm tracking-wide">
          <i class="fas fa-shopping-bag mr-2"></i>Add to Cart - ৳${p.price.toLocaleString()}
        </button>
      </div>

      <!-- Wishlist -->
      <button onclick="toggleWishlist('${p.id}', this)" class="flex items-center gap-2 text-gray-600 hover:text-[#c9a84c] transition-colors mb-6" aria-label="Add to wishlist">
        <i class="far fa-heart text-lg"></i>
        <span>Add to Wishlist</span>
      </button>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        ${p.tags.map(tag => `<span class="bg-[#f5ede0] text-[#c9a84c] text-xs px-3 py-1 rounded-full font-medium">#${tag}</span>`).join('')}
      </div>
    </div>
  </div>

  <!-- Related Products -->
  <section class="mt-16 pt-12 border-t border-[#f0e8d8]">
    <h2 class="font-serif text-2xl font-semibold text-gray-800 mb-8">You Might Also Like</h2>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      ${related.map(p => productCard(p)).join('')}
    </div>
  </section>
</div>
`
  )
}

// ─────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────

function cartPage() {
  return baseHTML(
    'Shopping Cart | Emarket247 Fine Jewellery',
    'Review your shopping cart and proceed to checkout. Free delivery across Bangladesh on orders above ৳1500.',
    `
<!-- CART HERO -->
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-10 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="breadcrumb mb-4 flex items-center" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      <span class="text-gray-700 font-medium text-sm">Shopping Cart</span>
    </nav>
    <h1 class="font-serif font-bold text-4xl text-gray-800">Shopping Cart</h1>
    <p class="text-sm text-gray-500 mt-1">Review your items and proceed to checkout</p>
  </div>
</section>

<!-- CART CONTENT -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
  <div class="grid lg:grid-cols-3 gap-8">

    <!-- Cart Items -->
    <div class="lg:col-span-2">
      <div id="cart-items-full" class="space-y-4">
        <!-- populated by JS -->
        <div id="cart-empty-full" class="text-center py-20">
          <div class="w-20 h-20 rounded-full bg-[#f5ede0] flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-shopping-bag text-4xl text-[#c9a84c]"></i>
          </div>
          <h2 class="font-serif text-2xl text-gray-800 mb-2">Your cart is empty</h2>
          <p class="text-gray-500 mb-8">Discover our beautiful jewelry collection</p>
          <a href="/shop" class="btn-gold px-8 py-3 rounded-full text-white font-medium inline-flex items-center gap-2">
            <i class="fas fa-gem"></i> Start Shopping
          </a>
        </div>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="lg:col-span-1">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e8d8] sticky top-6">
        <h2 class="font-serif font-semibold text-xl text-gray-800 mb-6">Order Summary</h2>

        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span id="cart-subtotal-full">৳0</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span class="text-green-600" id="cart-delivery-full">Free</span>
          </div>
          <div class="border-t border-[#f0e8d8] pt-3 flex justify-between font-semibold text-base">
            <span class="font-serif">Total</span>
            <span id="cart-total-full" class="gold-text font-bold">৳0</span>
          </div>
        </div>

        <a href="/checkout" class="btn-gold w-full py-4 rounded-xl text-white font-medium text-center block text-sm tracking-wide mb-4">
          Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
        </a>

        <a href="/shop" class="text-center block text-sm text-[#c9a84c] hover:text-[#9a7c2e] font-medium">
          Continue Shopping
        </a>
      </div>
    </div>
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
    'Complete your purchase securely. Free delivery across Bangladesh on orders above ৳1500.',
    `
<!-- CHECKOUT HERO -->
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-10 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <nav class="breadcrumb mb-4 flex items-center" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      <a href="/cart">Cart</a>
      <span>/</span>
      <span class="text-gray-700 font-medium text-sm">Checkout</span>
    </nav>
    <h1 class="font-serif font-bold text-4xl text-gray-800">Checkout</h1>
    <p class="text-sm text-gray-500 mt-1">Complete your purchase securely</p>
  </div>
</section>

<!-- CHECKOUT STEPPER -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
  <div class="flex items-center justify-center mb-12">
    <div class="flex items-center">
      <div class="step-dot active">
        <i class="fas fa-shopping-bag"></i>
      </div>
      <div class="step-line active"></div>
      <div class="step-dot active">
        <i class="fas fa-credit-card"></i>
      </div>
      <div class="step-line"></div>
      <div class="step-dot inactive">
        <i class="fas fa-check"></i>
      </div>
    </div>
  </div>
</div>

<!-- CHECKOUT FORM -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
  <form id="checkout-form" onsubmit="handleCheckout(event)" class="grid lg:grid-cols-2 gap-12">

    <!-- Billing Details -->
    <div>
      <h2 class="font-serif font-semibold text-2xl text-gray-800 mb-6">Billing Details</h2>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">First Name *</label>
            <input type="text" name="firstName" required class="form-input" placeholder="John">
          </div>
          <div>
            <label class="form-label">Last Name *</label>
            <input type="text" name="lastName" required class="form-input" placeholder="Doe">
          </div>
        </div>

        <div>
          <label class="form-label">Email Address *</label>
          <input type="email" name="email" required class="form-input" placeholder="john@example.com">
        </div>

        <div>
          <label class="form-label">Phone Number *</label>
          <input type="tel" name="phone" required class="form-input" placeholder="+880 1XX XXX XXXX">
        </div>

        <div>
          <label class="form-label">Address *</label>
          <input type="text" name="address" required class="form-input" placeholder="Street address">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">City *</label>
            <input type="text" name="city" required class="form-input" placeholder="Dhaka">
          </div>
          <div>
            <label class="form-label">Postcode *</label>
            <input type="text" name="postcode" required class="form-input" placeholder="1200">
          </div>
        </div>

        <div>
          <label class="form-label">Order Notes (Optional)</label>
          <textarea name="notes" rows="3" class="form-input" placeholder="Special delivery instructions..."></textarea>
        </div>
      </div>
    </div>

    <!-- Order Summary & Payment -->
    <div>
      <h2 class="font-serif font-semibold text-2xl text-gray-800 mb-6">Your Order</h2>

      <!-- Order Items -->
      <div class="bg-[#fdf8f0] rounded-2xl p-6 mb-6">
        <div id="checkout-items" class="space-y-4 mb-4">
          <!-- populated by JS -->
        </div>
        <div class="border-t border-[#f0e8d8] pt-4 space-y-2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span id="checkout-subtotal">৳0</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span class="text-green-600" id="checkout-delivery">Free</span>
          </div>
          <div class="flex justify-between font-semibold text-base">
            <span class="font-serif">Total</span>
            <span id="checkout-total" class="gold-text font-bold">৳0</span>
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#f0e8d8]">
        <h3 class="font-serif font-semibold text-lg text-gray-800 mb-4">Payment Method</h3>

        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="payment" value="cod" checked class="accent-[#c9a84c]">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">Cash on Delivery</span>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free</span>
            </div>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="payment" value="bkash" class="accent-[#c9a84c]">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">bKash</span>
              <span class="payment-icon"><img src="https://i.imgur.com/4Q4Q4Q4.png" alt="bKash" class="w-6 h-4"></span>
            </div>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="payment" value="nagad" class="accent-[#c9a84c]">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">Nagad</span>
              <span class="payment-icon"><img src="https://i.imgur.com/4Q4Q4Q4.png" alt="Nagad" class="w-6 h-4"></span>
            </div>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="payment" value="rocket" class="accent-[#c9a84c]">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">Rocket</span>
              <span class="payment-icon"><img src="https://i.imgur.com/4Q4Q4Q4.png" alt="Rocket" class="w-6 h-4"></span>
            </div>
          </label>

          <label class="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="payment" value="card" class="accent-[#c9a84c]">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">Credit/Debit Card</span>
              <div class="flex gap-1">
                <span class="payment-icon"><img src="https://i.imgur.com/4Q4Q4Q4.png" alt="Visa" class="w-6 h-4"></span>
                <span class="payment-icon"><img src="https://i.imgur.com/4Q4Q4Q4.png" alt="MasterCard" class="w-6 h-4"></span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Place Order -->
      <button type="submit" class="btn-gold w-full py-4 rounded-xl text-white font-medium text-sm tracking-wide">
        <i class="fas fa-lock mr-2"></i>Place Order Securely
      </button>

      <p class="text-xs text-gray-500 text-center mt-4">
        Your personal data will be used to process your order and support your experience throughout this website.
      </p>
    </div>
  </form>
</div>
`
  )
}

// ─────────────────────────────────────────────
// ORDER CONFIRMED PAGE
// ─────────────────────────────────────────────

function orderConfirmedPage() {
  return baseHTML(
    'Order Confirmed | Emarket247 Fine Jewellery',
    'Thank you for your order! Your jewelry will be delivered soon. Free delivery across Bangladesh.',
    `
<!-- CONFIRMATION HERO -->
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-16 border-b border-[#f0e8d8]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <div class="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
      <i class="fas fa-check text-2xl text-white"></i>
    </div>
    <h1 class="font-serif font-bold text-4xl text-gray-800 mb-2">Order Confirmed!</h1>
    <p class="text-lg text-gray-600">Thank you for shopping with Emarket247</p>
  </div>
</section>

<!-- ORDER DETAILS -->
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-[#f0e8d8]">

    <!-- Order Info -->
    <div class="text-center mb-8">
      <p class="text-sm text-gray-500 mb-2">Order Number</p>
      <p class="font-serif font-bold text-2xl text-[#c9a84c]" id="order-number">#EMK-2024-XXXX</p>
    </div>

    <!-- Order Summary -->
    <div class="border-t border-b border-[#f0e8d8] py-6 mb-6">
      <h3 class="font-serif font-semibold text-lg text-gray-800 mb-4">Order Summary</h3>
      <div id="order-items" class="space-y-3">
        <!-- populated by JS -->
      </div>
      <div class="flex justify-between font-semibold text-base mt-4 pt-4 border-t border-[#f0e8d8]">
        <span class="font-serif">Total</span>
        <span id="order-total" class="gold-text font-bold">৳0</span>
      </div>
    </div>

    <!-- Shipping Info -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <h4 class="font-serif font-semibold text-base text-gray-800 mb-3">Shipping Address</h4>
        <div id="shipping-address" class="text-sm text-gray-600">
          <!-- populated by JS -->
        </div>
      </div>
      <div>
        <h4 class="font-serif font-semibold text-base text-gray-800 mb-3">Payment Method</h4>
        <div id="payment-method" class="text-sm text-gray-600">
          <!-- populated by JS -->
        </div>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="bg-[#fdf8f0] rounded-xl p-6">
      <h4 class="font-serif font-semibold text-lg text-gray-800 mb-4">What's Next?</h4>
      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-white text-xs font-bold">1</span>
          </div>
          <div>
            <p class="font-medium text-gray-800">Order Processing</p>
            <p class="text-sm text-gray-600">We'll prepare your jewelry with care</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-white text-xs font-bold">2</span>
          </div>
          <div>
            <p class="font-medium text-gray-800">Quality Check</p>
            <p class="text-sm text-gray-600">Final inspection before shipping</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-white text-xs font-bold">3</span>
          </div>
          <div>
            <p class="font-medium text-gray-800">Free Delivery</p>
            <p class="text-sm text-gray-600">Your order will be delivered within 3-5 business days</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 mt-8">
      <a href="/shop" class="btn-gold px-8 py-3 rounded-full text-white font-medium text-sm text-center">
        Continue Shopping
      </a>
      <a href="https://www.facebook.com/Emarket247bd" target="_blank" class="btn-outline-gold px-8 py-3 rounded-full text-sm font-medium text-center">
        Follow Us on Facebook
      </a>
    </div>
  </div>
</div>
`
  )
}

// ─────────────────────────────────────────────
// SEARCH PAGE
// ─────────────────────────────────────────────

function searchPage(query) {
  return baseHTML(
    `Search Results for "${query}" | Emarket247 Fine Jewellery`,
    `Find the perfect jewelry piece. Search results for "${query}". Free delivery across Bangladesh.`,
    `
<!-- SEARCH HERO -->
<section class="bg-gradient-to-r from-[#fdf0e0] to-[#fff8ee] py-10 border-b border-[#f0e8d8]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <h1 class="font-serif font-bold text-4xl text-gray-800">Search Results</h1>
    <p class="text-sm text-gray-500 mt-1">Showing results for "${query}"</p>
  </div>
</section>

<!-- SEARCH FORM -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
  <div class="max-w-2xl mx-auto">
    <form onsubmit="performSearch(event)" class="flex gap-3">
      <input type="text" id="search-input" value="${query}" placeholder="Search for jewelry..." class="flex-1 px-4 py-3 rounded-xl border border-[#f0e8d8] focus:outline-none focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent">
      <button type="submit" class="btn-gold px-8 py-3 rounded-xl text-white font-medium">
        <i class="fas fa-search mr-2"></i>Search
      </button>
    </form>
  </div>
</div>

<!-- SEARCH RESULTS -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
  <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- populated by JS -->
  </div>
  <div id="no-results" class="text-center py-20 hidden">
    <div class="w-20 h-20 rounded-full bg-[#f5ede0] flex items-center justify-center mx-auto mb-6">
      <i class="fas fa-search text-4xl text-[#c9a84c]"></i>
    </div>
    <h2 class="font-serif text-2xl text-gray-800 mb-2">No results found</h2>
    <p class="text-gray-500 mb-8">Try different keywords or browse our collections</p>
    <a href="/shop" class="btn-gold px-8 py-3 rounded-full text-white font-medium inline-flex items-center gap-2">
      <i class="fas fa-gem"></i> Browse All Products
    </a>
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
    'About Us | Emarket247 Fine Jewellery',
    'Learn about Emarket247 - your trusted destination for authentic gold-plated jewelry in Bangladesh. Free delivery on orders above ৳1500.',
    `
<!-- ABOUT HERO -->
<section class="hero-bg hero-pattern relative overflow-hidden min-h-[60vh] flex items-center" aria-label="About Hero">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
    <div class="max-w-3xl">
      <div class="section-tag mb-5 inline-flex items-center gap-2">
        <i class="fas fa-sparkles text-[#c9a84c] text-xs"></i>
        Our Story
      </div>
      <h1 class="hero-title font-serif font-light leading-tight mb-4" style="font-size:3.2rem; color:#1a1408">
        Crafting <span class="font-bold italic shimmer-text">Elegance</span> Since 2024
      </h1>
      <p class="text-base text-gray-600 leading-relaxed mb-8 max-w-xl font-sans">
        Emarket247 is Bangladesh's premier destination for exquisite gold-plated jewelry. We combine traditional craftsmanship with modern design to bring you pieces that tell your unique story.
      </p>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      ${[
        {num:'10K+', label:'Happy Customers'},
        {num:'500+', label:'Products'},
        {num:'4.9', label:'Average Rating'},
        {num:'24/7', label:'Customer Support'},
      ].map(s => `
      <div class="text-center">
        <div class="font-serif font-bold text-3xl text-[#c9a84c] mb-2">${s.num}</div>
        <div class="text-sm text-gray-600 font-medium">${s.label}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- OUR VALUES -->
<section class="py-20 bg-[#fdf8f0]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <div class="section-tag mb-3">Our Values</div>
      <h2 class="font-serif text-4xl font-light text-gray-800">What Makes Us <span class="shimmer-text font-semibold">Special</span></h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${[
        {icon:'fas fa-gem', title:'Authentic Craftsmanship', desc:'Every piece is handcrafted by skilled artisans using traditional techniques passed down through generations.'},
        {icon:'fas fa-heart', title:'Customer First', desc:'Your satisfaction is our priority. We offer free delivery, easy returns, and personalized customer support.'},
        {icon:'fas fa-leaf', title:'Sustainable Luxury', desc:'We source materials responsibly and ensure our packaging is eco-friendly, making luxury accessible to all.'},
      ].map(v => `
      <div class="text-center bg-white rounded-2xl p-8 shadow-sm border border-[#f0e8d8]">
        <div class="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-md">
          <i class="${v.icon} text-white text-xl"></i>
        </div>
        <h3 class="font-serif font-semibold text-xl text-gray-800 mb-4">${v.title}</h3>
        <p class="text-gray-600 leading-relaxed">${v.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <div class="section-tag mb-3">Meet the Team</div>
      <h2 class="font-serif text-4xl font-light text-gray-800">The People Behind <span class="shimmer-text font-semibold">Emarket247</span></h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${[
        {name:'Sarah Rahman', role:'Founder & CEO', img:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80', desc:'With over 15 years in the jewelry industry, Sarah brings expertise in authentic craftsmanship and customer service.'},
        {name:'Ahmed Khan', role:'Head of Design', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', desc:'Ahmed combines traditional Bangladeshi motifs with contemporary design to create unique, wearable art.'},
        {name:'Priya Das', role:'Customer Experience', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', desc:'Priya ensures every customer has a delightful shopping experience from browsing to delivery.'},
      ].map(t => `
      <div class="text-center">
        <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
          <img src="${t.img}" alt="${t.name}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <h3 class="font-serif font-semibold text-xl text-gray-800 mb-1">${t.name}</h3>
        <p class="text-[#c9a84c] font-medium mb-3">${t.role}</p>
        <p class="text-gray-600 text-sm leading-relaxed">${t.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 bg-[#1a1408]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <h2 class="font-serif text-3xl font-light text-white mb-4">Ready to Find Your <span class="shimmer-text font-semibold">Perfect Piece</span>?</h2>
    <p class="text-[#e8d5a3] text-lg mb-8">Browse our collection and discover jewelry that speaks to your soul</p>
    <a href="/shop" class="btn-gold px-10 py-4 rounded-full text-white font-medium text-sm inline-flex items-center gap-2">
      <i class="fas fa-gem"></i> Shop Now
    </a>
  </div>
</section>
`
  )
}

// ─────────────────────────────────────────────
// SCRIPTS
// ─────────────────────────────────────────────

function scripts() {
  return `
<script>
// Product data available to client-side code
const products = ${JSON.stringify(products)}

// Global cart data
let cart = JSON.parse(localStorage.getItem('emarket247-cart') || '[]')
let wishlist = JSON.parse(localStorage.getItem('emarket247-wishlist') || '[]')

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount()
  updateWishlistCount()

  // Navbar scroll effect
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // Load page-specific functionality
  if (window.location.pathname === '/shop') {
    loadShopPage()
  } else if (window.location.pathname.startsWith('/product/')) {
    loadProductPage()
  } else if (window.location.pathname === '/cart') {
    loadCartPage()
  } else if (window.location.pathname === '/checkout') {
    loadCheckoutPage()
  } else if (window.location.pathname === '/order-confirmed') {
    loadOrderConfirmedPage()
  } else if (window.location.pathname === '/search') {
    loadSearchPage()
  }
})

// Cart functions
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId)
  if (!product) {
    console.warn('Product not found for addToCart:', productId)
    return
  }

  const existing = cart.find(item => item.id === productId)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ ...product, quantity })
  }

  saveCart()
  updateCartCount()
  showToast('Added to cart!', 'success')
  updateCartSidebar()
  if (window.location.pathname === '/cart') {
    loadCartPage()
  }
  if (window.location.pathname === '/checkout') {
    loadCheckoutPage()
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId)
  saveCart()
  updateCartCount()
  showToast('Removed from cart', 'info')
  updateCartSidebar()
  if (window.location.pathname === '/cart') {
    loadCartPage()
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountEl = document.getElementById('cart-count')
  if (cartCountEl) {
    cartCountEl.textContent = count
  }
}

function updateWishlistCount() {
  const wishlistCountEl = document.getElementById('wishlist-count')
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length
    wishlistCountEl.style.display = wishlist.length > 0 ? 'flex' : 'none'
  }
}

function toggleWishlist(productId, btn) {
  const index = wishlist.indexOf(productId)
  if (index > -1) {
    wishlist.splice(index, 1)
    btn.querySelector('i').className = 'far fa-heart text-sm text-gray-400'
    btn.classList.remove('active')
    showToast('Removed from wishlist', 'info')
  } else {
    wishlist.push(productId)
    btn.querySelector('i').className = 'fas fa-heart text-sm text-red-500'
    btn.classList.add('active')
    showToast('Added to wishlist!', 'success')
  }
  localStorage.setItem('emarket247-wishlist', JSON.stringify(wishlist))
  updateWishlistCount()
}

function saveCart() {
  localStorage.setItem('emarket247-cart', JSON.stringify(cart))
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container')
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.innerHTML = \`
    <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} text-lg text-[#c9a84c]"></i>
    <span>\${message}</span>
  \`
  container.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// Search functions
function toggleSearch() {
  const bar = document.getElementById('search-bar-container')
  bar.classList.toggle('hidden')
  if (!bar.classList.contains('hidden')) {
    document.getElementById('main-search').focus()
  }
}

function handleSearch(event) {
  if (event.key === 'Enter') {
    const query = event.target.value.toLowerCase()
    window.location = '/shop?search=' + encodeURIComponent(query)
  }
}

// Mobile menu
function toggleMobileMenu() {
  document.getElementById('mobile-overlay').classList.toggle('hidden')
  document.getElementById('mobile-menu').classList.toggle('open')
}

// Cart sidebar
function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('hidden')
  document.getElementById('cart-sidebar').classList.toggle('translate-x-full')
  updateCartSidebar()
}

function updateCartSidebar() {
  const itemsList = document.getElementById('cart-items-list')
  const footer = document.getElementById('cart-footer')
  const empty = document.getElementById('cart-empty')

  if (!itemsList || !footer || !empty) {
    return
  }

  if (cart.length === 0) {
    itemsList.innerHTML = ''
    footer.classList.add('hidden')
    empty.classList.remove('hidden')
    return
  }

  empty.classList.add('hidden')
  footer.classList.remove('hidden')

  itemsList.innerHTML = cart.map(item => \`
    <div class="flex gap-4 p-4 bg-white rounded-xl border border-[#f0e8d8]">
      <img src="\${item.image}" alt="\${item.name}" class="w-16 h-16 object-cover rounded-lg">
      <div class="flex-1">
        <h4 class="font-medium text-gray-800 text-sm line-clamp-2">\${item.name}</h4>
        <p class="text-[#c9a84c] font-semibold text-sm">৳\${item.price.toLocaleString()}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center gap-2">
            <button onclick="updateCartQuantity('\${item.id}', -1)" class="w-6 h-6 flex items-center justify-center rounded bg-[#f5ede0] text-xs">-</button>
            <span class="text-sm">\${item.quantity}</span>
            <button onclick="updateCartQuantity('\${item.id}', 1)" class="w-6 h-6 flex items-center justify-center rounded bg-[#f5ede0] text-xs">+</button>
          </div>
          <button onclick="removeFromCart('\${item.id}')" class="text-red-500 text-xs hover:text-red-700">Remove</button>
        </div>
      </div>
    </div>
  \`).join('')

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = subtotal >= 1500 ? 0 : 100
  const total = subtotal + delivery

  document.getElementById('cart-item-count').textContent = cart.length
  document.getElementById('cart-subtotal').textContent = '৳' + subtotal.toLocaleString()
  document.getElementById('cart-delivery').textContent = delivery === 0 ? 'Free' : '৳' + delivery
  document.getElementById('cart-total').textContent = '৳' + total.toLocaleString()
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      saveCart()
      updateCartSidebar()
      if (window.location.pathname === '/cart') {
        loadCartPage()
      }
    }
  }
}

// Shop page functions
function loadShopPage() {
  // Implement shop filtering, sorting, etc.
}

function loadProductPage() {
  // Implement product page functionality
}

function loadCartPage() {
  const itemsContainer = document.getElementById('cart-items-full')
  const emptyContainer = document.getElementById('cart-empty-full')
  const subtotalEl = document.getElementById('cart-subtotal-full')
  const deliveryEl = document.getElementById('cart-delivery-full')
  const totalEl = document.getElementById('cart-total-full')

  if (cart.length === 0) {
    itemsContainer.innerHTML = ''
    emptyContainer.classList.remove('hidden')
    subtotalEl.textContent = '৳0'
    deliveryEl.textContent = 'Free'
    totalEl.textContent = '৳0'
    return
  }

  emptyContainer.classList.add('hidden')

  itemsContainer.innerHTML = cart.map(item => `
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e8d8] flex gap-6 items-start">
      <a href="/product/${item.id}">
        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl flex-shrink-0 hover:opacity-90 transition-opacity">
      </a>
      <div class="flex-1 min-w-0">
        <a href="/product/${item.id}" class="font-serif font-semibold text-gray-800 hover:text-[#c9a84c] transition-colors text-lg leading-snug block mb-2">${item.name}</a>
        <p class="text-sm text-gray-500 mb-3">${item.material}</p>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-3 bg-[#f5ede0] rounded-xl p-2">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-[#c9a84c] hover:text-white transition-all text-sm font-medium" aria-label="Decrease">−</button>
            <span class="text-sm font-semibold w-8 text-center">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-[#c9a84c] hover:text-white transition-all text-sm font-medium" aria-label="Increase">+</button>
          </div>
          <div class="flex flex-col">
            <span class="font-serif font-bold text-[#c9a84c] text-xl">৳${(item.price * item.quantity).toLocaleString()}</span>
            ${item.price < item.originalPrice ? '<span class="text-sm text-gray-400 line-through">৳' + (item.originalPrice * item.quantity).toLocaleString() + '</span>' : ''}
          </div>
        </div>
      </div>
      <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500 transition-colors p-2" aria-label="Remove">
        <i class="fas fa-trash-alt text-sm"></i>
      </button>
    </div>
  `).join('')

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = subtotal >= 1500 ? 0 : 100
  const total = subtotal + delivery

  subtotalEl.textContent = '৳' + subtotal.toLocaleString()
  deliveryEl.textContent = delivery === 0 ? 'Free' : '৳' + delivery
  totalEl.textContent = '৳' + total.toLocaleString()
}

function loadCheckoutPage() {
  const itemsContainer = document.getElementById('checkout-items')
  const subtotalEl = document.getElementById('checkout-subtotal')
  const deliveryEl = document.getElementById('checkout-delivery')
  const totalEl = document.getElementById('checkout-total')

  if (cart.length === 0) {
    window.location = '/cart'
    return
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="flex gap-4 items-center">
      <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg">
      <div class="flex-1">
        <h4 class="font-medium text-gray-800 text-sm">${item.name}</h4>
        <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
      </div>
      <span class="font-semibold text-[#c9a84c]">৳${(item.price * item.quantity).toLocaleString()}</span>
    </div>
  `).join('')

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = subtotal >= 1500 ? 0 : 100
  const total = subtotal + delivery

  subtotalEl.textContent = '৳' + subtotal.toLocaleString()
  deliveryEl.textContent = delivery === 0 ? 'Free' : '৳' + delivery
  totalEl.textContent = '৳' + total.toLocaleString()
}

function handleCheckout(event) {
  event.preventDefault()
  // Implement checkout logic
  window.location = '/order-confirmed'
}
function filterProducts(category, btn) {
  // Implement filtering
}

function applyCategoryFilter(category) {
  window.location = '/shop?category=' + category
}

function applySortFilter(sort) {
  const url = new URL(window.location)
  url.searchParams.set('sort', sort)
  window.location = url.toString()
}

function clearFilters() {
  window.location = '/shop'
}

function setGridCols(cols) {
  // Implement grid toggle
}

function changeProductImg(src, btn) {
  document.getElementById('main-product-img').src = src
  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('border-[#c9a84c]'))
  btn.classList.add('border-[#c9a84c]')
}

function updateQuantity(change) {
  const qty = document.getElementById('quantity')
  let current = parseInt(qty.textContent)
  current += change
  if (current < 1) current = 1
  qty.textContent = current
}

function handleCheckout(event) {
  event.preventDefault()
  // Implement checkout logic
  window.location = '/order-confirmed'
}

function loadSearchPage() {
  const query = new URLSearchParams(window.location.search).get('q') || ''
  if (query) {
    performSearchLogic(query)
  }
}

function performSearch(event) {
  if (event) event.preventDefault()
  const query = document.getElementById('search-input').value.trim()
  if (query) {
    window.location = '/search?q=' + encodeURIComponent(query)
  }
}

function performSearchLogic(query) {
  const results = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )
  
  const resultsContainer = document.getElementById('search-results')
  const noResults = document.getElementById('no-results')
  
  if (results.length === 0) {
    resultsContainer.innerHTML = ''
    noResults.classList.remove('hidden')
    return
  }
  
  noResults.classList.add('hidden')
  resultsContainer.innerHTML = results.map(product => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0e8d8] hover:shadow-md transition-shadow">
      <div class="relative">
        <a href="/product/${product.id}">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300">
        </a>
        ${product.badge ? `<span class="absolute top-3 left-3 bg-[#c9a84c] text-white text-xs px-2 py-1 rounded-full font-medium">${product.badge}</span>` : ''}
        <button onclick="toggleWishlist('${product.id}', this)" class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#c9a84c] hover:text-white transition-all" aria-label="Add to wishlist">
          <i class="far fa-heart text-sm text-gray-400"></i>
        </button>
      </div>
      <div class="p-4">
        <a href="/product/${product.id}" class="block">
          <h3 class="font-serif font-semibold text-gray-800 text-sm mb-1 line-clamp-2 hover:text-[#c9a84c] transition-colors">${product.name}</h3>
          <p class="text-xs text-gray-500 mb-2">${product.material}</p>
          <div class="flex items-center gap-2 mb-3">
            <div class="flex text-yellow-400">
              ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span class="text-xs text-gray-500">(${product.reviews})</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-serif font-bold text-[#c9a84c] text-lg">৳${product.price.toLocaleString()}</span>
            ${product.price < product.originalPrice ? `<span class="text-sm text-gray-400 line-through">৳${product.originalPrice.toLocaleString()}</span>` : ''}
          </div>
        </a>
        <button onclick="event.preventDefault(); addToCart('${product.id}')" class="w-full btn-gold py-2.5 rounded-xl text-white text-sm font-medium tracking-wide mt-3">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('')
}
`
}

export default app