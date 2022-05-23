export const themeColors = [
  "#0FD269",
  "#479FBD",
  "#EBBE11",
  "#E99E0F",
  "#E91111",
  "#EA1193",
  "#4059F2",
  "#5A10EA",
  "#A974FF",
];

export const Server = {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  project: process.env.NEXT_PUBLIC_PROJECT,
  collections: {
    users: process.env.NEXT_PUBLIC_USERS_COLLECTION,
    mats: process.env.NEXT_PUBLIC_MATS_COLLECTION,
    follows: process.env.NEXT_PUBLIC_FOLLOWS_COLLECTION,
  },
};

export const faqs = {
  having_problems_connecting: `
# Having problems connecting?

This is a section meant to be populated later. Please check back soon!
  `,

  about_us: `
# Having problems connecting?

This is a section meant to be populated later. Please check back soon!
    `,
  social_links: `
# Social Links

Here's how you could find me:

* [Github](https://github.com/Just-Moh-it)
* [Twitter](https://twitter.com/mohit_yadav)
* [Instagram](https://instagram.com/mohit_yadav)
* [LinkedIn](https://linkedin.com/in/mohit_yadav)
* [Blog](https://just-moh-it.hashnode.dev/)
  `,
};
