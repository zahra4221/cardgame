import { DecodedTokenInfoModel, GenerationTokenInfoModel } from '../../models/token-info.model';

export interface ITokenService {
    generateToken(info: GenerationTokenInfoModel, expiresIn: string): string;
    getTokenInfo(token: string): DecodedTokenInfoModel;
    checkToken(jwtToken: string): void;
}
