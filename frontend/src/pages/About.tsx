import Header from "../components/Header";
import "./About.css";
import Logo from "../assets/logo.png";
import bg from "../assets/headerbg.png";
import Footer from "../components/Footer";
import image from "../assets/about/image.png";
const About = () => {
  return (
    <>
      <Header headerBg={bg} logo={Logo} />
      <div className="container">
        <div className="content">
          <div className="section-1">
            <div className="text-section">
              <h1>
                “Every time you spend money, you're casting a vote for the kind
                of world you want.”
              </h1>{" "}
              <h3>- A N N A L A P P E</h3>
              <p>
                Hundreds of years ago ships set sail in search of fortune,
                adventure, and discovery. Using winds like the Westerlies,
                sailors crossed the world, trading not only goods, but also
                ideas, beliefs, languages, and so much more. In doing so, they
                changed the world. We hope this site, named for these winds,
                will do the same.
              </p>
              <p>
                Westerlies is on a mission to connect you with independent shop
                owners and makers – both near and far – who sell goods that make
                the world a more beautiful, thoughtful place
              </p>
            </div>
            <div className="image-section">
              <img src={image} />
            </div>
          </div>
          <div className="section-2">
            <h1>
              By connecting, we hope you’ll <br></br>join us in the vote for:
            </h1>
            <div className="texts">
              <div className="text-one">
                <h1>M A K E R S, A R T I S A N S, A N D B U I L D E R S</h1>
                <p>
                  Those who’ve honed their craft and are creating goods that
                  tell a story – because we believe that we should fill our
                  lives and homes with things that connect us to each other.
                </p>
              </div>
              <div className="text-two">
                <h1>
                  S M A L L <br></br>B U S I N E S S E S
                </h1>
                <p>
                  Not just one day of the year, but every day – because we
                  believe that investing in independent shops and makers is a
                  powerful tool for economic development and essential for
                  creating vibrant, healthy communities.
                </p>
              </div>
              <div className="text-three">
                <h1>
                  E T H I C A L <br></br>B U S I N E S S E S
                </h1>
                <p>
                  Who operate with purpose, equity, and dignity – because we
                  believe that independent shops and makers who use their
                  business as a force for good can change the world.
                </p>
              </div>
            </div>
            <button>EXPLORE NEW SHOPS NOW</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default About;
