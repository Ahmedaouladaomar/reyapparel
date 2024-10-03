import { Container, Title, Text, Button, Flex } from "@mantine/core";
import classes from "./styles.module.css";
import { ImageBanner, defaulSrcBanner } from "@/components/ImageBanner";
import CollectionCarousel from "@/components/CollectionsCarousel";
import { FeaturesCards } from "@/components/FeaturedCards";
import { imageBanner1, imageBanner2 } from "./data";

function Home() {
  return (
    <div className={classes.container}>
      <div className="introduction-section">
        <ImageBanner {...imageBanner1} />
      </div>
      <div className="explore-collections-section">
        <CollectionCarousel title="Disocver our collections" />
      </div>
      <div className="introduction-section">
        <ImageBanner {...imageBanner2} src={defaulSrcBanner} />
      </div>
      <div className="features-section">
        <FeaturesCards />
      </div>
    </div>
  );
}

export default Home;
