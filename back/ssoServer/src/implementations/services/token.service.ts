import { DecodedTokenInfoModel, GenerationTokenInfoModel } from '../../models/token-info.model';
import { inject, injectable } from 'inversify';

import { ITokenService } from '../../interfaces/services/token.service';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

@injectable()
export class TokenService implements ITokenService {
    private readonly publicKey: string;
    private readonly privateKey: string;

    constructor() {
        this.publicKey = this.getPublicCertificate();
        this.privateKey = this.getPrivateCertificate();
    }

    public generateToken(info: GenerationTokenInfoModel, expiresIn: string): string {
        console.info('-- Generating new JWT Token --', {});

        const jwtToken: string = jwt.sign(info, this.privateKey, {
            algorithm: 'RS256',
            expiresIn,
        });

        this.checkToken(jwtToken);
        return jwtToken;
    }

    public checkToken(jwtToken: string): void {
        try {
            if (!jwtToken) {
                throw new Error('Token not found');
            }
            const decoded: any = this.decodeToken(jwtToken);
            console.info('[TokenService] decoded token', decoded);

            if (Date.now() >= decoded.exp * 1000) {
                console.error('-- JWT Token expired --', { jwtToken });
                throw new Error('Token is exipred');
            }
        } catch (err) {
            console.error('-- JWT Token invalid --', { jwtToken });
            throw err;
        }
    }

    public getTokenInfo(jwtToken: string): DecodedTokenInfoModel {
        const decoded: any = this.decodeToken(jwtToken);
        console.info('decoded token', decoded);
        return {
            createdAt: new Date(decoded.iat * 1000),
            expiresAt: new Date(decoded.exp * 1000),
            id: decoded.id,
            type: decoded.type,
        };
    }

    private decodeToken(jwtToken: string): any {
        return jwt.verify(jwtToken, this.publicKey);
    }

    private getPrivateCertificate(): string {
        const rootFolderPath: string = path.resolve(path.join('.', 'assets'));
        const filePath: string = path.join(rootFolderPath, 'jwtRS256.key');
        return fs.readFileSync(filePath, 'utf-8');
    }


    private getPublicCertificate(): string {
        const rootFolderPath: string = path.resolve(path.join('.', 'assets', 'public'));
        const filePath: string = path.join(rootFolderPath, 'jwtRS256.key.pub');
        return fs.readFileSync(filePath, 'utf-8');
    }
}
