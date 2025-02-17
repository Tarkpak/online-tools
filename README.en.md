# Online Tools

[中文](./README.md) | [日本語](./README.ja.md)

A collection of pure frontend tools that run directly in the browser without backend services.

## Tool List

1. [Image to Line Art](tools/image-to-line-art) - Convert images to line art style with real-time preview and parameter adjustment

## Features

- Pure frontend implementation, no backend required
- All processing done locally in the browser
- Offline support
- Responsive design for mobile devices
- Multi-language support (Chinese, English, Japanese)
- Open source and free

## Deployment

This project can be deployed to GitHub Pages or any static website hosting service.

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/online-tools.git
```

2. Navigate to the project directory:
```bash
cd online-tools
```

3. Run with any HTTP server, for example:
```bash
# Using Python 3
python -m http.server

# Or using Node.js
npx serve
```

4. Visit `http://localhost:8000` in your browser

## Internationalization

This project supports multiple languages:

- 🇨🇳 Chinese (Default)
- 🇺🇸 English
- 🇯🇵 Japanese

The system automatically detects the browser language and switches accordingly. Users can also manually select languages using the switcher in the top-right corner.

### Adding New Languages

To add support for a new language:

1. Add translations in `js/i18n.js`
2. Add the language option to the language switcher
3. Update README files

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
