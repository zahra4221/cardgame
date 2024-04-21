import { Container, injectable } from 'inversify';

import { IProfileService } from '../interfaces/services/profile.service';
import { ITokenService } from '../interfaces/services/token.service';
import { ProfileService } from '../implementations/services/profile.service';
import SERVICE_TYPES from '../interfaces/services/services.types';
import { TokenService } from '../implementations/services/token.service';

@injectable()
export class IocServices {
    static register(container: Container) {
        container.bind<ITokenService>(SERVICE_TYPES.TokenService).to(TokenService);
        container.bind<IProfileService>(SERVICE_TYPES.ProfileService).to(ProfileService);
    }
}
