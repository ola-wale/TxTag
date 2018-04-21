import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPageComponent } from './tags-page.component';
import { testDependencies } from '../../test.module';

describe('TagsPageComponent', () => {
  let component: TagsPageComponent;
  let fixture: ComponentFixture<TagsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`expect tags table to not be visible when transaction is empty
    & expect empty transactions panel to be visible when transaction is empty`, () => {
    const tagsTable:HTMLElement = fixture.nativeElement.querySelector('app-tags-table');
    const emptyTransactionsPanel:HTMLElement = fixture.nativeElement.querySelector('.empty-transactions');
    expect(tagsTable).toBeFalsy();
    expect(emptyTransactionsPanel).toBeTruthy();
  });
  it(`expect tags table to be visible when transaction is not empty
    & expect empty transactions panel to be invisible when transaction is not empty`, () => {
    component.transactions = [{hash:'hash',tags:['tag1','tag2']}];
    fixture.detectChanges();
    const tagsTable:HTMLElement = fixture.nativeElement.querySelector('app-tags-table');
    const emptyTransactionsPanel:HTMLElement = fixture.nativeElement.querySelector('.empty-transactions');
    expect(tagsTable).toBeTruthy();
    expect(emptyTransactionsPanel).toBeFalsy();
  });
});
