import { LoginOauthDto } from '../../auth/dto/login.oauth.dto';
import {Controller, Get, Query, Res, Req, Post, Body, UseGuards, Inject, HttpStatus, Param, Put} from "@nestjs/common";
import { Request, Response } from "express";
import { OauthClientService } from './oauth-client.service';
import { HttpService } from '@nestjs/axios';
import { AuthGuard } from '@nestjs/passport';
import PermissionGuard from '@/auth/guards/permission.guard';
import { Resources } from '@/auth/guards/enums/resource-permission.enum';
import { Action } from '@/auth/guards/enums/action-permission.enum';
import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import {REQUEST} from "@nestjs/core";
interface OrganRes{
  id:number
  Title:string
}
@Controller('oauth/client')
export class OauthClientController {
  constructor(private oauthClientService: OauthClientService) {}


    @UseGuards(JwtAuthGuard)
    @Get('get-notification')
    async getNotification(
        @Req() req,
        @Res() res,
    ){
        const data = await this.oauthClientService.getNotification()
        return res.status(HttpStatus.OK).json(data.data.data);
    }
    @Put('update-read-notification/:id')
    // @UseGuards(JwtAuthGuard)
    async updateReadNotification(
        @Req() req,
        @Res() res,
        @Param("id") id
    ){
        const data = await this.oauthClientService.updateReadNotification(id)
        return res.status(HttpStatus.OK).json(data.data);
    }

  @Get()
  initialize(@Query() query: any, @Res() response: Response) {
      return this.oauthClientService.initialize(query,response)
  }

  @Post('login')
  async login(@Body() body: LoginOauthDto) {
    const response =await  this.oauthClientService.loginOauth(body);
    return  response.data;
  }

  @Get('system/menu')
  async getUserMenu(@Req() req, @Res() res: Response) {

  const dataMenu:any=await  this.oauthClientService.getUserMenu()
      return res.status(HttpStatus.OK).json(dataMenu.data);
  }
  @Get('/organ/parent')
  async get(@Res() res): Promise<OrganRes> {
      const organ:any=await this.oauthClientService.getOrganId();
      return res.status(HttpStatus.OK).json(organ.data.data);
  }
  @Get('/system-notification/:systemId')
  async getSystemNotification(@Res() res,@Param() param): Promise<any> {
      const notifications:any=await this.oauthClientService.getSystemNotification(param.systemId);
      return res.status(HttpStatus.OK).json(notifications.data.data);
  }
  @Post('/system-notification/:systemId')
  async insertToSeenNotification(@Res() res,@Param() param,@Body() body): Promise<any> {
      const notifications:any=await this.oauthClientService.insertToSeenNotification(param.systemId,body);
      return res.status(HttpStatus.OK).json(notifications.data.data);
  }

  @Get('permissions')
  async getPermissions(@Res() res: Response) {

      let Permissions:any=await this.oauthClientService.getPermissions()
       return res.status(HttpStatus.OK).json(Permissions.data);
  }
    @Get('get-process/:systemProcessId')
    async getProcess(
        @Param('systemProcessId') systemProcessId: number,
        @Res() res: Response,
    ) {
        const allStatus: any = await this.oauthClientService.getProcess(systemProcessId);
        return res.status(HttpStatus.OK).json(allStatus.data);
    }
  @Get('getAllSystem')
  async getAllSystem(@Res() res: Response) {
      let allSystem:any=await this.oauthClientService.getAllSystem()
       return res.status(HttpStatus.OK).json(allSystem.data);
  }
  
  @Get('getAllProcess/:systemId')
  @UseGuards(JwtAuthGuard)
  async getAllProcess(@Param('systemId') systemId:number, @Res() res: Response) {
      const allSystem = await this.oauthClientService.getAllProcess(systemId)
      return res.status(HttpStatus.OK).json(allSystem.data);
  }
  @Get('get-all-resource/:systemId')
  async getAllResource(@Param('systemId') systemId:number, @Res() res: Response) {
      const allSystemResource = await this.oauthClientService.getAllResource(systemId)
      return res.status(HttpStatus.OK).json(allSystemResource.data);
  }

    @Get('getUserForceScope')
    async GetUserForceScope(@Res() res: Response) {
        let forceIds: any = await this.oauthClientService.GetUserForceScope()
        return res.status(HttpStatus.OK).json(forceIds.data);
    }

}
