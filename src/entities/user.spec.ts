import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe ('User Domain class', () =>{
    test('should not create user with invalid email address', () => {
        const invalidEmail = 'invalid_email'
        const error = User.create( {name: 'any_name', email: invalidEmail} )
        expect(error).toEqual(left(new InvalidEmailError()))
    })

    test ('should not create user with invalid name (few characters', () =>{
        const invalidName = '0      '
        const error = User.create({ name: invalidName, email:'any@email.com' })
        expect(error).toEqual(left(new InvalidNameError()))
    })

    test ('should not create user with invalid name (too many characters)', () =>{
        const invalidName = '0'.repeat(257)
        const error = User.create({ name: invalidName, email:'any@email.com' })
        expect(error).toEqual(left(new InvalidNameError()))
    })

    test ('should create user with valid data', () => {
        const validName = 'any_name'
        const validEmail = 'any@email.com'
        const user: User = User.create({ name: validName, email: validEmail }).value as User
        expect(user.name.value).toEqual(validName)
        expect(user.email.value).toEqual(validEmail)
    })
})