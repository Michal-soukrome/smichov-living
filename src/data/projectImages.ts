import type { ImageMetadata } from "astro";
import before1 from "../assets/images/reference/1-before.jpg";
import after1 from "../assets/images/reference/1-after.png";
import before2 from "../assets/images/reference/2-before.png";
import after2 from "../assets/images/reference/2-after.png";
import before3 from "../assets/images/reference/3-before.jpg";
import after3 from "../assets/images/reference/3-after.png";

export const projectImages: Record<
  string,
  { beforeImage: ImageMetadata; afterImage: ImageMetadata }
> = {
  "/reference/byt-na-smichove": {
    beforeImage: before1,
    afterImage: after1,
  },
  "/reference/rodinny-dum-praha-zapad": {
    beforeImage: before2,
    afterImage: after2,
  },
  "/reference/moderni-byt-centrum-prahy": {
    beforeImage: before3,
    afterImage: after3,
  },
};
