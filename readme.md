# create-node-spark

A CLI tool to scaffold a basic Node.js + Express backend. This open-source tool simplifies the setup of a Node.js project with optional features such as authentication and file uploads using Multer.

## Usage

```bash
npx create-node-spark
```

## Features

- **Optional Authentication**: Seamlessly integrates argon2 and JWT for user authentication.
- **Multer Integration**: Easily add file upload capabilities.
- **Quick Setup**: Scaffolds a ready-to-use Node.js project in seconds.

## Installation

To install and use the CLI tool locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/talhabilal-dev/create-node-spark.git
   cd create-node-spark
   ```

2. Link the package globally:
   ```bash
   npm link
   ```

3. Run the CLI tool:
   ```bash
   create-node-spark
   ```

## Getting Started

1. **Run the CLI**: Execute the command `create-node-spark` and follow the prompts. You can choose to include authentication and file upload functionalities.

2. **Navigate to Your Project**: After generation, move into your new project directory:
   ```bash
   cd your-project-name
   ```

3. **Start the Development Server**: Use Node.js to run the server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.

---

### Future Enhancements

We are considering adding a **template system** to automatically generate folders such as `/routes`, `/controllers`, and `/middlewares`. If you have any ideas or requests, let us know! 🌟

