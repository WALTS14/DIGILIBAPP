import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrarydashPage } from './librarydash.page';

describe('LibrarydashPage', () => {
  let component: LibrarydashPage;
  let fixture: ComponentFixture<LibrarydashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarydashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
