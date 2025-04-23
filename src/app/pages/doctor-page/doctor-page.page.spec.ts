import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorPagePage } from './doctor-page.page';

describe('DoctorPagePage', () => {
  let component: DoctorPagePage;
  let fixture: ComponentFixture<DoctorPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
