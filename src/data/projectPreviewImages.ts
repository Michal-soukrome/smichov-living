import type { ImageMetadata } from "astro";
import sluzbyImage from "../assets/images/projects/sluzby.png";
import showroomImage from "../assets/images/projects/showroom.png";
import homepageImage from "../assets/images/projects/homepage.png";
import kontaktImage from "../assets/images/projects/kontakt.png";
import referenceImage from "../assets/images/projects/reference.png";

export const projectPreviewImages: Record<string, ImageMetadata> = {
  "/images/projects/sluzby.png": sluzbyImage,
  "/images/projects/showroom.png": showroomImage,
  "/images/projects/homepage.png": homepageImage,
  "/images/projects/kontakt.png": kontaktImage,
  "/images/projects/reference.png": referenceImage,
};
