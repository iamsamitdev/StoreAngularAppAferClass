import { Injectable } from '@angular/core';

// Import HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import Observable
import { Observable } from 'rxjs';

// Import Constant Service
import { ConstantService } from './constant.service';

// Import Product Model
import { ProductModel } from '../models/product.model';

// Import Category Model
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // Read token from local storage
  // token = localStorage.getItem('LoggedInToken');

  // Set header options
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer '+ this.token ?? ''
  //   }),
  // };

  constructor(
    private http: HttpClient, 
    private constant: ConstantService,
  ) {}

  // Method สำหรับการดึงข้อมูลหมวดหมู่สินค้าทั้งหมด
  getAllCategory(): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      this.constant.baseAPIURL + 'Category',
      // this.httpOptions
    )
  }

  // Method สำหรับการดึงข้อมูลสินค้าทั้งหมด
  getAllProduct(): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      this.constant.baseAPIURL + 'Products',
      // this.httpOptions
    )
  }

  // Method สำหรับการดึงข้อมูลสินค้าตาม ID
  getProductById(productId: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      this.constant.baseAPIURL + 'Products/' + productId,
      // this.httpOptions
    )
  }

  // Method สำหรับการเพิ่มข้อมูลสินค้า
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(
      this.constant.baseAPIURL + 'Products',
      product,
      // this.httpOptions
    )
  }

  // Method สำหรับการแก้ไขข้อมูลสินค้า
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(
      this.constant.baseAPIURL + 'Products',
      product,
      // this.httpOptions
    )
  }

  // Method สำหรับการลบข้อมูลสินค้า
  deleteProduct(productId: number): Observable<ProductModel> {
    return this.http.delete<ProductModel>(
      this.constant.baseAPIURL + 'Products/' + productId,
      // this.httpOptions
    )
  }

  // Method สำหรับการอัพโหลดรูปภาพสินค้า
  uploadProductPicture(formData: FormData): Observable<any> {
    return this.http.post<any>(
      this.constant.baseAPIURL + 'Upload',
      formData,
      // this.httpOptions
    )
  }

  // Mehod สำหรับการดึงข้อมูลสินค้าทั้งหมดที่มีการค้นหา
  searchProduct(keyword: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      this.constant.baseAPIURL + 'Products/Search/' + keyword,
      // this.httpOptions
    )
  }

}
