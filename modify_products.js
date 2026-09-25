import fs from 'fs';

const filePath = 'src/data/products.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace prices with 0
content = content.replace(/price:\s*\d+/g, 'price: 0');
// Replace mrp with 0
content = content.replace(/mrp:\s*\d+/g, 'mrp: 0');
// Ensure stock is 0 and stockStatus is out_of_stock
content = content.replace(/stockStatus:\s*['"][^'"]+['"]/g, "stockStatus: 'out_of_stock'");
// If stockStatus isn't there, we'll add it. 
// Same for stock or stockQuantity.
// To be safe, let's just parse the file or do a smart replace.

fs.writeFileSync(filePath, content);
console.log('Modified products.js');
