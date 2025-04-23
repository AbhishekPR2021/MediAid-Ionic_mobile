import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyPagePage } from './emergency-page.page';

describe('EmergencyPagePage', () => {
  let component: EmergencyPagePage;
  let fixture: ComponentFixture<EmergencyPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
