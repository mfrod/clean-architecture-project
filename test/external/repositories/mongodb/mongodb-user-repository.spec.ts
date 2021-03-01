import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

describe('Mongodb User Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        MongoHelper.clearCollection('users')
    })

    test('when user is added, it should exists', async () => {
        const userRepository = new MongodbUserRepository()
        const user = {
            name: 'any_name',
            email: 'any@email.com'
        }
        await userRepository.add(user)
        expect(await userRepository.exists(user)).toBeTruthy()
    })
})
