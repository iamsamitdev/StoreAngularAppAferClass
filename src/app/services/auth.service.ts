import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // สร้างตัวแปรเก็บข้อมูลผู้ใช้งาน
  userProfile = {
    "username": "",
    "email": "",
    "token": ""
  }

  constructor(private myRoute: Router) { }

  // ฟังก์ชันสำหรับเก็บ user ลง local storage
  setUser(user: any){
    // บันทึก token ลง local storage
    localStorage.setItem("LoggedInUser", user['username'])
    localStorage.setItem("LoggedInEmail", user['email'])
    localStorage.setItem("LoggedInToken", user['token'])
  }

  // ฟังก์ขันสำหรับ getUser จาก local storage
  getUser(){
    this.userProfile.username = localStorage.getItem("LoggedInUser") || ""
    this.userProfile.email = localStorage.getItem("LoggedInEmail") || ""
    this.userProfile.token = localStorage.getItem("LoggedInToken") || ""
    return this.userProfile
  }

  // ฟังก์ชันเช็คสถานะการ Login
  isLoggedIn(){
    return this.getUser().token !== ""
  }

  // ฟังก์ชันสำหรับ Logout
  logout(){
    localStorage.removeItem("LoggedInUser")
    localStorage.removeItem("LoggedInEmail")
    localStorage.removeItem("LoggedInToken")
    this.myRoute.navigate(['/auth/login'])
  }

}