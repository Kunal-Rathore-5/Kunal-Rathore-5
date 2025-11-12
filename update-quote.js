const fs = require('fs');
const path = require('path');

/**
 * Updates the quote card in README.md with a random quote from quotes.json
 */
async function updateQuote() {
  try {
    // Read and validate quotes
    const quotesPath = path.join(__dirname, 'quotes.json');
    if (!fs.existsSync(quotesPath)) {
      throw new Error('quotes.json not found');
    }
    
    const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    if (!Array.isArray(quotes) || quotes.length === 0) {
      throw new Error('quotes.json is empty or invalid');
    }

    // Select random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];
    
    if (!quote || !author) {
      throw new Error(`Invalid quote at index ${randomIndex}`);
    }

    console.log(`Selected quote by ${author}: "${quote.substring(0, 50)}..."`);

    // Create card design
    const cardDesign = `<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->`;

    // Read README
    const readmePath = path.join(__dirname, 'README.md');
    if (!fs.existsSync(readmePath)) {
      throw new Error('README.md not found');
    }
    
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    // Check if markers exist
    const hasMarkers = readmeContent.includes('<!--STARTS_HERE_QUOTE_CARD-->') && 
                       readmeContent.includes('<!--ENDS_HERE_QUOTE_CARD-->');
    
    if (!hasMarkers) {
      console.log('Quote card markers not found in README.md');
      console.log('Adding quote card section at the end of README...');
      readmeContent += '\n\n## 💭 Daily Quote\n\n' + cardDesign + '\n';
    } else {
      // Replace existing quote card
      const replaced = readmeContent.replace(
        /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/,
        cardDesign
      );
      
      if (replaced === readmeContent) {
        console.warn('Warning: Quote card markers found but replacement failed');
      } else {
        readmeContent = replaced;
      }
    }

    // Write updated README
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('✅ README.md updated successfully');
    
  } catch (error) {
    console.error('❌ Error updating quote:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateQuote();
}

module.exports = { updateQuote };
