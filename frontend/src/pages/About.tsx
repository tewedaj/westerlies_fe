import Header from "../components/Header";
import "./About.css";
import Logo from "../assets/logo.png";
import bg from "../assets/headerbg.png";
import Footer from "../components/Footer";
const About = () => {
  return (
    <>
      <Header headerBg={bg} logo={Logo} />
      <div className="background-div"></div>
      <Footer />
    </>
  );
};
export default About;
