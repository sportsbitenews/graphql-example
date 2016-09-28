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
  customers: [{
    "id": "857aa3c6-b6fa-4410-9598-b0b9ca543c68",
    "firstName": "Lloyd",
    "lastName": "Christmas",
    "type": "PERSONAL",
    "status": "DOCUMENT"
  }]
};

var customers = {
  customers: [{
    "id": "857aa3c6-b6fa-4410-9598-b0b9ca543c68",
    "firstName": "Lloyd",
    "lastName": "Christmas",
    "type": "PERSONAL",
    "status": "DOCUMENT"
  }, {
    "id": "ddfcbb12-3ae6-44b5-a885-a03014776d15",
    "firstName": "Harry",
    "lastName": "Dunne",
    "type": "RECEIVE_ONLY",
    "status": "UNVERIFIED"
  }]
};

var genericQuery = `
  query Customer($id: ID) {
    customers(id: $id) {
      id
      firstName
      lastName
      type
      status
    }
  }`;

describe('Queries', () => {
  it('return list of customers', () => {
    expect(graphql(schema, `
        query {
          customers {
            id
            firstName
            lastName
            type
            status
          }
        }`)).to.eventually.deep.equal({
      data: customers
    });
  });

  it('return customer by id', () => {
    expect(graphql(schema, `
        query {
          customers(id: "857aa3c6-b6fa-4410-9598-b0b9ca543c68") {
            id
            firstName
            lastName
            type
            status
          }
        }`)).to.eventually.deep.equal({
      data: lloyd
    });
  });

  it('return customer by id with generic query', () => {
    const params = {
      id: "857aa3c6-b6fa-4410-9598-b0b9ca543c68"
    };
    expect(graphql(schema, genericQuery, null, null, params)).to.eventually.deep.equal({
      data: lloyd
    });
  });

  it('return customers with null in generic query', () => {
    const params = {
      id: null
    };
    expect(graphql(schema, genericQuery, null, null, params)).to.eventually.deep.equal({
      data: customers
    });
  });

  it('report errors', () => {
    var result = graphql(schema, `
        query {
          customers(id: "857aa3c6-b6fa-4410-9598-b0b9ca543c68") {
            ssn
          }
        }`).then((result) => {
      expect(result).to.deep.equal({
        "data": {
          "customers": [{
            "ssn": null
          }]
        },
        "errors": [{
          "message": "ssn is private.",
          "locations": [{
            "line": 3,
            "column": 5
          }]
        }]
      });
    });
  });
});
