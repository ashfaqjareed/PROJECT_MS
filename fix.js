const fs = require("fs");
const files = ["stock.html", "search-results.html", "rates.html", "promotions.html", "product-detail.html", "products.html", "pamphlet.html", "offers.html", "loyalty.html", "login.html", "index.html", "contact.html", "checkout.html", "cart.html", "branches.html", "account.html", "about.html"];

const searchRegex = /<div id="nav-auth-logged-out" class="flex gap-2">\s*<a href="login\.html"(.*?)>Sign In<\/a>\s*<\/div>/g;
const replaceStr = `<div id="nav-auth-logged-out" class="flex gap-2">
                            <a href="login.html"$1>Sign In</a>
                            <a href="login.html?tab=signup" class="btn btn-primary btn-sm">Sign Up</a>
                        </div>`;

let count = 0;
files.forEach(f => {
  if (fs.existsSync(f)) {
      let content = fs.readFileSync(f, "utf8");
      if (searchRegex.test(content)) {
          content = content.replace(searchRegex, replaceStr);
          fs.writeFileSync(f, content);
          count++;
      }
  }
});
console.log(`Replaced in ${count} files.`);
