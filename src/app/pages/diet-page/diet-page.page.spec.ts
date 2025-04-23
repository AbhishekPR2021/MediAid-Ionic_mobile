import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietPagePage } from './diet-page.page';

describe('DietPagePage', () => {
  let component: DietPagePage;
  let fixture: ComponentFixture<DietPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
