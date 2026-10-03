/*
  Site content for the Projects and New Ventures pages.

  To add a project or venture:
    1. Put its photos in images/projects/<folder>/ or images/ventures/<folder>/
    2. Add an entry below. The first image is used as the cover.

  status (projects): "completed" | "ongoing"
  status (ventures): "booking" | "upcoming"
*/

window.SITE_DATA = {
  projects: [
    {
      title: "Sample Residential Building",
      category: "Residential",
      status: "completed",
      location: "Nadiad",
      year: "2025",
      description: "Placeholder entry. Replace with a real project and its photos.",
      images: []
    },
    {
      title: "Sample Commercial Complex",
      category: "Commercial",
      status: "ongoing",
      location: "Nadiad",
      year: "2026",
      description: "Placeholder entry. Replace with a real project and its photos.",
      images: []
    },
    {
      title: "Sample Interior Work",
      category: "Interior",
      status: "completed",
      location: "Anand",
      year: "2024",
      description: "Placeholder entry. Replace with a real project and its photos.",
      images: []
    }
  ],

  ventures: [
    {
      title: "Sample New Scheme",
      type: "Residential Apartments",
      status: "booking",
      location: "College Road, Nadiad",
      description: "Placeholder entry. Replace with your new venture's details and photos.",
      highlights: ["2 & 3 BHK", "Parking", "Lift"],
      images: []
    }
  ]
};
