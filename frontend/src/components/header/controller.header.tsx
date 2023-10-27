export function isHome(title: string) {
  return title == "home";
}

export function isHowItWorks(title: string) {
  return title == "how_it_works";
}

export function isAboutUs(title: string) {
  return title == "about_us";
}

export function isPricing(title: string) {
  return title == "pricing";
}

// get the right class for the link
export function getLinkClass(title: string,context: string,screenSize: string): string {
  return (title == context)
    ? "Link-selected"
    : isHome(title)
    ? "Link-white"
    : (screenSize == "smallScreen")?
    "Link-white":
    "Link-black";
}
