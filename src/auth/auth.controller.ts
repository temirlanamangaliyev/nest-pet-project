import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('singup')
    singpup(){
        return this.authService.login()
    }

    @Post('singin')
    singin(){
        return 'I am singedin'
    }
}