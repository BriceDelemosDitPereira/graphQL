# GraphQL Profile Page Project

## Project Overview

This project aims to help you learn the GraphQL query language by creating a personal profile page that interacts with a GraphQL endpoint. The endpoint provided by the platform (https://zone01normandie.org/api/graphql-engine/v1/graphql) will be used to fetch and display your user data. Additionally, you will implement a login page and incorporate statistical graphs using SVG to visualize your data.
This project was carried out as part of the training : [Zone01](https://zone01rouennormandie.org/).

## Objectives

- **Understand and use GraphQL** to query your data.
- **Create a user profile page** that displays specific user information.
- **Implement a login system** to authenticate and fetch user data using JWT.
- **Generate statistical graphs** using SVG to illustrate user progress and achievements.

## Project Requirements

### 1. Setup and Authentication

- **Login Page**:
  - **Endpoint**: `https://zone01normandie.org/api/auth/signin`
  - **Authentication**: Use Basic authentication with Base64 encoding.
  - **Credentials**: Support `username:password` and `email:password`.
  - **Error Handling**: Display appropriate error messages for invalid credentials.
  - **Logout Functionality**: Implement a method to log out and invalidate the JWT.

### 2. Profile Page

- **Data Display**:
  - Fetch and display three pieces of user data (e.g., basic identification, XP amount, grades, audits, skills).
  
- **Statistics Section**:
  - Implement at least two different statistical graphs using SVG. Possible graphs include:
    - XP earned over time.
    - XP earned by project.
    - Audit ratios.
    - PASS/FAIL ratios for projects.
    - Piscine (JS/Go) stats.
    - Attempts for each exercise.

### 3. GraphQL Queries

- Use GraphQL queries to retrieve data. Here are some examples:
  - **Fetch User Info**:
    ```graphql
    {
      user {
        id
        login
      }
    }
    ```
  - **Fetch Specific Object Info**:
    ```graphql
    {
      object(where: { id: { _eq: 3323 }}) {
        name
        type
      }
    }
    ```
  - **Nested Query Example**:
    ```graphql
    {
      result {
        id
        user {
          id
          login
        }
      }
    }
    ```

### 4. Graph Generation

- Utilize SVG to create interactive and animated graphs. Ensure the graphs enhance the user interface and provide insightful visualizations.

## Hosting

Choose a platform to host your profile page, such as GitHub Pages, Netlify, or others. Make sure the site is publicly accessible.



/////////
## Database Tables

Here are key tables and their columns available via GraphQL:

- **User Table**:
  - `id`, `login`

- **Transaction Table**:
  - `id`, `type`, `amount`, `objectId`, `userId`, `createdAt`, `path`

- **Progress Table**:
  - `id`, `userId`, `objectId`, `grade`, `createdAt`, `updatedAt`, `path`

- **Result Table**:
  - `id`, `objectId`, `userId`, `grade`, `type`, `createdAt`, `updatedAt`, `path`

- **Object Table**:
  - `id`, `name`, `type`, `attrs`

## Examples

### Query User Information

```graphql
{
  user {
    id
    login
  }
}
```

### Fetch Object Data

```graphql
{
  object(where: { id: { _eq: 3323 }}) {
    name
    type
  }
}
```

### Nested Query Example

```graphql
{
  result {
    id
    user {
      id
      login
    }
  }
}
```

## Notes

- Explore the GraphiQL interface on the platform to inspect the API schema and discover available query parameters.
- Make sure to follow good UI design principles while creating your profile page.

## Conclusion

This project will enhance your understanding of GraphQL, JWT authentication, and data visualization with SVG. Have fun building your profile page! Feel free to extend the functionality with additional features or more complex visualizations.

---

For any questions or further assistance, feel free to reach out. Happy coding! 🚀