const fs = require("fs");
let c = fs.readFileSync("cogs-calculator.html","utf8");
c = c.split("grid-template-columns: 160px 1fr 90px 100px 120px 36px;").join("grid-template-columns: 160px 1fr 90px 100px 130px 100px 36px;");
c = c.replace(
  '<span>Type</span>\n                    <span>Ingredient</span>\n                    <span>Qty</span>\n                    <span>Unit</span>\n                    <span style="text-align: right">Line Cost</span>\n                    <span>\u2014</span>',
  '<span>Type</span>\n                    <span>Ingredient</span>\n                    <span>Qty</span>\n                    <span>Unit</span>\n                    <span style="text-align: right">Purchase</span>\n                    <span style="text-align: right">Line Cost</span>\n                    <span>\u2014</span>'
);
fs.writeFileSync("cogs-calculator.html",c,"utf8");
console.log("Step 1 done");
