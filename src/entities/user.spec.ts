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
})
