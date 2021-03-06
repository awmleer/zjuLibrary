import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {AboutPage} from "../about/about";
import {LoginPage} from "../login/login";
import {ToastService} from "../../services/toast.service";
import {UpdateService} from "../../services/update.service";
import {SocialSharing} from "@ionic-native/social-sharing";
import {SignupPage} from '../signup/signup'
import {ChangePasswordPage} from '../change-password/change-password'


@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(
    public navCtrl: NavController,
    private toastSvc: ToastService,
    private updateSvc: UpdateService,
    private accountSvc: AccountService,
    private socialSharing: SocialSharing
  ) {}

  get hasNewVersion():boolean{
    return this.updateSvc.hasNewVersion;
  }

  get user(){
    return this.accountSvc.user;
  }


  shareApp(){
    this.socialSharing.shareWithOptions({
      message: '浙图：可能是最好用的浙大图书馆第三方app',
      subject: `浙大图书馆`,
      url: 'http://home.zjulibrary.sparker.xyz/'
    });
  }

  logout(){
    this.accountSvc.logout();
    this.toastSvc.toast('已退出登录');
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goSignUpPage() {
    this.navCtrl.push(SignupPage);
  }

  goAboutPage(){
    this.navCtrl.push(AboutPage);
  }

  goChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }

}
