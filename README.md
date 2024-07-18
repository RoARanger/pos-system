<!DOCTYPE html>
<html>
<head>
  <h1>Point of Sales System</h1>
</head>
<body>
  <h1>Point of Sales System</h1>
  <img src="https://via.placeholder.com/100" alt="Point of Sales System">

  <h2>Overview</h2>
  <p>This is a backend application for a Point of Sales system built with TypeScript, Node.js, and Fastify. It includes functionalities for user authentication, product management, upsell product management, and sales transactions. Sequelize is used as the ORM for MySQL database interactions.</p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#running-tests">Running Tests</a></li>
    <li><a href="#api-descriptions">API Descriptions</a></li>
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
    <li><strong>Sign Up:</strong> This endpoint creates a new user account.</li>
    <li><strong>Login:</strong> This endpoint logs in an existing user.</li>
  </ul>

  <h3>Product Management</h3>
  <ul>
    <li><strong>Create Product:</strong> This endpoint creates a new product.</li>
    <li><strong>Retrieve All Products:</strong> This endpoint retrieves all products.</li>
    <li><strong>Update Product:</strong> This endpoint updates an existing product.</li>
    <li><strong>Delete Product:</strong> This endpoint deletes an existing product.</li>
  </ul>

  <h3>Transaction Management</h3>
  <ul>
    <li><strong>Create Transaction:</strong> This endpoint creates a new transaction with details of products sold and quantities.</li>
    <li><strong>Retrieve All Transactions:</strong> This endpoint retrieves all transactions.</li>
    <li><strong>Retrieve Specific Transaction:</strong> This endpoint retrieves a specific transaction by ID along with the associated products and upsell products.</li>
  </ul>

  <h3>Upsell Product Management</h3>
  <ul>
    <li><strong>Link Upsell Product:</strong> This endpoint links an upsell product to an existing product.</li>
    <li><strong>Retrieve Upsell Products:</strong> This endpoint retrieves all upsell products linked to a specific product.</li>
  </ul>
</body>
</html>
