import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';
import { HomePage } from './home.page';
import { ComponentsModule } from '../components/components.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), ComponentsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería instanciar el componente HomePage', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar la lista de publicaciones', async () => {
    await component.cargarPublicaciones();
    expect(Array.isArray(component.listaPublicaciones)).toBe(true);
  });
});
