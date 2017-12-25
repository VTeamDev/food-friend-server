export const userTypes = `
	type User {
		id: ID!
		firstName: String!
		lastName: String!
		email: String!
		createdAt: Date!
		updatedAt: Date!
	}
	type Query {
		me: User! @auth
	}
	type Mutation {
		register(firstName: String!, lastName: String!, email: String!, password: String!): User! @auth(guest: true)
		login(email: String!, password: String!): AuthResponse! @auth(guest: true)
	}
	type AuthResponse {
		token: String!
		issuedAt: Int!
		expiresIn: Int!
	}
`;
