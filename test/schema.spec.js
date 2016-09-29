import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
var expect = chai.expect;
import {
  describe,
  it
} from 'mocha';
import {
  schema
} from '../src/schema.js';
import {
  graphql
} from 'graphql';

var lloyd = {
  data: {
    account: {
      id: '045687e4-7fbb-43b8-8a5f-a91153257e6d',
      name: 'Samsonite',
      customers: [{
        id: '857aa3c6-b6fa-4410-9598-b0b9ca543c68',
        firstName: 'Lloyd',
        lastName: 'Christmas',
        type: 'PERSONAL',
        status: 'DOCUMENT'
      }]
    }
  }
};

var customers = {
  data: {
    account: {
      id: '045687e4-7fbb-43b8-8a5f-a91153257e6d',
      name: 'Samsonite',
      customers: [{
        id: '857aa3c6-b6fa-4410-9598-b0b9ca543c68',
        firstName: 'Lloyd',
        lastName: 'Christmas',
        type: 'PERSONAL',
        status: 'DOCUMENT'
      }, {
        id: 'ddfcbb12-3ae6-44b5-a885-a03014776d15',
        firstName: 'Harry',
        lastName: 'Dunne',
        type: 'RECEIVE_ONLY',
        status: 'UNVERIFIED'
      }]
    }
  }
};

var genericQuery = `
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
  }`;

describe('Queries', () => {
  it('return list of customers', () => {
    return expect(graphql(schema, `
        {
          account {
            id
            name
            customers {
              id
              firstName
              lastName
              type
              status
            }
          }
        }`)).to.eventually.deep.equal(customers);
  });

  it('return customer by id', () => {
    return expect(graphql(schema, `
        {
          account {
            id
            name
            customers(id: "857aa3c6-b6fa-4410-9598-b0b9ca543c68") {
              id
              firstName
              lastName
              type
              status
            }
          }
        }`)).to.eventually.deep.equal(lloyd);
  });

  it('return customer by id with generic query', () => {
    const params = {
      customerId: "857aa3c6-b6fa-4410-9598-b0b9ca543c68"
    };
    return expect(graphql(schema, genericQuery, null, null, params)).to.eventually.deep.equal(lloyd);
  });

  it('return customers with null in generic query', () => {
    const params = {
      customerId: null
    };
    return expect(graphql(schema, genericQuery, null, null, params)).to.eventually.deep.equal(customers);
  });

  it('report errors', () => {
    return graphql(schema, `
        {
          account {
            customers(id: "857aa3c6-b6fa-4410-9598-b0b9ca543c68") {
              ssn
            }
          }
        }`).then((result) => {
      expect(result).to.deep.equal({
        data: {
          account: {
            customers: [{
              ssn: null
            }]
          }
        },
        errors: [{
          message: 'ssn is private.',
          locations: [{
            column: 15,
            line: 5
          }],
          path: [
            "account",
            "customers",
            0,
            "ssn"
          ]
        }]
      });
    });
  });
});
