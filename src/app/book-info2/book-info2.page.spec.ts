import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookInfo2Page } from './book-info2.page';

describe('BookInfo2Page', () => {
  let component: BookInfo2Page;
  let fixture: ComponentFixture<BookInfo2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
