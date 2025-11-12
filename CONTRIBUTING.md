# Contributing to Kunal's GitHub Profile

Thank you for your interest in contributing! This document explains how the daily quote feature works and how to maintain it.

## 📋 Project Structure

```
.
├── README.md              # Main profile page with quote display
├── quotes.json           # Database of 3204+ inspirational quotes
├── update-quote.js       # Script to update the daily quote
├── package.json          # Node.js project configuration
└── .github/
    └── workflows/
        └── update-quote.yml  # GitHub Actions workflow (runs daily)
```

## 🔄 How It Works

### Daily Quote Update Process

1. **Automated Schedule**: GitHub Actions runs the workflow every day at midnight UTC
2. **Quote Selection**: The script randomly selects a quote from `quotes.json`
3. **README Update**: The selected quote is inserted into the README between special markers
4. **Commit & Push**: If changes were made, they're automatically committed and pushed

### Quote Card Markers

The script looks for these HTML comments in README.md:
```html
<!--STARTS_HERE_QUOTE_CARD-->
<!-- Quote card image will be inserted here -->
<!--ENDS_HERE_QUOTE_CARD-->
```

If markers aren't found, the script automatically adds them at the end of the README.

## 🛠️ Manual Updates

### Running Locally

1. **Install Node.js** (v14 or higher)

2. **Clone the repository**:
   ```bash
   git clone https://github.com/kunal-rathore-111/kunal-rathore-111.git
   cd kunal-rathore-111
   ```

3. **Update the quote**:
   ```bash
   node update-quote.js
   # or
   npm run update-quote
   ```

### Manual Trigger via GitHub

You can manually trigger the quote update workflow:

1. Go to **Actions** tab in the repository
2. Select **Update Daily Quote** workflow
3. Click **Run workflow** button
4. Click **Run workflow** in the dropdown

## ➕ Adding New Quotes

To add new quotes to the database:

1. Edit `quotes.json`
2. Add your quote in this format:
   ```json
   {
     "quote": "Your inspirational quote here.",
     "author": "Author Name"
   }
   ```
3. Ensure the JSON is valid (no trailing commas, proper brackets)
4. Commit and push your changes

### Quote Guidelines

- Keep quotes inspirational, motivational, or thought-provoking
- Attribute quotes to the correct author
- Avoid duplicate quotes (the script checks for these)
- Keep quotes reasonably short for better display

## 🔧 Maintenance

### Removing Duplicate Quotes

If duplicate quotes accumulate, you can clean them:

```javascript
const fs = require('fs');
const quotes = JSON.parse(fs.readFileSync('./quotes.json', 'utf-8'));
const seen = new Map();
const unique = quotes.filter(q => {
  const key = q.quote.toLowerCase().trim();
  if (seen.has(key)) return false;
  seen.set(key, true);
  return true;
});
fs.writeFileSync('./quotes.json', JSON.stringify(unique, null, 2) + '\n');
```

### Troubleshooting

**Quote not updating?**
- Check GitHub Actions logs in the Actions tab
- Verify the workflow has write permissions
- Ensure quotes.json is valid JSON

**Script errors?**
- Run `node update-quote.js` locally to see detailed error messages
- Check that README.md and quotes.json exist
- Verify Node.js version is 14 or higher

## 📝 Code Quality

The `update-quote.js` script includes:
- ✅ Input validation
- ✅ Error handling with descriptive messages
- ✅ Automatic marker insertion if missing
- ✅ Logging for debugging
- ✅ Exit codes for CI/CD integration

## 🤝 Contributing Guidelines

1. Test your changes locally before committing
2. Keep code clean and well-documented
3. Follow existing code style
4. Update this documentation if adding new features

## 📄 License

This project is open source. Feel free to use and modify it for your own GitHub profile!
