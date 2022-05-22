const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "_theme.scss";`,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "avatars3.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "localhost",
      "avatars.dicebear.com",
    ],
  },
};

module.exports = nextConfig;
