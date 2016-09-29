import {
	GraphQLEnumType,
	GraphQLObjectType,
  GraphQLString,
  GraphQLID,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLList
} from 'graphql';
import {
  getAccount,
  getCustomer,
  getCustomers
} from "./data.js";

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

const accountType = new GraphQLObjectType({
	name: 'Account',
	description: 'An account.',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: GraphQLString
    },
		customers: {
			type: new GraphQLList(customerType),
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve: (root, {
				id
			}) => id ? [getCustomer(id)] : getCustomers()
		}
	})
});

const customerType = new GraphQLObjectType({
	name: 'Customer',
	description: 'A customer.',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLID)
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
		},
    ssn: {
      type: GraphQLString,
      resolve: () => {
        throw new Error('ssn is private.');
      }
    }
	})
});

const queryType = new GraphQLObjectType({
	name: 'Query',
	description: 'GraphQL API root.',
	fields: () => ({
		account: {
			type: accountType,
			resolve: (root) => getAccount()
		}
	})
});

export const schema = new GraphQLSchema({
	query: queryType,
	types: [accountType]
});
