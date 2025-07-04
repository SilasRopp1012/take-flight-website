export const content = {
  // Navigation
  navigation: [
    { href: '#about', label: 'About' },
    { href: '#tours', label: 'Services' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ],

  // Header
  header: {
    title: "Take Flight",
    subtitle: "Birding and Nature Adventures"
  },

  // Hero Section
  hero: {
    title: "New Mexico Birding,\nDone Right.",
    subtitle: "Explore the trails and skies of NM with a lifelong birder as your guide. Offering personalized tours, educational group adventures, and field-based classes."
  },

  // About Section
  about: {
    title: "About Me",
    paragraphs: [
      "Hi! I'm Chris, and birding has been a passion of mine for over 50 years. I grew up in Washington state where I learned to \"bird by ear\" at the age of 12, a skill that I have been honing ever since. I love to teach people birding by ear and I can help you learn that skill, as well as a plethora of other birding knowledge and skills.",
      "I studied ornithology intensively during my undergraduate years and worked as a field ornithologist throughout my 20s. I later earned a master's degree in Forest Ecology and spent many years working as a Vegetation Ecologist with the Washington Natural Heritage Program, where I focused on conservation and ecological research. My birding adventures often incorporate education about the habitats that we are birding in and how the birds use them, in a way that few guides can do because of my unique background.",
      "Since moving to the Southwest in 2007, I have been extensively exploring northern and central New Mexico and its incredible birdlife. Today, I bring together decades of experience in bird identification, bird behavior, habitat use, vegetation, and ecosystems to offer guided trips that are as informative as they are immersive. I know all the hotspots, nooks and crannies of birding near Santa Fe in a way that very few others do, and that on-the-ground experience translates into better birding experiences for you. I also regularly volunteer leading bird walks at the Randall Davey Audubon Center and do volunteer bird surveys at the Leonora Curtin Wetland Preserve.",
      "I also enjoy getting to know the people I guide and teach, and I am easy to get along with. I take an interest in you and your birding life, meeting you where you are in your learning process and your interests. The community of local birders who have become regulars on my scheduled local adventures and who've taken my field classes is something I cherish.",
      "Most of my tours are within a day's drive of Santa Fe, though I occasionally lead overnight trips to special places by request, including Bosque del Apache and the Bitter Lake/Roswell area."
    ]
  },

  // Tours Section
  tours: {
    title: "Services",
    offerings: [
      {
        id: 'personalized',
        title: 'Personalized Birding Tours',
        description: 'Tailored one-on-one or small group experiences built around individual interests and schedules. Suitable for beginners or experienced birders. Each outing is made to match your goals and preferences.',
        features: ['One-on-one or small groups', 'Flexible scheduling', 'Based on your interests', 'All skill levels welcome']
      },
      {
        id: 'group',
        title: 'Educational Group Adventures',
        description: 'Join my regularly scheduled group birding tours that combine the joy of birding with educational insights. Perfect for meeting fellow bird enthusiasts while learning about local species and habitats.',
        features: ['Regularly scheduled tours', 'Meet fellow birders', 'Educational insights', 'All skill levels welcome']
      },
      {
        id: 'classes',
        title: 'Field-Based Birding Classes',
        description: 'Hands-on learning experiences that take you directly into the field to develop your birding skills. These occasional specialized classes focus on learning about bird identification, behavior, and habitat.',
        features: ['Hands-on field learning', 'Bird identification skills', 'Behavior observation', 'Habitat understanding']
      },
    ]
  },

  // Testimonials Section
  testimonials: {
    title: "What People Are Saying",
    subtitle: "Real stories from those who've explored NM's birdlife with Chris.",
    testimonials: [
      {
        text: "Chris is a very knowledgeable birder and excellent bird guide. His trips are enjoyable and educational; you end the day a better birder than you were at the beginning.",
        author: "Jan Swaney"
      },
      {
        text: "I always learn so much when going birding with Chris. He is incredibly knowledgeable and excited about all birds, whether they are common or not.",
        author: "Maggie Schmitt"
      },
      {
        text: "I am a new birder and have found Chris to be inspiring and patient. He has made this new hobby for me extremely fun!",
        author: "Marjorie McConnell"
      },
      {
        text: "Chris is the best birding guide I've had the good fortune to meet in New Mexico. His detailed knowledge of birding hotspots is unmatched.",
        author: "Brian Boyer"
      },
      {
        text: "Chris went to great lengths to find as many live birds for us as possible and kept E-Bird lists for us throughout the day.",
        author: "Cheryl Killingsworth"
      },
      {
        text: "He is extremely knowledgeable about birds and New Mexico, and is very attentive to the needs of the group.",
        author: "Bob Foehring"
      },
      {
        text: "Chris is consistently punctual and well-prepared, making each trip both enjoyable and educational.",
        author: "Ken Bales"
      },
      {
        text: "It absolutely and truly changed my niece's life. NO ONE compares to our first experience with Chris.",
        author: "Eva Marie Shahade"
      },
      {
        text: "Chris is an amazing birder and ecologist. We always learn so much about the birds and the biome where we are birding.",
        author: "Laura Hitt"
      },
      {
        text: "His enthusiasm for birding was apparent right away, and he was a patient and encouraging teacher!",
        author: "Katie Pezold"
      },
      {
        text: "Chris has a great ear and a great eye for birds. He also knows plants, local ecology, and is a pleasure to be with in the field.",
        author: "John Fleckenstein"
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Get In Touch",
    description: "Ready to embark on your birding adventure? Contact me to book a tour, ask questions,  learn more about upcoming group events, or sign up for my email list for educational group adventures and classes.",
    email: "Chris Chappell",
    phone: "(505)-310-3205",
    location: "Santa Fe, NM",
    successMessage: "Thank you! I'll get back to you when I can."
  }
}

export type Content = typeof content 