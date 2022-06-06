class Pitzeria {
    constructor() {
        this.nombre = "Taller 1";
        this.direccion = "Usac";
        this.cola = new Cola();
    }
}

class Cola {
    constructor() {
        this.front = null;
    }

    enqueue(tipo, forma, costo) {
        let pitza = new Pitzza(tipo, forma, costo);
        let nodoPitza = new Nodo(pitza);

        if (this.front == null) {
            this.front = nodoPitza;
        } else {
            let nodoAux = this.front;
            /* Buscar el ultimo */
            while (nodoAux.siguiente != null) {
                nodoAux = nodoAux.siguiente;
            }

            nodoAux.siguiente = nodoPitza;
        }
    }

    dequeue() {
        if (this.front != null) {
            this.front = this.front.siguiente;
        }
    }
}


class Nodo {
    constructor(pitza) {
        this.siguiente = null;
        this.pitza = pitza;
    }
}

class Pitzza {
    constructor(tipo, forma, costo) {
        this.tipo = tipo;
        this.forma = forma;
        this.costo = costo;
    }
}

let pittzeria = new Pitzeria();

function ingresarPedido() {
    let tipoPitza = document.getElementById("tipoPitzza").value;
    let forma = document.getElementById("forma").value;
    let costo = document.getElementById("costo").value;
    pittzeria.cola.enqueue(tipoPitza, forma, costo);

    document.getElementById("tipoPitzza").value = "";
    document.getElementById("forma").value = "";
    document.getElementById("costo").value = "";

}

function cargaPitzzas(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        for (const key in object) {
            let pitza = object[key];
            pittzeria.cola.enqueue(pitza.tipo, pitza.forma, pitza.costo);
        }
        
    }
    lector.readAsText(archivo);
}


document.getElementById("formFile").addEventListener("change", cargaPitzzas, false);