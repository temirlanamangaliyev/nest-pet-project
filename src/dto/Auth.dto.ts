import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString, 
    IsNotEmpty
} from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    password: string
}