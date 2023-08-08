// page: about
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredLink from "../components/HoveredLink";

const About = () => {
  const { language } = useCoreContext();

  return (
    <main>
      <div>
        <HoveredLink linkID="LINK_TO_LBSSART" linkTarget="http://www.lbss.art" language={language}></HoveredLink>
      </div>
    </main>
  );
};

export default About;
