import './css/About.css';
import Header from './Header';
import Footer from './Footer';
import Awards from './Awards';

export default function About() {
  return (
    <>
      <Header />

      <div className="about-hero" role="banner" aria-label="About Michelle Dilhara"></div>

      <main className="about">
        <div className="about-container">
          <div className="about-content">
            <h2>About Michelle Dilhara</h2>
            <p>
              Born on 1 May 1996 in Ragama, Sri Lanka, Michelle began karate at age 11 and earned a gold medal at an international championship in 2010. She studied IT and psychology while pursuing acting from 2016 onward.
            </p>

            <h3>Acting & Authorship</h3>
            <p>
              Known for roles in series like <em>Sudu Andagena Kalu Awidin</em>, <em>Can You Hear Me</em> and more, she’s earned multiple awards and nominations.
              In 2019, she authored <em>Social Invisibility is Not a Fiction, It Exists</em>, leading to the National Youth Icon Award.
            </p>

            <h3>Social Impact & Activism</h3>
            <p>
              In 2018, she founded the <strong>Invisible to Visible</strong> movement to support marginalized communities—launching with free English scholarships and establishing “Senehas Arana” for senior citizens. Her book <em>“Social Invisibility is Not a Fiction, it Exists”</em> and theory “Alternative Social Cogwheel” guide her outreach.
            </p>
            <p>
              As Earth Day Network Ambassador for Sri Lanka, she champions climate awareness and sustainable action.
            </p>

            <h3>Awards & Recognition</h3>
            <Awards />

            <p className="about-tagline">
              “Her journey from screen to service reminds us all: <em>Let every voice be seen.</em>”
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
