/*
  Site content for the Projects and New Ventures pages.

  To add a project or venture:
    1. Put its photos in images/projects/<folder>/ as 01.jpg, 02.jpg, ...
       and a smaller copy of each in images/projects/<folder>/thumbs/
    2. Add an entry below. The first image listed is used as the cover.

  status is optional.
    projects: "completed" | "ongoing"
    ventures: "booking" | "upcoming"
*/

function photos(folder, order) {
  return order.map(function (n) {
    return "/images/projects/" + folder + "/" + (n < 10 ? "0" : "") + n + ".jpg";
  });
}

window.SITE_DATA = {
  projects: [
    {
      title: "Aneri Heights",
      category: "Apartments",
      location: "Nadiad",
      description: "Multi-block apartment scheme with landscaped grounds, swimming pool, clubhouse and children's play area.",
      images: photos("aneri-heights", [1, 2, 3, 4, 5, 6, 7])
    },
    {
      title: "Anmol Apartment",
      category: "Apartments",
      description: "Six-storey residential apartment building with balconies on every floor and glass-fronted shops at street level.",
      images: photos("anmol-apartment", [1])
    },
    {
      title: "Modern Bungalows",
      category: "Residential",
      description: "Contemporary independent homes with clean lines, large glazing, brick and stone accents, and terrace gardens.",
      images: photos("modern-bungalows", [3, 4, 5, 6, 7, 2, 8, 9, 10, 11, 12, 13, 1])
    },
    {
      title: "Classical Villas & Row Houses",
      category: "Residential",
      description: "Elegant villas and twin row houses with stone cladding, detailed cornices and landscaped frontages.",
      images: photos("classical-villas", [1, 2, 3, 4, 5, 6, 7])
    },
    {
      title: "Lakefront Development",
      category: "Landscape & Public",
      description: "Lakeside promenade with a temple, terraced gardens, fountains, play areas and evening lighting.",
      images: photos("lakefront-development", [1, 2, 3, 4])
    },
    {
      title: "Commercial Showroom Building",
      category: "Commercial",
      description: "Three-storey glass-fronted showroom with an external feature staircase and frontage parking.",
      images: photos("commercial-showroom", [1])
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
