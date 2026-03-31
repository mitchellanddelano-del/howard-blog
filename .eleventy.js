module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("displayDate", function(value) {
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  });

  eleventyConfig.addFilter("cardDate", function(value) {
    const d = new Date(value);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const y = String(d.getFullYear()).slice(-2);
    return `${m}-${day}-${y}`;
  });

  eleventyConfig.addFilter("groupByYear", function(posts) {
    const groups = {};

    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(post);
    });

    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
