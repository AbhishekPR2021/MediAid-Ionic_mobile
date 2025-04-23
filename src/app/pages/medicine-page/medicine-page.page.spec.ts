import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicinePagePage } from './medicine-page.page';

describe('MedicinePagePage', () => {
  let component: MedicinePagePage;
  let fixture: ComponentFixture<MedicinePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
