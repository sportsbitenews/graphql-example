var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  GraphQLEnumType,
	GraphQLObjectType,
	GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema
} = require('graphql');

const customerTypeEnum = new GraphQLEnumType({
  name: 'CustomerType',
  description: 'Type of customer.',
  values: {
    UNVERIFIED: {
      value: 0
    },
    PERSONAL: {
      value: 1
    },
    BUSINESS: {
      value: 2
    },
    RECEIVE_ONLY: {
      value: 3
    }
  }
});

const customerStatusEnum = new GraphQLEnumType({
  name: 'CustomerStatus',
  description: 'Status of customer.',
  values: {
    UNVERIFIED: {
      value: 0
    },
    RETRY: {
      value: 1
    },
    DOCUMENT: {
      value: 2
    },
    VERIFIED: {
      value: 3
    },
    SUSPENDED: {
      value: 4
    }
  }
});

const customerType = new GraphQLObjectType({
	name: 'Customer',
	description: 'A customer.',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		type: {
			type: customerTypeEnum
		},
		status: {
			type: customerStatusEnum
		}
	})
});

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		customer: {
			type: customerType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, {
				id
			}) => getCustomer(id)
		}
	})
});

class Customer {
	constructor(id, firstName, lastName, type, status) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.type = type;
		this.status = status;
	}
}

const lloyd = new Customer('857aa3c6-b6fa-4410-9598-b0b9ca543c68', 'Lloyd', 'Christmas', 1, 2);
const harry = new Customer('ddfcbb12-3ae6-44b5-a885-a03014776d15', 'Harry', 'Dunne', 3, 0);

var customerData = new Map();
customerData.set(lloyd.id, lloyd);
customerData.set(harry.id, harry);

function getCustomer(id) {
	return customerData.get(id);
}

function getCustomers() {
	return Array.from(customerData.values());
}

var schema = new GraphQLSchema({
		query: queryType,
		types: [customerType]
});

console.log(printSchema(schema));

var app = express();
app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');