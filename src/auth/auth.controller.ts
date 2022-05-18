import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('singup')
    singpup(@Body() dto: AuthDto){
        return this.authService.singup(dto)
    }

    @Post('login')
    loging(@Body() dto: AuthDto){
        return this.authService.login(dto)
    }
}