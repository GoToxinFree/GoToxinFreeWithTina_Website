import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Ensure the admin user exists
  const adminEmail = "drtinapramanik@gmail.com";
  let user = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Dr. Tina Pramanik",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200",
      }
    });
  }

  // Clear existing posts to avoid duplicates during seeding
  await prisma.post.deleteMany({});

  const posts = [
    {
      title: "The Hidden Toxins in Your Daily Routine",
      slug: "hidden-toxins-daily-routine",
      excerpt: "From parabens in your shampoo to synthetic fragrances in your living room, learn practical steps to reduce your daily chemical exposure.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
      published: true,
      authorId: user.id,
      content: `
        <h1>Understanding Daily Chemical Exposure</h1>
        <p>In our modern world, we are surrounded by thousands of synthetic chemicals. While some are harmless, many have been linked to health issues ranging from hormonal disruption to chronic respiratory problems.</p>
        
        <h2>Common Sources of Toxins</h2>
        <ul>
          <li><strong>Personal Care:</strong> Parabens, phthalates, and sulfates found in soaps and shampoos.</li>
          <li><strong>Household Cleaning:</strong> Harsh surfactants and synthetic fragrances that linger in the air.</li>
          <li><strong>Food Packaging:</strong> Bisphenols (BPA/BPS) that can leach into our meals.</li>
        </ul>
        
        <blockquote>"The first step to a toxin-free life is awareness. Once you know what to look for, you can make empowered choices for your health." - Dr. Tina Pramanik</blockquote>
        
        <p>Start by reading labels carefully. Look for terms like "Fragrance-Free" instead of "Unscented," and opt for glass or stainless steel over plastic whenever possible.</p>
      `,
    },
    {
      title: "Why Indoor Dust is a Chemical Soup",
      slug: "indoor-dust-chemical-soup",
      excerpt: "Research shows household dust acts as a magnet for flame retardants and pesticides. Discover simple ways to improve your indoor air quality.",
      imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=1200",
      published: true,
      authorId: user.id,
      content: `
        <h1>The Science of Household Dust</h1>
        <p>Household dust isn't just skin cells and lint. In fact, it is a complex reservoir of chemicals that have shed from furniture, electronics, and even the shoes we wear inside.</p>
        
        <img src="https://images.unsplash.com/photo-1581578731522-390bd0234479?auto=format&fit=crop&q=80&w=800" alt="Microscopic view of dust" />
        
        <h2>What's Hiding in Your Dust?</h2>
        <ol>
          <li><strong>Flame Retardants (PBDEs):</strong> Used in older foam furniture and electronics.</li>
          <li><strong>Phthalates:</strong> Shed from PVC flooring and plastic toys.</li>
          <li><strong>Heavy Metals:</strong> Lead and arsenic tracked in from outside soil.</li>
        </ol>
        
        <p>To reduce your exposure, use a vacuum with a HEPA filter and damp-mop hard surfaces regularly. Removing shoes at the door can reduce lead levels in dust by up to 60%.</p>
      `,
    },
    {
      title: "Ditching PFAS: Safest Cookware for Your Family",
      slug: "safest-cookware-pfas-free",
      excerpt: "Non-stick pans often contain 'forever chemicals'. We review the latest studies and safest alternatives like cast iron and stainless steel.",
      imageUrl: "https://images.unsplash.com/photo-1584820927498-cafe2c1c7669?auto=format&fit=crop&q=80&w=1200",
      published: true,
      authorId: user.id,
      content: `
        <h1>The PFAS Problem in Our Kitchens</h1>
        <p>Per- and polyfluoroalkyl substances (PFAS) are a group of man-made chemicals that include PFOA, PFOS, and GenX. They are used in non-stick coatings because they resist heat, oil, and water.</p>
        
        <div data-youtube-video>
          <iframe src="https://www.youtube.com/embed/9W74aeuqsiU"></iframe>
        </div>
        
        <h2>Top 3 Safe Alternatives</h2>
        <ul>
          <li><strong>Cast Iron:</strong> Naturally non-stick when seasoned and lasts a lifetime.</li>
          <li><strong>Stainless Steel:</strong> The professional choice—durable and non-reactive.</li>
          <li><strong>100% Ceramic:</strong> (Note: Not ceramic-coated) Truly inert and heat resistant.</li>
        </ul>
        
        <p>Making the switch doesn't have to be expensive. Start by replacing your most-used pan and gradually move away from non-stick coatings as they become scratched or worn.</p>
      `,
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
