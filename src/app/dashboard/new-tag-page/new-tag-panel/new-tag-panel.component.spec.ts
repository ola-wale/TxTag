import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagPanelComponent } from './new-tag-panel.component';
import { testDependencies } from '../../../test.module';

describe('NewTagPanelComponent', () => {
  let component: NewTagPanelComponent;
  let fixture: ComponentFixture<NewTagPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTagPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('new transaction form should be invalid when empty', () => {
    expect(component.newTransactionForm.valid).toBeFalsy();
  });
  it('new tag button to be disabled', () => {
    const btn:HTMLElement = fixture.nativeElement.querySelector('button');
    expect(btn.hasAttribute('disabled')).toBeTruthy();
  });
  it('hash field should be invalid with an invalid bitcoin transaction hash', () => {
    component.newTransactionForm.controls['hash'].setValue('1nv4l1dh4sh');
    expect(component.newTransactionForm.controls['hash'].valid).toBeFalsy();
  });
  it(`hash field should be valid with a valid bitcoin transaction hash
    & the new transaction form should be valid,
    the new tag button should also be enabled`, () => {
    component.newTransactionForm.controls['hash'].setValue('9e7597682a7805949a88e5501843b7588cba6ff87465fd5025b17b83fe92636e');
    fixture.detectChanges();
    const btn:HTMLElement = fixture.nativeElement.querySelector('button');
    expect(component.newTransactionForm.controls['hash'].valid).toBeTruthy();
    expect(component.newTransactionForm.valid).toBeTruthy();
    expect(btn.hasAttribute('disabled')).toBeFalsy();
  });
});
