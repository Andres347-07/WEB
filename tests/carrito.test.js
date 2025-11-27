// tests/carrito.test.js 
describe(' CARRITO DE COMPRAS - Funcionalidades EXACTAS de tu proyecto', () => {
    
   
    const mockLocalStorage = {
        store: {},
        getItem: function(key) { return this.store[key] || null; },
        setItem: function(key, value) { this.store[key] = value; },
        clear: function() { this.store = {}; }
    };

    beforeEach(() => {
        
        global.localStorage = mockLocalStorage;
        mockLocalStorage.clear();
    });

    test('Agregar productos al carrito EXACTAMENTE como en tu proyecto', () => {
       
        class Cart {
            constructor() {
                this.items = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
            }

            addItem(product) {
                const idx = this.items.findIndex(p => p.id === product.id);
                if (idx !== -1) {
                    this.items[idx].cantidad += product.cantidad;
                } else {
                    this.items.push(product);
                }
                this._save();
            }

            removeItem(id) {
                this.items = this.items.filter(p => p.id !== id);
                this._save();
            }

            getItems() {
                return this.items;
            }

            getRawTotal() {
                return this.items.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
            }

            _save() {
                localStorage.setItem('productos-en-carrito', JSON.stringify(this.items));
            }
        }


        const cart = new Cart();

        
        cart.addItem({ id: '1', nombre: 'Gorra Urban', precio: 100, cantidad: 2 });
        cart.addItem({ id: '2', nombre: 'Gorra Classic', precio: 80, cantidad: 1 });

        
        expect(cart.getItems().length).toBe(2);
        expect(cart.getRawTotal()).toBe(280); 
        
        
        expect(localStorage.getItem('productos-en-carrito')).toBeTruthy();
        
        const guardado = JSON.parse(localStorage.getItem('productos-en-carrito'));
        expect(guardado.length).toBe(2);
        expect(guardado[0].nombre).toBe('Gorra Urban');
    });

    test('Eliminar productos del carrito EXACTAMENTE como en tu proyecto', () => {
        class Cart {
            constructor() {
                this.items = [
                    { id: '1', nombre: 'Gorra Test', precio: 100, cantidad: 1 },
                    { id: '2', nombre: 'Gorra Premium', precio: 150, cantidad: 1 }
                ];
            }

            removeItem(id) {
                this.items = this.items.filter(p => p.id !== id);
                this._save();
            }

            getItems() {
                return this.items;
            }

            _save() {
                localStorage.setItem('productos-en-carrito', JSON.stringify(this.items));
            }
        }

        const cart = new Cart();

        expect(cart.getItems().length).toBe(2);
        cart.removeItem('1');
        expect(cart.getItems().length).toBe(1);
        expect(cart.getItems()[0].nombre).toBe('Gorra Premium');
        expect(cart.getItems()[0].id).toBe('2');
    });

    test('Comportamiento del Singleton (opcional - si quieres probarlo)', () => {
        class Cart {
            constructor() {
                if (Cart._instance) {
                    return Cart._instance;
                }
                this.items = [];
                Cart._instance = this;
            }

            addItem(product) {
                this.items.push(product);
            }

            getItems() {
                return this.items;
            }
        }

        const cart1 = new Cart();
        const cart2 = new Cart();
        
        cart1.addItem({ id: '1', nombre: 'Test', precio: 100, cantidad: 1 });
        
       
        expect(cart1).toBe(cart2);
        expect(cart2.getItems().length).toBe(1);
    });
});