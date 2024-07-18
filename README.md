<!DOCTYPE html>
<html>
<body>
  <h1>Point of Sales System</h1>

  <h2>Overview</h2>
  <p>This is a backend application for a Point of Sales system built with TypeScript, Node.js, and Fastify. It includes functionalities for user authentication, product management, upsell product management, and sales transactions. Sequelize is used as the ORM for MySQL database interactions.</p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#running-tests">Running Tests</a></li>
    <li><a href="#api-descriptions">API Descriptions</a></li>
    <li><a href="#future-enhancements">Future Enhancements</a></li>
  </ul>

  <h2 id="getting-started">Getting Started</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (>= 14.x)</li>
    <li>npm (>= 6.x)</li>
    <li>MySQL</li>
  </ul>

  <h3>Installation</h3>
  <ol>
    <li>Clone the repository:
      <pre>
        <code>
          git clone repository_url
          cd repository_name
        </code>
      </pre>
    </li>
    <li>Install dependencies:
      <pre>
        <code>npm install</code>
      </pre>
    </li>
    <li>Install MySQL:
      <pre>
        <strong>Windows:</strong> Download the MySQL Installer from the <a href="https://dev.mysql.com/downloads/installer/">official MySQL website</a> and follow the installation instructions.
      </pre>
    </li>
    <li>Set up the database:
      <pre>
        <code>CREATE DATABASE pos_db;</code>
      </pre>
    </li>
    <li>Create a <code>.env</code> file in the root directory and add your database configuration:
      <pre>
        <code>
          DB_HOST=localhost
          DB_USER=root
          DB_PASSWORD=yourpassword
          DB_NAME=pos_db
          JWT_SECRET=your_jwt_secret
        </code>
      </pre>
    </li>
  </ol>

  <h2 id="environment-variables">Environment Variables</h2>
  <p>Ensure the following environment variables are set in your <code>.env</code> file:</p>
  <pre>
    <code>
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=yourpassword
      DB_NAME=pos_db
      JWT_SECRET=your_jwt_secret
      PORT=3000
    </code>
  </pre>

  <h2 id="running-the-application">Running the Application</h2>
  <p>To start the server:</p>
  <pre>
    <code>npm start</code>
  </pre>
  <p>The server will start on <a href="http://localhost:3000">http://localhost:3000</a>.</p>

  <h2 id="running-tests">Running Tests</h2>
  <p>To run the unit tests:</p>
  <pre>
    <code>npm test</code>
  </pre>
  <p>This will run all the test suites in the <code>tests</code> directory.</p>

  <h2 id="api-descriptions">API Descriptions</h2>
  <h3>User Authentication</h3>
  <ul>
    <li><strong>Sign Up:</strong> This endpoint creates a new user account. It accepts an email and password, hashes the password for security, and generates a JWT token for authentication.</li>
    <li><strong>Login:</strong> This endpoint logs in an existing user. It verifies the user's credentials, checks the hashed password, and generates a JWT token for authentication.</li>
  </ul>

  <h3>Product Management</h3>
  <ul>
    <li><strong>Create Product:</strong> This endpoint creates a new product. It accepts details like name, price, description, and quantity of the product and stores it in the database.</li>
    <li><strong>Retrieve All Products:</strong> This endpoint retrieves all products from the database. It returns a list of products with their details.</li>
    <li><strong>Update Product:</strong> This endpoint updates an existing product. It accepts the product ID and updated details, and then updates the product in the database.</li>
    <li><strong>Delete Product:</strong> This endpoint deletes an existing product. It accepts the product ID and removes the product from the database.</li>
  </ul>

  <h3>Transaction Management</h3>
  <ul>
    <li><strong>Create Transaction:</strong> This endpoint creates a new transaction with details of products sold and their quantities. It checks the availability of the products, reduces their quantities accordingly, and adds the transaction details to the database. If the product quantity is insufficient, it returns an error.</li>
    <li><strong>Retrieve All Transactions:</strong> This endpoint retrieves all transactions. It returns a list of transactions with their details, including the associated products and upsell products.</li>
    <li><strong>Retrieve Specific Transaction:</strong> This endpoint retrieves a specific transaction by ID along with the associated products and upsell products. It provides detailed information about the transaction.</li>
  </ul>

  <h3>Upsell Product Management</h3>
  <ul>
    <li><strong>Link Upsell Product:</strong> This endpoint links an upsell product to an existing product. It accepts the IDs of the main product and the upsell product, and creates a link between them in the database.</li>
    <li><strong>Retrieve Upsell Products:</strong> This endpoint retrieves all upsell products linked to a specific product. It returns a list of upsell products associated with the given product ID.</li>
  </ul>

<h2 id="future-enhancements">Future Enhancements</h2>
  <p>To ensure the system can be easily expanded in the future, several potential enhancements have been considered:</p>
  <ul>
    <li><strong>Discount Management:</strong> Implementing a system to manage discounts and promotions that can be applied to transactions.</li>
    <li><strong>Inventory Management:</strong> Adding features for managing inventory, including automated stock replenishment alerts and detailed inventory reports.</li>
    <li><strong>Customer Management:</strong> Introducing a customer relationship management (CRM) module to track customer details, purchase history, and preferences.</li>
    <li><strong>Reporting and Analytics:</strong> Developing advanced reporting and analytics tools to provide insights into sales performance, customer behavior, and product trends.</li>
    <li><strong>Multi-language Support:</strong> Expanding the system to support multiple languages for a more inclusive user experience.</li>
  </ul>
  <p>The current architecture, using Fastify and Sequelize, is designed to be modular and scalable, making it easier to integrate these additional features in the future.</p>
</body>
</html>