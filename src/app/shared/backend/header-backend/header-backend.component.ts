import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-backend',
  templateUrl: './header-backend.component.html',
  styleUrls: ['./header-backend.component.scss']
})
export class HeaderBackendComponent implements OnInit {

  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userProfile: any = {
    "username": "",
    "email": ""
  }

  constructor(
    private auth: AuthService
  ) { 
    // ดึงข้อมูลผู้ใช้งานที่ Login มาแสดง
    this.userProfile.username = this.auth.getUser().username
    this.userProfile.email = this.auth.getUser().email
   }

  ngOnInit(): void {
  }

  // ฟังก์ชันสำหรับ signOut
  signOut(){
    this.auth.logout()
  }

}
