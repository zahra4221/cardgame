import { Container, injectable } from 'inversify';

import DAL_TYPES from '../interfaces/dals/dals.types';
import { IProfileDal } from '../interfaces/dals/profile.dal';
import { ProfileDal } from '../implementations/dals/profile.dal';

@injectable()
export class IocDals {
    static register(container: Container) {
        container.bind<IProfileDal>(DAL_TYPES.ProfileDal).to(ProfileDal);
    }
}
