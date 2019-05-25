require('@babel/register'); // 1.

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

// 2.
(
    new Sitemap(router)
        .build('https://shadowfalls.github.io/webtutor')
        .save('./sitemap.xml')
);

console.log("The sitemap was built."); // Only shows this message after everything works well.
