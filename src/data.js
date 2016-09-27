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

export function getCustomer(id) {
	return customerData.get(id);
}

export function getCustomers() {
	return Array.from(customerData.values());
}
