import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { HttpResponse } from '@/web-controllers'
import { HttpRequest } from '@/web-controllers'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@test/entities/usecases/register-user-on-mailing-list/repository'

describe ('Register user web controller',  () => {
    test ('should return status code 201 when request contains valid user data', async () => {
        const request: HttpRequest = {
            body: {
                name: 'Any Name',
                email: 'any@mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toEqual(201)
        expect(response.body).toEqual(request.body)
    })

    test ('should return status code 400 when request contains invalid name', async () => {
        const requestWithInvalidName: HttpRequest = {
            body: {
                name: 'A',
                email: 'any@mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse = await controller.handle(requestWithInvalidName)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidNameError)
    })

    test ('should return status code 400 when request contains invalid email', async () => {
        const requestWithInvalidEmail: HttpRequest = {
            body: {
                name: 'Any Name',
                email: 'invalid_mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidEmailError)
    })

    

})
