import { InvalidNameError, InvalidEmailError } from "@/entities/errors";
import { User, UserData } from "@/entities";
import { Either, left, right } from "@/shared";
import { UseCase, UserRepository } from "@/usecases/register-user-on-mailing-list/ports";

export class RegisterUserOnMailingList implements UseCase {
    private readonly userRepo: UserRepository

    construtor (userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    public async perform (request: UserData): 
        Promise<Either<InvalidNameError | InvalidNameError, UserData>> {
        const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
        if(userOrError.isLeft()) {
            return left(userOrError.value)
        }

        if (!(await this.userRepo.exists(request))) {
            await this.userRepo.add(request)
        }
        return right(request)
    }
}
