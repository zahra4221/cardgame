export interface GenerationTokenInfoModel {
    id: string;
    type: TOKEN_TYPE;
}

export interface DecodedTokenInfoModel {
    id: string;
    type: TOKEN_TYPE;
    createdAt?: Date;
    expiresAt?: Date;
}

export enum TOKEN_TYPE {
    REGISTER = 'Register',
    CLASSIC = 'Classic',
    RESET_PASSWORD = 'ResetPassword',
    SCIM = 'Scim',
}
