1. Taskmaster
2. Gitmaster
3. Testmaster

Team Roles 06/12 - 06/14:

- Sean Kutash Taskmaster
- Emily Paye Gitmaster
- Frank Latino Testmaster
- Chris Almodovar Testmaster
- Steven Davis Gitmaster

Questions(EOD):

- Will it be problematic to work in order of the tier list, or whats the best way to complete this?
- Clarification for testmaster's role.
-

Deadline: Complete Tier 1 by Friday 06/16/23 and Tier 2 by Thursday 06/22/23 at a minimum.

## Tier 1 Plan: MVP Shopping Experience

### As an engineer, I want to:

-[] **Have a well-seeded database:** You can use a combination of Node.js/Express and PostgreSQL to create and seed your database. You can create a seed script using Node.js that generates data and uses SQL queries to insert this data into your PostgreSQL database. This will allow you to simulate a variety of scenarios for your user stories.

### As an administrator, I want to be able to:

-[] **Have validated data to ensure reliability:** You can use PostgreSQL's data constraints to ensure data integrity. For example, you can use unique constraints to ensure that each email address is only used once in the user table.
-[] **Have full rights to make backend requests to add, edit, and remove products:** You can use Express middleware to verify if a user is an administrator before allowing them to perform certain actions. If they are, you can use SQL queries to perform the requested action on the PostgreSQL database.

### As a customer/visitor, I want to be able to:

-[] **Access a deployed version of the website, view all available products, and view a single product:** You can use React to create a user-friendly frontend that fetches data from your Express server. Redux can be used to manage the state of your application, including the list of products and the currently viewed product.
-[] **Add a product to my cart and edit my cart:** You can use Redux to manage the state of the cart. When a product is added to the cart or the cart is edited, you can dispatch actions to update the state of the cart in your Redux store.
-[] **"Checkout" the items in my cart:** You can create a checkout process that uses the state of the cart in your Redux store. When the checkout process is complete, you can dispatch an action to clear the cart.
-[] **Create an account:** You can create a form in React that sends a POST request to your Express server with the user's information. The server can then insert this information into the PostgreSQL database.

### As a logged-in customer, I want to be able to:

-[] **Have a persistent cart:** You can store the state of the cart in your PostgreSQL database. When a user logs in, you can fetch the state of their cart from the database and load it into your Redux store.

### As an administrator, I want to be able to:

-[] **View user information:** You can create an admin panel using React that fetches user information from your Express server. The server can fetch this information from the PostgreSQL database.

### As an engineer, I want to:

-[] **User data to be secure:** You can use bcrypt to hash passwords before storing them in your PostgreSQL database. You can also use JSON Web Tokens (JWTs) to manage user sessions securely.
