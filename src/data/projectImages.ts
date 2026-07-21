import type { ImageMetadata } from "astro";
import sluzbyImage from "../assets/images/projects/sluzby.png";
import showroomImage from "../assets/images/projects/showroom.png";

export const projectImages: Record<
  string,
  { beforeImage: ImageMetadata; afterImage: ImageMetadata }
> = {
  "/reference/byt-na-smichove": {
    beforeImage: sluzbyImage,
    afterImage: showroomImage,
  },
  "/reference/rodinny-dum-praha-zapad": {
    beforeImage: sluzbyImage,
    afterImage: showroomImage,
  },
  "/reference/moderni-byt-centrum-prahy": {
    beforeImage: sluzbyImage,
    afterImage: showroomImage,
  },
};
