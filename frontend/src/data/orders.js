// Mock orders with feedback hooks for continuous learning loop

export const initialOrders = [
  {
    id: "JOY-10492",
    date: "September 16, 2026",
    product: {
      id: "prod-4",
      name: "Invisible Water SPF 50+ Sun Gel",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1567928815117-69b56f8f0729?w=600&auto=format&fit=crop&q=80",
      price: 699,
      size: "50ml",
      texture: "Water-gel"
    },
    status: "Delivered",
    deliveredDate: "September 18, 2026",
    hasFeedback: false
  },
  {
    id: "JOY-10231",
    date: "September 10, 2026",
    product: {
      id: "prod-1",
      name: "HydraGel Ultra-Light Moisturizer",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      price: 649,
      size: "50ml",
      texture: "Gel"
    },
    status: "Delivered",
    deliveredDate: "September 12, 2026",
    hasFeedback: true,
    feedbackGiven: {
      rating: 4,
      texture: "Slightly Heavy",
      fragrance: "None",
      application: "Fast absorbing",
      comment: "Feels slightly heavy during peak afternoon heat. Good hydration, but looking for an even lighter formulation."
    }
  },
  {
    id: "JOY-09874",
    date: "August 28, 2026",
    product: {
      id: "prod-8",
      name: "Amino Acid Gentle Foaming Cleanser",
      brand: "Joyory Labs",
      image: "https://images.unsplash.com/photo-1556228722-d0b5be7490bf?w=600&auto=format&fit=crop&q=80",
      price: 499,
      size: "150ml",
      texture: "Foaming Gel"
    },
    status: "Delivered",
    deliveredDate: "August 31, 2026",
    hasFeedback: true,
    feedbackGiven: {
      rating: 5,
      texture: "Gentle cloud",
      fragrance: "Clean green tea",
      application: "Mild & non-stripping",
      comment: "Leaves skin soft without that tight squeaky feeling. Holy grail cleanser for my oily T-zone."
    }
  }
];
