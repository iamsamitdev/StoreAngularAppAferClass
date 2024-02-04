import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../../services/user.service'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Form Validation
  loginForm!: FormGroup
  submitted: boolean = false
  msgStatus: string = ''

  // สร้างตัวแปรเก็บข้อมูลผู้ใช้งาน
  userData = {
    "username": "",
    "password": ""
  }

  // สร้างตัวแปรเก็บข้อมูลการ Login
  userLogin = {
    "username": "",
    "email": "",
    "token": ""
  }

  constructor(
    private auth: AuthService,
    private route: Router,
    private http: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Validate Form
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  // ฟังก์ชัน submitLogin
  submitLogin(){

    this.submitted = true

    if(this.loginForm.valid){
      this.userData.username = this.loginForm.value.username
      this.userData.password = this.loginForm.value.password
      // console.log(this.userData)

      // เรียกใช้งาน API
      this.http.LogIn(this.userData).subscribe((data: any) => {

        // ตรวจสอบว่ามี token หรือไม่
        if(data['token'] == null){
          // alert("Login Fail!!")
          this.msgStatus = "<p class='alert alert-danger text-center'>Login Fail!!</p>"
        } else {
          // show data
          // console.log(data)

          this.userLogin = {
            "username": data['username'],
            "email": data['email'],
            "token": data['token']
          }

          // บันทึกข้อมูลลง local storage
          this.auth.setUser(this.userLogin)

          // show token
          // console.log(data['token'])
          // alert("Login Success")
          this.msgStatus = "<p class='alert alert-success text-center'>Login Success</p>"

          // delay 2 วินาที
          setTimeout(() => {
            // Redirect ไปหน้า backend
            this.route.navigate(['backend'])
          }, 2000);

        }

      })

    }

  }

}
