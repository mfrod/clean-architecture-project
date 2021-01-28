import { InvalidNameError, InvalidEmailError } from "../../entities/errors";
import { User, UserData } from "../../entities";
import { Either, left, right } from "../../shared";
import { UserRepository } from "./ports";

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
