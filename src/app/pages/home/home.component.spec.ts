import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

const listBook:Book[] = [
  {
    name:"",
    author:"",
    isbn: "",
    price: 15,
    amount: 2
  },
  {
    name:"",
    author:"",
    isbn: "",
    price: 20,
    amount: 1
  },
  {
    name:"",
    author:"",
    isbn: "",
    price: 8,
    amount: 7
  },
];

const bookServiceMock = {
  getBooks: () => of(listBook) //!Asi se hace un mock de un servicio, es para no llamar al bookService directo y un codigo mas limpio
};

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(()=> {
    	TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        declarations: [HomeComponent],
        providers: [
         //! BookService
         {
          provide:BookService, //!MOCK de servicio, asi indicamos que use el BookService pero redefinido
          useValue: bookServiceMock
         }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    }).compileComponents();
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", ()=> {
    expect(component).toBeTruthy();
  });

  // public getBooks(): void {
  //   this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
  //     this.listBook = resp;
  //   });
  // }

  it("getBook get books from the subscription", () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    //!const listBook:Book[] = [];
    //!const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook)); //! con esto espiamos el metodo y devolvemos un observable del tipo de listBook
    component.getBooks();
    //!expect(spy1).toHaveBeenCalled();
    expect(listBook.length).toBe(3);
  });
});

