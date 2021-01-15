import { InvalidNameError } from "../../entities/errors/invalid-name-error";
import { User } from "../../entities/user";
import { UserData } from '../../entities/user-data'
import { Either, left, right } from "../../shared/either";
import { UserRepository } from "./ports/user-repository";

export class RegisterUserOnMailingList {
    private readonly userRepo: UserRepository

    construtor (userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    public async RegisterUserOnMailingList (request: UserData): 
        Promise<Either<InvalidNameError | InvalidNameError, UserData>> {
        const userOrError: Either<InvalidNameError | InvalidNameError, User> = User.create(request)
        if(userOrError.isLeft()) {
            return left(userOrError.value)
        }

        if (!(await this.userRepo.exists(request))) {
            await this.userRepo.add(request)
        }
        return right(request)
    }
}
