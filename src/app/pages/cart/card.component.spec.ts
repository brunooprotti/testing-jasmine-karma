import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
/***export interface Book {
  id?: string;
  name: string;
  author: string;
  isbn: string;
  description?: string;
  photoUrl?: string;
  price?: number;
  amount?: number;
}*/

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
]


describe("Cart Component", () => { //!Describe nos sirve para poder declarar el test, se le dan 2 parametros: Nombre y funcion con el codigo del test.

  let component : CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service:BookService;

  beforeEach(() => { //!BeforeEach se ejecuta justo antes de cada test.
    TestBed.configureTestingModule({ //!TestBed es para declarar todo lo que necisitamos antes de cada test... Modulos, servicios, componentes, etc...
      imports: [
        HttpClientTestingModule, //!Nos sirve para simular peticiones, lo usa nuestro servicio BookService
      ],
      declarations: [
        CartComponent
      ],
      providers: [
        BookService, //!Servicio que usa el componente
      ],
      schemas:[ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  // ngOnInit(): void {
  //   this.listCartBook = this._bookService.getBooksFromCart();
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }

  beforeEach(() => { //!Separamos los imports de la creacion e instancia del componente.
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService); //!Forma correcta de llamar a un servicio a traves del fixture que es lo que nos permite debuggear
    spyOn(service, 'getBooksFromCart').and.callFake(() =>listBook);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /***
   * public getTotalPrice(listCartBook: Book[]): number {
   *   let totalPrice = 0;
   *   listCartBook.forEach((book: Book) => {
   *     totalPrice += book.amount * book.price;
   *   });
   *   return totalPrice;
   * }
   */
  //!Test de metodo con return
  it('getTotalPrice returns an amount', () => { //!Con it() se declaran los test Unitarios.
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);//! Los expect son para lo que esperamos que suceda
    expect(totalPrice).not.toBeNull(); //!ejempo de negacion de resultado
  });

  //! public onInputNumberChange(action: string, book: Book): void {
  //!   const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
  //!   book.amount = Number(amount);
  //!   this.listCartBook = this._bookService.updateAmountBook(book);
  //!   this.totalPrice = this.getTotalPrice(this.listCartBook);
  //! }
  //!Test de metodo SIN return (spyOn)

  it('onInputNumberChange increments correctly',() => {
    const action = 'plus';
    const book =  {
      name:"",
      author:"",
      isbn: "",
      price: 15,
      amount: 2
    };
    //! const service = component["_bookService"]; asi se llama un servicio privado
    expect(book.amount).toBe(2);

    //!spyOn nos permite ver si se llama un metodo dentro del servicio o componente. se crean antes del llamado del evento para que se dispare el evento
    const spy1 = spyOn(service, "updateAmountBook").and.callFake( () => null ); //!hacemos que sea falsa para que no se vaya hasta el servicio y le decimos que devuelva null.
    const spy2 = spyOn(component, "getTotalPrice").and.callFake( () => null );

    component.onInputNumberChange(action, book);//! Al llamar a este metodo se llama al update y eso lo comprobamos con el spy

    expect(book.amount).toBe(3);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
  it('onInputNumberChange decrements correctly',() => {
    const action = 'minus';
    const book =   {
      name:"",
      author:"",
      isbn: "",
      price: 15,
      amount: 2
    };
    //! const service = component["_bookService"]; asi se llama un servicio privado

    expect(book.amount).toBe(2);

    const spy1 = spyOn(service, "updateAmountBook").and.callFake( () => null );
    const spy2 = spyOn(component, "getTotalPrice").and.callFake( () => null );

    component.onInputNumberChange(action, book);//! Al llamar a este metodo se llama al update y eso lo comprobamos con el spy

    expect(book.amount).toBe(1);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

});
