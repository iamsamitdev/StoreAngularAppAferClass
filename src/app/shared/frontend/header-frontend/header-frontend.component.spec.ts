import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFrontendComponent } from './header-frontend.component';

describe('HeaderFrontendComponent', () => {
  let component: HeaderFrontendComponent;
  let fixture: ComponentFixture<HeaderFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderFrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
