class Customer {
	constructor(id, firstName, lastName, type, status) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.type = type;
		this.status = status;
	}
}

const id1 = '857aa3c6-b6fa-4410-9598-b0b9ca543c68';
const id2 = 'ddfcbb12-3ae6-44b5-a885-a03014776d15';

var customerData = new Map();
customerData.set(id1, new Customer(id1, 'Lloyd', 'Christmas', 1, 2));
customerData.set(id2, new Customer(id2, 'Harry', 'Dunne', 3, 0));

export function getCustomer(id) {
	return customerData.get(id);
}

export function getCustomers() {
	return Array.from(customerData.values());
}
