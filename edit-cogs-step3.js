const fs = require("fs");
let c = fs.readFileSync("cogs-calculator.html","utf8");

// Update row state comment
c = c.replace(
  `let rows = []; // { id, type:'existing'|'custom', ingredientId, name, qty, unit, unitCost, source }`,
  `let rows = []; // { id, type:'existing'|'custom', ingredientId, name, qty, unit, unitCost, source, purchaseCost, purchaseUnitQty }`
);

// Update addRow function using the exact content from the file
const oldAddRow = 
`        function addRow(type) {
        const id = ++rowCounter;
        rows.push({
          id,
          type,
          ingredientId: "",
          name: "",
          qty: 0,
          unit: "gr",
          unitCost: 0,
          source: "",
        });
        renderRows();
        // focus first input of the new row
        setTimeout(() => {
          const el =
            document.getElementById(\`row-name-\${id}\`) ||
            document.getElementById(\`row-ing-\${id}\`);
          if (el) el.focus();
        }, 50);
      }`;

const newAddRow = 
`        function addRow(type) {
        const id = ++rowCounter;
        const r = {
          id,
          type,
          ingredientId: "",
          name: "",
          qty: 0,
          unit: "gr",
          unitCost: 0,
          source: "",
        };
        if (type === "custom") {
          r.purchaseCost = 0;
          r.purchaseUnitQty = 0;
        }
        rows.push(r);
        renderRows();
        // focus first input of the new row
        setTimeout(() => {
          const el =
            document.getElementById(\`row-name-\${id}\`) ||
            document.getElementById(\`row-ing-\${id}\`);
          if (el) el.focus();
        }, 50);
      }`;

c = c.replace(oldAddRow, newAddRow);
fs.writeFileSync("cogs-calculator.html",c,"utf8");
console.log("Step 2 done. addRow contains purchaseCost:", c.includes("purchaseCost = 0"));
