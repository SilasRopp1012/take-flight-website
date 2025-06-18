export const content = {
  // Navigation
  navigation: [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#tours', label: 'Tours' },
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
      "Hi! I'm Chris, and birding has been a passion of mine for over 50 years. I grew up in Washington state where I learned to \"bird by ear\" at the age of 12, a skill that I have been honing ever since.",
      "I studied ornithology intensively during my undergraduate years and worked as a field ornithologist throughout my 20s. I later earned a master's degree in Forest Ecology and spent many years working as a Vegetation Ecologist with the Washington Natural Heritage Program, where I focused on conservation and ecological research.",
      "Since moving to the Southwest in 2007, I have been extensively exploring northern New Mexico and its incredible birdlife. Today, I bring together decades of experience in bird behavior, habitat, vegetation, and ecosystems to offer guided trips that are as informative as they are immersive. I also regularly volunteer leading bird walks at the Randall Davey Audubon Center.",
      "Most of my tours are within a day's drive of Santa Fe, though I occasionally lead overnight trips to special places by request, including Bosque del Apache and the Bitter Lake/Roswell area."
    ]
  },

  // Tours Section
  tours: {
    title: "Tours",
    offerings: [
      {
        id: 'personalized',
        title: 'Personalized Birding Tours',
        description: 'Tailored one-on-one or small group experiences built around individual interests and schedules. Suitable for beginners or experienced birders. Each outing is made to match your goals and preferences.',
      },
      {
        id: 'group',
        title: 'Group Educational Adventures',
        description: 'Join my regularly scheduled group birding tours that combine the joy of discovery with educational insights. Perfect for meeting fellow birding enthusiasts while learning about local species, habitats, and conservation efforts.',
      },
      {
        id: 'classes',
        title: 'Field-Based Birding Classes',
        description: 'Hands-on learning experiences that take you directly into the field to develop your birding skills. These occasional specialized classes focus on bird identification, behavior observation, and habitat in real-world settings.',
      },
    ]
  },

  // Testimonials Section
  testimonials: {
    title: "What People Are Saying",
    subtitle: "Real stories from those who've explored New Mexico's birdlife with a guide who knows it best.",
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
    description: "Ready to embark on your birding adventure? Contact me to book a tour, ask questions, or learn more about upcoming group events.",
    email: "chris.chappell4@gmail.com",
    phone: "(505)-310-3205",
    location: "Santa Fe, NM",
    successMessage: "Thank you! I'll get back to you when I can."
  }
}

export type Content = typeof content 