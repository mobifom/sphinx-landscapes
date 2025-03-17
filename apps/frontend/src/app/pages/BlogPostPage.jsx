// apps/frontend/src/app/pages/BlogPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock, FaTags, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaArrowLeft } from 'react-icons/fa';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common';
import { BlogSidebar } from '../components/blog/BlogSidebar';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock blog posts data (would normally come from an API)
  const mockPosts = [
    {
      id: 1,
      title: '10 Low-Maintenance Plants for Your Garden',
      slug: 'low-maintenance-plants',
      excerpt: 'Discover beautiful plants that thrive with minimal care, perfect for busy homeowners who want an attractive garden without the constant upkeep.',
      content: `
        <p>For many homeowners, the dream of a beautiful garden is often dampened by the reality of time constraints and maintenance concerns. The good news is that with the right plant selection, you can create a stunning landscape that thrives with minimal care.</p>

        <h2>Why Choose Low-Maintenance Plants?</h2>
        <p>Low-maintenance plants are ideal for busy homeowners, vacation properties, or anyone who wants to enjoy a beautiful garden without constant upkeep. These resilient plants typically require:</p>
        <ul>
          <li>Less frequent watering once established</li>
          <li>Minimal pruning and deadheading</li>
          <li>Fewer fertilizer applications</li>
          <li>Greater resistance to pests and diseases</li>
        </ul>

        <h2>Our Top 10 Low-Maintenance Plant Recommendations</h2>

        <h3>1. Sedum (Stonecrop)</h3>
        <p>These succulent perennials come in a variety of shapes, sizes, and colors. Their thick, water-storing leaves make them extremely drought-tolerant, and they thrive in poor soil conditions. Sedums attract pollinators and provide winter interest in the garden.</p>

        <h3>2. Ornamental Grasses</h3>
        <p>Varieties like Feather Reed Grass, Fountain Grass, and Blue Fescue add movement, texture, and year-round interest to the landscape. Most require only annual trimming in late winter before new growth appears.</p>

        <h3>3. Russian Sage</h3>
        <p>This silver-leaved perennial produces lavender-blue flower spikes from mid-summer through fall. Once established, it's extremely drought-tolerant and deer-resistant. Its aromatic foliage helps deter many common garden pests.</p>

        <h3>4. Black-Eyed Susan</h3>
        <p>These cheerful native wildflowers produce golden-yellow blooms from mid-summer until frost. They naturalize easily, are attractive to pollinators, and require minimal care beyond occasional deadheading to extend the bloom period.</p>

        <h3>5. Coneflower (Echinacea)</h3>
        <p>Another native prairie plant, coneflowers are available in a rainbow of colors beyond the traditional purple. They're drought-tolerant once established and provide winter interest with their distinctive seed heads.</p>

        <h3>6. Daylily</h3>
        <p>These adaptable perennials thrive in a wide range of conditions and bloom prolifically with little care. Modern reblooming varieties offer extended color throughout the growing season.</p>

        <h3>7. Boxwood</h3>
        <p>For structure and year-round interest, boxwoods are hard to beat. These evergreen shrubs require only occasional shearing to maintain their shape and provide a classic backdrop for flowering plants.</p>

        <h3>8. Hydrangea</h3>
        <p>Newer varieties like 'Annabelle' and the Endless Summer® series offer spectacular blooms with minimal care. Panicle hydrangeas are particularly low-maintenance and drought-tolerant once established.</p>

        <h3>9. Lavender</h3>
        <p>With its fragrant foliage and flowers, lavender adds sensory appeal to any garden. Plant in well-draining soil and full sun for best results. A light pruning after flowering helps maintain its compact shape.</p>

        <h3>10. Hosta</h3>
        <p>Perfect for shady areas, hostas come in countless varieties with different leaf colors, sizes, and textures. These long-lived perennials require minimal care, though they may need protection from deer and slugs.</p>

        <h2>Design Tips for Low-Maintenance Gardens</h2>
        <p>To maximize the benefits of your low-maintenance plants:</p>
        <ul>
          <li>Group plants with similar water and light requirements together</li>
          <li>Apply 2-3 inches of mulch to suppress weeds and retain moisture</li>
          <li>Install drip irrigation for efficient watering</li>
          <li>Choose perennials over annuals for less frequent replacement</li>
          <li>Incorporate hardscaping elements like patios and walkways to reduce planted areas</li>
        </ul>

        <p>With these plant choices and design strategies, you can create a beautiful, low-maintenance landscape that provides enjoyment without endless hours of work. Contact us to learn more about incorporating these plants into your garden design!</p>
      `,
      featuredImage: '/assets/images/blog/low-maintenance-plants.jpg',
      category: 'landscaping-tips',
      author: 'Sarah Johnson',
      authorImage: '/assets/images/team/sarah-johnson.jpg',
      authorBio: 'Sarah is our horticulture specialist with extensive knowledge of native plants and sustainable gardening practices.',
      date: '2023-06-15',
      tags: ['plants', 'low-maintenance', 'gardening'],
      readTime: 5
    },
    {
      id: 2,
      title: 'How to Design the Perfect Outdoor Living Space',
      slug: 'perfect-outdoor-living-space',
      excerpt: 'Learn the key elements to consider when designing an outdoor living space that's both functional and beautiful for your family to enjoy year-round.',
      content: `
        <p>Your backyard has the potential to be so much more than just a lawn with a few plants. With thoughtful design, it can become an extension of your home—a place for relaxation, entertainment, and connection with nature. In this article, we'll guide you through the essential elements of creating the perfect outdoor living space.</p>

        <h2>Define Your Purpose</h2>
        <p>Before breaking ground on any outdoor project, consider how you want to use the space. Common functions include:</p>
        <ul>
          <li><strong>Dining and entertaining</strong> - Hosting family meals and gatherings</li>
          <li><strong>Relaxation</strong> - Creating a peaceful retreat for unwinding</li>
          <li><strong>Recreation</strong> - Providing space for children to play or adults to pursue hobbies</li>
          <li><strong>Gardening</strong> - Growing vegetables, herbs, or ornamental plants</li>
        </ul>
        <p>Many outdoor spaces serve multiple purposes, but understanding your priorities will help guide your design decisions.</p>

        <h2>Key Elements of an Outdoor Living Space</h2>

        <h3>1. A Defined Floor</h3>
        <p>Just as indoor rooms have flooring, your outdoor space needs a defined surface. Options include:</p>
        <ul>
          <li><strong>Patios</strong> - Using concrete, pavers, flagstone, or brick</li>
          <li><strong>Decks</strong> - Constructed from wood or composite materials</li>
          <li><strong>Gravel or crushed stone</strong> - A more affordable, permeable option</li>
          <li><strong>Artificial turf</strong> - Low-maintenance alternative to natural grass</li>
        </ul>
        <p>Consider factors like maintenance requirements, permeability for drainage, and how the material complements your home's architecture.</p>

        <h3>2. Comfortable Seating</h3>
        <p>The right seating can make or break an outdoor space. Depending on your needs, consider:</p>
        <ul>
          <li>Built-in benches or seat walls</li>
          <li>Dining sets for outdoor meals</li>
          <li>Lounge furniture for relaxation</li>
          <li>Conversation sets for social gatherings</li>
        </ul>
        <p>Invest in quality, weather-resistant furniture with comfortable, fade-resistant cushions.</p>

        <h3>3. Shade and Shelter</h3>
        <p>Protection from sun and rain extends the usability of your outdoor space. Options include:</p>
        <ul>
          <li>Pergolas or arbors</li>
          <li>Retractable awnings</li>
          <li>Shade sails</li>
          <li>Large umbrellas</li>
          <li>Strategically placed trees</li>
        </ul>

        <h3>4. Lighting</h3>
        <p>Outdoor lighting serves both practical and aesthetic purposes, allowing you to enjoy your space after sunset and enhancing its beauty. Consider layers of lighting:</p>
        <ul>
          <li><strong>Ambient lighting</strong> - General illumination with overhead fixtures or string lights</li>
          <li><strong>Task lighting</strong> - Focused light for cooking, reading, or other activities</li>
          <li><strong>Accent lighting</strong> - Highlighting landscape features or architecture</li>
        </ul>
        <p>Solar options and LED fixtures offer energy efficiency and low maintenance.</p>

        <h3>5. Fire and Water Features</h3>
        <p>These elements add sensory appeal to your outdoor space:</p>
        <ul>
          <li><strong>Fire features</strong> - Fire pits, outdoor fireplaces, or tabletop options provide warmth and a natural gathering point</li>
          <li><strong>Water features</strong> - Fountains, ponds, or small waterfalls create a peaceful atmosphere with their soothing sounds</li>
        </ul>

        <h3>6. Outdoor Kitchen or Grill Station</h3>
        <p>For those who love outdoor entertaining, consider:</p>
        <ul>
          <li>Built-in grill or standalone barbecue</li>
          <li>Counter space for food preparation</li>
          <li>Small refrigerator or beverage cooler</li>
          <li>Storage for utensils and supplies</li>
        </ul>

        <h2>Design Principles for Outdoor Spaces</h2>

        <h3>Create a Sense of Enclosure</h3>
        <p>Defined boundaries help an outdoor space feel like a "room." Use vertical elements like:</p>
        <ul>
          <li>Hedges or plantings</li>
          <li>Fencing or screens</li>
          <li>Retaining or seat walls</li>
          <li>Trellises with climbing plants</li>
        </ul>

        <h3>Consider Traffic Flow</h3>
        <p>Plan pathways that connect different areas of your yard and provide clear access to and from the house.</p>

        <h3>Incorporate Plantings</h3>
        <p>Greenery softens hardscape elements and connects your space to nature. Select plants that:</p>
        <ul>
          <li>Thrive in your climate</li>
          <li>Provide seasonal interest</li>
          <li>Offer privacy and screening where needed</li>
          <li>Require a level of maintenance you can manage</li>
        </ul>

        <h3>Address Privacy and Views</h3>
        <p>Screen unwanted views while taking advantage of attractive vistas. Consider sight lines from both seated and standing positions.</p>

        <h2>Final Thoughts</h2>
        <p>A well-designed outdoor living space becomes a natural extension of your home and lifestyle. By thoughtfully addressing these elements, you'll create an area that invites you to spend more time outdoors, connecting with nature and the people you care about.</p>

        <p>Ready to transform your outdoor space? Contact our design team to schedule a consultation and bring your vision to life!</p>
      `,
      featuredImage: '/assets/images/blog/outdoor-living-space.jpg',
      category: 'design',
      author: 'John Davis',
      authorImage: '/assets/images/team/john-davis.jpg',
      authorBio: 'John is our founder and lead designer with over 20 years of experience in landscape architecture.',
      date: '2023-05-28',
      tags: ['design', 'outdoor-living', 'patios'],
      readTime: 7
    },
    {
      id: 3,
      title: 'Seasonal Lawn Care: Spring Maintenance Guide',
      slug: 'spring-lawn-maintenance',
      excerpt: 'Our comprehensive spring maintenance guide to help your lawn recover from winter and prepare for the growing season ahead.',
      content: `
        <p>As the snow melts and temperatures begin to rise, your lawn is ready to shake off winter dormancy and spring back to life. This transition period is critical for establishing healthy turf that can withstand summer heat and drought. Our spring lawn maintenance guide will help you lay the groundwork for a lush, vibrant lawn throughout the growing season.</p>

        <h2>Timing Is Everything</h2>
        <p>Spring lawn care should begin when soil temperatures consistently reach about 55°F (13°C). This typically coincides with the emergence of lilacs and forsythia blooms in many regions. Starting too early can damage tender new growth, while waiting too long may allow weeds to gain a foothold.</p>

        <h2>Essential Spring Lawn Care Tasks</h2>

        <h3>1. Clean Up Winter Debris</h3>
        <p>Before tackling any other maintenance tasks, remove:</p>
        <ul>
          <li>Fallen branches and twigs</li>
          <li>Leaves and pine needles</li>
          <li>Any trash or debris that has accumulated</li>
        </ul>
        <p>This step improves air circulation and prevents mold and disease development in the turf.</p>

        <h3>2. Rake and Dethatch</h3>
        <p>A light raking with a flexible lawn rake serves multiple purposes:</p>
        <ul>
          <li>Removes dead grass (thatch) that can block water and nutrients</li>
          <li>Breaks up matted grass areas caused by snow mold</li>
          <li>Gently lifts flattened turf to promote upright growth</li>
        </ul>
        <p>For lawns with excessive thatch (more than 1/2 inch), consider using a power dethatcher or vertical mower, but be careful not to be too aggressive with cool-season grasses in spring.</p>

        <h3>3. Soil Testing</h3>
        <p>Early spring is an ideal time to test your soil, which provides valuable information about:</p>
        <ul>
          <li>pH level (most lawn grasses prefer 6.0-7.0)</li>
          <li>Nutrient deficiencies</li>
          <li>Organic matter content</li>
          <li>Soil composition</li>
        </ul>
        <p>Testing kits are available at garden centers, or you can send samples to your local extension office for more detailed analysis.</p>

        <h3>4. Aeration</h3>
        <p>If your soil is compacted or receives heavy foot traffic, core aeration can:</p>
        <ul>
          <li>Improve oxygen flow to grass roots</li>
          <li>Enhance water penetration</li>
          <li>Reduce runoff and puddling</li>
          <li>Help break down thatch</li>
        </ul>
        <p>While fall is generally the preferred time for aeration of cool-season grasses, spring aeration can benefit warm-season grasses like Bermuda, Zoysia, and St. Augustine as they enter their active growth phase.</p>

        <h3>5. Fertilization</h3>
        <p>Spring feeding should be approached differently depending on your grass type:</p>
        <ul>
          <li><strong>Cool-season grasses</strong> (Kentucky bluegrass, fescue, ryegrass) benefit from a light application of fertilizer in early spring. Too much nitrogen can promote excessive top growth at the expense of root development.</li>
          <li><strong>Warm-season grasses</strong> should receive their first fertilizer application when they begin active growth, typically in late spring.</li>
        </ul>
        <p>Slow-release formulations provide more consistent nutrition without promoting surge growth.</p>

        <h3>6. Weed Control</h3>
        <p>Spring is the critical time to address weeds before they become established:</p>
        <ul>
          <li><strong>Pre-emergent herbicides</strong> prevent weed seeds from germinating and should be applied before soil temperatures reach 55-60°F (13-16°C) consistently. This timing typically coincides with forsythia blooming.</li>
          <li><strong>Post-emergent herbicides</strong> target weeds that are already growing and should be used selectively to address specific problem areas.</li>
        </ul>
        <p>Always follow label directions carefully, as improper application can damage desirable turf grasses.</p>

        <h3>7. Overseeding</h3>
        <p>While fall is the ideal time to overseed cool-season lawns, spring seeding may be necessary to repair winter damage or fill in bare patches:</p>
        <ul>
          <li>Remove debris and loosen the soil surface</li>
          <li>Select seed varieties appropriate for your climate and conditions</li>
          <li>Apply seed at the recommended rate</li>
          <li>Keep newly seeded areas consistently moist until established</li>
        </ul>
        <p>Note that if you apply pre-emergent herbicides, they will prevent grass seed germination as well as weed seeds. Plan your approach accordingly.</p>

        <h3>8. Mowing</h3>
        <p>As your lawn begins active growth, follow these mowing best practices:</p>
        <ul>
          <li>Ensure your mower blade is sharp to make clean cuts</li>
          <li>Set the proper height for your grass type (generally 2.5-3.5 inches for cool-season grasses)</li>
          <li>Follow the one-third rule: never remove more than one-third of the grass height in a single mowing</li>
          <li>Consider mulching clippings to return nutrients to the soil</li>
        </ul>

        <h3>9. Irrigation</h3>
        <p>Spring is the time to:</p>
        <ul>
          <li>Inspect and repair irrigation systems</li>
          <li>Adjust sprinkler heads for proper coverage</li>
          <li>Set appropriate watering schedules based on local conditions</li>
        </ul>
        <p>Remember that deep, infrequent watering (about 1 inch per week including rainfall) encourages deeper root growth and more drought-resistant turf.</p>

        <h2>Regional Considerations</h2>
        <p>Timing of spring lawn care varies by region:</p>
        <ul>
          <li><strong>Southern regions:</strong> Begin spring maintenance in February or March</li>
          <li><strong>Transition zones:</strong> Start in March or early April</li>
          <li><strong>Northern regions:</strong> Wait until April or even May when soil has dried sufficiently</li>
        </ul>

        <h2>Final Thoughts</h2>
        <p>A thoughtful spring maintenance routine sets the stage for a healthy lawn throughout the growing season. By addressing these key areas, you'll strengthen your lawn's root system, improve its resistance to stresses like heat and drought, and reduce the likelihood of disease and pest problems.</p>

        <p>Need help with your spring lawn care? Contact us to learn about our seasonal maintenance packages and professional lawn care services!</p>
      `,
      featuredImage: '/assets/images/blog/spring-lawn-care.jpg',
      category: 'maintenance',
      author: 'Emily Rodriguez',
      authorImage: '/assets/images/team/emily-rodriguez.jpg',
      authorBio: 'Emily is our project manager with expertise in landscape maintenance and client communication.',
      date: '2023-04-10',
      tags: ['lawn-care', 'spring', 'maintenance'],
      readTime: 6
    },
    {
      id: 4,
      title: 'Water Conservation in Your Landscape',
      slug: 'water-conservation-landscape',
      excerpt: 'Smart strategies to create a water-efficient landscape that stays beautiful while reducing your water consumption and utility bills.',
      content: `
        <p>As water resources become increasingly precious, creating a beautiful landscape that conserves water is both environmentally responsible and economically sensible. Water-efficient landscaping, often called xeriscaping, combines thoughtful design, appropriate plant selection, and smart irrigation practices to reduce water usage significantly while maintaining an attractive outdoor space.</p>

        <h2>The Benefits of Water-Efficient Landscaping</h2>

        <p>Before diving into specific strategies, it's worth understanding the many advantages of a water-conserving landscape:</p>

        <ul>
          <li>Reduced water bills, especially during summer months</li>
          <li>Less maintenance time and expense</li>
          <li>Increased resilience during drought conditions</li>
          <li>Reduced runoff and erosion</li>
          <li>Lower fertilizer and pesticide needs</li>
          <li>Support for local wildlife and ecosystems</li>
        </ul>

        <h2>Key Strategies for Water Conservation</h2>

        <h3>1. Thoughtful Landscape Design</h3>

        <p>The foundation of water efficiency begins with how your landscape is organized:</p>

        <h4>Group Plants by Water Needs (Hydrozoning)</h4>
        <p>Place plants with similar water requirements together in designated irrigation zones. This prevents overwatering drought-tolerant plants while ensuring thirstier varieties get what they need.</p>

        <h4>Consider Sun Exposure</h4>
        <p>South and west-facing areas typically need more drought-tolerant plants than north and east-facing locations. Map your yard's sun patterns and plan accordingly.</p>

        <h4>Reduce Lawn Areas</h4>
        <p>Traditional turfgrass is often the most water-intensive element in a landscape. Consider reducing lawn size by adding patios, walkways, drought-tolerant groundcovers, or garden beds.</p>

        <h3>2. Smart Plant Selection</h3>

        <h4>Choose Native and Adapted Plants</h4>
        <p>Plants that naturally grow in your region typically require less supplemental water once established. They've evolved to thrive in your local climate conditions.</p>

        <h4>Embrace Drought-Tolerant Species</h4>
        <p>Many beautiful plants from Mediterranean climates, prairies, and desert regions are naturally equipped to handle dry conditions. Options include:</p>
        <ul>
          <li>Ornamental grasses like Blue Fescue and Feather Reed Grass</li>
          <li>Flowering perennials such as Coneflower, Black-eyed Susan, and Yarrow</li>
          <li>Shrubs including Juniper, Barberry, and many Viburnum varieties</li>
          <li>Trees such as Honey Locust, Kentucky Coffee Tree, and many Oak species</li>
        </ul>

        <h4>Consider Alternative Lawns</h4>
        <p>If you desire lawn areas, explore alternatives to traditional Kentucky Bluegrass:</p>
        <ul>
          <li>Tall Fescue develops deeper roots and improved drought tolerance</li>
          <li>Buffalo Grass needs up to 75% less water than conventional turf</li>
          <li>Micro-clover lawns stay green with minimal irrigation</li>
          <li>Native grasses can create meadow-like areas requiring little water</li>
        </ul>

        <h3>3. Soil Improvement</h3>

        <p>Healthy soil is fundamental to water conservation:</p>

        <h4>Add Organic Matter</h4>
        <p>Compost and other organic amendments improve soil structure, allowing it to better absorb and retain moisture. Aim for 2-4 inches worked into the top 6-8 inches of soil before planting.</p>

        <h4>Use Mulch Generously</h4>
        <p>A 2-3 inch layer of mulch around plants significantly reduces evaporation, suppresses water-stealing weeds, and moderates soil temperature. Options include:</p>
        <ul>
          <li>Shredded hardwood or pine bark</li>
          <li>Wood chips</li>
          <li>Pine straw</li>
          <li>Decomposed granite (for desert landscapes)</li>
        </ul>
        <p>Keep mulch a few inches away from plant stems and tree trunks to prevent rot.</p>

        <h3>4. Efficient Irrigation</h3>

        <h4>Install Drip Irrigation</h4>
        <p>Drip systems deliver water directly to plant roots, reducing evaporation and runoff by up to 50% compared to sprinklers. They're ideal for garden beds, shrubs, and trees.</p>

        <h4>Upgrade Sprinkler Technology</h4>
        <p>If sprinklers are necessary for lawn areas:</p>
        <ul>
          <li>Use high-efficiency rotary nozzles</li>
          <li>Install pressure regulators to prevent misting</li>
          <li>Add check valves to prevent low-point drainage</li>
          <li>Adjust heads to avoid watering hardscapes</li>
        </ul>

        <h4>Employ Smart Controllers</h4>
        <p>Weather-based or soil moisture sensor controllers automatically adjust watering schedules based on actual conditions, potentially saving 30-50% of outdoor water use.</p>

        <h4>Optimize Watering Schedules</h4>
        <ul>
          <li>Water early morning (4-9 am) when evaporation rates are lowest</li>
          <li>Water deeply but infrequently to encourage deep root growth</li>
          <li>Adjust seasonal requirements (less in spring/fall, more in summer)</li>
        </ul>

        <h3>5. Rainwater Harvesting</h3>

        <p>Capture free water from the sky with these approaches:</p>

        <h4>Rain Barrels and Cisterns</h4>
        <p>A simple 50-gallon rain barrel can capture significant water from your roof during a modest rainfall. Larger cisterns can store hundreds or thousands of gallons for extended dry periods.</p>

        <h4>Rain Gardens</h4>
        <p>These shallow depressions planted with water-tolerant species capture runoff from roofs and hardscapes, allowing it to slowly infiltrate into the soil rather than flow away as wasteful runoff.</p>

        <h3>6. Hardscape Considerations</h3>

        <p>Your non-plant landscape elements also affect water efficiency:</p>

        <h4>Permeable Surfaces</h4>
        <p>Permeable pavers, gravel, and other porous materials allow rainwater to soak into the ground rather than run off the property.</p>

        <h4>Thoughtful Grading</h4>
        <p>Ensure patios, walkways, and other surfaces direct water toward planted areas rather than toward storm drains.</p>

        <h2>Maintenance Practices for Water Conservation</h2>

        <p>Ongoing care affects water efficiency:</p>

        <ul>
          <li><strong>Proper mowing:</strong> Keep grass taller (3-4 inches) to shade soil and develop deeper roots</li>
          <li><strong>Regular system checks:</strong> Inspect irrigation monthly for leaks, clogs, or misaligned heads</li>
          <li><strong>Seasonal adjustments:</strong> Reduce or suspend irrigation during rainy periods and dormant seasons</li>
          <li><strong>Weeding:</strong> Remove water-stealing weeds promptly</li>
          <li><strong>Mulch replenishment:</strong> Maintain proper mulch depth as it breaks down over time</li>
        </ul>

        <h2>Real-World Water Savings</h2>

        <p>By implementing these strategies, homeowners typically see 50-70% reductions in outdoor water use. For a property that previously used 100,000 gallons annually for irrigation, that represents 50,000-70,000 gallons saved each year!</p>

        <h2>Getting Started</h2>

        <p>Water-efficient landscaping doesn't require replacing your entire yard at once. Consider starting with:</p>

        <ul>
          <li>Converting a small lawn area to drought-tolerant plantings</li>
          <li>Upgrading to a smart irrigation controller</li>
          <li>Adding mulch to existing garden beds</li>
          <li>Installing one or two rain barrels</li>
        </ul>

        <p>Over time, you can transform your entire landscape into a beautiful, water-efficient showcase that's better for the environment and your budget.</p>

        <p>Ready to make your landscape more water-efficient? Contact us for a consultation to develop a customized water conservation plan for your property.</p>
      `,
      featuredImage: '/assets/images/blog/water-conservation.jpg',
      category: 'sustainability',
      author: 'Michael Chen',
      authorImage: '/assets/images/team/michael-chen.jpg',
      authorBio: 'Michael specializes in sustainable landscape practices and water-efficient irrigation systems.',
      date: '2023-03-22',
      tags: ['water-conservation', 'sustainability', 'irrigation'],
      readTime: 8
    }
  ];

  // Mock categories (would normally come from an API)
  const mockCategories = [
    { id: 'landscaping-tips', name: 'Landscaping Tips', count: 1 },
    { id: 'design', name: 'Design Ideas', count: 1 },
    { id: 'maintenance', name: 'Maintenance', count: 1 },
    { id: 'sustainability', name: 'Sustainability', count: 1 },
    { id: 'projects', name: 'Project Showcases', count: 1 }
  ];

  useEffect(() => {
    // Simulate API fetch for post
    setTimeout(() => {
      const currentPost = mockPosts.find(p => p.slug === slug);

      if (currentPost) {
        // Set page title
        document.title = `${currentPost.title} | Sphinx Landscapes Blog`;

        setPost(currentPost);

        // Find related posts (posts with same category or tags, excluding current post)
        const related = mockPosts
          .filter(p => p.id !== currentPost.id)
          .filter(p =>
            p.category === currentPost.category ||
            p.tags.some(tag => currentPost.tags.includes(tag))
          )
          .slice(0, 2);

        setRelatedPosts(related);
        setCategories(mockCategories);
      }

      setLoading(false);
    }, 800);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle search form
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/blog?search=${searchTerm}`);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <main>
        <PageHeader
          title="Blog Post Not Found"
          description="The article you're looking for may have been moved or deleted."
          bgImage="/assets/images/blog/blog-header.jpg"
        />

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn't find the blog post you were looking for.
            </p>
            <Button
              as="link"
              to="/blog"
              variant="primary"
            >
              Return to Blog
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title={post.title}
        bgImage={post.featuredImage}
        breadcrumbs={[
          { text: 'Blog', link: '/blog' },
          { text: post.title, link: `/blog/${post.slug}` }
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Back to Blog Link */}
              <div className="mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Blog
                </Link>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-6 mb-2">
                  <FaUser className="mr-2 text-primary" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <FaCalendarAlt className="mr-2 text-primary" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="mr-2 text-primary" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Featured Image (for mobile only, already shown in header for desktop) */}
              <div className="lg:hidden mb-6">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x450?text=Blog+Post';
                  }}
                />
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex items-center flex-wrap mb-8">
                <FaTags className="text-primary mr-2" />
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    {tag.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>

              {/* Social Sharing */}
              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Share This Article:</span>
                  <div className="flex space-x-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-blue-600 hover:text-white p-2 rounded-full transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-blue-400 hover:text-white p-2 rounded-full transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-blue-700 hover:text-white p-2 rounded-full transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${post.featuredImage}&description=${post.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-red-600 hover:text-white p-2 rounded-full transition-colors"
                      aria-label="Share on Pinterest"
                    >
                      <FaPinterestP />
                    </a>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Author';
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-1">{post.author}</h3>
                    <p className="text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <Link to={`/blog/${relatedPost.slug}`} className="block aspect-video overflow-hidden">
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/600x400?text=Related+Post';
                            }}
                          />
                        </Link>
                        <div className="p-4">
                          <h4 className="font-heading font-semibold mb-2">
                            <Link
                              to={`/blog/${relatedPost.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">{formatDate(relatedPost.date)}</p>
                          <Link
                            to={`/blog/${relatedPost.slug}`}
                            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                          >
                            Read Article
                            <svg
                              className="ml-1 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                activeCategory={post.category}
                onCategoryChange={(category) => navigate(`/blog?category=${category}`)}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                posts={mockPosts}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a consultation and take the first step toward your dream outdoor space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              as="link"
              to="/quote"
              variant="white"
              size="large"
            >
              Get a Free Quote
            </Button>
            <Button
              as="link"
              to="/contact"
              variant="outline"
              size="large"
              className="text-white border-white hover:bg-white hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPostPage;