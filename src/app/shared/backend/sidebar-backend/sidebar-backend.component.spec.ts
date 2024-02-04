import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBackendComponent } from './sidebar-backend.component';

describe('SidebarBackendComponent', () => {
  let component: SidebarBackendComponent;
  let fixture: ComponentFixture<SidebarBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
