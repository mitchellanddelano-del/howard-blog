module.exports = function(eleventyConfig) {

  // ===== GROUP POSTS BY YEAR =====
  eleventyConfig.addFilter("groupByYear", function(posts) {
    const groups = {};

    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(post);
    });

    return Object.entries(groups)
      .sort((a, b) => b[0] - a[0]); // newest year first
  });

};
