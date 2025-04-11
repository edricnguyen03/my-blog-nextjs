
import { Fragment } from "react";
import HomeHero from '../components/fragment/home';

import HomeAbout from "@/components/fragment/about";
import HomeContact from "@/components/fragment/contact";

export default function Home() {
  return (
    <Fragment>
      <HomeHero />
      <HomeAbout />
      <HomeContact />
    </Fragment>
  );
}
