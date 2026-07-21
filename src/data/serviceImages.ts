import type { ImageMetadata } from "astro";
import service1 from "../assets/images/services/1.webp";
import service2 from "../assets/images/services/2.png";
import service3 from "../assets/images/services/3.png";
import service4 from "../assets/images/services/4.png";

export const serviceImages: Record<string, ImageMetadata> = {
  "01": service1,
  "02": service2,
  "03": service3,
  "04": service4,
};
