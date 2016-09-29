# graphql-example

Simple example of [GraphQL](http://graphql.org).

## Getting Started

Make sure you have [node and npm](https://nodejs.org/en/) installed, clone the repo, and then...

Install dependencies: `npm install -g gulp && npm install`  
Run tests: `npm test`  
Build assets and run: `npm start`  
Available at [localhost:4000/graphql](http://localhost:4000/graphql)

Example query:  

```
# Access "Docs" from button on far right header
# Pass "customerId" values in "Query Variables" pane below to limit results, null to return all
query Account($customerId: ID) {
  account {
    id
    name
    customers(id: $customerId) {
      id
      firstName
      lastName
      type
      status
    }
  }
}
```
