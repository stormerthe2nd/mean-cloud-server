import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { PostService } from '../post.service';
import { environment } from 'src/environments/environment';
const { admins } = environment

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent implements OnInit {
  public user: SocialUser = new SocialUser;
  userData = JSON.parse(localStorage.getItem("google_auth")) || { isAdmin: false }
  constructor(private authService: SocialAuthService, public postService: PostService) {
    this.userData.admin = false
    this.postService.user = this.userData
    console.log(this.userData?.name)
  }

  ngOnInit(): void {
  }

  signInWithGoogle() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.userData = data
      if (!admins.includes(this.userData.email)) this.userData.name = null
      localStorage.setItem("google_auth", JSON.stringify(this.userData))
      this.postService.user = this.userData
    });
  }

  signOut() {
    this.authService.signOut()
    localStorage.removeItem("google_auth")
    this.userData = {}
    this.postService.user = {}
  }
}
