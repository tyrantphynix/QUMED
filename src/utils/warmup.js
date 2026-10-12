import { ScrollTrigger } from "./gsap.config";

// Critical images to eagerly decode into GPU memory
const CRITICAL_IMAGES = [
  "/favicon.png",
  "/logo-q.png",
  "/images/plant-gurugram.jpg",
  "/images/products/1420-scaled.jpg",
  "/images/products/1355-scaled.jpg",
  "/images/products/1264-scaled.jpg",
  "/images/products/3700-1-scaled.jpg",
  "/images/products/PIC_1551-scaled.jpg",
  "/images/products/extension-line-scaled.jpg",
  "/images/products/1351-scaled.jpg",
  "/images/products/flow-reg1.png",
  "/images/products/Untitled-1-02-3.png",
  "/images/products/1283.jpg-scaled.jpg",
  "/images/products/1539-scaled.jpg",
  "/images/products/1567-scaled.jpg",
  "/images/products/1470--scaled.jpg",
  "/images/products/Screenshot-2023-07-27-141408.png",
  "/images/products/1433-scaled.jpg",
  "/images/products/3733-scaled.jpg",
  "/images/products/3743-scaled.jpg",
  "/images/products/1519-scaled.jpg",
  "/images/products/1490-scaled.jpg",
  "/images/products/OXYGEN-MASK2.jpg",
  "/images/products/Untitled-1-02-4.png",
  "/images/products/et-tube-scaled.jpg",
  "/images/products/3712-scaled.jpg",
  "/images/products/Untitled-122-02.png",
  "/images/products/1317-scaled.jpg",
  "/images/products/cc2.jpg"
];

let warmedUp = false;

export async function warmUpSite() {
  if (warmedUp || typeof window === "undefined") return;
  warmedUp = true;

  // 1. Decode critical image bitmaps into GPU cache
  const decodePromises = CRITICAL_IMAGES.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().then(resolve).catch(resolve);
      } else {
        img.onload = resolve;
        img.onerror = resolve;
      }
    });
  });

  // 2. Pre-buffer video header if present
  try {
    const video = document.createElement("video");
    video.src = "/videos/plant-tour.mp4";
    video.preload = "auto";
  } catch (_) {}

  // Wait for images with timeout so loader never hangs
  await Promise.race([
    Promise.allSettled(decodePromises),
    new Promise((resolve) => setTimeout(resolve, 1500))
  ]);

  // 3. Pre-calculate GSAP ScrollTrigger coordinates upfront
  try {
    ScrollTrigger.refresh();
  } catch (_) {}
}
