class Account {
  constructor(id, name, customers) {
    this.id = id;
    this.name = name;
    this.customers = customers;
  }
}

class Customer {
	constructor(id, firstName, lastName, type, status) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.type = type;
		this.status = status;
	}
}

const cid1 = '857aa3c6-b6fa-4410-9598-b0b9ca543c68';
const cid2 = 'ddfcbb12-3ae6-44b5-a885-a03014776d15';

var customerData = new Map();
customerData.set(cid1, new Customer(cid1, 'Lloyd', 'Christmas', 1, 2));
customerData.set(cid2, new Customer(cid2, 'Harry', 'Dunne', 3, 0));

const account = new Account('045687e4-7fbb-43b8-8a5f-a91153257e6d', 'Samsonite', customerData)

export function getAccount() {
  return account;
}

export function getCustomer(id) {
	return customerData.get(id);
}

export function getCustomers() {
	return Array.from(customerData.values());
}
