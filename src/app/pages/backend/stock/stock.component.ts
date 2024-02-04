import { Component, OnInit } from '@angular/core'

// Import FormGroup and FormBuilder
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

// Import Product Service
import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit { 

  constructor(private product: ProductService) { }

  // Form Add Validation
  addProductForm!: FormGroup
  submittedAdd: boolean = false
  msgStatusAdd: string = ''

  // Form Edit Validation
  editProductForm!: FormGroup
  submittedEdit: boolean = false
  msgStatusEdit: string = ''

  // Form Delete Validation
  deleteProductForm!: FormGroup
  submittedDelete: boolean = false
  msgStatusDelete: string = ''

  // สร้างตัวแปรไว้เก็บข้อมูลหมวดหมู่สินค้าที่ได้จาก API
  categories: any = []

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้าที่ได้จาก API
  products: any = []

  // สร้าง method สำหรับการอ่านข้อมูลสินค้าทั้งหมด
  getAllProduct(){
    this.product.getAllProduct().subscribe(
      (res) => {
        // console.log(res)
        this.products = res
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // สร้าง method สำหรับการอ่านข้อมูลสินค้าตาม ID
  getProductById(productId: number){
    this.product.getProductById(productId).subscribe(
      (res: any) => {

        // console.log(res)
        // show product name in console
        // console.log(res[0].productName)
        
        // กำหนดค่าให้กับฟอร์มแก้ไขสินค้า
        this.editProductForm.patchValue({
          productID: productId,
          productName: res[0].productName,
          unitPrice: res[0].unitPrice,
          unitInStock: res[0].unitInStock,
          productPicture: res[0].productPicture,
          categoryId: res[0].categoryId
        })

        // กำหนดค่าให้กับฟอร์มลบสินค้า
        this.deleteProductForm.patchValue({
          productID: productId
        })

      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {

    // เรียกใช้ Method สำหรับการดึงข้อมูลหมวดหมู่สินค้าทั้งหมด
    this.getAllProduct()

    // เรียกใช้ Method สำหรับการดึงข้อมูลหมวดหมู่สินค้าทั้งหมด
    this.product.getAllCategory().subscribe(
      (res) => {
        // console.log(res)
        this.categories = res
      },
      (error) => {
        console.log(error)
      }
    )

    // Validate Form Add Product
    this.addProductForm = new FormBuilder().group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      unitPrice: ['', [Validators.required, Validators.min(1)]],
      unitInStock: ['', [Validators.required, Validators.min(1)]],
      productPicture: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    })

    // Validate Form Edit Product
    this.editProductForm = new FormBuilder().group({
      productID: ['', [Validators.required]],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      unitPrice: ['', [Validators.required, Validators.min(1)]],
      unitInStock: ['', [Validators.required, Validators.min(1)]],
      productPicture: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    })

    // Validate Form Delete Product
    this.deleteProductForm = new FormBuilder().group({
      productID: ['', [Validators.required]]
    })

  }

  // ฟังก์ชัน submitAddProduct
  submitAddProduct(){
    this.submittedAdd = true
    if(this.addProductForm.valid){
      // console.log(this.addProductForm.value)
      // เรียกใช้ Method สำหรับการเพิ่มข้อมูลสินค้า
      this.product.addProduct(this.addProductForm.value).subscribe(
        (res) => {
          // console.log(res)
          this.msgStatusAdd = "<p class='alert alert-success text-center'>Create Product Success</p>"
          this.addProductForm.reset()

          // เรียกใช้ Method สำหรับการดึงข้อมูลสินค้าทั้งหมด
          this.getAllProduct()
        
          // delay 2 วินาที
          setTimeout(() => {
            this.msgStatusAdd = ''
            // close bootstrap modal
            document.getElementById("btnClose")!.click()
          }, 2000)

          this.submittedAdd = false
        },
        (error) => {
          console.log(error)
          this.msgStatusAdd = 'error'
        }
      )
    }
  }

  // ฟังก์ชัน submitEditProduct
  submitEditProduct(){
    this.submittedEdit = true
    if(this.editProductForm.valid){
      console.log(this.editProductForm.value)
      // เรียกใช้ Method สำหรับการแก้ไขข้อมูลสินค้า
      this.product.updateProduct(this.editProductForm.value).subscribe(
        (res) => {
          console.log(res)
          this.msgStatusEdit = "<p class='alert alert-success text-center'>Update Product Success</p>"
          this.editProductForm.reset()

          // เรียกใช้ Method สำหรับการดึงข้อมูลสินค้าทั้งหมด
          this.getAllProduct()
        
          // delay 2 วินาที
          setTimeout(() => {
            this.msgStatusEdit = ''
            // close bootstrap modal
            document.getElementById("btnCloseEdit")!.click()
          }, 2000)

          this.submittedEdit = false
        },
        (error) => {
          console.log(error)
          this.msgStatusEdit = 'error'
        }
      )

    }
  }

  // ฟังก์ชัน deleteProduct
  deleteProduct(){
    this.submittedDelete = true
    if(this.deleteProductForm.valid){
      console.log(this.deleteProductForm.value)
      // เรียกใช้ Method สำหรับการลบข้อมูลสินค้า
      this.product.deleteProduct(this.deleteProductForm.value.productID).subscribe(
        (res) => {
          console.log(res)
          this.msgStatusDelete = "<p class='alert alert-danger text-center'>Delete Product Success</p>"
          this.deleteProductForm.reset()

          // เรียกใช้ Method สำหรับการดึงข้อมูลสินค้าทั้งหมด
          this.getAllProduct()
        
          // delay 1 วินาที
          setTimeout(() => {
            this.msgStatusDelete = ''
            // close bootstrap modal
            document.getElementById("btnCloseDelete")!.click()
          }, 1000)

          this.submittedDelete = false
        },
        (error) => {
          console.log(error)
          this.msgStatusDelete = 'error'
        }
      )

    }
  }

}
